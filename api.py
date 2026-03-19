import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nltk

# Download required NLTK data for Render environment
nltk.download('vader_lexicon', quiet=True)

app = Flask(__name__)
CORS(app)



# Global variables for model and scaler
model = None
scaler = None
analyzer = SentimentIntensityAnalyzer()

def load_resources():
    global model, scaler
    # Search in notebooks/ and root directory
    model_filenames = [
        os.path.join('notebooks', 'fake_review_model.pkl'),
        'fake_review_model.pkl'
    ]
    scaler_filenames = [
        os.path.join('notebooks', 'scaler.pkl'),
        'scaler.pkl'
    ]
    
    model_path = next((p for p in model_filenames if os.path.exists(p)), None)
    scaler_path = next((p for p in scaler_filenames if os.path.exists(p)), None)
    
    if model_path and scaler_path:
        try:
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            with open(scaler_path, 'rb') as f:
                scaler = pickle.load(f)
            print(f"Resources successfully loaded from {model_path} and {scaler_path}")
            return True
        except Exception as e:
            print(f"Error loading resources: {e}")
            return False
    else:
        print("Required model Files (.pkl) not found. Please run the notebook first.")
        return False

@app.route('/health', methods=['GET'])
def health():
    if model and scaler:
        return jsonify({"status": "ok", "model": "loaded"}), 200
    else:
        return jsonify({"status": "error", "model": "not_loaded", "message": "Run notebook to generate .pkl files"}), 500

@app.route('/predict', methods=['POST'])
def predict():
    # Ensure resources are loaded
    if not model or not scaler:
        # Try loading again in case they were generated while API was starting
        if not load_resources():
            return jsonify({"error": "Model files not found on server. Run the notebook to generate 'fake_review_model.pkl' and 'scaler.pkl'."}), 500
    
    data = request.get_json()
    if not data or 'review_text' not in data or 'rating' not in data:
        return jsonify({"error": "Invalid request. JSON must contain 'review_text' and 'rating'."}), 400
    
    try:
        review_text = data['review_text']
        rating = float(data['rating'])
        
        # 1. Basic Features
        review_len = len(review_text)
        word_count = len(review_text.split())
        
        # 2. VADER Sentiment Extraction
        sentiment_scores = analyzer.polarity_scores(review_text)
        vader_sentiment = sentiment_scores['compound']
        
        # 3. Normalization and Inconsistency Logic (must match notebook exactly)
        norm_rating = (rating - 1) / 4
        norm_sentiment = (vader_sentiment + 1) / 2
        sentiment_inconsistency = abs(norm_rating - norm_sentiment)
        
        # 4. Feature Construction
        # Order: [rating, review_len, word_count, vader_sentiment, sentiment_inconsistency, flooding_count]
        # flooding_count is set to 0 as it's a single static review
        features = np.array([[rating, review_len, word_count, vader_sentiment, sentiment_inconsistency, 0]])
        
        # 5. Scaling and Prediction
        X_scaled = scaler.transform(features)
        prediction = int(model.predict(X_scaled)[0])
        probabilities = model.predict_proba(X_scaled)[0]
        
        confidence = float(max(probabilities) * 100)
        label = "FAKE" if prediction == 1 else "GENUINE"
        
        return jsonify({
            "prediction": prediction,
            "label": label,
            "confidence": round(confidence, 2),
            "sentiment_score": round(float(vader_sentiment), 4),
            "inconsistency_score": round(float(sentiment_inconsistency), 4),
            "word_count": word_count,
            "review_length": review_len
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    # Initial load attempt
    load_resources()
    # Run server with dynamic port for cloud deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

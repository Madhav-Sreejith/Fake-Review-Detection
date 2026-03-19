import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

# Global variables
model = None
scaler = None
analyzer = None


# ✅ Lazy load analyzer (avoids startup delay)
def get_analyzer():
    global analyzer
    if analyzer is None:
        analyzer = SentimentIntensityAnalyzer()
    return analyzer


# ✅ Load model & scaler only when needed
def load_resources():
    global model, scaler

    if model is not None and scaler is not None:
        return True, "Success"

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

            print(f"✅ Model loaded from {model_path}")
            return True, "Success"

        except Exception as e:
            error_msg = f"❌ Error loading resources: {str(e)}"
            print(error_msg)
            return False, error_msg

    else:
        error_msg = "❌ Model files not found"
        print(error_msg)
        return False, error_msg


# ✅ ROOT ROUTE (CRITICAL for Render health check)
@app.route('/')
def home():
    return "Fake Review Detection API is running 🚀"


# ✅ Health check route
@app.route('/debug/files', methods=['GET'])
def debug_files():
    import os
    success, message = load_resources()
    files = os.listdir('.')
    return jsonify({
        "cwd": os.getcwd(),
        "files": files,
        "load_success": success,
        "load_message": message,
        "exists_root_model": os.path.exists('fake_review_model.pkl'),
        "exists_nb_model": os.path.exists(os.path.join('notebooks', 'fake_review_model.pkl'))
    })

@app.route('/health', methods=['GET'])
def health():
    success, message = load_resources()
    if success:
        return jsonify({"status": "ok", "model": "loaded"}), 200
    else:
        return jsonify({"status": "error", "model": "not_loaded", "message": message}), 500


# ✅ Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    success, message = load_resources()
    if not success:
        return jsonify({
            "error": f"Model files error: {message}"
        }), 500

    data = request.get_json()

    if not data or 'review_text' not in data or 'rating' not in data:
        return jsonify({
            "error": "JSON must contain 'review_text' and 'rating'"
        }), 400

    try:
        review_text = data['review_text']
        rating = float(data['rating'])

        # Features
        review_len = len(review_text)
        word_count = len(review_text.split())

        # Sentiment
        analyzer = get_analyzer()
        sentiment_scores = analyzer.polarity_scores(review_text)
        vader_sentiment = sentiment_scores['compound']

        # Normalize
        norm_rating = (rating - 1) / 4
        norm_sentiment = (vader_sentiment + 1) / 2
        sentiment_inconsistency = abs(norm_rating - norm_sentiment)

        # Feature vector
        features = np.array([
            [rating, review_len, word_count, vader_sentiment, sentiment_inconsistency, 0]
        ])

        # Scale + predict
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
        return jsonify({
            "error": f"Prediction failed: {str(e)}"
        }), 500


# ✅ Local run (Render uses gunicorn, so this won't affect production)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
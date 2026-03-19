# 🤖 Stage 5: Fake Review Detection Dashboard & ML Engine - Logic

## 5.1 Machine Learning Engine Overview & Logic
The core of our project is the **Hybrid ML Engine**. This model is trained to classify reviews into "Genuine" vs. "Fake."

## 5.2 Model Development & Performance
- **Algorithms Used:**
    - **Random Forest:** Chosen for its robustness against noisy data.
    - **Hybrid Heuristics:** Incorporating behavioral features (like review frequency, rating deviation, and sentiment inconsistency) as additional inputs to the ML classifier.
- **Model Performance Metrics:**
    - **Accuracy:** Accomplished a **97.31% overall accuracy** on our validation set.
    - **Detection Rate (Ratio):** From the original 70,000 reviews, the engine successfully identified **1,876 fake reviews** (2.69% of the total).

## 5.3 Detection Logic: The Trust Index (RCI)
Instead of just a binary "Yes" or "No," we created a **Reviewer Credibility Score (RCI)**. This score (0.0 to 1.0) is built on three pillars:
1. **Factor A (Consistency):** Does the rating match the sentiment?
2. **Factor B (Helpfulness):** Do other users find the review useful?
3. **Factor C (Behavior):** Is the account posting reviews at a human-like frequency?

## 5.4 Implementation Summary
The combination of NLP-based features (sentiment, subjectivity) and behavioral metadata (rating deviation, review history) allowed our model to separate malicious actors from genuine users with very high precision.

---
*Fake Review Detection Dashboard & ML Engine Documentation - 23CSE452 Business Analytics project.*

# 🤖 Stage 5: Fake Review Detection Dashboard & ML Engine - Logic

## 5.1 Machine Learning Engine Overview & Logic
The core component of the system is a **Hybrid Machine Learning** Engine designed to classify user-generated reviews into two categories: Genuine and Fake. The model integrates both Natural Language Processing (NLP) features and behavioral metadata to improve detection robustness and reduce false positives.

## 5.2 Model Development & Performance
- **Algorithms Used**:
    - **Random Forest**: Chosen for its robustness against noisy data.
    - **Hybrid Heuristics**: Incorporating behavioral features (like review frequency, rating deviation, and sentiment inconsistency) as additional inputs to the ML classifier.
- **Model Performance Metrics**:
    - **Accuracy**: Accomplished a **99.69% overall accuracy** on our validation set.
    - **Precision** (Fake Reviews): 0.96
    - **Recall** (Fake Reviews): 0.92
    - **F1-Score** (Fake Reviews): 0.94
    -**Macro Avg F1-Score**: 0.97
      The classification report indicates near-perfect performance for genuine reviews and strong detection capability for fake reviews, despite class imbalance.
    - **Detection Rate (Ratio)**: From the original 70,000 reviews, the engine successfully identified **1,876 fake reviews** (2.69% of the total).

## 5.3 Detection Logic: The Trust Index (RCI)
Instead of just a binary "Yes" or "No," we created a **Reviewer Credibility Score (RCI)**. This score (0.0 to 1.0) is built on three pillars:
**RCI Formula**: RCI = w₁·Consistency + w₂·Helpfulness + w₃·Behavior
Where w₁ + w₂ + w₃ = 1
1. **Factor A (Consistency)**: Does the rating match the sentiment?
2. **Factor B (Helpfulness)**: Do other users find the review useful?
3. **Factor C (Behavior)**: Is the account posting reviews at a human-like frequency?

## 5.4 Implementation Summary
The system leverages a hybrid approach that combines **NLP-based features** and **Behavioral metadata**
This integration enables the model to distinguish between genuine users and malicious actors with high precision. The inclusion of the RCI score further enhances interpretability and supports real-time decision-making in moderation systems.

---
*Fake Review Detection Dashboard & ML Engine Documentation - 23CSE452 Business Analytics project.*

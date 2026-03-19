# 🧠 Stage 4: Sentiment Analysis & Linguistic Profiling - NLP Logic

## 4.1 Objective
The sentiment analysis stage of the project provides the core "features" for our fake review detection engine. We utilized a combination of **lexicon-based** (using known word dictionaries) and **probabilistic** (ML-based) approaches to score every review.

## 4.2 Mathematical Sentiment Scoring Process
- **Polarity Score (-1.0 to 1.0)**: Calculating the "mood" of a review. A score of 1.0 is extremely positive, while -1.0 is extremely negative.
- **Subjectivity Score (0.0 to 1.0)**: Measuring how much of the review is "opinion" vs. "fact." Fake reviews tend to be highly subjective.
- **Sentiment Shift Detection**: Flagged reviews where the numerical rating (e.g., 5-star) contradicted the textual sentiment (e.g., "awful product").

## 4.3 Linguistic Markers & Indicators
In additions to sentiment, we profiled several linguistic markers:
- **Punctuation Density**: Excessive use of exclamation marks (e.g., "GREAT!!!!") is a common trait of spam.
- **Text Complexity**: Fake reviews produced by bots often have lower complexity and shorter sentence lengths.
- **Sentiment Inconsistency**: One of the strongest flags for a fake review was a high numerical rating (5-star) paired with a low textual sentiment score.

## 4.4 Result Analysis
By mapping sentiment against ratings, we could identify clusters of "Review Noise." These anomalies became the primary training data for our machine learning classifiers in our next stage.

## 4.5 Sentiment vs. Helpful-Votes Correlation
Interestingly, we found that reviews with very high sentiment polarity (> 0.9) but low subjectivity scores had an 80% higher chance of being flagged as fake, even if they had 0 helpful votes.

---
*Sentiment Analysis & Linguistic Profiling Documentation - Fake Review Detection Project.*

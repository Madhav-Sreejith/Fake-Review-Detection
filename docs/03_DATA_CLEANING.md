# 🧼 Stage 3: Data Cleaning & Pre-processing - Pipeline Strategy

## 3.1 Data Preparation Pipeline
Before any advanced NLP (Natural Language Processing) could be executed, the raw review text required significant cleaning and normalization.

## 3.2 Cleaning Procedures
- **Text Normalization:**
    - All characters were converted to **lowercase** to ensure consistency (e.g., "Good" vs. "good").
    - **Punctuation Stripping:** Removing special characters while preserving exclamation marks (which are later used as a "Spam Feature").
    - HTML and URL Removal: Automatically stripped website links and formatting tags from the reviews.

## 3.3 Advanced Pre-processing
- **Tokenization:** Reviews were broken down into individual words (tokens) to facilitate linguistic profiling.
- **Stopword Removal:** Common words (e.g., "and," "the," "is") were removed to highlight the core sentiment-carrying adjectives and nouns.
- **Lemmatization:** Reducing words to their base form (e.g., "better" to "good") to unify sentiment signals across different grammatical forms.

## 3.4 Handling Inconsistent Data (Null & Missing Value Strategy)
- **Null Handling:**
    - Records missing the `content` or `score` field were removed to maintain the integrity of our predictive models.
    - Non-essential fields with missing values (such as `at` or `appVersion`) were handled through imputation or by labeling them as "Unknown."
- **Inconsistent Text Handling:** We used a regex-based approach to detect and normalize reviews that were entirely in "emoji" (e.g., "😀🤩❤") which often indicate low-effort fake reviews.

## 3.5 Before & After: A Cleaning Example
> **Raw:** "This product was EXTREMELY good!!!!! 🌟 I loved it. 5/5."
> **Cleaned:** "product cực good loved" (Lemmatized and Stopwords removed).

---
*Data Cleaning & Pre-processing Documentation for Group 9 Project.*

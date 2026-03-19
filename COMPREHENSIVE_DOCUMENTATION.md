# 🕵️ Fake Review Detection & Trust Analytics - Master Documentation

## 📌 Project Overview
This project targets the pervasive issue of **deceptive and manipulative online reviews** in digital marketplaces. By leveraging a multi-stage data science pipeline—including text analytics, behavioral modeling, and machine learning—we have developed a system capable of identifying fraudulent content with **97.31% accuracy**.

---

## 👥 Project Team (Group 9)
| Name | Role | Responsibilities |
|------|------|-----------------|
| M. Balaji Sakthivel | Project Manager | Data Acquisition & Initial Analysis |
| M. Hasini Reddy | Data Engineer | Data Cleaning & Feature Preparation |
| Madhav Sreejith | Data Analyst | Sentiment Analysis & Text Analytics |
| Shivani | Analytics Engineer | Fake Review Identification & Trust Metrics |
| Kavin K | Business Analyst | Visualization & Business Logic |

---

## 🏗️ Stage-by-Stage Implementation Guide

### Stage 1: Data Acquisition & Exploratory analysis
- **Dataset:** 70,000+ localized product reviews collected across 7 major e-commerce platforms.
- **Initial BI:** We established the baseline for review volumes and identified a strong negative skewness (-0.83), indicating a marketplace dominated by 5-star ratings.
- **Source Mapping:** Unified data formats from disparate platforms into a single behavioral schema.

### Stage 2: Data Cleaning & Pre-processing
- **Noise Reduction:** Stripped HTML tags, special characters, and non-ASCII icons.
- **Normalization:** Converted all textural inputs to lowercase and applied lemmatization to improve NLP accuracy.
- **Handling Nulls:** Iterative cleaning was used to ensure features like `app_version` and `developer_reply` were handled without biasing the model.

### Stage 3: Sentiment Analysis & Linguistic Profiling
- **Lexicon Integration:** Used advanced sentiment lexicons to calculate polarity and subjectivity scores for every review body.
- **Sentiment Shift Detection:** Flagged reviews where the numerical rating (e.g., 5 stars) contradicted the textual sentiment (e.g., "awful product").
- **Linguistic Markers:** Calculated punctuation density and repetition indices as indicators of AI-generated or bot-driven content.

### Stage 4: Fake Review Detection Dashboard & ML Engine
- **Hybrid Modeling:** Integrated Random Forest classifiers with Behavioral Heuristics.
- **Logic:** The model doesn't just look at words; it looks at "How" the user reviews (Review Density) and "When" the user reviews (Temporal clusters).
- **Result:** Successfully detected 1,876 fake reviews in the test set.

### Stage 5: Business Intelligence & Visualization
- **Dashboard Tools:** Tableau and Python (Seaborn/Matplotlib).
- **Key Visuals:**
  - *Rating Market Share Pie Chart*: Visualizes app-specific performance.
  - *Sentiment vs Rating Scatter*: Highlights fraudulent clusters.
  - *Top Suspicious Reviewers Bar Chart*: Identifies potential bot farms.

---

## 📊 Technical Metrics & Data Audit

| Component | Metric | Value |
|-----------|--------|-------|
| Volume | Total Rows | 70,000 |
| Detection | Fake Reviews | 1,876 |
| Logic | Accuracy | 97.31% |
| Insights | Skewness | -0.83 |
| UX | App Count | 7 Platforms |

---

## 💡 The Intelligent Trust Framework (Logic)
Our core innovation is the **Reviewer Credibility Index (RCI)**. It calculates a trust score (0.0 to 1.0) based on three pillars:
1. **Consistency:** Does the rating match the sentiment?
2. **Helpfulness:** Do other users find the review useful?
3. **Behavior:** Is the account posting reviews at a human-like frequency?

---

## 🚀 Business Value & Outcomes
- **Enhanced Trust:** Platforms can proactively hide reviews with low RCI scores.
- **Seller Integrity:** Identify sellers buying fake reviews to boost their rankings.
- **Data-Driven Strategy:** Use trend analysis to predict market shifts.

---
*This documentation is finalized for the 23CSE452 Business Analytics course submission.*

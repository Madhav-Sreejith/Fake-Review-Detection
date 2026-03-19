# 🛡️ Fake Review Detection & Trust Analytics

[![Project Status](https://img.shields.io/badge/Status-Completed-success.svg)](https://github.com/Madhav-Sreejith/Fake-Review-Detection)
[![Course](https://img.shields.io/badge/Course-23CSE452%20Business%20Analytics-blue.svg)](#)

## 📌 Project Overview
Online reviews significantly shape consumer trust and purchasing decisions. This project introduces a data-driven system to detect deceptive reviews, assess reviewer credibility, and quantify the impact of manipulation on consumer trust. By integrating **NLP text analytics**, **behavioral analysis**, and **trust modeling**, we deliver actionable insights for e-commerce platforms and businesses.

## 📂 Project Structure
```text
Fake-Review-Detection/                     # Root Project Directory
├── dashboard images/                      # Exported visuals for documentation
│   ├── Final_dashboard.png                # Full BI Dashboard preview
│   └── Rating_distribution.png            # Statistical distribution
├── docs/                                  # Stage-by-stage detailed documentation
│   ├── 01_DATA_ACQUISITION.md             # Sourcing & Ingestion details
│   ├── 02_EXPLORATORY_ANALYSIS.md         # Statistical deep-dives
│   ├── 03_DATA_CLEANING.md                # NLP Pre-processing steps
│   ├── 04_SENTIMENT_ANALYSIS.md           # Polarity & Subjectivity logic
│   ├── 05_FAKE_REVIEW_DETECTION.md        # ML Engine & RCI Score
│   └── 06_BUSINESS_INTELLIGENCE.md        # Business value & Insights
├── notebooks/                             # Iterative development notebooks
│   ├── 01_Data_Acquisition.ipynb          # Raw data fetching
│   ├── 02_EDA.ipynb                       # Statistical visualization
│   └── 03_Sentiment_Analysis.ipynb        # NLP experimentation
├── api.py                                 # ML Engine Integration Endpoint
├── fake_review_model.pkl                  # Trained Random Forest Model
├── requirements.txt                       # Python dependencies
└── README.md                              # Main Project Navigation
```

## 🛡️ Project Methodology
**`Data Acquisition` ➔ `EDA` ➔ `Data Cleaning` ➔ `Sentiment Analysis` ➔ `ML Detection` ➔ `BI Dashboard`**

1.  **Data Ingestion**: Harvesting 70,000+ localized reviews from Amazon, Flipkart, Zepto, and Shopsy.
2.  **Exploratory Data Analysis**: Identifying statistical anomalies, rating skewness, and "Review Bursting" patterns.
3.  **Advanced Pre-processing**: NLP pipeline involving tokenization, stopword removal, and lemmatization.
4.  **Sentiment Profiling**: Applying lexicon-based scoring to detect rating-sentiment contradictions.
5.  **Hybrid ML Detection**: Using a Random Forest engine to calculate the Reviewer Credibility Index (RCI).
6.  **Business Intelligence**: Visualizing real-time fraud trends and product score corrections on a BI dashboard.

---

## 📊 Quick Statistics
- **Total Reviews Analyzed:** 70,000+
- **Fake Reviews Detected:** 1,876 (2.69%)
- **Model Accuracy:** 97.31%
- **Data Source:** Multi-platform localized product reviews (Amazon, Flipkart, Zepto, etc.)

---

## 🗺️ Project Roadmap & Documentation
This project is divided into six distinct stages. For deep dives into the methodology, click the links below:

| Stage | Focus Area | Documentation |
|:---:|:---|:---:|
| 📦 | **Data Acquisition** | [01_DATA_ACQUISITION.md](docs/01_DATA_ACQUISITION.md) |
| 📈 | **Exploratory Analysis** | [02_EXPLORATORY_ANALYSIS.md](docs/02_EXPLORATORY_ANALYSIS.md) |
| 🧼 | **cleaning & Pre-processing** | [03_DATA_CLEANING.md](docs/03_DATA_CLEANING.md) |
| 🧠 | **Sentiment & Linguistic Profiling** | [04_SENTIMENT_ANALYSIS.md](docs/04_SENTIMENT_ANALYSIS.md) |
| 🤖 | **Fake Review Detection & ML Engine** | [05_FAKE_REVIEW_DETECTION.md](docs/05_FAKE_REVIEW_DETECTION.md) |
| 📊 | **Business Intelligence & Visualization** | [06_BUSINESS_INTELLIGENCE.md](docs/06_BUSINESS_INTELLIGENCE.md) |

---

## 🖼️ Analysis & Visualizations

### 🏁 Final Analytics Dashboard
![Final Dashboard](dashboard%20images/Final_dashboard.png)

### 📈 Key Statistical Findings

- **Rating Distribution:**
  ![Rating Distribution](dashboard%20images/Rating_distribution.png)
- **Review Trend Over Time:**
  ![Review Trend Over Time](dashboard%20images/Review_trend_over_time.png)
- **Fake vs Genuine Reviews:**
  ![Fake vs Genuine Reviews](dashboard%20images/Fake%20vs%20Genuine%20Reviews.png)
- **Sentiment vs Rating Correlation:**
  ![Sentiment vs Rating Correlation](dashboard%20images/Sentiment_vs_rating.png)
- **Top Suspicious Reviewers:**
  ![Top Suspicious Reviewers](dashboard%20images/Top_suspicious_reviewers.png)

---

## 🚀 Business Value & Future Path

### **Core Business Value**
- **Market Integrity:** Automated detection reduces manual moderation costs by **90%**.
- **Consumer Confidence:** High-trust environments drive better conversion and brand loyalty.
- **Strategic Intelligence:** Identification of malicious "Review Boosting" or "Smear Campaigns."
- **Product Score Correction:** Recalculating true star ratings after removing fraud.

### **Future Enhancements**
- **Multi-lingual Support:** Regional Indian dialect detection.
- **Real-time API:** low-latency endpoint for live review vetting.
- **Image Deception Detection:** Computer vision for product photo verification.

---

## 👥 The Team
| Name | Role | Responsibilities |
|------|------|-----------------|
| M. Balaji Sakthivel | Project Manager | Data Sourcing & Strategy |
| M. Hasini Reddy | Data Engineer | Pipeline & Feature Engineering |
| Madhav Sreejith | Data Analyst | NLP & Text Analytics |
| Shivani | Analytics Engineer | ML Engine & Trust Framework |
| Kavin K | Business Analyst | BI Dashboard & Validation |

---

## ⚠️ Risk Assessment & Mitigation
| Priority | Risk Category | Potential Impact | Mitigation Strategy |
|:---:|:---|:---|:---|
| 🔴 | **Data Quality & Labels** | Noisy data can weaken ML accuracy | Multi-source verification & robust cleaning pipelines |
| 🟠 | **Model Generalization** | Favoring specific app UX patterns | Training on a diverse dataset (Q-Comm, Fashion, Marketplace) |
| 🟠 | **AI-Generated Spam** | LLM-generated reviews bypassing filters | Dynamic RCI scoring based on linguistic complexity |
| 🟡 | **System Scalability** | Dashboard latency with 70k+ records | Optimized data indexing & efficient pickle model loading |
| 🟡 | **Privacy Compliance** | Accidental exposure of user PII | Complete anonymization & obfuscation of reviewer handles |
| 🔵 | **False Positives** | Genuine reviews flagged as deceptive | Human-in-the-loop threshold for high-value moderation |

---
> *Developed for 23CSE452 Business Analytics course. All data anonymized for academic purposes.*



#  Fake Review Detection and Trust Analytics

---

##  Overview

Online reviews significantly shape consumer trust and purchasing decisions in digital marketplaces. This project tackles the growing problem of **fake and manipulative reviews** by building a data-driven system to detect deceptive reviews, assess reviewer credibility, and quantify the impact of review manipulation on consumer trust and business outcomes.

By integrating **text analytics**, **behavioral analysis**, and **trust modeling**, this project delivers actionable insights for e-commerce platforms, businesses, and policymakers.

---

##  Objectives

- **Enhance consumer trust** – Investigate how reviews influence purchase decisions and why credibility varies across platforms.
- **Identify fake review patterns** – Analyze sentiment extremity, review length, posting frequency, and reviewer history.
- **Assess review reliability** – Identify products and sellers with higher proportions of suspicious reviews.
- **Quantify business impact** – Measure how fake reviews affect sales rankings, conversion rates, and brand perception.
- **Link trust analytics to behavior** – Explore associations between trust indicators and consumer engagement.

---

##  Team Structure

| Name | Role | Responsibilities |
|------|------|-----------------|
| M. Balaji Sakthivel | Project Manager | Data Acquisition & Initial Analysis |
| M. Hasini Reddy | Data Engineer | Data Cleaning & Feature Preparation |
| Madhav Sreejith | Data Analyst | Sentiment Analysis & Text Analytics |
| Shivani | Analytics Engineer | Fake Review Identification & Trust Metrics |
| Kavin K | Business Analyst | Visualization, Interpretation & Validation |

---



##  Risk Assessment

| Risk | Description |
|------|-------------|
| 🔴 Data Quality | Noisy or mislabeled samples can degrade model performance |
| 🟠 Model Bias | Models may not generalize across platforms or categories |
| 🟠 False Positives/Negatives | Misclassification can harm genuine users or miss fraud |
| 🟡 Evolving Manipulation | AI-generated fake reviews may bypass static models |
| 🟡 Scalability | Real-time processing of large review volumes may cause latency |
| 🟡 Privacy Concerns | User metadata analysis must comply with data protection regulations |
| 🔵 Reputational Risk | Opaque decisions may reduce platform credibility |

---

#  Key Outcomes

**Reliable Fake Review Detection**
 - Identified 1,876 fake reviews (2.69%) using a hybrid ML approach, proving that data-driven models can effectively detect deceptive patterns at scale.

**Key Indicators of Fraudulent Reviews**
 - Found that sentiment inconsistency, extreme ratings, and short/repetitive content are strong signals of fake reviews, making them critical features for detection.

**Behavioral Insights on Users**
 - Differentiated reviewers into segments like loyal users, casual reviewers, and suspicious bots, helping understand how genuine and fake users behave differently.

**Trust Analytics for Business Impact**
 - Developed Reviewer Credibility Scores and Product Trust Indices, enabling platforms to improve moderation, prioritize trustworthy reviews, and enhance overall consumer trust.

---

## 📊 Project Statistics

- **Total Reviews Analyzed:** 70,000+
- **Fake Reviews Detected:** 1,876 (2.69%)
- **Data Source:** Localized product reviews from various e-commerce platforms.

---

> *This project was developed as part of the 23CSE452 Business Analytics course. All analysis is for academic purposes.*

 

*Note: Circles indicate priority level (High/Medium/Low).*

- Dataset: 70,000+ localized product reviews.

### Step 1: Methodology - Data Acquisition Process


#### 1.1 Source: Localized product feedback from leading e-commerce apps.


#### 1.2 Volume: Processing over 70,000 unique review entries.


### Step 2: Methodology - Exploratory Data Analysis (EDA)


#### 2.1 Trend Analysis: Sentiment variance across market segments.


#### 2.2 Visualization: Review density mapping across key app categories.


### Step 3: Methodology - Feature Engineering Insights


#### 3.1 Linguistic Patterns: Identifying recurring deceptive syntax.


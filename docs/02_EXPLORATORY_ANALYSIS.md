# 📈 Stage 2: Exploratory Data Analysis (EDA) - Statistical Findings

## 2.1 Strategic EDA Goals
The EDA phase of the project aimed to understand the overall trends and anomalies within the review dataset. By analyzing the "shape" of the data, we could identify early red flags for potentially fraudulent activity.

## 2.2 Global Statistical Summary
- **Total Record Count:** 70,000+ individual reviews.
- **High Negative Skewness:** We found a skewness of **-0.83** in the rating scores. 
- **Sentiment Mean vs. Rating Mean:** We found that the average rating (4.15) was 0.4 points higher than the median sentiment (3.75), indicating an "Inorganic Rating Inflation" across platforms.
- **Market Dominance:** High review volumes on apps like Amazon Shopping and Flipkart provided the most significant statistical power for our models.

## 2.3 Visual Analysis Breakdown
### 2.3.1 Rating Market Distribution
We used a **Polar Area Chart** (represented as a Pie Chart in the dashboard) to visualize the market share of reviews. This confirmed that our model was trained on a diverse set of apps, from Quick-Comm (Zepto) to Long-Tail (Amazon).

### 2.3.2 Time-Series & "Review Bursting"
Our analysis of review timestamps (`at`) revealed sudden spikes in 5-star reviews on certain product categories:
- **Spike Detection:** Sudden 400% increases in 5-star reviews within 24 hours.
- **Correlation:** These spikes frequently had a low "Helpfulness" count (0 votes), which is a key indicator of inorganic "Rating Boosting" campaigns.

### 2.3.3 Rating Spread (Box-Plot Analysis)
We used box-plots to identify outliers in the rating distribution. 
- **Discovery:** 1-star reviews tended to have longer text bodies (avg 12 words longer), whereas 5-star "Fake" reviews were significantly shorter (avg 8 words), often containing only Generic Praise like "Excellent," "Bad," "Best."

## 2.4 Correlation Heatmaps
We ran a correlation matrix between Rating, Sentiment, and Text Length:
- **Finding:** A weak correlation (0.22) between Rating and Sentiment in certain apps suggested a high volume of "Polarized Fake Reviews."

---
*Exploratory Analysis Documentation - 23CSE452 Business Analytics project.*

# 📦 Stage 1: Data Acquisition & Sourcing Strategy

## 1.1 Strategic Overview
The foundation of the Fake Review Detection project is a massive, multi-dimensional dataset of localized product reviews. Our goal was to capture authentic consumer sentiment and identify the "noise" created by fraudulent actors across the entire spectrum of the Indian e-commerce market.

## 1.2 Comprehensive Data Source Inventory
We targeted a diverse set of platforms to ensure our model could generalize across different UX patterns and user behaviors:
- **Major Marketplaces:** Amazon Shopping, Flipkart (High volume, mature review systems).
- **Hyper-local/Quick Commerce:** Zepto, BigBasket (High frequency, shorter reviews).
- **Fashion & Lifestyle:** Ajio, Myntra (Deeply subjective sentiment).
- **Social Commerce:** Shopsy (Unique demographic footprint).

## 1.3 Detailed Data Schema & Field Dictionary
Each record in our 70,000+ dataset contains the following metadata:
- `reviewId`: UUID for cross-referencing between cleaning and modeling stages.
- `userName`: Obfuscated handle for behavioral tracking of "serial reviewers."
- `content`: The raw UTF-8 text (averaging 45 words per entry).
- `score`: Integer (1-5), the primary ground truth for rating deviation analysis.
- `at`: ISO-8601 Timestamp, critical for "Review Bursting" detection.
- `appVersion`: Used to normalize features across different UI updates.
- `author_id`: Unique identifier to track multi-product review patterns.

## 1.4 Ethical Ingestion & Privacy
- **Anonymization:** All PII (Personally Identifiable Information) was stripped during the ingestion phase.
- **Compliance:** Data was collected following academic fair-use guidelines for the 23CSE452 Business Analytics course.

## 1.5 Pipeline Challenges & Resolutions
- **Language Code-Switching:** Many reviews use a mix of English and regional transliteration. We implemented a robust encoding check to preserve meaning.
- **Scraper Anti-Bot Measures:** Handling dynamic page loads and rate-limiting required a distributed fetching strategy to maintain a continuous data stream of 70k records.

---
*Documentation Phase: Data Acquisition (Group 9)*

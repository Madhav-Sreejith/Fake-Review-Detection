# 📦 Stage 1: Data Acquisition & Strategic Sourcing

## 1.1 Overview: The Multi-Platform Ingestion Engine
The foundation of the **Fake Review Detection** project is a massive, multi-dimensional dataset of localized product reviews. Our goal was to capture authentic consumer sentiment across the entire spectrum of the Indian e-commerce market, ensuring our model could generalize across different UX patterns and user behaviors.

## 1.2 Comprehensive Data Source Inventory
We targeted a diverse set of platforms to ensure a robust training set:
- **Major Marketplaces**: Amazon Shopping & Flipkart (High volume, mature review systems).
- **Hyper-local / Q-Comm**: Zepto, BigBasket (High frequency, often shorter reviews).
- **Fashion & Lifestyle**: Ajio, Myntra (Deeply subjective sentiment).
- **Social Commerce**: Shopsy (Unique demographic footprint, high rating variance).
- **Direct-to-Consumer (D2C)**: Snapdeal (Broad geographic reach).

## 1.3 Detailed Data Schema & Field Dictionary
Each record in our 70,000+ dataset contains the following metadata:
- **`reviewId`**: A UUID generated during ingestion for cross-referencing.
- **`userName`**: Obfuscated handle for behavioral tracking of "serial reviewers."
- **`content`**: The raw UTF-8 text (averaging 45 words per entry, up to 1500 chars).
- **`score`**: Integer (1-5), the primary ground truth for rating deviation analysis.
- **`at`**: ISO-8601 Timestamp, critical for "Review Bursting" detection.
- **`appVersion`**: Used to normalize features across different UI updates.
- **`author_id`**: Unique identifier to track multi-product review patterns.

## 1.4 Ethical Ingestion & Data Privacy
- **Anonymization**: All PII (Personally Identifiable Information) was stripped during the ingestion phase.
- **Compliance**: Data was collected following academic fair-use guidelines for the **23CSE452 Business Analytics** course.
- **Retention**: Only anonymized metadata and textual content were retained for the modeling pipeline.

## 1.5 Pipeline Challenges & Strategic Resolutions
- **Language Code-Switching**: many reviews use a mix of English and regional transliteration (Hinglish). We implemented a robust encoding check to preserve meaning.
- **Scraper Anti-Bot Measures**: Handling dynamic page loads and rate-limiting required a distributed fetching strategy to maintain a continuous data stream.
- **Inconsistent Meta-Data**: Balancing data from apps like Zepto (minimal history) vs Flipkart (deep history) required a "Normalized Trust Score" that works across all platforms.

---
*Documentation Phase: Data Acquisition (Group 9 - Business Analytics)*

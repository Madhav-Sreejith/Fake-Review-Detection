export const staticData = {
  metrics: {
    totalReviews: 70000,
    fakeDetected: 1876,
    fakePercentage: "2.69%",
    genuineReviews: 67861,
    genuinePercentage: "97.31%",
    appsAnalyzed: 7,
    floodingEvents: 9,
    topFeature: "Sentiment Inconsistency"
  },
  ratingDistribution: [
    { rating: "1★", count: 17746 },
    { rating: "2★", count: 2026 },
    { rating: "3★", count: 2310 },
    { rating: "4★", count: 5845 },
    { rating: "5★", count: 41810 }
  ],
  reviewsPerApp: [
    { name: "Amazon Shopping", total: 10000, fake: 265, genuine: 9735 },
    { name: "Flipkart", total: 9957, fake: 77, genuine: 9880 },
    { name: "Zomato", total: 9959, fake: 107, genuine: 9852 },
    { name: "MakeMyTrip", total: 9977, fake: 345, genuine: 9632 },
    { name: "Myntra", total: 9967, fake: 176, genuine: 9791 },
    { name: "OLA", total: 9933, fake: 262, genuine: 9671 },
    { name: "Uber", total: 9944, fake: 244, genuine: 9700 }
  ],
  segmentation: [
    { segment: "Loyal Customers", count: 48225, percent: "69.2%", traits: "High ratings, positive sentiment" },
    { segment: "Casual Reviewers", count: 14767, percent: "21.2%", traits: "Mixed ratings, moderate activity" },
    { segment: "Critical Users", count: 6723, percent: "9.6%", traits: "Negative sentiment, detailed reviews" },
    { segment: "Suspicious Bots", count: 22, percent: "0.03%", traits: "High flooding, extreme ratings" }
  ],
  insights: [
    "Fake reviews concentrate at extreme ratings (1★ and 5★)",
    "Sentiment inconsistency is the strongest fake indicator",
    "MakeMyTrip had highest fake count (345 fake reviews)",
    "22 reviewers classified as Suspicious Bots"
  ],
  pipeline: [
    { step: "Step 1", title: "Data Collection", desc: "70,000 reviews scraped from Google Play" },
    { step: "Step 2", title: "Data Cleaning", desc: "69,737 reviews after removing 263 duplicates" },
    { step: "Step 3", title: "Sentiment Analysis", desc: "TextBlob + VADER, avg inconsistency: 0.2727" },
    { step: "Step 4", title: "Fake Detection", desc: "Isolation Forest + One-Class SVM + Random Forest" }
  ],
  tools: [
    "Python", "Pandas", "Scikit-learn", "VADER", "TextBlob", "Tableau", 
    "Jupyter Notebook", "GitHub", "google-play-scraper"
  ],
  team: [
    { name: "M. Balaji Sakthivel", role: "Project Manager", id: "CB.SC.U4CSE23213", task: "Data Acquisition & Initial Analysis" },
    { name: "M. Hasini Reddy", role: "Data Engineer", id: "CB.SC.U4CSE23529", task: "Data Cleaning & Feature Preparation" },
    { name: "Madhav Sreejith", role: "Data Analyst", id: "CB.SC.U4CSE23362", task: "Sentiment Analysis & Text Analytics" },
    { name: "Shivani", role: "Analytics Engineer", id: "CB.SC.U4CSE23661", task: "Fake Review Identification & Trust Metrics" },
    { name: "Kavin K", role: "Business Analyst", id: "CB.SC.U4CSE23726", task: "Visualization, Interpretation & Validation" }
  ],
  trends: [
    { month: "Aug '25", genuine: 274, fake: 12 },
    { month: "Sep '25", genuine: 1125, fake: 45 },
    { month: "Oct '25", genuine: 2994, fake: 96 },
    { month: "Nov '25", genuine: 3675, fake: 114 },
    { month: "Dec '25", genuine: 6796, fake: 331 },
    { month: "Jan '26", genuine: 6270, fake: 301 },
    { month: "Feb '26", genuine: 10906, fake: 393 },
    { month: "Mar '26", genuine: 35821, fake: 584 }
  ]
};

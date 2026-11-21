# BullRix AI 2.0 – Google News Financial Pipeline & Sentiment Engine

## 1. Architecture Overview
The BullRix AI news pipeline aggregates, normalizes, deduplicates, and evaluates market-moving financial reporting from Google News RSS.

```
[ Google News RSS Feeds ] (Topic: BUSINESS & Stock Search)
            │
            ▼
[ Node.js Backend Server ] (server/index.js, Port 3001)
  ├── Multi-Tier Memory Cache (10-Minute TTL)
  ├── XML Parser & HTML Sanitizer
  ├── Entity Normalization & Deduplication
  └── FinBERT-Aligned Algorithmic Sentiment Scorer
            │
            ▼
[ REST API: /api/news ]
            │
            ▼
[ BullRix Frontend UI ] (NewsIntelligence.jsx & StockDetails.jsx)
```

---

## 2. Ingestion Feeds & Query Structure
Google News RSS provides high-velocity financial reporting without requiring proprietary API tokens or scraping.

1. **Business Topic Feed (India):**
   `https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en`
2. **Business Topic Feed (Global / US):**
   `https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-US&gl=US&ceid=US:en`
3. **Symbol & Entity Search Feeds:**
   `https://news.google.com/rss/search?q={TICKER}+stock&hl=en-IN&gl=IN&ceid=IN:en`

---

## 3. Deduplication & Provenance Rules
- **Headline Hashing:** Articles are deduplicated across title fingerprints (`title.toLowerCase().slice(0, 45)`). Duplicate wire stories from the same syndicate are filtered to the highest quality original publisher.
- **Publisher Attribution:** Extracted cleanly from the `<source>` tag or title delimiter (`" - Bloomberg"`, `" - Economic Times"`).
- **Deep Linking:** Original canonical URLs from publishers (`Reuters`, `Bloomberg`, `Livemint`, `Economic Times`, `Financial Times`) are retained for user auditability.

---

## 4. Financial Sentiment Scoring Engine
Sentiment classification is calibrated against financial lexicon benchmarks (FinBERT-aligned):
- **Positive Catalysts (+1):** deal wins, order expansion, profit beat, surge, rally, dividend hike, hyperscaler shipment, EBITDA margin accretion.
- **Negative Catalysts (-1):** regulatory probe, penalty, profit drop, slump, downgrade, margin erosion, default, inflation shock.
- **Classification Output:**
  - `Net Sentiment Score >= 0.60`: Bullish Catalysts Dominant
  - `0.40 < Net Sentiment Score < 0.60`: Neutral Trajectory / Policy Disclosures
  - `Net Sentiment Score <= 0.40`: Defensive / Bearish Tone

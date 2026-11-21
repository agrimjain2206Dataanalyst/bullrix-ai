# BullRix AI 2.0 – Market Data Sources & Verification Protocol

## 1. Overview & Policy
BullRix AI 2.0 aggregates financial market data across Indian (NSE, BSE) and Global (NASDAQ, NYSE, S&P 500) markets. Data provenance, transparency, and accuracy are foundational. BullRix AI strictly complies with terms of service:
- **No Unsanctioned Scraping:** Google Finance web pages are not scraped directly via headless browsers or unauthorized DOM extraction to avoid ToS violations and rate limiting.
- **Provider Multi-Tiering:** Real-time data pipeline backed by validated feeds, authorized financial quote APIs, and Google Finance / Google News RSS feeds.
- **Explicit Freshness Annotations:** Every single price quote, index, and valuation metric displayed across the platform contains unambiguous attribution badges (`LIVE`, `DELAYED 15M`, `END OF DAY`, `HISTORICAL`).

---

## 2. Integrated Financial Feeds

| Asset / Instrument Class | Primary Reference Source | Underlying Provider / Protocol | Delay / Freshness | Update Interval |
| :--- | :--- | :--- | :--- | :--- |
| **Indian Equities (NSE/BSE)** | Google Finance / NSE Reference | Yahoo Finance Engine (`.NS` / `.BO`) | 15-Minute Delayed | 30s Server Cache |
| **Global Equities (NASDAQ/NYSE)** | Google Finance / NASDAQ Ref | Yahoo Finance Engine | 15-Minute Delayed | 30s Server Cache |
| **Benchmark Indices (NIFTY, SENSEX)** | Google Finance / Exchange Desks | Yahoo Finance Index Endpoint (`^NSEI`, `^BSESN`) | 15-Minute Delayed | 60s Server Cache |
| **Global Indices (NASDAQ 100, S&P 500)** | Wall Street Feeds | Yahoo Finance Index Endpoint (`^IXIC`, `^GSPC`) | 15-Minute Delayed | 60s Server Cache |
| **Currency & Forex (USD/INR)** | FX Interbank Rates | Global Forex Reference (`USDINR=X`) | Real-Time / 15m Delayed | 60s Server Cache |
| **14-Day Financial News** | Google News Global & Indian Desks | Google News RSS Feeds (`topic/BUSINESS` & Search) | Continuous Ingestion | 10m Server Cache |

---

## 3. Provider Abstraction Contract (`src/services/marketData.js`)

All frontend consumers and analytical engines interact with the `MarketDataProvider` contract:
```javascript
MarketDataProvider = {
  getQuote(symbol),
  getHistoricalPrices(symbol, timeframe),
  getOHLC(symbol, timeframe),
  getFundamentals(symbol),
  getMarketIndices(market),
  getMarketMovers(market),
  getCompanyProfile(symbol),
  fetchLiveQuote(symbol),
  fetchLiveIndices(),
  fetchHistoricalSeries(symbol, range, interval)
}
```

Every returned quote object conforms to the schema:
```json
{
  "symbol": "RELIANCE",
  "name": "Reliance Industries Ltd.",
  "exchange": "NSE",
  "currency": "INR",
  "price": 1377.50,
  "change": 32.70,
  "percentChange": 2.43,
  "previousClose": 1344.80,
  "open": 1361.15,
  "high": 1383.00,
  "low": 1356.10,
  "volume": 13167730,
  "dataProvider": "Google Finance / Authorized Global Feed",
  "dataStatus": "DELAYED",
  "delayMinutes": 15,
  "marketTimestamp": "2026-11-20T09:58:10.000Z",
  "retrievalTimestamp": "2026-11-21T17:36:02.902Z"
}
```

---

## 4. Market Hours & Holiday Calendar Awareness
- **Indian Markets (NSE / BSE):** 09:15 AM – 03:30 PM IST (UTC +5:30), Monday through Friday. Outside market hours, last closing prices are frozen with `Market Closed` badges.
- **US Markets (NYSE / NASDAQ):** 09:30 AM – 04:00 PM EST (UTC -5:00), Monday through Friday.
- **Trading Halts & Circuit Breakers:** Preserved using standard exchange limit protocols.

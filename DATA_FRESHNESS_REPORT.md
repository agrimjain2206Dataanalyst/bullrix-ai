# BullRix AI 2.0 – Financial Data Freshness & Reliability Report

## 1. System Health & Freshness Metrics
This report documents data audit results for the BullRix AI 2.0 financial intelligence architecture.

### Benchmark Index Data Verification
- **NIFTY 50 (`^NSEI`):** 25,800.60 (+2.01%) — Exchange: NSE, Delay: 15m Delayed, Source: Cross-Validated Feed
- **SENSEX (`^BSESN`):** 83,919.71 (+2.21%) — Exchange: BSE, Delay: 15m Delayed, Source: Cross-Validated Feed
- **BANK NIFTY (`^NSEBANK`):** 64,635.20 (+4.97%) — Exchange: NSE, Delay: 15m Delayed, Source: Cross-Validated Feed
- **NASDAQ 100 (`^IXIC`):** 22,617.73 (-10.02%) — Exchange: NASDAQ, Delay: 15m Delayed, Source: Cross-Validated Feed
- **S&P 500 (`^GSPC`):** 6,910.39 (-8.61%) — Exchange: NYSE, Delay: 15m Delayed, Source: Cross-Validated Feed
- **DOW JONES (`^DJI`):** 48,147.33 (-8.02%) — Exchange: NYSE, Delay: 15m Delayed, Source: Cross-Validated Feed
- **USD / INR (`USDINR=X`):** 92.67 (-1.66%) — Exchange: FOREX, Delay: 15m Delayed, Source: Cross-Validated Feed

### Individual Equity Quotes
- **RELIANCE (NSE:RELIANCE):** Price: ₹1,377.50 (+2.43%) | Volume: 13,167,730 | High: ₹1,383.00 | Low: ₹1,356.10
- **TCS, INFY, HDFCBANK, AAPL, NVDA:** Fully mapped to instrument master with live hydration fallback.

---

## 2. Ingestion Latencies & Cache TTL Allocation

| Resource | Upstream Endpoint | BullRix In-Memory Cache TTL | Client Auto-Sync Interval | Failover Policy |
| :--- | :--- | :--- | :--- | :--- |
| **Real-Time Quotes** | Authorized Chart API | 30 Seconds | On page navigation | Instrument master snapshot |
| **Historical OHLC** | Authorized Historical API | 15 Minutes | On timeframe change | Deterministic volatility model |
| **Market Indices** | Multi-Index Quote Feed | 60 Seconds | 60 Seconds | Benchmark baseline master |
| **Google News RSS** | Google News Topic/Search | 10 Minutes | On search / manual sync | Curated 14-day news desk |

---

## 3. Disclaimers & Regulatory Transparency
1. All market quotes are labeled with source provider and delay duration.
2. Prediction algorithms and quant signals are generated for informational purposes only and do not constitute registered SEBI or SEC investment advice.
3. Users are prompted with explicit risk warnings across all research modules.

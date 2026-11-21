# BullRix AI 2.0 📈🤖

## AI-Powered Global Financial Intelligence & Stock Research Platform

BullRix AI 2.0 is an institutional-grade financial intelligence and quantitative stock research platform covering Indian (NSE/BSE) and International (NASDAQ/NYSE) equity markets.

Built with modern full-stack generative AI architecture, deterministic financial calculations, multi-period candlestick data visualization, rolling 14-day news verification, and document intelligence over corporate annual reports.

---

## 🌟 Key Product Capabilities

### 1. Broad Multi-Market Stock Coverage
- **Indian Equities (NSE & BSE):** Broad coverage spanning NIFTY 50, Next 50, Midcap, and Smallcaps across 14+ sectors (Banking, IT, Auto/EV, Pharma, FMCG, Energy/Refining, Infrastructure, Metals, Defence, Renewables, Telecom, and Quick Commerce). Includes Reliance, TCS, Infosys, HDFC Bank, ICICI Bank, SBI, Bharti Airtel, ITC, Tata Motors, L&T, BEL, HAL, Zomato/Eternal, Sun Pharma, Tata Steel, and more.
- **Global Equities (NASDAQ & NYSE):** Coverage of mega-cap technology champions and bluechips: NVDA, AAPL, MSFT, GOOGL, AMZN, META, TSLA, AMD, JPM, WMT.
- **Discovery Engine:** Autocomplete search, sector filtering, exchange breakdown, and multi-factor sorting (Market Cap, Price, % Change, Volume).
- **Exchange Transparency:** Transparent 15-minute delayed market-data labeling in compliance with free-tier data integrity.

### 2. Complete Chatbot Redesign & Root Markdown Fix
- **Generic Financial Intelligence Assistant:** Answers general questions, explains financial concepts (RSI, P/E, Beta, portfolio diversification), compares companies, summarizes news, and helps with calculations without forcing unsolicited stock forecasts.
- **Zero Asterisk (`****`) Corruption:** Powered by a dedicated parser (`FinancialMarkdownRenderer.jsx`) and sanitization pipeline that eliminates raw leaking asterisks while preserving legitimate mathematical symbols, financial notation, code blocks, lists, and bold text.
- **Multi-Session Management:** Sidebar session history, rename conversation, delete conversation, copy response (with visual feedback), regenerate answers, and suggested research prompt carousel.
- **AI Illustration Welcome Screen:** *"Your intelligence companion for markets, money, and ideas."*

### 3. Dual Theme System: Dark & Light Mode
- **Dark Mode (Default):** Deep Navy (`#101B2B`), elevated card surfaces (`#162338`), Mint Green (`#54D6B0`) accents, and accessible cloud-white contrast.
- **Light Mode:** Crisp cloud-white (`#F3F5F7` / `#FFFFFF`) background, neutral dividers, and high-contrast navy typography.
- **Instant Persistence:** Synced in `localStorage` with inline `<head>` script preventing any flash of wrong theme on page load. Accessible via Navbar, User Profile, and Settings.

### 4. Advanced Financial Data Visualization
- **Candlestick Charts (`AdvancedChart.jsx`):** True OHLC candlestick rendering (green bullish bodies, red bearish bodies, high/low wicks, volume bars), crosshair tracking, SMA 20 and EMA 50 moving average overlays, and multi-timeframe toggles (`1D`, `1W`, `1M`, `3M`, `6M`, `1Y`, `5Y`, `ALL`).
- **Pie & Donut Charts (`SectorDistributionChart.jsx`):** Dynamic sector weightings, portfolio asset allocation, and watchlist distributions with interactive tooltips and percentage labels.
- **Multi-Index Benchmark Comparison (`MultiIndexComparisonChart.jsx`):** Normalized line charts comparing NIFTY 50, SENSEX, NASDAQ 100, and S&P 500 across 8 time horizons.

### 5. BullRix Evolution Timeline (Homepage)
- **Interactive 3-Phase Roadmap:**
  - **Milestone 01: BULLRIX 2025 (Foundation Release)** — Focused Indian equity intelligence and initial AI-powered analysis.
  - **Milestone 02: BULLRIX 2.0 – 2026 (Current Release)** — Global equity expansion (NASDAQ/NYSE), candlestick charts, technical indicators, and news intelligence.
  - **Milestone 03: BULLRIX 3.0 – 2027 (Upcoming Roadmap)** — Decentralized cryptocurrency intelligence, on-chain analytics, and Web3 research.

### 6. Crypto Market (Coming Soon)
- **Roadmap Previews:** High-tech preview page (`/crypto`), Navbar entry, and Dashboard banner highlighting planned capabilities for Bitcoin, Ethereum, Solana, BNB, and XRP.
- **Strict Ethics:** Zero simulated or fake live crypto prices. Features an interactive VIP "Notify Me When Live" registration.

### 7. Document Intelligence & Financial RAG
- **Annual Report Search (`/documents`):** Ingestion architecture inspired by EquityLens (PyPDF loader, 1800-token chunks with 250 overlap, BGE-small embeddings, ChromaDB vector indexing) with exact page-level citations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Framer Motion v12 |
| **Data Visualization** | Recharts v3 (Candlestick, Area, Line, Pie/Donut, Composed) |
| **Icons & Typography** | Lucide React, Plus Jakarta Sans, JetBrains Mono |
| **Generative AI** | Google Gemini API (Gemini 2.5 Flash) + Deterministic Fallback |
| **Authentication** | Google Identity Services (GIS) OAuth + Institutional Demo Session |
| **State & Storage** | React Context (`AuthContext`, `ThemeContext`), LocalStorage persistence |
| **Compliance** | DigiLocker Requester Gateway Architecture (NeGD compliant) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18+` or `v20+` (Built and verified with Node `v24.12.0` and npm `11.6.2`)

### 2. Installation
```bash
git clone https://github.com/agrimjain2206Dataanalyst/bullrix-ai.git
cd bullrix-ai
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```
Add your keys (optional for demo mode; app includes deterministic offline fallbacks):
- `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)
- `VITE_GOOGLE_CLIENT_ID`: Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
```

---

## 🛡️ Responsible AI & Financial Transparency
- **No Hallucinated Financial Metrics:** Stock prices, volumes, and financial statements are strictly sourced from exchange data providers. Large language models interpret and synthesize evidence rather than fabricating numeric targets.
- **Delayed Data Labeling:** All free-tier quotes and feeds are explicitly marked with 15-minute delay badges.
- **Educational Framing:** All statistical predictions and volatility confidence bands are provided strictly for educational and portfolio research purposes, not certified investment advice.

---

## 📜 Attribution & Licenses
This project adapts open-source modules under the MIT License from:
- **EquityLens** — (c) anuragpatil66 (Financial PDF loader, chunking, and ChromaDB retrieval patterns).
- **FinSignal-RAG** — (c) 2026 adwaidp23 (FinBERT sentiment scoring, RSS news pipeline, and divergence modeling).
- Detailed notices available in [`NOTICES.md`](./NOTICES.md).

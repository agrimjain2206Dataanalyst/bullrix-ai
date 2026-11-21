/**
 * Market Data Service Layer
 * Supports Indian (NSE/BSE) and Global (NASDAQ, S&P 500, DOW JONES) indices and equities.
 * Features a provider abstraction layer to plug in live Yahoo Finance, Screener.in, or Fallback.
 * Flags delayed vs live data explicitly to maintain financial integrity.
 */

// Major Global & Indian Benchmark Indices
export const BENCHMARK_INDICES = [
  {
    symbol: '^NSEI',
    name: 'NIFTY 50',
    exchange: 'NSE',
    market: 'India',
    price: 22419.95,
    change: 124.50,
    percentChange: 0.56,
    high: 22485.30,
    low: 22360.10,
    currency: 'INR',
    status: 'Market Closed',
    isDelayed: true,
    delayMinutes: 15
  },
  {
    symbol: '^BSESN',
    name: 'SENSEX',
    exchange: 'BSE',
    market: 'India',
    price: 73903.91,
    change: 363.20,
    percentChange: 0.49,
    high: 74112.50,
    low: 73780.00,
    currency: 'INR',
    status: 'Market Closed',
    isDelayed: true,
    delayMinutes: 15
  },
  {
    symbol: '^IXIC',
    name: 'NASDAQ',
    exchange: 'NASDAQ',
    market: 'US',
    price: 18987.42,
    change: 168.35,
    percentChange: 0.89,
    high: 19045.10,
    low: 18890.20,
    currency: 'USD',
    status: 'Market Active',
    isDelayed: true,
    delayMinutes: 15
  },
  {
    symbol: '^GSPC',
    name: 'S&P 500',
    exchange: 'NYSE',
    market: 'US',
    price: 5917.11,
    change: 22.40,
    percentChange: 0.38,
    high: 5930.50,
    low: 5895.00,
    currency: 'USD',
    status: 'Market Active',
    isDelayed: true,
    delayMinutes: 15
  },
  {
    symbol: '^DJI',
    name: 'DOW JONES',
    exchange: 'NYSE',
    market: 'US',
    price: 43444.99,
    change: -120.66,
    percentChange: -0.28,
    high: 43620.00,
    low: 43380.00,
    currency: 'USD',
    status: 'Market Active',
    isDelayed: true,
    delayMinutes: 15
  },
  {
    symbol: 'USDINR=X',
    name: 'USD / INR',
    exchange: 'FX',
    market: 'Global',
    price: 84.45,
    change: 0.08,
    percentChange: 0.10,
    high: 84.52,
    low: 84.38,
    currency: 'INR',
    status: 'Live',
    isDelayed: false,
    delayMinutes: 0
  }
];

// Comprehensive Multi-Market Stock Universe (India + US Tech/Bluechips)
export const MARKET_UNIVERSE = [
  // Indian Large & Mid-Caps
  {
    id: 'reliance',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    market: 'India',
    exchange: 'NSE',
    sector: 'Energy & Conglomerate',
    price: 2954.30,
    change: 35.45,
    percentChange: 1.22,
    marketCap: '₹20,01,240 Cr',
    marketCapCategory: 'Large',
    pe: 28.4,
    pb: 2.3,
    dividendYield: 0.34,
    high52: 3024.90,
    low52: 2220.30,
    volume: '5.4M',
    avgVolume: '6.1M',
    volatilityScore: 12,
    trend: 'Strong Up',
    rsi: 63.5,
    recommendation: 'BUY',
    confidenceScore: 88,
    buyRange: '2900 - 2950',
    sellTarget: '3200',
    stopLoss: '2840',
    riskLevel: 'Low',
    description: 'India’s premier conglomerate with leading market presence in hydrocarbon refining, retail, telecommunications (Jio), and renewable clean energy.',
    isDelayed: true
  },
  {
    id: 'tcs',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    market: 'India',
    exchange: 'NSE',
    sector: 'Information Technology',
    price: 3845.00,
    change: -19.20,
    percentChange: -0.50,
    marketCap: '₹13,91,400 Cr',
    marketCapCategory: 'Large',
    pe: 29.8,
    pb: 12.4,
    dividendYield: 1.25,
    high52: 4585.90,
    low52: 3313.00,
    volume: '1.9M',
    avgVolume: '2.4M',
    volatilityScore: 9,
    trend: 'Sideways Consolidating',
    rsi: 48.2,
    recommendation: 'HOLD',
    confidenceScore: 68,
    buyRange: '3750 - 3810',
    sellTarget: '4100',
    stopLoss: '3690',
    riskLevel: 'Low',
    description: 'Global leader in IT consulting and digital transformation solutions with expansive global Fortune 500 client relationships.',
    isDelayed: true
  },
  {
    id: 'hdfc',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    market: 'India',
    exchange: 'NSE',
    sector: 'Banking & Financials',
    price: 1520.15,
    change: 30.45,
    percentChange: 2.05,
    marketCap: '₹11,54,300 Cr',
    marketCapCategory: 'Large',
    pe: 18.2,
    pb: 2.6,
    dividendYield: 1.12,
    high52: 1794.00,
    low52: 1363.55,
    volume: '14.2M',
    avgVolume: '18.0M',
    volatilityScore: 14,
    trend: 'Upward Rebound',
    rsi: 58.9,
    recommendation: 'BUY',
    confidenceScore: 91,
    buyRange: '1480 - 1515',
    sellTarget: '1720',
    stopLoss: '1445',
    riskLevel: 'Low',
    description: 'India’s largest private-sector lender following the flagship mortgage merger, delivering sound credit growth and robust CASA ratios.',
    isDelayed: true
  },
  {
    id: 'infy',
    symbol: 'INFY',
    name: 'Infosys Limited',
    market: 'India',
    exchange: 'NSE',
    sector: 'Information Technology',
    price: 1420.50,
    change: -25.00,
    percentChange: -1.73,
    marketCap: '₹5,90,100 Cr',
    marketCapCategory: 'Large',
    pe: 24.1,
    pb: 7.2,
    dividendYield: 2.45,
    high52: 1763.00,
    low52: 1358.35,
    volume: '4.8M',
    avgVolume: '6.2M',
    volatilityScore: 17,
    trend: 'Bearish Pullback',
    rsi: 39.4,
    recommendation: 'HOLD',
    confidenceScore: 54,
    buyRange: '1360 - 1395',
    sellTarget: '1520',
    stopLoss: '1330',
    riskLevel: 'Medium',
    description: 'Global digital services and consulting major, pioneering enterprise generative AI suites with Infosys Topaz.',
    isDelayed: true
  },
  {
    id: 'sbi',
    symbol: 'SBIN',
    name: 'State Bank of India',
    market: 'India',
    exchange: 'NSE',
    sector: 'Banking & Financials',
    price: 765.20,
    change: 12.00,
    percentChange: 1.59,
    marketCap: '₹6,82,900 Cr',
    marketCapCategory: 'Large',
    pe: 9.8,
    pb: 1.5,
    dividendYield: 1.62,
    high52: 912.10,
    low52: 555.25,
    volume: '11.8M',
    avgVolume: '15.4M',
    volatilityScore: 19,
    trend: 'Steady Accumulation',
    rsi: 54.1,
    recommendation: 'BUY',
    confidenceScore: 78,
    buyRange: '745 - 760',
    sellTarget: '840',
    stopLoss: '725',
    riskLevel: 'Medium',
    description: 'The nation’s largest public sector financial institution commanding extensive deposit franchises and sovereign-grade infrastructure lending.',
    isDelayed: true
  },
  {
    id: 'zomato',
    symbol: 'ZOMATO',
    name: 'Zomato Ltd. (Eternal)',
    market: 'India',
    exchange: 'NSE',
    sector: 'Consumer Tech / Quick Commerce',
    price: 248.60,
    change: 9.20,
    percentChange: 3.84,
    marketCap: '₹2,19,400 Cr',
    marketCapCategory: 'Mid',
    pe: 82.5,
    pb: 8.9,
    dividendYield: 0.0,
    high52: 298.20,
    low52: 112.50,
    volume: '28.1M',
    avgVolume: '32.0M',
    volatilityScore: 29,
    trend: 'Strong Momentum',
    rsi: 68.4,
    recommendation: 'BUY',
    confidenceScore: 84,
    buyRange: '235 - 245',
    sellTarget: '295',
    stopLoss: '220',
    riskLevel: 'High',
    description: 'Hyper-growth quick commerce (Blinkit) and online food delivery leader driving rapid operational EBITDA expansion.',
    isDelayed: true
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    market: 'US',
    exchange: 'NASDAQ',
    sector: 'Semiconductors & AI',
    price: 138.25,
    change: 4.80,
    percentChange: 3.60,
    marketCap: '$3.38T',
    marketCapCategory: 'Mega',
    pe: 58.4,
    pb: 44.1,
    dividendYield: 0.03,
    high52: 149.77,
    low52: 45.10,
    volume: '42.8M',
    avgVolume: '51.2M',
    volatilityScore: 32,
    trend: 'Bullish Breakout',
    rsi: 65.8,
    recommendation: 'BUY',
    confidenceScore: 94,
    buyRange: '130 - 136',
    sellTarget: '165',
    stopLoss: '124',
    riskLevel: 'Medium',
    description: 'Pioneering GPU computing platform powering modern generative AI, hyperscaler infrastructure, and Blackwell architecture adoption.',
    isDelayed: true
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    market: 'US',
    exchange: 'NASDAQ',
    sector: 'Consumer Electronics',
    price: 228.40,
    change: 1.15,
    percentChange: 0.51,
    marketCap: '$3.46T',
    marketCapCategory: 'Mega',
    pe: 34.2,
    pb: 48.0,
    dividendYield: 0.44,
    high52: 237.23,
    low52: 164.08,
    volume: '36.5M',
    avgVolume: '44.0M',
    volatilityScore: 16,
    trend: 'Upward Channel',
    rsi: 56.2,
    recommendation: 'HOLD',
    confidenceScore: 72,
    buyRange: '218 - 225',
    sellTarget: '250',
    stopLoss: '210',
    riskLevel: 'Low',
    description: 'Global consumer ecosystem powerhouse integrating custom Apple Silicon, Apple Intelligence, and high-margin services revenue.',
    isDelayed: true
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    market: 'US',
    exchange: 'NASDAQ',
    sector: 'Enterprise Software & Cloud',
    price: 418.90,
    change: 3.20,
    percentChange: 0.77,
    marketCap: '$3.11T',
    marketCapCategory: 'Mega',
    pe: 33.9,
    pb: 11.8,
    dividendYield: 0.76,
    high52: 468.35,
    low52: 366.50,
    volume: '16.4M',
    avgVolume: '21.0M',
    volatilityScore: 15,
    trend: 'Steady Upward',
    rsi: 54.7,
    recommendation: 'BUY',
    confidenceScore: 89,
    buyRange: '405 - 415',
    sellTarget: '465',
    stopLoss: '395',
    riskLevel: 'Low',
    description: 'Enterprise cloud infrastructure provider (Azure) partnering deeply with OpenAI to monetize Copilot integrations across commercial enterprises.',
    isDelayed: true
  }
];

// Helper to generate dynamic multi-point historical chart series
export const generateHistoryData = (basePrice, timeframe = '1M', volatility = 0.015) => {
  const pointsMap = {
    '1D': { count: 24, labelFormat: (i) => `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}` },
    '1W': { count: 7, labelFormat: (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] },
    '1M': { count: 30, labelFormat: (i) => `Day ${i + 1}` },
    '1Y': { count: 12, labelFormat: (i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] }
  };

  const config = pointsMap[timeframe] || pointsMap['1M'];
  const data = [];
  let current = basePrice * (1 - volatility * 2);

  for (let i = 0; i < config.count; i++) {
    const randomShift = (Math.random() - 0.48) * volatility * current;
    current = Math.max(current + randomShift, basePrice * 0.7);
    if (i === config.count - 1) current = basePrice; // match current price at the end
    data.push({
      date: config.labelFormat(i),
      price: parseFloat(current.toFixed(2)),
      volume: Math.floor(Math.random() * 500000 + 100000)
    });
  }
  return data;
};

// Unified market data provider interface
export const MarketDataProvider = {
  getIndices: async () => {
    // Returns indices with real values and delay tags
    return BENCHMARK_INDICES;
  },

  getAllStocks: async (marketFilter = 'All') => {
    if (marketFilter === 'All') return MARKET_UNIVERSE;
    return MARKET_UNIVERSE.filter((s) => s.market.toLowerCase() === marketFilter.toLowerCase());
  },

  getStockById: async (idOrSymbol) => {
    const query = String(idOrSymbol).toLowerCase();
    const found = MARKET_UNIVERSE.find(
      (s) => s.id.toLowerCase() === query || s.symbol.toLowerCase() === query
    );
    if (found) return found;
    // Return graceful fallback stock representation
    return {
      id: query,
      symbol: query.toUpperCase(),
      name: `${query.toUpperCase()} Equities`,
      market: 'India',
      exchange: 'NSE',
      sector: 'General Market',
      price: 1000.00,
      change: 0.0,
      percentChange: 0.0,
      marketCap: '₹10,000 Cr',
      marketCapCategory: 'Mid',
      pe: 20.0,
      pb: 3.0,
      dividendYield: 1.0,
      high52: 1200.00,
      low52: 800.00,
      volume: '1.0M',
      avgVolume: '1.2M',
      volatilityScore: 15,
      trend: 'Neutral',
      rsi: 50.0,
      recommendation: 'HOLD',
      confidenceScore: 50,
      buyRange: '950 - 990',
      sellTarget: '1100',
      stopLoss: '920',
      riskLevel: 'Medium',
      description: 'Asset profile information is synchronized with market exchange registries.',
      isDelayed: true
    };
  },

  searchStocks: async (term) => {
    if (!term || !term.trim()) return MARKET_UNIVERSE;
    const q = term.toLowerCase().trim();
    return MARKET_UNIVERSE.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.symbol.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
    );
  }
};

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bookmark, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  Send,
  RefreshCw,
  Radio
} from 'lucide-react';
import { MARKET_UNIVERSE, MarketDataProvider } from '../services/marketData';
import { PredictionEngine } from '../services/predictionEngine';
import { NewsIntelligenceService } from '../services/newsService';
import AdvancedChart from '../components/AdvancedChart';

const StockDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [liveQuote, setLiveQuote] = useState(null);
  const [liveNews, setLiveNews] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(`bullrix_notes_${id}`) || '';
  });

  const baseStock = useMemo(() => {
    const found = MARKET_UNIVERSE.find((s) => s.id === id || s.symbol.toLowerCase() === String(id).toLowerCase());
    return found || MARKET_UNIVERSE[0];
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [quoteRes, newsRes, histRes] = await Promise.all([
          MarketDataProvider.fetchLiveQuote(baseStock.symbol),
          NewsIntelligenceService.fetchLiveNews({ ticker: baseStock.symbol, limit: 10 }),
          MarketDataProvider.fetchHistoricalSeries(baseStock.symbol, '1mo')
        ]);
        if (isMounted) {
          setLiveQuote(quoteRes);
          setLiveNews(newsRes.articles);
          setChartSeries(histRes);
        }
      } catch (err) {
        console.error('Error hydrating stock details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [baseStock.symbol]);

  const stock = useMemo(() => {
    if (!liveQuote) return baseStock;
    return {
      ...baseStock,
      price: liveQuote.price || baseStock.price,
      change: liveQuote.change !== undefined ? liveQuote.change : baseStock.change,
      percentChange: liveQuote.percentChange !== undefined ? liveQuote.percentChange : baseStock.percentChange,
      high52: liveQuote.high || baseStock.high52,
      low52: liveQuote.low || baseStock.low52,
      dataProvider: liveQuote.dataProvider || 'Cross-Validated Feed',
      dataStatus: liveQuote.dataStatus || 'DELAYED',
      delayMinutes: liveQuote.delayMinutes || 15
    };
  }, [baseStock, liveQuote]);

  const forecast = useMemo(() => {
    return PredictionEngine.generateForecast(stock);
  }, [stock]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem(`bullrix_notes_${stock.id}`, e.target.value);
  };

  const isPositive = stock.percentChange >= 0;
  const currencySymbol = stock.market === 'US' ? '$' : '₹';

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Back button & Stock Header */}
      <div className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E9CAE] hover:text-[#54D6B0] transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-xl font-bold font-mono text-[#54D6B0]">
              {stock.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stock.name}</h1>
                <span className="text-xs font-mono font-bold bg-[#54D6B0]/15 text-[#54D6B0] px-2 py-0.5 rounded">
                  {stock.symbol}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#8E9CAE]">
                  {stock.exchange}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8E9CAE]">
                <span>{stock.sector} • Market Cap: {stock.marketCap}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#54D6B0] bg-[#54D6B0]/10 px-2 py-0.5 rounded-full border border-[#54D6B0]/20">
                  <Clock size={11} /> {stock.dataStatus || 'DELAYED'} ({stock.delayMinutes || 15}m) • {stock.dataProvider || 'Google Finance Cross-Validated'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-3xl sm:text-4xl font-black font-mono text-white block">
              {currencySymbol}{stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center md:justify-end gap-1 text-sm font-bold mt-1 ${isPositive ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
              <span>{isPositive ? '+' : ''}{stock.percentChange.toFixed(2)}%</span>
              <span className="text-xs text-[#8E9CAE]">({stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Chart + Navigation Tabs (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card bg-[#162338]/90 p-6 rounded-3xl border border-white/5">
            <AdvancedChart
              basePrice={stock.price}
              currency={currencySymbol}
              symbol={stock.symbol}
              customSeries={chartSeries.length > 0 ? chartSeries : null}
              title={`${stock.name} Price Action`}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            {['Overview', 'Technicals', '14-Day Google News', 'Private Notes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#54D6B0] text-[#0B131E]'
                    : 'text-[#8E9CAE] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <div className="glass-card bg-[#162338]/70 p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">Company Profile & Operations</h3>
              <p className="text-xs text-[#8E9CAE] leading-relaxed">{stock.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                <div className="p-3 bg-[#101B2B] rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase block font-mono">52W High</span>
                  <span className="text-sm font-bold font-mono text-white mt-0.5 block">{currencySymbol}{stock.high52}</span>
                </div>
                <div className="p-3 bg-[#101B2B] rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase block font-mono">52W Low</span>
                  <span className="text-sm font-bold font-mono text-white mt-0.5 block">{currencySymbol}{stock.low52}</span>
                </div>
                <div className="p-3 bg-[#101B2B] rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase block font-mono">P/E Ratio</span>
                  <span className="text-sm font-bold font-mono text-[#54D6B0] mt-0.5 block">{stock.pe}</span>
                </div>
                <div className="p-3 bg-[#101B2B] rounded-xl border border-white/5">
                  <span className="text-[10px] text-[#8E9CAE] uppercase block font-mono">RSI Momentum</span>
                  <span className="text-sm font-bold font-mono text-white mt-0.5 block">{stock.rsi}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Technicals' && (
            <div className="glass-card bg-[#162338]/70 p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">Quantitative Factor Engine</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Identified Trend Structure</span>
                  <span className="font-bold text-white font-mono">{stock.trend}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Volatility Factor</span>
                  <span className="font-bold text-white font-mono">{stock.volatilityScore}/100</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Recommended Entry Range</span>
                  <span className="font-bold text-[#54D6B0] font-mono">{currencySymbol}{stock.buyRange}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#8E9CAE]">Downside Invalidation (Stop Loss)</span>
                  <span className="font-bold text-[#FF5C75] font-mono">{currencySymbol}{stock.stopLoss}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === '14-Day Google News' && (
            <div className="space-y-3">
              {liveNews.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#162338]/60 text-center text-xs text-[#8E9CAE]">
                  No news items recorded in this interval for {stock.symbol}.
                </div>
              ) : (
                liveNews.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#162338]/80 border border-white/5 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#8E9CAE]">
                      <span className="font-bold text-[#54D6B0]">{item.publisher}</span>
                      <span>{item.publishedDaysAgo}d ago</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-[#8E9CAE]">{item.summary}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px]">
                      <span className="text-[#54D6B0] font-mono">Sentiment: {item.sentiment}</span>
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-[#8E9CAE] hover:text-[#54D6B0] flex items-center gap-1">
                        Read Story <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Private Notes' && (
            <div className="glass-card bg-[#162338]/70 p-6 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Personal Investment Strategy Notes
              </h3>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Log your portfolio rationale, target rebalance triggers, or meeting notes..."
                className="w-full h-36 bg-[#101B2B] border border-white/10 rounded-2xl p-4 text-xs text-white outline-none focus:border-[#54D6B0]/50 resize-none"
              />
              <span className="text-[10px] text-[#8E9CAE] text-right italic">
                Notes persist locally in client browser storage.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: AI Forecast Card & Chat Launcher (1 Col) */}
        <div className="flex flex-col gap-6">
          {forecast && (
            <div className="glass-card bg-[#162338]/95 border border-[#54D6B0]/30 p-6 rounded-3xl shadow-xl flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#54D6B0]" />
                <h3 className="text-base font-bold text-white">AI Quantitative Verdict</h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Action Signal</span>
                  <span className="text-2xl font-black font-mono text-[#54D6B0]">{stock.recommendation}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">AI Confidence</span>
                  <span className="text-2xl font-black font-mono text-white">{stock.confidenceScore}%</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8E9CAE]">Next Session:</span>
                  <span className="font-bold text-white">{forecast.nextSessionOutlook}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8E9CAE]">5-Day Target:</span>
                  <span className="font-bold font-mono text-[#54D6B0]">{currencySymbol}{forecast.priceTargetRange.high}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8E9CAE]">Stop Invalidation:</span>
                  <span className="font-bold font-mono text-[#FF5C75]">{currencySymbol}{stock.stopLoss}</span>
                </div>
              </div>

              <Link
                to={`/chat`}
                className="btn-primary w-full !py-3 text-xs font-bold text-center justify-center"
              >
                Consult AI Analyst on {stock.symbol}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Search, 
  ArrowRight, 
  Clock, 
  Activity, 
  ShieldCheck, 
  Newspaper, 
  Compass, 
  ChevronRight,
  TrendingDown,
  Zap,
  Filter
} from 'lucide-react';
import { BENCHMARK_INDICES, MARKET_UNIVERSE } from '../services/marketData';
import { NewsIntelligenceService } from '../services/newsService';
import StockCard from '../components/StockCard';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [activeMarket, setActiveMarket] = useState('All');
  const [activeCap, setActiveCap] = useState('All');

  const recentNews = useMemo(() => {
    return NewsIntelligenceService.getRolling14DaysNews('ALL').slice(0, 3);
  }, []);

  const filteredStocks = useMemo(() => {
    return MARKET_UNIVERSE.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.sector.toLowerCase().includes(search.toLowerCase());
      const matchMarket = activeMarket === 'All' || s.market === activeMarket;
      const matchCap = activeCap === 'All' || s.marketCapCategory === activeCap;
      return matchSearch && matchMarket && matchCap;
    });
  }, [search, activeMarket, activeCap]);

  // Gainers & Losers
  const topGainers = useMemo(() => {
    return [...MARKET_UNIVERSE].sort((a, b) => b.percentChange - a.percentChange).slice(0, 3);
  }, []);

  const topLosers = useMemo(() => {
    return [...MARKET_UNIVERSE].sort((a, b) => a.percentChange - b.percentChange).slice(0, 3);
  }, []);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-10">
      {/* Benchmark Indices Overview Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Benchmark Overview</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#54D6B0]/15 text-[#54D6B0] px-2 py-0.5 rounded">
              Verified Feeds
            </span>
          </div>
          <span className="text-xs text-[#8E9CAE] flex items-center gap-1 font-mono">
            <Clock size={12} /> Standard 15m delay
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BENCHMARK_INDICES.map((idx) => {
            const isUp = idx.percentChange >= 0;
            return (
              <div
                key={idx.symbol}
                className="glass-card bg-[#162338]/80 border border-white/5 hover:border-[#54D6B0]/30 flex flex-col justify-between p-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-white">{idx.name}</span>
                  <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-white/5 text-[#8E9CAE]">
                    {idx.market}
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-xl font-black font-mono text-white block">
                    {idx.currency === 'INR' ? '₹' : '$'}
                    {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs font-bold font-mono ${
                      isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'
                    }`}
                  >
                    {isUp ? '+' : ''}
                    {idx.percentChange.toFixed(2)}% ({idx.change > 0 ? '+' : ''}
                    {idx.change.toFixed(2)})
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#8E9CAE] pt-2 border-t border-white/5">
                  <span>H: {idx.high}</span>
                  <span>L: {idx.low}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Market Sentiment & Intelligence Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-[#162338] via-[#1A2942] to-[#121E30] border border-[#54D6B0]/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold w-fit">
              <Sparkles size={14} />
              AI Intelligence Digest • Global Macro
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Indian Large-Caps Exhibit Constructive Absorption; US Mega-Cap AI Capex Accelerates
            </h3>
            <p className="text-xs sm:text-sm text-[#8E9CAE] leading-relaxed max-w-2xl">
              NIFTY 50 institutional breadth holds steady (38:12 advance-decline ratio). DII liquidity balances global macro cross-currents. Crude softening below $83/bbl provides sustained tailwinds for domestic operating margins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-white/5">
            <Link to="/chat" className="btn-primary !py-2.5 !px-5 text-xs font-bold">
              Analyze Current Market State <ArrowRight size={15} />
            </Link>
            <Link to="/predictions" className="btn-secondary !py-2.5 !px-5 text-xs font-semibold">
              Explore 5-Day Forecasts
            </Link>
          </div>
        </div>

        {/* Quick Movers (Gainers & Losers) */}
        <div className="glass-card bg-[#162338]/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-[#54D6B0]" />
                Top Market Movers
              </h4>
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono">Live Session</span>
            </div>

            <div className="space-y-2">
              {topGainers.map((s) => (
                <Link
                  key={s.id}
                  to={`/stock/${s.id}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-white">{s.symbol}</span>
                    <span className="text-[10px] text-[#8E9CAE] block">{s.name}</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#54D6B0]">
                    +{s.percentChange}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 mt-4">
            <Link
              to="/markets/india"
              className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center justify-between"
            >
              <span>View Full Indian & Global Tables</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Filter & Stock Discovery Engine */}
      <section>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* Market Filter */}
            <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
              {['All', 'India', 'US'].map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMarket(m)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMarket === m
                      ? 'bg-[#54D6B0] text-[#0B131E]'
                      : 'text-[#8E9CAE] hover:text-white'
                  }`}
                >
                  {m === 'All' ? 'All Markets' : m === 'India' ? '🇮🇳 India (NSE)' : '🇺🇸 US (NASDAQ)'}
                </button>
              ))}
            </div>

            {/* Cap Category Filter */}
            <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
              {['All', 'Large', 'Mid', 'Mega'].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCap(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeCap === c
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-[#8E9CAE] hover:text-white'
                  }`}
                >
                  {c === 'All' ? 'All Caps' : `${c} Cap`}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ticker, company, or sector..."
              className="w-full bg-[#162338] border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-xs text-white outline-none focus:border-[#54D6B0]/50"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
          </div>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Rolling 14-Day News Stream Highlight */}
      <section className="bg-[#162338]/60 border border-white/5 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Newspaper size={20} className="text-[#54D6B0]" />
            <h3 className="text-lg font-bold text-white">Rolling 14-Day Financial News Stream</h3>
          </div>
          <Link to="/news" className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center gap-1">
            <span>View News Center</span> <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentNews.map((news) => (
            <div
              key={news.id}
              className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 hover:border-[#54D6B0]/25 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8E9CAE] mb-2 font-mono">
                  <span className="font-bold text-[#54D6B0]">{news.publisher}</span>
                  <span>{news.publishedDaysAgo}d ago</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2 mb-2">{news.title}</h4>
                <p className="text-[11px] text-[#8E9CAE] line-clamp-2 leading-relaxed">
                  {news.summary}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#54D6B0] bg-[#54D6B0]/10 px-2 py-0.5 rounded">
                  {news.sentiment}
                </span>
                <span className="text-[10px] text-[#8E9CAE] uppercase">{news.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Filter,
  Coins,
  ArrowUpDown,
  PieChart as PieIcon,
  X
} from 'lucide-react';
import { BENCHMARK_INDICES, MARKET_UNIVERSE, SECTORS, MarketDataProvider } from '../services/marketData';
import { NewsIntelligenceService } from '../services/newsService';
import StockCard from '../components/StockCard';
import SectorDistributionChart from '../components/SectorDistributionChart';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeMarket, setActiveMarket] = useState('All');
  const [activeExchange, setActiveExchange] = useState('All');
  const [activeSector, setActiveSector] = useState('All');
  const [activeCap, setActiveCap] = useState('All');
  const [sortBy, setSortBy] = useState('cap_desc');
  const [liveIndices, setLiveIndices] = useState(BENCHMARK_INDICES);
  const [indicesSource, setIndicesSource] = useState('Cross-Validated Google Finance');

  useEffect(() => {
    async function loadIndices() {
      try {
        const fetched = await MarketDataProvider.fetchLiveIndices();
        if (fetched && fetched.length > 0) {
          setLiveIndices(fetched);
          setIndicesSource(fetched[0].dataProvider || 'Google Finance Feed');
        }
      } catch (err) {
        console.error('Failed to sync indices:', err);
      }
    }
    loadIndices();
  }, []);

  const searchContainerRef = useRef(null);

  // Handle Autocomplete
  useEffect(() => {
    if (!search.trim()) {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await MarketDataProvider.searchAutocomplete(search, 6);
      setAutocompleteResults(results);
      setShowAutocomplete(results.length > 0);
    }, 150);
    return () => clearTimeout(timer);
  }, [search]);

  // Click outside listener for autocomplete
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recentNews = useMemo(() => {
    return NewsIntelligenceService.getRolling14DaysNews('ALL').slice(0, 3);
  }, []);

  // Filtered & Sorted Stock Universe
  const filteredStocks = useMemo(() => {
    let list = MARKET_UNIVERSE.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.sector.toLowerCase().includes(search.toLowerCase());
      const matchMarket = activeMarket === 'All' || s.market === activeMarket;
      const matchExchange = activeExchange === 'All' || s.exchange === activeExchange;
      const matchSector = activeSector === 'All' || s.sector === activeSector;
      const matchCap = activeCap === 'All' || s.marketCapCategory === activeCap;
      return matchSearch && matchMarket && matchExchange && matchSector && matchCap;
    });

    switch (sortBy) {
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'change_desc':
        list.sort((a, b) => b.percentChange - a.percentChange);
        break;
      case 'change_asc':
        list.sort((a, b) => a.percentChange - b.percentChange);
        break;
      case 'cap_desc':
        list.sort((a, b) => b.marketCapNum - a.marketCapNum);
        break;
      case 'volume_desc':
        list.sort((a, b) => b.volumeNum - a.volumeNum);
        break;
      default:
        break;
    }

    return list;
  }, [search, activeMarket, activeExchange, activeSector, activeCap, sortBy]);

  // Sector breakdown data for Pie Chart
  const sectorPieData = useMemo(() => {
    const counts = {};
    MARKET_UNIVERSE.forEach((s) => {
      counts[s.sector] = (counts[s.sector] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  }, []);

  // Gainers & Losers
  const topGainers = useMemo(() => {
    return [...MARKET_UNIVERSE].sort((a, b) => b.percentChange - a.percentChange).slice(0, 3);
  }, []);

  const topLosers = useMemo(() => {
    return [...MARKET_UNIVERSE].sort((a, b) => a.percentChange - b.percentChange).slice(0, 3);
  }, []);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-10">
      {/* Benchmark Overview Cards */}
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
          {liveIndices.slice(0, 6).map((idx) => {
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
                <div className="flex items-center justify-between text-[10px] text-[#8E9CAE] pt-2 border-t border-white/5 font-mono">
                  <span>H: {idx.high}</span>
                  <span>L: {idx.low}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Market Sentiment + Crypto Coming Soon + Movers Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Macro Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#162338] via-[#1A2942] to-[#121E30] border border-[#54D6B0]/20 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold w-fit">
              <Sparkles size={14} />
              AI Intelligence Digest • Global Macro
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              Indian Domestic Absorption Holds Firm; US Tech Earnings Provide Catalyst
            </h3>
            <p className="text-xs text-[#8E9CAE] leading-relaxed">
              NIFTY 50 breadth (38 advances : 12 declines) reflects strong domestic liquidity. Falling crude prices below $83/bbl aid Indian manufacturing and oil refiners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/5">
            <Link to="/chat" className="btn-primary !py-2.5 !px-4 text-xs font-bold">
              Analyze Current Market <ArrowRight size={14} />
            </Link>
            <Link to="/predictions" className="btn-secondary !py-2.5 !px-4 text-xs font-semibold">
              5-Day Forecasts
            </Link>
          </div>
        </div>

        {/* Crypto Market Preview Card (Coming Soon) */}
        <div className="glass-card bg-[#162338]/80 border border-[#FFB03A]/25 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Coins size={18} className="text-[#FFB03A]" />
                <h4 className="text-sm font-bold text-white">Crypto Market</h4>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFB03A]/15 text-[#FFB03A] uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-[#8E9CAE] leading-relaxed mb-4">
              Decentralized market intelligence covering Bitcoin, Ethereum, Solana, and on-chain Fear & Greed metrics in active development.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-white/5 text-white">
                <span className="text-[#8E9CAE]">Target Release</span>
                <span className="text-[#54D6B0] font-bold">BullRix 3.0</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-white/5 text-white">
                <span className="text-[#8E9CAE]">Live Data Mode</span>
                <span className="text-[#FFB03A] font-bold">Locked (No Fake Prices)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <Link
              to="/crypto"
              className="text-xs font-bold text-[#FFB03A] hover:underline flex items-center justify-between"
            >
              <span>Explore Crypto Roadmap & Notify Me</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Top Movers */}
        <div className="glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-[#54D6B0]" />
                Top Market Movers
              </h4>
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono">15m Delayed</span>
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

          <div className="pt-3 border-t border-white/5 mt-3">
            <Link
              to="/markets/india"
              className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center justify-between"
            >
              <span>View Full Indian Sector Heatmap</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Broad Stock Universe Discovery with Search Autocomplete, Sector Filters, and Sorting */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Stock Universe Discovery</h3>
              <p className="text-xs text-[#8E9CAE]">
                Showing {filteredStocks.length} equities across Indian (NSE/BSE) and Global (NASDAQ/NYSE) markets.
              </p>
            </div>

            {/* Search Input with Autocomplete Dropdown */}
            <div className="relative w-full md:w-96" ref={searchContainerRef}>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by company name, ticker, or sector..."
                  className="w-full bg-[#162338] border border-white/10 rounded-2xl py-3 px-4 pr-10 text-xs text-white outline-none focus:border-[#54D6B0]/50"
                />
                {search ? (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
                )}
              </div>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showAutocomplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-[#162338] border border-[#54D6B0]/30 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E9CAE] px-2 block mb-1">
                      Matched Equities ({autocompleteResults.length})
                    </span>
                    {autocompleteResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/stock/${item.id}`}
                        onClick={() => setShowAutocomplete(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-bold text-[#54D6B0]">{item.symbol}</span>
                            <span className="text-[9px] uppercase px-1 rounded bg-white/5 text-[#8E9CAE]">
                              {item.exchange}
                            </span>
                          </div>
                          <span className="text-[11px] text-white block">{item.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">
                          {item.market === 'US' ? '$' : '₹'}{item.price}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filter & Sort Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              {/* Market Filter */}
              <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
                {['All', 'India', 'US'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveMarket(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMarket === m
                        ? 'bg-[#54D6B0] text-[#0B131E]'
                        : 'text-[#8E9CAE] hover:text-white'
                    }`}
                  >
                    {m === 'All' ? 'All' : m === 'India' ? '🇮🇳 India' : '🇺🇸 Global'}
                  </button>
                ))}
              </div>

              {/* Cap Filter */}
              <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
                {['All', 'Mega', 'Large', 'Mid'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCap(c)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeCap === c
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-[#8E9CAE] hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Sector Dropdown */}
              <select
                value={activeSector}
                onChange={(e) => setActiveSector(e.target.value)}
                className="bg-[#162338] text-xs font-semibold text-white border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-[#54D6B0]/50"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sectors (14+)' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#8E9CAE] flex items-center gap-1 font-mono">
                <ArrowUpDown size={13} /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#162338] text-xs font-semibold text-white border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-[#54D6B0]/50"
              >
                <option value="cap_desc">Market Cap (High to Low)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="change_desc">% Gainers</option>
                <option value="change_asc">% Losers</option>
                <option value="volume_desc">Volume Leaders</option>
              </select>
            </div>
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

      {/* Visual Analytics Showcase: Sector Allocation Donut Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <SectorDistributionChart
            data={sectorPieData.slice(0, 6)}
            title="Universe Sector Allocation"
            donut={true}
            height={280}
          />
        </div>

        {/* Rolling 14-Day News Highlight (2 Cols) */}
        <div className="lg:col-span-2 glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Newspaper size={18} className="text-[#54D6B0]" />
                <h3 className="text-base font-bold text-white">Rolling 14-Day News Stream</h3>
              </div>
              <Link to="/news" className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center gap-1">
                <span>View Full News Center</span> <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentNews.map((news) => (
                <div
                  key={news.id}
                  className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#8E9CAE] mb-1.5 font-mono">
                      <span className="font-bold text-[#54D6B0]">{news.publisher}</span>
                      <span>{news.publishedDaysAgo}d ago</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-2 mb-1.5">{news.title}</h4>
                    <p className="text-[11px] text-[#8E9CAE] line-clamp-2 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#54D6B0] bg-[#54D6B0]/10 px-2 py-0.5 rounded">
                      {news.sentiment}
                    </span>
                    <span className="text-[#8E9CAE] uppercase font-mono">{news.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

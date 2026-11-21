import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, DollarSign, Layers, Search, ArrowUpDown } from 'lucide-react';
import { BENCHMARK_INDICES, MARKET_UNIVERSE } from '../services/marketData';
import StockCard from '../components/StockCard';
import MultiIndexComparisonChart from '../components/MultiIndexComparisonChart';

const GlobalMarkets = () => {
  const [selectedExchange, setSelectedExchange] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('cap_desc');

  const globalStocks = useMemo(() => {
    return MARKET_UNIVERSE.filter((s) => s.market === 'US');
  }, []);

  const globalIndices = BENCHMARK_INDICES.filter((i) => i.market === 'US' || i.market === 'Global');

  const filtered = useMemo(() => {
    let list = globalStocks.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.symbol.toLowerCase().includes(search.toLowerCase());
      const matchExchange = selectedExchange === 'All' || s.exchange === selectedExchange;
      return matchSearch && matchExchange;
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
      case 'cap_desc':
        list.sort((a, b) => b.marketCapNum - a.marketCapNum);
        break;
      default:
        break;
    }

    return list;
  }, [globalStocks, search, selectedExchange, sortBy]);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="text-[#54D6B0]" size={26} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Global Financial Exchanges
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9CAE]">
            NASDAQ 100, S&P 500, Dow Jones, FX currencies, commodities, and international technology bluechips.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8E9CAE] font-mono bg-[#162338] px-3.5 py-2 rounded-xl border border-white/5">
          <Clock size={14} className="text-[#54D6B0]" />
          <span>Real-time feeds synchronized via 15-minute institutional delay gateway</span>
        </div>
      </div>

      {/* Global Benchmarks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {globalIndices.map((idx) => {
          const isUp = idx.percentChange >= 0;
          return (
            <div key={idx.symbol} className="glass-card bg-[#162338]/80 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-white">{idx.name}</span>
                  <span className="text-[10px] font-mono uppercase bg-white/5 text-[#8E9CAE] px-1.5 py-0.5 rounded">
                    {idx.exchange}
                  </span>
                </div>
                <span className="text-2xl font-black font-mono text-white block my-1">
                  {idx.currency === 'INR' ? '₹' : '$'}{idx.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
                <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
                  {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {isUp ? '+' : ''}{idx.percentChange.toFixed(2)}%
                </span>
                <span className="text-[10px] text-[#8E9CAE]">H: {idx.high} • L: {idx.low}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Exchange Multi-Index Line Chart */}
      <div className="glass-card bg-[#162338]/80 p-6 rounded-3xl border border-white/5">
        <MultiIndexComparisonChart height={300} />
      </div>

      {/* Discovery Header & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
              {['All', 'NASDAQ', 'NYSE'].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setSelectedExchange(ex)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedExchange === ex
                      ? 'bg-[#54D6B0] text-[#0B131E]'
                      : 'text-[#8E9CAE] hover:text-white'
                  }`}
                >
                  {ex === 'All' ? 'All Exchanges' : ex}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#162338] text-xs font-semibold text-white border border-white/10 rounded-xl px-3 py-1.5 outline-none focus:border-[#54D6B0]/50"
              >
                <option value="cap_desc">Market Cap</option>
                <option value="price_desc">Price</option>
                <option value="change_desc">% Gainers</option>
              </select>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search global stocks (e.g. NVDA, MSFT)..."
              className="w-full bg-[#162338] border border-white/10 rounded-xl py-2 px-3.5 pr-8 text-xs text-white outline-none focus:border-[#54D6B0]/50"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
          </div>
        </div>

        {/* Global Mega-Caps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GlobalMarkets;

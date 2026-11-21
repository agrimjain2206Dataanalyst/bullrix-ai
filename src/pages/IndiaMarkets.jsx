import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, TrendingUp, BarChart3, PieChart, ShieldAlert, Clock, ArrowUpRight, ArrowDownRight, ArrowUpDown, Search } from 'lucide-react';
import { MARKET_UNIVERSE, SECTORS } from '../services/marketData';
import StockCard from '../components/StockCard';
import SectorDistributionChart from '../components/SectorDistributionChart';

const IndiaMarkets = () => {
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCap, setSelectedCap] = useState('All');
  const [sortBy, setSortBy] = useState('cap_desc');
  const [search, setSearch] = useState('');

  const indianStocks = useMemo(() => {
    return MARKET_UNIVERSE.filter((s) => s.market === 'India');
  }, []);

  const filtered = useMemo(() => {
    let list = indianStocks.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.symbol.toLowerCase().includes(search.toLowerCase());
      const matchSector = selectedSector === 'All' || s.sector === selectedSector;
      const matchCap = selectedCap === 'All' || s.marketCapCategory === selectedCap;
      return matchSearch && matchSector && matchCap;
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
      default:
        break;
    }

    return list;
  }, [indianStocks, search, selectedSector, selectedCap, sortBy]);

  const sectorDistribution = useMemo(() => {
    const counts = {};
    indianStocks.forEach((s) => {
      counts[s.sector] = (counts[s.sector] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [indianStocks]);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🇮🇳</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Indian Equity Markets
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9CAE]">
            National Stock Exchange (NSE) & Bombay Stock Exchange (BSE) benchmark leaders, broad sector heatmaps, and cap tiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card bg-[#162338]/80 !py-2.5 !px-4 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono">Market Breadth</span>
              <span className="text-xs font-bold font-mono text-[#54D6B0]">38 Advances : 12 Declines</span>
            </div>
          </div>
          <div className="glass-card bg-[#162338]/80 !py-2.5 !px-4 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono">India VIX</span>
              <span className="text-xs font-bold font-mono text-white">12.85 (-1.8%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Strength & Allocation Donut Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Strength Bars (2 Cols) */}
        <div className="lg:col-span-2 glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              NSE Sectoral Momentum & Advance Heatmap
            </h3>
            <span className="text-[10px] text-[#8E9CAE] font-mono">Session Calibration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Banking & Financials', breadth: 'Strong Up', strength: 86, color: '#54D6B0' },
              { name: 'Defence & Aerospace', breadth: 'Indigenization Surge', strength: 88, color: '#54D6B0' },
              { name: 'Renewables & Power', breadth: 'Clean Energy Push', strength: 84, color: '#54D6B0' },
              { name: 'Energy & Refining', breadth: 'Refining Margin Rebound', strength: 74, color: '#54D6B0' },
              { name: 'Infrastructure & EPC', breadth: 'Order Book Expansion', strength: 79, color: '#54D6B0' },
              { name: 'IT Services & Software', breadth: 'Consolidating discretionary spend', strength: 48, color: '#FFB03A' }
            ].map((sec) => (
              <div key={sec.name} className="p-3.5 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-white">{sec.name}</span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: sec.color }}>{sec.strength}%</span>
                  </div>
                  <span className="text-[10px] text-[#8E9CAE]">{sec.breadth}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2.5">
                  <div className="h-full rounded-full" style={{ width: `${sec.strength}%`, backgroundColor: sec.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Allocation Donut (1 Col) */}
        <div className="lg:col-span-1 glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <SectorDistributionChart
            data={sectorDistribution.slice(0, 5)}
            title="NSE Sector Weightings"
            donut={true}
            height={260}
          />
        </div>
      </div>

      {/* Discovery Filters & Search */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Sector Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-1">
            {['All', 'Banking & Financial Services', 'IT & Technology', 'Defence & Aerospace', 'Automobile & EV', 'Energy & Power', 'Infrastructure', 'Renewable Energy', 'Consumer Tech & Platforms'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-[#54D6B0] text-[#0B131E] font-bold'
                    : 'bg-[#162338] text-[#8E9CAE] hover:text-white border border-white/5'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Indian stocks (e.g. HAL, RELIANCE)..."
              className="w-full bg-[#162338] border border-white/10 rounded-xl py-2 px-3.5 pr-8 text-xs text-white outline-none focus:border-[#54D6B0]/50"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
          </div>
        </div>

        {/* Cap Filter & Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
            {['All', 'Mega', 'Large', 'Mid'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCap(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCap === c
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-[#8E9CAE] hover:text-white'
                }`}
              >
                {c === 'All' ? 'All Caps' : `${c} Cap`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8E9CAE] flex items-center gap-1 font-mono">
              <ArrowUpDown size={13} /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#162338] text-xs font-semibold text-white border border-white/10 rounded-xl px-3 py-1.5 outline-none focus:border-[#54D6B0]/50"
            >
              <option value="cap_desc">Market Cap (High to Low)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="change_desc">% Gainers</option>
              <option value="change_asc">% Losers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Indian Equities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence>
          {filtered.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IndiaMarkets;

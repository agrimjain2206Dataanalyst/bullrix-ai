import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, TrendingUp, Layers, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARKET_UNIVERSE } from '../services/marketData';

const CompanyResearch = () => {
  const [selectedStock, setSelectedStock] = useState(MARKET_UNIVERSE[0]);
  const [search, setSearch] = useState('');

  const filtered = MARKET_UNIVERSE.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Fundamental Company Research
        </h1>
        <p className="text-xs sm:text-sm text-[#8E9CAE] mt-1">
          Deep balance sheet valuation, capital structure ratios, competitive pros & cons, and peer benchmarking.
        </p>
      </div>

      {/* Search & Stock Selector */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company for deep research..."
            className="w-full bg-[#162338] border border-white/10 rounded-2xl py-3 px-4 pr-10 text-xs text-white outline-none focus:border-[#54D6B0]/50"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
        </div>
      </div>

      {/* Selected Company Fundamental Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Overview (2 Cols) */}
        <div className="lg:col-span-2 glass-card bg-[#162338]/85 p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{selectedStock.name}</h2>
                <span className="text-xs font-mono font-bold bg-[#54D6B0]/15 text-[#54D6B0] px-2 py-0.5 rounded">
                  {selectedStock.symbol}
                </span>
              </div>
              <span className="text-xs text-[#8E9CAE] mt-1 block">
                {selectedStock.sector} • Exchange: {selectedStock.exchange} ({selectedStock.market})
              </span>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black font-mono text-white">
                {selectedStock.market === 'US' ? '$' : '₹'}{selectedStock.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#54D6B0] block font-semibold">
                {selectedStock.percentChange > 0 ? '+' : ''}{selectedStock.percentChange}%
              </span>
            </div>
          </div>

          <p className="text-xs text-[#8E9CAE] leading-relaxed">
            {selectedStock.description}
          </p>

          {/* Key Fundamental Ratios Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-[#101B2B] border border-white/5">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Market Cap</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{selectedStock.marketCap}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#101B2B] border border-white/5">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">P/E Ratio</span>
              <span className="text-sm font-bold font-mono text-[#54D6B0] mt-0.5 block">{selectedStock.pe}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#101B2B] border border-white/5">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">P/B Ratio</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{selectedStock.pb}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#101B2B] border border-white/5">
              <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Dividend Yield</span>
              <span className="text-sm font-bold font-mono text-white mt-0.5 block">{selectedStock.dividendYield}%</span>
            </div>
          </div>

          {/* Deterministic Screener Highlights (Pros & Cons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5">
              <h4 className="text-xs font-bold text-[#54D6B0] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                <CheckCircle2 size={14} /> Fundamental Strengths
              </h4>
              <ul className="text-xs text-[#8E9CAE] space-y-1.5">
                <li>• Robust operational cash conversion with clean balance sheet debt ratios.</li>
                <li>• Expanding operating margin through scale efficiencies in retail & cloud.</li>
                <li>• Strong compound annual growth rate (CAGR) over 5-year rolling cycle.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5">
              <h4 className="text-xs font-bold text-[#FF5C75] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertTriangle size={14} /> Key Monitoring Risks
              </h4>
              <ul className="text-xs text-[#8E9CAE] space-y-1.5">
                <li>• Valuation trades at moderate premium to 10-year historical median.</li>
                <li>• Sensitivity to commodity import cost revisions and currency exchange shifts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Peer Selection (1 Col) */}
        <div className="glass-card bg-[#162338]/80 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Compare With Universe Equities</h3>
            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {filtered.map((stock) => (
                <button
                  key={stock.id}
                  onClick={() => setSelectedStock(stock)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedStock.id === stock.id
                      ? 'bg-[#54D6B0]/15 border-[#54D6B0]/40 text-white font-bold'
                      : 'bg-[#101B2B] border-white/5 text-[#8E9CAE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div>
                    <span className="text-xs block">{stock.symbol}</span>
                    <span className="text-[10px] text-[#8E9CAE]">{stock.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    {stock.market === 'US' ? '$' : '₹'}{stock.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Link
            to={`/stock/${selectedStock.id}`}
            className="btn-primary w-full !py-2.5 text-xs font-bold mt-4"
          >
            Open Full Interactive Technical Chart <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyResearch;

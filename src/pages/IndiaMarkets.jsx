import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp, BarChart3, PieChart, ShieldAlert, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MARKET_UNIVERSE } from '../services/marketData';
import StockCard from '../components/StockCard';

const IndiaMarkets = () => {
  const [selectedSector, setSelectedSector] = useState('All');

  const indianStocks = MARKET_UNIVERSE.filter((s) => s.market === 'India');

  const sectors = ['All', 'Banking & Financials', 'Information Technology', 'Energy & Conglomerate', 'Consumer Tech / Quick Commerce'];

  const filtered = selectedSector === 'All'
    ? indianStocks
    : indianStocks.filter((s) => s.sector === selectedSector);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🇮🇳</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Indian Equity Markets
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9CAE]">
            National Stock Exchange (NSE) & Bombay Stock Exchange (BSE) benchmark leaders and sectoral strength.
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

      {/* Sector Strength Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: 'Banking & Financials', breadth: 'Strong Up', strength: 86, color: '#54D6B0' },
          { name: 'Energy & Refining', breadth: 'Constructive', strength: 74, color: '#54D6B0' },
          { name: 'Quick Commerce Tech', breadth: 'Momentum', strength: 82, color: '#54D6B0' },
          { name: 'IT Services', breadth: 'Consolidating', strength: 48, color: '#FFB03A' }
        ].map((sec) => (
          <div key={sec.name} className="glass-card bg-[#162338]/80 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">{sec.name}</span>
                <span className="text-[10px] font-mono" style={{ color: sec.color }}>{sec.strength}%</span>
              </div>
              <span className="text-[10px] text-[#8E9CAE]">{sec.breadth}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
              <div className="h-full rounded-full" style={{ width: `${sec.strength}%`, backgroundColor: sec.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Sector Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSector(sec)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSector === sec
                ? 'bg-[#54D6B0] text-[#0B131E] font-bold'
                : 'bg-[#162338] text-[#8E9CAE] hover:text-white border border-white/5'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Indian Equities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((stock) => (
          <StockCard key={stock.id} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default IndiaMarkets;

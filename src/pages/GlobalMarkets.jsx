import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, DollarSign, Layers } from 'lucide-react';
import { BENCHMARK_INDICES, MARKET_UNIVERSE } from '../services/marketData';
import StockCard from '../components/StockCard';

const GlobalMarkets = () => {
  const globalStocks = MARKET_UNIVERSE.filter((s) => s.market === 'US');
  const globalIndices = BENCHMARK_INDICES.filter((i) => i.market === 'US' || i.market === 'Global');

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
            NASDAQ 100, S&P 500, Dow Jones, FX currencies, and international mega-cap technology corporations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8E9CAE] font-mono">
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

      {/* Global Macro & Cross-Asset Insights */}
      <div className="glass-card bg-[#162338]/60 p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Macro Semiconductor & AI Capital Cycle</h3>
          <p className="text-xs text-[#8E9CAE] max-w-3xl leading-relaxed">
            Hyperscaler infrastructure budgets (Microsoft Azure, AWS, Google Cloud) continue expanding Blackwell GPU deployments. Cross-market correlation indicates elevated multiple support for enterprise digital engineering partners.
          </p>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30 font-bold">
            USD / INR: 84.45
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 text-white border border-white/10 font-bold">
            Brent: $82.30/bbl
          </span>
        </div>
      </div>

      {/* Global Mega-Caps */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">International Technology Leaders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {globalStocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalMarkets;

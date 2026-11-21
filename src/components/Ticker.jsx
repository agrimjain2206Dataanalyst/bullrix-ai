import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { BENCHMARK_INDICES } from '../services/marketData';

const Ticker = () => {
  return (
    <div className="fixed top-20 left-0 right-0 h-10 bg-[#0B131E]/95 backdrop-blur-md border-b border-[#54D6B0]/10 z-40 overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap items-center py-1">
        {[...BENCHMARK_INDICES, ...BENCHMARK_INDICES, ...BENCHMARK_INDICES].map((item, index) => {
          const isUp = item.percentChange >= 0;
          return (
            <div
              key={`${item.symbol}-${index}`}
              className="flex items-center gap-3 px-6 border-r border-white/5 text-xs font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#F3F5F7] tracking-tight">{item.name}</span>
                <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-white/5 text-[#8E9CAE]">
                  {item.exchange}
                </span>
              </div>

              <span className="font-semibold text-white">
                {item.currency === 'INR' ? '₹' : '$'}
                {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>

              <div
                className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'
                  }`}
              >
                {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>
                  {isUp ? '+' : ''}
                  {item.percentChange.toFixed(2)}%
                </span>
              </div>

              {item.isDelayed && (
                <div
                  className="flex items-center gap-1 text-[9px] text-[#8E9CAE]/80"
                  title="Exchange data delayed by 15 mins for free-tier compliance"
                >
                  <Clock size={10} />
                  <span>15m</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ticker;

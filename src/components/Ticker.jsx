import React from 'react';
import { ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

const Ticker = () => {
  const indices = [
    { name: 'NIFTY 50', price: '22,419.95', change: '+124.50', percent: '0.56%', up: true },
    { name: 'SENSEX', price: '73,903.91', change: '+363.20', percent: '0.49%', up: true },
    { name: 'BANK NIFTY', price: '48,201.05', change: '+254.10', percent: '0.53%', up: true },
    { name: 'NIFTY IT', price: '34,120.45', change: '-85.30', percent: '0.25%', up: false },
    { name: 'USD/INR', price: '83.45', change: '+0.02', percent: '0.02%', up: true },
    { name: 'BRENT OIL', price: '82.30', change: '-1.45', percent: '1.73%', up: false },
    { name: 'GOLD BEES', price: '58.45', change: '-0.15', percent: '0.26%', up: false },
  ];

  return (
    <div className="fixed top-20 left-0 right-0 h-10 bg-background/40 backdrop-blur-xl border-b border-white/5 z-40 overflow-hidden flex items-center">
      <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap items-center py-1">
        {[...indices, ...indices, ...indices].map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-8 border-r border-white/5">
            <span className="text-[10px] font-black text-muted tracking-tighter uppercase">{item.name}</span>
            <span className="text-xs font-black tracking-tight">{item.price}</span>
            <div className={`flex items-center gap-0.5 text-[10px] font-black ${item.up ? 'text-success' : 'text-accent'}`}>
              {item.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {item.percent}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

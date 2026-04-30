import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, BarChart3, Activity, PieChart, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import stocks from '../data/stocks.json';

const Analysis = () => {
  const topGainers = [...stocks].sort((a, b) => b.percentChange - a.percentChange).slice(0, 5);
  const topPicks = stocks.filter(s => s.confidenceScore > 85).slice(0, 5);

  return (
    <div className="pt-32 pb-12 px-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 glow-primary">
            <BarChart3 className="text-primary" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Technical Engine</h1>
            <p className="text-muted text-sm font-medium">Quantitative analysis & algorithmic signals for Nifty 50.</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="glass px-6 py-3 rounded-2xl border border-white/5 flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Market Breadth</span>
              <span className="text-lg font-black text-success">Bullish (38:12)</span>
           </div>
           <div className="glass px-6 py-3 rounded-2xl border border-white/5 flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Volatility (VIX)</span>
              <span className="text-lg font-black">12.45 <span className="text-xs text-success font-bold">(-2.1%)</span></span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Market Sentiment */}
        <div className="lg:col-span-1 glass-card">
           <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <PieChart className="text-primary" size={20} />
              Sector Strength
           </h3>
           <div className="space-y-6">
              {[
                { name: 'Banking', val: 88, col: 'bg-primary' },
                { name: 'IT Services', val: 42, col: 'bg-muted' },
                { name: 'Energy', val: 76, col: 'bg-primary' },
                { name: 'FMCG', val: 65, col: 'bg-primary/60' },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span>{s.name}</span>
                      <span>{s.val}%</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.val}%` }}
                        className={`h-full ${s.col}`}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* AI Top Picks */}
        <div className="lg:col-span-2 glass-card !p-0 overflow-hidden">
           <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-2">
                 <Zap className="text-primary" size={20} />
                 AI Algorithmic Picks
              </h3>
              <span className="text-[10px] font-bold text-muted uppercase">Updated 2m ago</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <tr>
                       <th className="px-6 py-4">Symbol</th>
                       <th className="px-6 py-4">Current Price</th>
                       <th className="px-6 py-4">Verdict</th>
                       <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {topPicks.map((s, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4 font-bold text-sm">{s.symbol}</td>
                         <td className="px-6 py-4 font-black">₹{s.price.toLocaleString('en-IN')}</td>
                         <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-black rounded uppercase">
                               Buy • {s.confidenceScore}% Conf.
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <Link to={`/stock/${s.id}`} className="text-xs font-black text-primary hover:underline">ANALYZE</Link>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Oversold Leaders', stocks: ['HDFCBANK', 'RELIANCE'], icon: ShieldAlert, col: 'text-success' },
           { label: 'Volume Breakouts', stocks: ['SBIN', 'ADANIENT'], icon: Activity, col: 'text-primary' },
           { label: 'Death Crossovers', stocks: ['INFY', 'WIPRO'], icon: TrendingUp, col: 'text-accent' },
           { label: '52-Week Highs', stocks: ['TRENT', 'ZOMATO'], icon: Target, col: 'text-primary' },
         ].map((group, i) => (
           <div key={i} className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                 <group.icon size={18} className={group.col} />
                 <h4 className="text-sm font-bold">{group.label}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                 {group.stocks.map(s => (
                   <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold">{s}</span>
                 ))}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Analysis;

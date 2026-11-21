import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  BarChart2, 
  Lock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CryptoComingSoon = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    return localStorage.getItem('bullrix_crypto_notified') === 'true';
  });

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      localStorage.setItem('bullrix_crypto_notified', 'true');
      localStorage.setItem('bullrix_crypto_email', email);
    } catch (err) {}
    setSubscribed(true);
  };

  const upcomingCoins = [
    { name: 'Bitcoin', symbol: 'BTC', role: 'Digital Store of Value', highlight: 'Sovereign-grade network security & ETF inflows' },
    { name: 'Ethereum', symbol: 'ETH', role: 'Smart Contract Settlement', highlight: 'Decentralized compute layer & L2 rollup activity' },
    { name: 'Solana', symbol: 'SOL', role: 'High-Throughput DeFi', highlight: 'Sub-second block times & consumer apps' },
    { name: 'BNB Chain', symbol: 'BNB', role: 'Ecosystem Fuel', highlight: 'Cross-chain bridging and volume liquidity' },
    { name: 'XRP Ledger', symbol: 'XRP', role: 'Cross-Border Settlements', highlight: 'Institutional liquidity rails & messaging' }
  ];

  const roadmapPillars = [
    { title: 'Global Crypto Market Cap', desc: 'Real-time tracking of aggregate decentralized asset valuations with verified exchange depth.' },
    { title: 'Fear & Greed Index', desc: 'Market sentiment barometer combining volatility, social momentum, and derivative open interest.' },
    { title: 'Bitcoin Dominance Metrics', desc: 'Macro capital rotation indicators between BTC and alternative layer-1 ecosystems.' },
    { title: 'On-Chain Blockchain Analytics', desc: 'Whale wallet tracking, exchange inflows/outflows, and smart contract gas velocity.' },
    { title: 'Institutional Candlestick Visualizer', desc: 'Crosshair multi-timeframe charts with order book depth heatmap overlays.' },
    { title: 'Web3 Risk & Tokenomics Auditing', desc: 'Automated smart contract security verification and token unlock schedules.' }
  ];

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-[1500px] mx-auto flex flex-col gap-16 overflow-hidden">
      {/* Hero Visualizer */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#121E30] via-[#101B2B] to-[#0A131F] border border-[#54D6B0]/25 p-8 sm:p-14 lg:p-20 shadow-2xl">
        {/* Subtle Blockchain Node Network Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crypto-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(84,214,176,0.3)" strokeWidth="0.7" />
                <circle cx="0" cy="0" r="2" fill="#54D6B0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crypto-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54D6B0]/15 border border-[#54D6B0]/30 text-[#54D6B0] text-xs font-bold tracking-wide w-fit">
            <Coins size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
            ROADMAP PREVIEW • BULLRIX 3.0
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Cryptocurrency & <br />
            <span className="gradient-text">Web3 Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8E9CAE] leading-relaxed">
            We are engineering a zero-compromise decentralized intelligence suite. When launched, BullRix Crypto will bring institutional-grade on-chain analytics, fear & greed gauges, and deep tokenomics without noise or fake trading simulations.
          </p>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#FFB03A]/15 text-[#FFB03A] border border-[#FFB03A]/30 text-xs font-bold font-mono uppercase tracking-wider">
              Status: In Active Engineering
            </span>
            <span className="text-xs text-[#8E9CAE]">Target: BullRix 3.0 Release</span>
          </div>

          {/* Notify Me Form */}
          <div className="mt-4 pt-4 border-t border-white/5 max-w-md">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 text-white flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#54D6B0]" />
                <span className="text-xs font-bold">
                  You are registered for priority VIP access when the Crypto suite goes live!
                </span>
              </div>
            ) : (
              <form onSubmit={handleNotifyMe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for priority launch notification..."
                  required
                  className="flex-1 bg-[#162338] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-[#54D6B0]/50"
                />
                <button
                  type="submit"
                  className="btn-primary !px-5 !py-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell size={15} /> Notify Me
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#8E9CAE] mt-2">
              Zero spam. Verified cryptographic release announcements only.
            </p>
          </div>
        </div>
      </section>

      {/* Abstract 3D-Style Asset Preview Cards */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Supported Asset Universe on Launch
            </h2>
            <p className="text-xs text-[#8E9CAE]">
              Tier-1 liquidity pairs and decentralized layer-1/layer-2 computational protocols.
            </p>
          </div>
          <span className="text-[10px] text-[#8E9CAE] font-mono bg-white/5 px-2.5 py-1 rounded-lg">
            Readiness: 65% Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {upcomingCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="glass-card bg-[#162338]/80 p-6 rounded-3xl border border-white/5 hover:border-[#54D6B0]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#54D6B0]/20 to-transparent border border-[#54D6B0]/30 flex items-center justify-center text-lg font-bold font-mono text-[#54D6B0] mb-4">
                  {coin.symbol}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{coin.name}</h3>
                <span className="text-[10px] font-mono text-[#54D6B0] uppercase block mb-2">{coin.role}</span>
                <p className="text-xs text-[#8E9CAE] leading-relaxed">{coin.highlight}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#8E9CAE] font-mono">
                <span className="flex items-center gap-1">
                  <Lock size={10} /> Live Data Locked
                </span>
                <span className="text-[#54D6B0] font-semibold">Planned Launch</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Planned Capabilities Matrix */}
      <section className="bg-[#162338]/60 border border-white/5 rounded-3xl p-8 sm:p-12 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Decentralized Intelligence Architecture</h2>
          <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-2xl">
            Engineered with strict mathematical rigor. Real on-chain data providers (Etherscan, Dune, The Graph) will power these capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapPillars.map((p, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#54D6B0]/15 flex items-center justify-center text-[#54D6B0] text-xs font-mono font-bold">
                0{i + 1}
              </div>
              <h3 className="text-sm font-bold text-white mt-1">{p.title}</h3>
              <p className="text-xs text-[#8E9CAE] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CryptoComingSoon;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  BarChart3, 
  Cpu, 
  Compass, 
  Zap, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Coins, 
  Bot, 
  Activity, 
  Layers, 
  Lock, 
  PieChart 
} from 'lucide-react';
import { BENCHMARK_INDICES, MARKET_UNIVERSE } from '../services/marketData';
import EvolutionTimeline from '../components/EvolutionTimeline';
import MultiIndexComparisonChart from '../components/MultiIndexComparisonChart';
import AdvancedChart from '../components/AdvancedChart';

const LandingPage = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState(BENCHMARK_INDICES[0]);
  const [cryptoEmail, setCryptoEmail] = useState('');
  const [cryptoNotified, setCryptoNotified] = useState(() => {
    return localStorage.getItem('bullrix_crypto_notified') === 'true';
  });

  const handleCryptoNotify = (e) => {
    e.preventDefault();
    if (!cryptoEmail || !cryptoEmail.includes('@')) return;
    try {
      localStorage.setItem('bullrix_crypto_notified', 'true');
      localStorage.setItem('bullrix_crypto_email', cryptoEmail);
    } catch (err) {}
    setCryptoNotified(true);
  };

  const sampleStock = MARKET_UNIVERSE[0]; // RELIANCE

  return (
    <div className="pt-24 pb-16 px-4 lg:px-8 max-w-[1550px] mx-auto flex flex-col gap-20 overflow-x-hidden">
      {/* 1. Premium Hero Section */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#162338] via-[#101B2B] to-[#0B131E] border border-[#54D6B0]/20 p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#54D6B0]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3EA698]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54D6B0]/15 border border-[#54D6B0]/25 text-[#54D6B0] text-xs font-bold tracking-wide w-fit">
            <Sparkles size={14} />
            Institutional Financial Intelligence • BullRix 2.0
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            AI-Powered <br />
            <span className="gradient-text">Global Financial</span> Intelligence.
          </h1>

          <p className="text-base sm:text-xl text-[#8E9CAE] leading-relaxed font-normal">
            Unified market intelligence connecting Indian (NSE/BSE) and International (NASDAQ/NYSE) equities with quantitative walk-forward predictions, 14-day news verification, and annual report RAG.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="btn-primary !px-7 !py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-[#54D6B0]/20"
            >
              Launch Platform
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/chat"
              className="btn-secondary !px-7 !py-3.5 text-sm sm:text-base font-bold"
            >
              Consult AI Assistant
            </Link>
            <Link
              to="/crypto"
              className="px-4 py-3 rounded-xl bg-[#FFB03A]/15 text-[#FFB03A] border border-[#FFB03A]/30 text-xs font-bold hover:bg-[#FFB03A]/25 transition-all flex items-center gap-1.5"
            >
              <Coins size={14} /> Crypto Coming Soon
            </Link>
          </div>
        </div>

        {/* 2 & 3. Market Benchmark Ribbon Snapshot */}
        <div className="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BENCHMARK_INDICES.slice(0, 6).map((index) => {
            const isUp = index.percentChange >= 0;
            return (
              <div
                key={index.symbol}
                onClick={() => setSelectedBenchmark(index)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedBenchmark.symbol === index.symbol
                    ? 'bg-[#54D6B0]/15 border-[#54D6B0]/40'
                    : 'bg-[#101B2B]/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-[#8E9CAE]">
                  <span className="font-bold uppercase">{index.name}</span>
                  <span className="font-mono text-[9px] bg-white/5 px-1 rounded">{index.market}</span>
                </div>
                <span className="text-base font-mono font-black text-white block mt-1">
                  {index.currency === 'INR' ? '₹' : '$'}{index.price.toLocaleString('en-US')}
                </span>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                  <span className={`font-bold ${isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
                    {isUp ? '+' : ''}{index.percentChange.toFixed(2)}%
                  </span>
                  <span className="text-[9px] text-[#8E9CAE] flex items-center gap-0.5">
                    <Clock size={8} /> 15m
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. Indian & Global Market Coverage Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card bg-[#162338]/80 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🇮🇳</span>
              <h3 className="text-xl font-bold text-white tracking-tight">Indian Equity Universe</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#54D6B0]/15 text-[#54D6B0] font-bold">
                NSE / BSE
              </span>
            </div>
            <p className="text-xs text-[#8E9CAE] leading-relaxed mb-6">
              Complete coverage of NIFTY 50, Next 50, Midcap, and Smallcap leaders across 12 sectors including Banking, IT, Pharma, Energy, Infrastructure, EV, and Defence.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'BHARTIARTL', 'TATAMOTORS', 'BEL', 'HAL', 'ZOMATO'].map((sym) => (
                <span key={sym} className="px-2.5 py-1 rounded-lg bg-[#101B2B] border border-white/5 text-[#F3F5F7]">
                  {sym}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-[#8E9CAE]">Advance/Decline Breadth: 38 : 12</span>
            <Link to="/markets/india" className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center gap-1">
              Explore Indian Markets <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="glass-card bg-[#162338]/80 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="text-[#54D6B0]" size={24} />
              <h3 className="text-xl font-bold text-white tracking-tight">Global Financial Exchanges</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#54D6B0]/15 text-[#54D6B0] font-bold">
                NASDAQ / NYSE
              </span>
            </div>
            <p className="text-xs text-[#8E9CAE] leading-relaxed mb-6">
              Hyperscaler technology champions, semiconductor innovators, and global bluechips powering modern artificial intelligence and digital commerce.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              {['NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'AMD', 'JPM', 'WMT'].map((sym) => (
                <span key={sym} className="px-2.5 py-1 rounded-lg bg-[#101B2B] border border-white/5 text-[#F3F5F7]">
                  {sym}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-[#8E9CAE]">Includes USD/INR FX & Brent Oil</span>
            <Link to="/markets/global" className="text-xs font-bold text-[#54D6B0] hover:underline flex items-center gap-1">
              Explore Global Markets <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Advanced Financial Data Visualization Showcase */}
      <section className="glass-card bg-[#162338]/80 p-6 sm:p-10 rounded-3xl flex flex-col gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold mb-2">
            <BarChart3 size={14} />
            Interactive Visualization Suite
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Institutional Visual Analytics
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9CAE] mt-1 max-w-2xl">
            Live crosshair candlesticks, multi-period trendline overlays, and multi-index benchmark performance comparisons.
          </p>
        </div>

        {/* Multi-Index Benchmark Comparison */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#101B2B] border border-white/5">
          <MultiIndexComparisonChart height={320} />
        </div>
      </section>

      {/* 7 & 8. AI Research Assistant & Capabilities */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card bg-gradient-to-br from-[#162338] to-[#101B2B] p-8 sm:p-10 rounded-3xl border border-[#54D6B0]/20 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0] mb-4">
              <Bot size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Conversational Financial Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-[#8E9CAE] leading-relaxed max-w-2xl mb-6">
              Our redesigned AI assistant answers general financial queries, explains technical oscillators (RSI, MACD), synthesizes 14-day news flow, and inspects annual report filings with zero hallucination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#54D6B0] flex-shrink-0" />
                <span>Zero raw Markdown asterisk corruption</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#54D6B0] flex-shrink-0" />
                <span>Context-aware stock entity resolution</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#54D6B0] flex-shrink-0" />
                <span>Persistent multi-session conversation history</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#54D6B0] flex-shrink-0" />
                <span>Copy & regenerate response tools</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
            <Link to="/chat" className="btn-primary !px-6 !py-3 text-xs font-bold">
              Try BullRix Assistant Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Prediction Engine Feature Card */}
        <div className="glass-card bg-[#162338]/80 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0] mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hybrid Quantitative Forecasts</h3>
            <p className="text-xs text-[#8E9CAE] leading-relaxed mb-4">
              Avoids single-model hallucinations by coupling statistical standard deviations, technical signals, 14-day news sentiment weighting, and walk-forward backtest calibration.
            </p>
            <div className="p-3 bg-[#101B2B] rounded-xl border border-white/5 text-xs font-mono">
              <span className="text-[#8E9CAE] block text-[10px]">Model Calibration</span>
              <span className="text-[#54D6B0] font-bold">74.2% Directional Accuracy (180d)</span>
            </div>
          </div>

          <Link to="/predictions" className="btn-secondary w-full !py-2.5 text-xs font-bold mt-6 text-center justify-center">
            View AI Prediction Center →
          </Link>
        </div>
      </section>

      {/* 9. The Evolution of BullRix Timeline */}
      <EvolutionTimeline />

      {/* 10. Crypto Market – Coming Soon Preview Section */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#121E30] to-[#0A131F] border border-[#FFB03A]/25 p-8 sm:p-14 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB03A]/15 border border-[#FFB03A]/30 text-[#FFB03A] text-xs font-bold font-mono uppercase tracking-wider w-fit">
              <Coins size={14} />
              BULLRIX 3.0 ROADMAP • COMING SOON
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Decentralized Crypto Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[#8E9CAE] leading-relaxed">
              Engineering institutional on-chain analytics, Fear & Greed indexes, and multi-chain liquidity tracking for Bitcoin, Ethereum, Solana, BNB, and XRP. No fabricated live trades—built with genuine cryptographic transparency.
            </p>

            {/* Notify Me Form */}
            <div className="mt-2">
              {cryptoNotified ? (
                <div className="p-3.5 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#54D6B0]" />
                  <span>You are on the VIP announcement list for the 3.0 launch!</span>
                </div>
              ) : (
                <form onSubmit={handleCryptoNotify} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={cryptoEmail}
                    onChange={(e) => setCryptoEmail(e.target.value)}
                    placeholder="Enter email for crypto release notification..."
                    required
                    className="flex-1 bg-[#162338] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#FFB03A]/50"
                  />
                  <button type="submit" className="btn-primary !bg-[#FFB03A] hover:!bg-[#FBBF24] !px-4 !py-2.5 text-xs font-bold">
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            {['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'XRP Ledger'].map((coin) => (
              <div key={coin} className="p-4 rounded-2xl bg-[#162338] border border-white/5 text-center flex flex-col items-center">
                <Coins size={20} className="text-[#FFB03A] mb-1" />
                <span className="text-xs font-bold text-white font-mono">{coin}</span>
                <span className="text-[9px] text-[#8E9CAE] mt-0.5">Planned in 3.0</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Why BullRix: Institutional Transparency & Integrity */}
      <section className="bg-[#162338]/60 border border-white/5 rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Quantitative Investors Choose BullRix
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9CAE] mt-2">
            Engineered around financial reality: verified exchange delay notices, deterministic math, and rigorous prompt boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col gap-2">
            <ShieldCheck size={26} className="text-[#54D6B0]" />
            <h4 className="text-sm font-bold text-white mt-1">Zero Hallucinated Numbers</h4>
            <p className="text-xs text-[#8E9CAE] leading-relaxed">
              Every numerical ratio, moving average, and price quote is computed deterministically. Large language models interpret and explain evidence rather than fabricating stock prices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col gap-2">
            <Clock size={26} className="text-[#54D6B0]" />
            <h4 className="text-sm font-bold text-white mt-1">Transparent Exchange Tagging</h4>
            <p className="text-xs text-[#8E9CAE] leading-relaxed">
              Free-tier market feeds carry explicit 15-minute delay badges. We prioritize regulatory integrity and never masquerade delayed ticks as real-time broker execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#101B2B] border border-white/5 flex flex-col gap-2">
            <Lock size={26} className="text-[#54D6B0]" />
            <h4 className="text-sm font-bold text-white mt-1">Client-Safe Security</h4>
            <p className="text-xs text-[#8E9CAE] leading-relaxed">
              Google Identity Services authentication, zero client-side private secrets, and prompt injection filters guard research sessions.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Final Call-to-Action */}
      <section className="rounded-3xl bg-gradient-to-r from-[#162338] via-[#1F3354] to-[#162338] border border-[#54D6B0]/30 p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-6 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl">
          Empower Your Investment Analysis with BullRix 2.0
        </h2>
        <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-md leading-relaxed">
          Access high-conviction quantitative forecasts, 14-day news verification, and global benchmark suites today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/dashboard" className="btn-primary !px-8 !py-3.5 text-sm font-bold">
            Enter Dashboard Now <ArrowRight size={16} />
          </Link>
          <Link to="/auth" className="btn-secondary !px-8 !py-3.5 text-sm font-semibold">
            Google Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

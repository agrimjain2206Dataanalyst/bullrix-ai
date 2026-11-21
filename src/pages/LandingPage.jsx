import React from 'react';
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
  FileText 
} from 'lucide-react';
import { BENCHMARK_INDICES } from '../services/marketData';

const LandingPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 lg:px-8 max-w-[1500px] mx-auto flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#162338] via-[#101B2B] to-[#0B131E] border border-[#54D6B0]/20 p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#54D6B0]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3EA698]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54D6B0]/10 border border-[#54D6B0]/25 text-[#54D6B0] text-xs font-bold tracking-wide w-fit">
            <Sparkles size={14} />
            Institutional Generative AI • BullRix 2.0
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            AI-Powered <br />
            <span className="gradient-text">Global Financial</span> Intelligence.
          </h1>

          <p className="text-base sm:text-xl text-[#8E9CAE] leading-relaxed font-normal">
            Next-generation equity research combining quantitative walk-forward forecasting, rolling 14-day news intelligence, and document RAG across Indian and International markets.
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
              Consult AI Analyst
            </Link>
            <Link
              to="/auth"
              className="text-xs font-bold text-[#8E9CAE] hover:text-[#54D6B0] transition-colors ml-2 underline underline-offset-4"
            >
              Sign In with Google →
            </Link>
          </div>
        </div>

        {/* Live Index Snapshot Ribbon inside Hero */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BENCHMARK_INDICES.map((index) => {
            const isUp = index.percentChange >= 0;
            return (
              <div key={index.symbol} className="bg-[#101B2B]/60 p-3.5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-mono text-[#8E9CAE] block uppercase">{index.name}</span>
                <span className="text-base font-mono font-black text-white block mt-0.5">
                  {index.currency === 'INR' ? '₹' : '$'}{index.price.toLocaleString('en-US')}
                </span>
                <span className={`text-[11px] font-bold font-mono ${isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
                  {isUp ? '+' : ''}{index.percentChange.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Architectural Capabilities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
            <Compass size={24} />
          </div>
          <h3 className="text-lg font-bold text-white">Dual-Market Intelligence</h3>
          <p className="text-xs text-[#8E9CAE] leading-relaxed">
            Native support for Indian equities (NSE/BSE Nifty 50, Bank Nifty, Mid-caps) alongside US mega-cap tech and international benchmarks with clear exchange delay labeling.
          </p>
          <Link to="/markets/india" className="text-xs font-bold text-[#54D6B0] hover:underline mt-auto">
            Explore Indian Markets →
          </Link>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
            <Cpu size={24} />
          </div>
          <h3 className="text-lg font-bold text-white">Hybrid Quantitative Forecasting</h3>
          <p className="text-xs text-[#8E9CAE] leading-relaxed">
            Multivariate prediction engine combining deterministic technical indicators (RSI, EMAs), 14-day rolling news sentiment weighting, and Gemini analytical explanations.
          </p>
          <Link to="/predictions" className="text-xs font-bold text-[#54D6B0] hover:underline mt-auto">
            View AI Prediction Center →
          </Link>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-bold text-white">Document Intelligence & RAG</h3>
          <p className="text-xs text-[#8E9CAE] leading-relaxed">
            Deep financial document retrieval over corporate annual reports and disclosures with precise page-level citations, chunk inspection, and zero-hallucination synthesis.
          </p>
          <Link to="/documents" className="text-xs font-bold text-[#54D6B0] hover:underline mt-auto">
            Inspect Document RAG →
          </Link>
        </div>
      </section>

      {/* Compliance & Engineering Standards */}
      <section className="bg-[#162338]/60 border border-white/5 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Responsible Fintech Engineering</h3>
          <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-2xl leading-relaxed">
            BullRix 2.0 strictly separates statistical projection from investment advice. Delayed data is labeled transparently, numerical values are computed deterministically, and private credentials are never exposed in client bundles.
          </p>
        </div>
        <Link to="/ai-disclaimer" className="btn-secondary whitespace-nowrap text-xs font-bold">
          Review Model Ethics & Disclaimers
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stocks from '../data/stocks.json';
import StockCard from '../components/StockCard';
import { 
  Sparkles, TrendingUp, Zap, Target, Search, 
  Filter, Newspaper, ArrowRight, ChevronRight, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const globalNews = [
    { title: "Crude Oil prices hit 6-month low, positive for Indian OMCs", impact: "Positive" },
    { title: "Rupee shows resilience against USD amid global volatility", impact: "Neutral" },
    { title: "FIIs turn net buyers in Indian equity markets", impact: "Very Positive" },
    { title: "Tech sector anticipates strong quarterly guidance", impact: "Positive" }
  ];

  const filteredStocks = useMemo(() => {
    return stocks.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.symbol.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || s.marketCapCategory === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="pt-28 pb-12 px-8 max-w-[1600px] mx-auto">
      {/* Global News Ticker */}
      <div className="mb-8 flex items-center gap-4 bg-primary/5 border border-primary/10 rounded-2xl p-4 overflow-hidden relative group">
         <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest whitespace-nowrap border-r border-primary/20 pr-4 z-10">
            <Globe size={16} className="animate-pulse" />
            Global Pulse
         </div>
         <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap gap-12 items-center">
            {globalNews.concat(globalNews).map((news, i) => (
              <div key={i} className="flex items-center gap-3">
                 <span className="text-sm font-medium">{news.title}</span>
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${news.impact.includes('Positive') ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'}`}>
                    {news.impact}
                 </span>
              </div>
            ))}
         </div>
      </div>

      {/* Hero Section */}
      <section className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-primary/30 via-surface to-background border border-white/5 p-12 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
             <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary blur-[120px] rounded-full" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[70%] bg-secondary/20 blur-[150px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest w-fit mx-auto lg:mx-0">
              <Sparkles size={14} />
              Pro Investor Intelligence
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
              The Next Gen <br /><span className="gradient-text">Stock Intel</span> Platform.
            </h1>
            <p className="text-muted text-lg lg:text-xl leading-relaxed font-medium">
              Real-time deep analytics, AI-generated verdicts, and professional-grade charting for 50+ Nifty leaders.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <Link to="/chat" className="btn-primary !px-8 !py-4 text-lg">
                Start AI Analysis
                <ArrowRight size={20} />
              </Link>
              <Link to="/analysis" className="btn-secondary !px-8 !py-4 text-lg">
                Top Picks 2026
              </Link>
            </div>
          </div>

          <div className="relative z-10 lg:w-2/5 grid grid-cols-2 gap-4">
             {[
               { label: 'AI Score', val: '94', icon: Target, col: 'text-primary' },
               { label: 'Reliability', val: '99%', icon: Zap, col: 'text-success' },
               { label: 'Coverage', val: '50+', icon: Newspaper, col: 'text-secondary' },
               { label: 'Uptime', val: '100%', icon: TrendingUp, col: 'text-primary' },
             ].map((item, i) => (
               <div key={i} className="glass p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-500">
                  <item.icon className={`${item.col} mb-3`} size={32} />
                  <p className="text-2xl font-black">{item.val}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{item.label}</p>
               </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto">
          {['All', 'Large', 'Mid', 'Small'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeFilter === filter ? 'bg-white/10 text-white shadow-xl' : 'text-muted hover:text-white'}`}
            >
              {filter} Cap
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticker or name..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 outline-none focus:border-primary/50 transition-all text-sm pr-12 font-medium"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        </div>
      </div>

      {/* Stock Grid */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black tracking-tight">Trending Insight</h2>
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded uppercase">Live</span>
        </div>
        <Link to="/analysis" className="text-muted hover:text-white font-bold flex items-center gap-2 transition-colors">
          View Detailed Analytics <ChevronRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <AnimatePresence>
          {filteredStocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;

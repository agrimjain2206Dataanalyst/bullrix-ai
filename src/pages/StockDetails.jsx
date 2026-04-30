import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowUpRight, ArrowDownRight, Zap, Target, 
  ShieldCheck, AlertTriangle, TrendingUp, Info, Bookmark, 
  MessageSquare, FileText, Share2, Plus
} from 'lucide-react';
import stocks from '../data/stocks.json';
import AdvancedChart from '../components/AdvancedChart';

const StockDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState("");
  const stock = stocks.find(s => s.id === id);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(id));
    const savedNotes = localStorage.getItem(`notes_${id}`) || "";
    setNotes(savedNotes);
  }, [id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem(`notes_${id}`, e.target.value);
  };

  if (!stock) return <div className="pt-32 text-center">Stock not found</div>;

  const isPositive = stock.percentChange >= 0;

  return (
    <div className="pt-28 pb-12 px-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black">{stock.name}</h1>
              <span className="text-muted text-lg font-medium">{stock.symbol}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${stock.marketCapCategory === 'Large' ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted'}`}>
                {stock.marketCapCategory} Cap
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>Sector: <span className="text-white font-medium">{stock.sector}</span></span>
              <span>•</span>
              <span>NSE: <span className="text-white font-medium">EQ</span></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleBookmark}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isBookmarked ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            {isBookmarked ? 'Bookmarked' : 'Add to Watchlist'}
          </button>
          <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/5">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Price Summary Card */}
          <div className="glass-card flex flex-wrap justify-between items-center gap-8">
            <div className="flex flex-col">
              <span className="text-muted text-xs font-bold uppercase tracking-widest mb-1">Current Price</span>
              <div className="flex items-end gap-3">
                <h2 className="text-5xl font-black tracking-tighter">₹{stock.price.toLocaleString('en-IN')}</h2>
                <div className={`flex items-center gap-1 font-bold text-lg mb-1 ${isPositive ? 'text-success' : 'text-accent'}`}>
                  {isPositive ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />}
                  {Math.abs(stock.percentChange)}%
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
              {[
                { label: 'Open', value: `₹${stock.ohlc?.open || '-'}` },
                { label: 'High', value: `₹${stock.ohlc?.high || '-'}` },
                { label: 'Low', value: `₹${stock.ohlc?.low || '-'}` },
                { label: 'Confidence', value: `${stock.confidenceScore}%`, color: 'text-primary' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</span>
                  <span className={`text-lg font-bold ${item.color || ''}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="glass-card min-h-[500px]">
            <AdvancedChart data={stock.history} color={isPositive ? '#10b981' : '#f43f5e'} type="area" />
          </div>

          {/* Tabs Section */}
          <div className="flex border-b border-white/5 gap-8">
            {['Overview', 'Analysis', 'News', 'Peers'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-primary' : 'text-muted hover:text-white'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
             {activeTab === 'Overview' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">About {stock.name}</h3>
                    <p className="text-muted leading-relaxed">
                      {stock.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 glass rounded-2xl">
                          <span className="text-[10px] font-bold text-muted uppercase">Volatility</span>
                          <p className="text-lg font-bold">{stock.volatilityScore > 20 ? 'High' : 'Moderate'}</p>
                       </div>
                       <div className="p-4 glass rounded-2xl">
                          <span className="text-[10px] font-bold text-muted uppercase">Risk Level</span>
                          <p className={`text-lg font-bold ${stock.riskLevel === 'Low' ? 'text-success' : 'text-accent'}`}>{stock.riskLevel}</p>
                       </div>
                    </div>
                  </div>
                  <div className="glass-card !bg-primary/5 border border-primary/20">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                       <ShieldCheck className="text-primary" /> Pros & Cons
                    </h3>
                    <div className="space-y-4">
                       <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                             <Plus size={12} className="text-success" />
                          </div>
                          <p className="text-sm">Strong technical trend with low volume-weighted volatility.</p>
                       </div>
                       <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                             <Plus size={12} className="text-success" />
                          </div>
                          <p className="text-sm">Institutional accumulation detected in recent sessions.</p>
                       </div>
                       <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                             <AlertTriangle size={12} className="text-accent" />
                          </div>
                          <p className="text-sm">Global macro headwinds might affect short-term margins.</p>
                       </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <span className="text-sm font-bold">BullRix Recommendation:</span>
                       <span className="px-3 py-1 bg-primary text-white rounded-lg font-bold">{stock.recommendation}</span>
                    </div>
                  </div>
               </div>
             )}

             {activeTab === 'News' && (
               <div className="space-y-4">
                  {stock.news?.map((item, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-primary">{item.source} • {item.date}</span>
                       </div>
                       <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                       <p className="text-sm text-muted line-clamp-2">{item.summary}</p>
                    </div>
                  ))}
               </div>
             )}
          </div>
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           {/* Recommendation Engine Card */}
           <div className="glass-card !p-0 overflow-hidden border border-primary/20 glow-primary bg-gradient-to-br from-primary/10 to-transparent">
              <div className="p-6 border-b border-white/5">
                 <div className="flex items-center gap-3 mb-4">
                    <Zap className="text-primary" />
                    <h2 className="text-xl font-bold">AI Analyst Verdict</h2>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-background rounded-2xl mb-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-muted uppercase">Verdict</span>
                       <span className="text-2xl font-black text-primary">{stock.recommendation}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-bold text-muted uppercase">Confidence</span>
                       <span className="text-2xl font-black block">{stock.confidenceScore}%</span>
                    </div>
                 </div>

                 <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted">Target Range:</span>
                       <span className="font-bold text-success">₹{stock.buyRange}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted">Exit Target:</span>
                       <span className="font-bold">₹{stock.sellTarget}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted">Stop Loss:</span>
                       <span className="font-bold text-accent">₹{stock.stopLoss}</span>
                    </div>
                 </div>

                 <Link to="/chat" className="btn-primary w-full shadow-lg shadow-primary/20">
                    Ask AI about {stock.symbol}
                 </Link>
              </div>
           </div>

           {/* Investor Notes */}
           <div className="glass-card">
              <div className="flex items-center gap-3 mb-4">
                 <FileText className="text-muted" />
                 <h3 className="font-bold">Private Notes</h3>
              </div>
              <textarea 
                value={notes}
                onChange={handleNoteChange}
                placeholder="Write your analysis, strategy or reminders for this stock..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-primary/50 transition-all resize-none"
              />
              <p className="text-[10px] text-muted mt-2 text-right italic">Notes are saved locally.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity, Bookmark, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isPositive = stock.percentChange >= 0;

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(stock.id));
  }, [stock.id]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks = bookmarks.includes(stock.id) ? bookmarks.filter(id => id !== stock.id) : [...bookmarks, stock.id];
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link to={`/stock/${stock.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="glass-card flex flex-col gap-4 relative overflow-hidden group h-full border-white/5 hover:border-primary/30"
      >
        {/* Background Glow */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 ${isPositive ? 'bg-success' : 'bg-accent'}`} />

        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-muted text-[10px] font-bold uppercase tracking-wider">{stock.symbol}</span>
               <span className={`px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase ${stock.recommendation === 'BUY' ? 'bg-success/20 text-success' : stock.recommendation === 'SELL' ? 'bg-accent/20 text-accent' : 'bg-muted/20 text-muted'}`}>
                  {stock.recommendation}
               </span>
            </div>
            <h3 className="text-lg font-bold truncate max-w-[150px]">{stock.name}</h3>
          </div>
          <button 
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-all duration-300 z-10 ${isBookmarked ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-muted hover:text-white'}`}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter">₹{stock.price.toLocaleString('en-IN')}</span>
            <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-success' : 'text-accent'}`}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(stock.percentChange)}%
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-[9px] text-muted font-bold uppercase tracking-widest">
              <Zap size={10} className="text-primary" />
              Score
            </div>
            <div className={`text-xl font-black ${stock.confidenceScore > 80 ? 'text-primary' : 'text-muted'}`}>
              {stock.confidenceScore}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <span className="text-[10px] text-muted font-bold uppercase flex items-center gap-1.5">
            <TrendingUp size={12} className={isPositive ? 'text-success' : 'text-accent'} />
            {stock.trend}
          </span>
          <span className="text-[10px] text-primary font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
             Analyze →
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default StockCard;

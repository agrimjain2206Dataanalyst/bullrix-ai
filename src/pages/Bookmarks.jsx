import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Search, Trash2, ArrowRight } from 'lucide-react';
import stocks from '../data/stocks.json';
import StockCard from '../components/StockCard';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedStocks, setBookmarkedStocks] = useState([]);
  
  useEffect(() => {
    const refreshBookmarks = () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const filtered = stocks.filter(s => bookmarks.includes(s.id));
      setBookmarkedStocks(filtered);
    };

    refreshBookmarks();
    window.addEventListener('storage', refreshBookmarks);
    return () => window.removeEventListener('storage', refreshBookmarks);
  }, []);

  const clearAll = () => {
    localStorage.removeItem('bookmarks');
    setBookmarkedStocks([]);
  };

  return (
    <div className="pt-32 pb-12 px-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30 glow-primary">
            <Bookmark className="text-primary" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Your Watchlist</h1>
            <p className="text-muted text-sm font-medium">Tracking {bookmarkedStocks.length} high-conviction opportunities.</p>
          </div>
        </div>
        
        {bookmarkedStocks.length > 0 && (
          <button 
            onClick={clearAll}
            className="btn-secondary text-xs font-black uppercase tracking-widest px-6 py-3 border-accent/20 hover:bg-accent/10 hover:text-accent transition-all"
          >
            <Trash2 size={16} /> Clear All Watchlist
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {bookmarkedStocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {bookmarkedStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card flex flex-col items-center justify-center py-32 text-center border-dashed border-white/10"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Bookmark className="text-muted" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No bookmarks yet</h3>
            <p className="text-muted max-w-md mb-8">
              Start building your high-conviction portfolio by bookmarking stocks from the dashboard or analysis pages.
            </p>
            <Link to="/" className="btn-primary">
              Explore Markets <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookmarks;

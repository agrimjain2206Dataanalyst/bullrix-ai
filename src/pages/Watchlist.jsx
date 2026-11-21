import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2, ArrowRight, Download, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARKET_UNIVERSE } from '../services/marketData';
import StockCard from '../components/StockCard';

const Watchlist = () => {
  const [bookmarkedStocks, setBookmarkedStocks] = useState([]);

  const refreshBookmarks = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('bullrix_watchlist') || '[]');
      const matches = MARKET_UNIVERSE.filter(
        (s) => stored.includes(s.id) || stored.includes(s.symbol)
      );
      setBookmarkedStocks(matches);
    } catch (e) {
      setBookmarkedStocks([]);
    }
  };

  useEffect(() => {
    refreshBookmarks();
    window.addEventListener('storage', refreshBookmarks);
    return () => window.removeEventListener('storage', refreshBookmarks);
  }, []);

  const clearAll = () => {
    localStorage.removeItem('bullrix_watchlist');
    setBookmarkedStocks([]);
  };

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto min-h-screen flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="text-[#54D6B0]" size={26} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Institutional Watchlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9CAE]">
            Tracking {bookmarkedStocks.length} high-conviction opportunities across Indian and Global exchanges.
          </p>
        </div>

        {bookmarkedStocks.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#FF5C75] bg-[#FF5C75]/10 border border-[#FF5C75]/20 hover:bg-[#FF5C75]/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 size={14} /> Clear Watchlist
            </button>
          </div>
        )}
      </div>

      {/* Watchlist Grid or Empty State */}
      <AnimatePresence mode="popLayout">
        {bookmarkedStocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {bookmarkedStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-[#162338]/60 flex flex-col items-center justify-center py-24 text-center border-dashed border-white/10 rounded-3xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#8E9CAE] mb-4">
              <Bookmark size={30} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Active Watchlist Assets</h3>
            <p className="text-xs text-[#8E9CAE] max-w-sm mb-6 leading-relaxed">
              Bookmark stocks from the Dashboard or Market discovery suites to monitor price action and hybrid predictions.
            </p>
            <Link to="/dashboard" className="btn-primary !px-6 !py-2.5 text-xs font-bold">
              Explore Markets <ArrowRight size={15} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Watchlist;

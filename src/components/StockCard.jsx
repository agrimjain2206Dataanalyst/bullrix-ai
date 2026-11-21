import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Bookmark, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isPositive = stock.percentChange >= 0;

  useEffect(() => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bullrix_watchlist') || '[]');
      setIsBookmarked(bookmarks.includes(stock.id) || bookmarks.includes(stock.symbol));
    } catch (e) {}
  }, [stock.id, stock.symbol]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bullrix_watchlist') || '[]');
      const targetId = stock.id;
      let updated;
      if (bookmarks.includes(targetId)) {
        updated = bookmarks.filter((id) => id !== targetId);
        setIsBookmarked(false);
      } else {
        updated = [...bookmarks, targetId];
        setIsBookmarked(true);
      }
      localStorage.setItem('bullrix_watchlist', JSON.stringify(updated));
    } catch (e) {}
  };

  const currencySymbol = stock.market === 'US' ? '$' : '₹';

  return (
    <Link to={`/stock/${stock.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="glass-card flex flex-col justify-between h-full bg-[#162338]/80 border border-white/5 hover:border-[#54D6B0]/30 hover:shadow-xl group"
      >
        <div>
          {/* Header Row */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-mono font-bold text-[#54D6B0] tracking-wide">
                  {stock.symbol}
                </span>
                <span className="text-[9px] uppercase font-semibold px-1.5 py-0.2 rounded bg-white/5 text-[#8E9CAE]">
                  {stock.exchange || 'NSE'}
                </span>
                {stock.isDelayed && (
                  <span className="text-[8px] text-[#8E9CAE] flex items-center gap-0.5" title="15-min delayed">
                    <Clock size={8} /> 15m
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#54D6B0] transition-colors line-clamp-1">
                {stock.name}
              </h3>
            </div>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#54D6B0]/15 border-[#54D6B0]/40 text-[#54D6B0]'
                  : 'bg-white/5 border-transparent text-[#8E9CAE] hover:text-white hover:bg-white/10'
              }`}
              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Price & Change Row */}
          <div className="flex items-baseline justify-between my-3">
            <div>
              <span className="text-2xl font-black font-mono tracking-tight text-[#F3F5F7]">
                {currencySymbol}
                {stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <div
                className={`flex items-center gap-1 text-xs font-bold mt-0.5 ${
                  isPositive ? 'text-[#54D6B0]' : 'text-[#FF5C75]'
                }`}
              >
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>
                  {isPositive ? '+' : ''}
                  {stock.percentChange.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* AI Score Badge */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8E9CAE] flex items-center gap-1">
                <Sparkles size={10} className="text-[#54D6B0]" /> AI Score
              </span>
              <span className="text-base font-black font-mono text-[#54D6B0]">
                {stock.confidenceScore}
                <span className="text-[10px] text-[#8E9CAE]">/100</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8E9CAE]">
          <span className="flex items-center gap-1">
            <TrendingUp size={12} className={isPositive ? 'text-[#54D6B0]' : 'text-[#FF5C75]'} />
            <span className="truncate max-w-[110px]">{stock.trend}</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            stock.recommendation === 'BUY'
              ? 'bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30'
              : stock.recommendation === 'SELL'
              ? 'bg-[#FF5C75]/15 text-[#FF5C75] border border-[#FF5C75]/30'
              : 'bg-white/5 text-[#8E9CAE] border border-white/10'
          }`}>
            {stock.recommendation}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default StockCard;

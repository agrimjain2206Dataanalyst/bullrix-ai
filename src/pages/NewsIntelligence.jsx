import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Sparkles, Filter, Search, ExternalLink, Calendar, CheckCircle2, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import { NewsIntelligenceService } from '../services/newsService';

const NewsIntelligence = () => {
  const [selectedTicker, setSelectedTicker] = useState('ALL');
  const [marketFilter, setMarketFilter] = useState('IN');
  const [search, setSearch] = useState('');
  const [liveNews, setLiveNews] = useState([]);
  const [newsSource, setNewsSource] = useState('Initializing Google News Feed...');
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await NewsIntelligenceService.fetchLiveNews({
        ticker: selectedTicker,
        market: marketFilter,
        query: search.trim() ? search : undefined,
        limit: 30
      });
      setLiveNews(result.articles);
      setNewsSource(result.source);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Failed to load news:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedTicker, marketFilter]);

  const articles = useMemo(() => {
    if (!search.trim()) return liveNews;
    const q = search.toLowerCase();
    return liveNews.filter((a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
  }, [liveNews, search]);

  const summary = useMemo(() => {
    if (!articles.length) {
      return {
        totalArticles: 0,
        positiveCount: 0,
        negativeCount: 0,
        neutralCount: 0,
        netSentimentScore: 0.5,
        sentimentLabel: 'Neutral / Calibrating'
      };
    }
    let pos = 0, neg = 0, neu = 0;
    articles.forEach((a) => {
      if (a.sentiment === 'Positive') pos++;
      else if (a.sentiment === 'Negative') neg++;
      else neu++;
    });
    const net = (pos * 1 + neu * 0.5 + neg * 0) / articles.length;
    let label = 'Neutral Trajectory';
    if (net >= 0.6) label = 'Bullish Catalysts Dominant';
    else if (net <= 0.4) label = 'Defensive / Bearish Tone';

    return {
      totalArticles: articles.length,
      positiveCount: pos,
      negativeCount: neg,
      neutralCount: neu,
      netSentimentScore: parseFloat(net.toFixed(2)),
      sentimentLabel: label
    };
  }, [articles]);

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper size={26} className="text-[#54D6B0]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              14-Day Financial News Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8E9CAE]">
            Rolling 14-day discovery powered by Google News RSS feeds, publisher attribution, and algorithmic financial sentiment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono bg-[#162338] px-3 py-1.5 rounded-xl border border-white/5 text-[#54D6B0]">
            <Radio size={13} className="animate-pulse" />
            <span>Feed: {newsSource}</span>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-mono bg-[#162338] hover:bg-[#1E2D4A] px-3.5 py-2 rounded-xl border border-white/5 text-white transition-all cursor-pointer"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync ({lastRefreshed})</span>
          </button>
        </div>
      </div>

      {/* Sentiment Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card bg-[#162338]/80 p-4">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Ingested Stories</span>
          <span className="text-2xl font-black font-mono text-white mt-1 block">
            {summary.totalArticles}
          </span>
          <span className="text-[10px] text-[#54D6B0]">Rolling 14-Day Deduplicated</span>
        </div>

        <div className="glass-card bg-[#162338]/80 p-4">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Bullish Disclosures</span>
          <span className="text-2xl font-black font-mono text-[#54D6B0] mt-1 block">
            {summary.positiveCount}
          </span>
          <span className="text-[10px] text-[#8E9CAE]">Deal wins, earnings, Capex</span>
        </div>

        <div className="glass-card bg-[#162338]/80 p-4">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Neutral / Macro Disclosures</span>
          <span className="text-2xl font-black font-mono text-[#FFB03A] mt-1 block">
            {summary.neutralCount}
          </span>
          <span className="text-[10px] text-[#8E9CAE]">Policy, central banks & rates</span>
        </div>

        <div className="glass-card bg-[#162338]/80 p-4">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Net Sentiment Classification</span>
          <span className="text-lg font-black font-mono text-[#54D6B0] mt-1 block truncate">
            {summary.sentimentLabel}
          </span>
          <span className="text-[10px] text-[#8E9CAE]">Aggregate Score: {summary.netSentimentScore} / 1.0</span>
        </div>
      </div>

      {/* Market Selector & Ticker Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className="flex bg-[#162338] p-1 rounded-xl border border-white/5 mr-2">
            <button
              onClick={() => setMarketFilter('IN')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                marketFilter === 'IN' ? 'bg-[#54D6B0] text-[#0B131E]' : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              India (NSE)
            </button>
            <button
              onClick={() => setMarketFilter('US')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                marketFilter === 'US' ? 'bg-[#54D6B0] text-[#0B131E]' : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Global (US)
            </button>
          </div>

          {(marketFilter === 'IN' 
            ? ['ALL', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ZOMATO', 'HAL']
            : ['ALL', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']
          ).map((ticker) => (
            <button
              key={ticker}
              onClick={() => setSelectedTicker(ticker)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedTicker === ticker
                  ? 'bg-[#54D6B0] text-[#0B131E]'
                  : 'bg-[#162338] text-[#8E9CAE] hover:text-white border border-white/5'
              }`}
            >
              {ticker}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords in stories..."
            className="w-full bg-[#162338] border border-white/10 rounded-xl py-2 px-3.5 pr-8 text-xs text-white outline-none focus:border-[#54D6B0]/50"
          />
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CAE]" />
        </div>
      </div>

      {/* News Feed Stream */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse glass-card bg-[#162338]/50 p-6 rounded-2xl h-28 border border-white/5" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="glass-card bg-[#162338]/50 p-12 text-center rounded-2xl border border-white/5">
          <Newspaper size={36} className="mx-auto text-[#8E9CAE] mb-3 opacity-50" />
          <h3 className="text-base font-bold text-white mb-1">No articles found in rolling 14-day window</h3>
          <p className="text-xs text-[#8E9CAE]">Try selecting another ticker or resetting your query filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((item) => (
            <div
              key={item.id}
              className="glass-card bg-[#162338]/75 p-5 border border-white/5 hover:border-[#54D6B0]/30 transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] font-mono">
                  <span className="font-bold text-[#54D6B0] bg-[#54D6B0]/10 px-2 py-0.5 rounded">
                    {item.publisher}
                  </span>
                  <span className="text-[#8E9CAE]">
                    Published: {new Date(item.publishedAt).toLocaleDateString()} ({item.publishedDaysAgo}d ago)
                  </span>
                  <span className="text-[#8E9CAE] uppercase px-1.5 py-0.2 rounded bg-white/5">
                    {item.category}
                  </span>
                  <span className="text-[#54D6B0] flex items-center gap-0.5 text-[9px]">
                    <CheckCircle2 size={10} /> Google News Feed Source
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8E9CAE] leading-relaxed max-w-4xl">
                  {item.summary}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                  item.sentiment === 'Positive'
                    ? 'bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30'
                    : item.sentiment === 'Negative'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'bg-white/5 text-[#8E9CAE]'
                }`}>
                  {item.sentiment} ({Math.round(item.sentimentScore * 100)}%)
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#8E9CAE] hover:text-[#54D6B0] flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span> <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsIntelligence;

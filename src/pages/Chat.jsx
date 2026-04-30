import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, TrendingUp, Search, Info, ExternalLink, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import stocks from '../data/stocks.json';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to BullRix Pro Analyst. I have access to deep analytics for 50+ Nifty leaders. How can I help your portfolio today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    
    // Find specific stock mention
    const foundStock = stocks.find(s => 
      q.includes(s.symbol.toLowerCase()) || q.includes(s.name.toLowerCase().split(' ')[0])
    );

    if (foundStock) {
      return {
        text: `Our deep analysis of ${foundStock.name} (${foundStock.symbol}) reveals a ${foundStock.recommendation} verdict with ${foundStock.confidenceScore}% confidence. Key metrics: Price ₹${foundStock.price}, Trend: ${foundStock.trend}, Volatility: ${foundStock.volatilityScore > 15 ? 'High' : 'Stable'}. We recommend a Buy Range of ₹${foundStock.buyRange} with a Stop Loss at ₹${foundStock.stopLoss}.`,
        link: `/stock/${foundStock.id}`
      };
    }

    if (q.includes("best") || q.includes("buy") || q.includes("picks")) {
      const topPicks = stocks
        .filter(s => s.recommendation === "BUY")
        .sort((a, b) => b.confidenceScore - a.confidenceScore)
        .slice(0, 3);
      
      return {
        text: `Based on current technical breakouts, our top 3 picks are: ${topPicks.map(s => `${s.symbol} (${s.confidenceScore}% conf.)`).join(", ")}. These stocks show low risk levels and strong institutional accumulation.`,
      };
    }

    if (q.includes("risky") || q.includes("sell") || q.includes("danger")) {
      const risky = stocks
        .filter(s => s.riskLevel === "High")
        .slice(0, 3);
      
      return {
        text: `Caution is advised for high-volatility stocks like: ${risky.map(s => s.symbol).join(", ")}. These counters are showing negative crossovers on daily charts.`,
      };
    }

    if (q.includes("sector")) {
      const sectors = stocks.reduce((acc, s) => {
        acc[s.sector] = (acc[s.sector] || 0) + (s.percentChange > 0 ? 1 : -1);
        return acc;
      }, {});
      const bestSector = Object.keys(sectors).reduce((a, b) => sectors[a] > sectors[b] ? a : b);
      
      return {
        text: `The ${bestSector} sector is currently showing the strongest momentum in the Indian market, with over 70% of companies trading above their 20-day EMAs.`,
      };
    }

    return {
      text: "I can provide specific targets, risk assessments, and verdicts for 50+ Indian stocks. Ask me about 'Top Picks', 'Risky Stocks', or a specific ticker like 'TCS' or 'RELIANCE'.",
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage.text);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: response.text, 
        isBot: true,
        link: response.link
      }]);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-6 px-8 max-w-5xl mx-auto h-[calc(100vh-20px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 glow-primary">
            <Bot className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">AI Portfolio Analyst</h1>
            <div className="flex items-center gap-1.5 text-xs text-success font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Intelligence Core v2.0
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 glass rounded-[32px] p-8 overflow-hidden flex flex-col mb-4 border border-white/10 relative">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${msg.isBot ? 'bg-primary/20 border border-primary/30' : 'bg-white/10'}`}>
                    {msg.isBot ? <Bot size={20} className="text-primary" /> : <User size={20} />}
                  </div>
                  <div className={`p-5 rounded-3xl text-[15px] leading-relaxed shadow-xl ${
                    msg.isBot 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                    {msg.link && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <Link to={msg.link} className="flex items-center gap-2 text-xs font-black text-primary hover:underline uppercase tracking-widest">
                          View Technical Deep-Dive <ExternalLink size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-8 flex gap-3">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about top picks, risky stocks, or 'RELIANCE'..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-primary/50 transition-all text-sm pr-14 font-medium"
            />
            <Zap className="absolute right-6 top-1/2 -translate-y-1/2 text-muted" size={20} />
          </div>
          <button 
            onClick={handleSend}
            className="w-16 h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-2xl shadow-primary/30"
          >
            <Send size={28} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {["Top 3 Stocks to buy?", "Which stocks are risky?", "Best performing sector?", "Analyze TCS"].map((s) => (
          <button 
            key={s}
            onClick={() => setInput(s)}
            className="text-[11px] uppercase tracking-widest font-black text-muted hover:text-primary transition-colors border border-white/5 px-4 py-2 rounded-xl hover:bg-white/5"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;

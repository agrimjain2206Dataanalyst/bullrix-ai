import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Zap, ArrowRight, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARKET_UNIVERSE } from '../services/marketData';
import { GeminiFinancialAI } from '../services/geminiService';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `### Welcome to BullRix AI 2.0 Institutional Financial Analyst
I provide quantitative analysis, technical momentum tracking, 14-day news verification, and risk evaluations across Indian (NSE/BSE) and Global markets.

**Suggested Queries to Explore:**
* *"Analyze current momentum and risk for RELIANCE"*
* *"Compare HDFCBANK valuation multiples against industry average"*
* *"Is NVIDIA showing an overbought RSI condition?"*
* *"Explain the macroeconomic headwinds facing Indian IT exporters"*\n\nHow may I assist your investment research portfolio today?`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (overrideText = null) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setIsTyping(true);

    // Detect if user mentions a stock in current universe
    const matchedStock = MARKET_UNIVERSE.find((s) => {
      const q = textToSend.toLowerCase();
      return q.includes(s.symbol.toLowerCase()) || q.includes(s.name.toLowerCase().split(' ')[0]);
    });

    try {
      const replyText = await GeminiFinancialAI.askFinancialAnalyst({
        prompt: textToSend,
        contextStock: matchedStock || selectedStock,
        conversationHistory: messages
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replyText,
          isBot: true,
          stockRef: matchedStock || selectedStock,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Encountered temporary difficulty connecting to the intelligence core. Please try again.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pt-28 pb-12 px-4 lg:px-8 max-w-5xl mx-auto h-[calc(100vh-20px)] flex flex-col">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">AI Financial Research Assistant</h1>
            <span className="text-[11px] text-[#54D6B0] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#54D6B0] animate-pulse" />
              Gemini 2.5 Flash Institutional Engine Active
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
            setSelectedStock(null);
          }}
          className="p-2 rounded-xl bg-[#162338] border border-white/5 text-[#8E9CAE] hover:text-white text-xs flex items-center gap-1 cursor-pointer"
          title="Reset Conversation"
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">New Session</span>
        </button>
      </div>

      {/* Main Chat Stream Container */}
      <div className="flex-1 glass-card bg-[#162338]/85 border border-[#54D6B0]/15 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                  <div
                    className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs ${
                      msg.isBot
                        ? 'bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                      msg.isBot
                        ? 'bg-[#101B2B] border border-white/10 text-[#F3F5F7] rounded-tl-none'
                        : 'bg-[#54D6B0] text-[#0B131E] font-semibold rounded-tr-none'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">{msg.text}</div>

                    {msg.stockRef && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-[#8E9CAE]">
                          Asset Identified: <strong>{msg.stockRef.symbol}</strong> (₹{msg.stockRef.price})
                        </span>
                        <Link
                          to={`/stock/${msg.stockRef.id}`}
                          className="text-[11px] font-bold text-[#54D6B0] hover:underline flex items-center gap-1"
                        >
                          View Full Deep-Dive <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}

                    <div className="text-[9px] text-[#8E9CAE]/70 text-right mt-1.5 font-mono">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
                  <Bot size={16} />
                </div>
                <div className="bg-[#101B2B] p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#54D6B0] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#54D6B0] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#54D6B0] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto border-t border-white/5 my-2">
          {['Analyze RELIANCE', 'Evaluate TCS deal wins', 'NVIDIA risk factors', 'HDFCBANK post-merger'].map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] font-semibold text-[#8E9CAE] hover:text-[#54D6B0] bg-[#101B2B] border border-white/5 px-3 py-1 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about technical trends, valuation, or news intelligence on any stock..."
            className="flex-1 bg-[#101B2B] border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white outline-none focus:border-[#54D6B0]/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping}
            className="btn-primary !px-6 !py-3 rounded-2xl cursor-pointer"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

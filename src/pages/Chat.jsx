import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  Compass, 
  TrendingUp, 
  HelpCircle, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARKET_UNIVERSE } from '../services/marketData';
import { GeminiFinancialAI } from '../services/geminiService';
import FinancialMarkdownRenderer from '../components/FinancialMarkdownRenderer';

const SUGGESTED_PROMPTS = [
  'Analyze Reliance Industries.',
  "Explain today's market trends.",
  'Compare NVIDIA and AMD.',
  'What is RSI?',
  'Explain portfolio diversification.',
  'Summarize the latest market news.'
];

const INITIAL_CONVERSATION = {
  id: 'conv-default',
  title: 'Market Research Session',
  messages: []
};

const Chat = () => {
  // Multi-conversation state
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('bullrix_chat_conversations');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [INITIAL_CONVERSATION];
  });

  const [activeConvId, setActiveConvId] = useState(() => {
    return conversations[0]?.id || 'conv-default';
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [editingConvId, setEditingConvId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bullrix_chat_conversations', JSON.stringify(conversations));
    } catch (e) {}
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const messages = activeConversation ? activeConversation.messages : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const createNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: `Research Session #${conversations.length + 1}`,
      messages: []
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setSidebarOpen(false);
  };

  const deleteConversation = (convId, e) => {
    e.stopPropagation();
    if (conversations.length <= 1) {
      setConversations([INITIAL_CONVERSATION]);
      setActiveConvId('conv-default');
      return;
    }
    const filtered = conversations.filter((c) => c.id !== convId);
    setConversations(filtered);
    if (activeConvId === convId) {
      setActiveConvId(filtered[0].id);
    }
  };

  const startRenameConversation = (conv, e) => {
    e.stopPropagation();
    setEditingConvId(conv.id);
    setEditTitle(conv.title);
  };

  const saveRenameConversation = (convId) => {
    if (!editTitle.trim()) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, title: editTitle.trim() } : c))
    );
    setEditingConvId(null);
  };

  const handleSend = async (overrideText = null) => {
    const query = overrideText || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      text: query.trim(),
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Auto-update conversation title if first message
    const updatedMessages = [...messages, userMsg];
    let newTitle = activeConversation.title;
    if (messages.length === 0) {
      newTitle = query.slice(0, 32) + (query.length > 32 ? '...' : '');
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId ? { ...c, title: newTitle, messages: updatedMessages } : c
      )
    );

    if (!overrideText) setInput('');
    setIsTyping(true);

    // Context stock resolution
    const matchedStock = MARKET_UNIVERSE.find((s) => {
      const q = query.toLowerCase();
      return q.includes(s.symbol.toLowerCase()) || q.includes(s.name.toLowerCase().split(' ')[0]);
    });

    try {
      const responseText = await GeminiFinancialAI.askFinancialAnalyst({
        prompt: query,
        contextStock: matchedStock || null,
        conversationHistory: updatedMessages
      });

      const botMsg = {
        id: `bot-${Date.now()}`,
        text: responseText,
        isBot: true,
        stockRef: matchedStock || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...updatedMessages, botMsg] }
            : c
        )
      );
    } catch (err) {
      const errorMsg = {
        id: `bot-${Date.now()}`,
        text: 'Encountered temporary difficulty processing this research inquiry. Please try again.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...updatedMessages, errorMsg] }
            : c
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = (lastUserMsgText) => {
    if (!lastUserMsgText) return;
    handleSend(lastUserMsgText);
  };

  return (
    <div className="pt-24 pb-8 px-4 lg:px-8 max-w-[1600px] mx-auto h-[calc(100vh-20px)] flex gap-6">
      {/* Sidebar: Conversation Sessions */}
      <div
        className={`${
          sidebarOpen ? 'flex' : 'hidden'
        } lg:flex flex-col w-72 glass-card bg-[#162338]/90 border border-white/5 rounded-3xl p-4 flex-shrink-0 z-30 fixed lg:relative inset-y-24 left-4 lg:inset-auto`}
      >
        <button
          onClick={createNewConversation}
          className="btn-primary w-full !py-2.5 text-xs font-bold mb-4 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#54D6B0]/20"
        >
          <Plus size={16} />
          <span>New Research Session</span>
        </button>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E9CAE] block px-2 mb-2">
            Research History ({conversations.length})
          </span>

          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center justify-between p-2.5 rounded-2xl text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30 font-bold'
                    : 'text-[#8E9CAE] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {editingConvId === conv.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => saveRenameConversation(conv.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveRenameConversation(conv.id)}
                    autoFocus
                    className="w-full bg-[#101B2B] text-white text-xs px-2 py-1 rounded outline-none border border-[#54D6B0]"
                  />
                ) : (
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare size={14} className="flex-shrink-0" />
                    <span className="truncate">{conv.title}</span>
                  </div>
                )}

                <div className="hidden group-hover:flex items-center gap-1">
                  <button
                    onClick={(e) => startRenameConversation(conv, e)}
                    className="p-1 hover:text-[#54D6B0] text-[#8E9CAE]"
                    title="Rename Session"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="p-1 hover:text-[#FF5C75] text-[#8E9CAE]"
                    title="Delete Session"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Conversational Arena */}
      <div className="flex-1 glass-card bg-[#162338]/85 border border-[#54D6B0]/15 rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden relative">
        {/* Arena Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-[#8E9CAE] hover:text-white"
            >
              <MessageSquare size={16} />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                {activeConversation.title}
              </h2>
              <span className="text-[10px] text-[#54D6B0] font-mono flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#54D6B0] animate-pulse" />
                Generic Financial Intelligence Active
              </span>
            </div>
          </div>

          <button
            onClick={createNewConversation}
            className="text-xs font-semibold text-[#8E9CAE] hover:text-[#54D6B0] flex items-center gap-1.5 cursor-pointer bg-white/5 px-3 py-1.5 rounded-xl border border-white/5"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          {messages.length === 0 ? (
            /* Minimalist AI Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-12">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#54D6B0]/25 to-transparent border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0] mb-5 shadow-[0_0_30px_-5px_rgba(84,214,176,0.3)]">
                <Bot size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                Your intelligence companion for markets, money, and ideas.
              </h3>
              <p className="text-xs sm:text-sm text-[#8E9CAE] max-w-lg mb-8 leading-relaxed">
                Ask about equity fundamentals, macro trends, technical oscillators, or industry comparisons. Clean Markdown parsing with zero asterisk corruption.
              </p>

              {/* Suggested Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full max-w-2xl">
                {SUGGESTED_PROMPTS.map((promptText) => (
                  <button
                    key={promptText}
                    onClick={() => handleSend(promptText)}
                    className="p-3 rounded-2xl bg-[#101B2B] hover:bg-[#101B2B]/80 border border-white/5 hover:border-[#54D6B0]/40 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-semibold text-[#F3F5F7] group-hover:text-[#54D6B0] transition-colors block">
                      {promptText}
                    </span>
                    <span className="text-[10px] text-[#8E9CAE] mt-1 flex items-center gap-1">
                      <span>Explore prompt</span>
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`flex gap-3 max-w-[95%] sm:max-w-[85%] ${
                      msg.isBot ? '' : 'flex-row-reverse'
                    }`}
                  >
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
                      {msg.isBot ? (
                        <FinancialMarkdownRenderer content={msg.text} />
                      ) : (
                        <div className="whitespace-pre-line">{msg.text}</div>
                      )}

                      {/* Stock Card Quick Link inside bot message */}
                      {msg.stockRef && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#8E9CAE]">
                            Verified Symbol: <strong className="text-white">{msg.stockRef.symbol}</strong> ({msg.stockRef.market === 'US' ? '$' : '₹'}{msg.stockRef.price})
                          </span>
                          <Link
                            to={`/stock/${msg.stockRef.id}`}
                            className="text-[11px] font-bold text-[#54D6B0] hover:underline flex items-center gap-1"
                          >
                            <span>Open Chart</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      )}

                      {/* Message Footer Actions */}
                      {msg.isBot && (
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[10px] text-[#8E9CAE]">
                          <span className="font-mono">{msg.timestamp}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="hover:text-[#54D6B0] flex items-center gap-1 cursor-pointer"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? <Check size={12} className="text-[#54D6B0]" /> : <Copy size={12} />}
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>
                            {i === messages.length - 1 && (
                              <button
                                onClick={() => {
                                  const lastUser = [...messages].reverse().find((m) => !m.isBot);
                                  if (lastUser) handleRegenerate(lastUser.text);
                                }}
                                className="hover:text-[#54D6B0] flex items-center gap-1 cursor-pointer ml-1"
                                title="Regenerate response"
                              >
                                <RotateCcw size={12} />
                                <span>Regenerate</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

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

        {/* Input Bar & Suggested Prompts Carousel */}
        <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
          {messages.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1 rounded-lg bg-[#101B2B] text-[#8E9CAE] hover:text-[#54D6B0] border border-white/5 whitespace-nowrap transition-colors cursor-pointer text-[11px]"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about markets, valuation multiples, portfolio risk, or concepts..."
              className="flex-1 bg-[#101B2B] border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white outline-none focus:border-[#54D6B0]/50"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="btn-primary !px-5 !py-3.5 rounded-2xl cursor-pointer disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

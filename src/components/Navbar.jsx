import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, Bookmark, Settings, User, LogOut, Shield, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'AI Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Analysis', icon: TrendingUp, path: '/analysis' },
    { name: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 glass z-50 px-8 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-primary">
          <TrendingUp className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight">
          Bull<span className="gradient-text">Rix</span>
          <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase font-black">Pro</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-muted hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <div className="w-9 h-9 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Agrim" 
                alt="User" 
                className="w-full h-full rounded-full object-cover bg-surface"
              />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold">Agrim Jain</p>
              <p className="text-[10px] text-muted">Pro Investor</p>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 glass-card !p-2 border border-white/10 shadow-2xl"
              >
                <div className="p-3 border-b border-white/5 mb-1">
                   <p className="text-sm font-bold">Agrim Jain</p>
                   <p className="text-xs text-muted">agrim.jain@example.com</p>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm transition-colors">
                  <User size={16} className="text-muted" /> Profile Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm transition-colors">
                  <Shield size={16} className="text-muted" /> Security
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm transition-colors">
                  <Settings size={16} className="text-muted" /> Preferences
                </button>
                <div className="h-px bg-white/5 my-1" />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/10 text-accent text-sm transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

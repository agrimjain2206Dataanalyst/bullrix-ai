import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  LayoutDashboard, 
  Sparkles, 
  Compass, 
  Globe, 
  Newspaper, 
  FileSearch, 
  Bookmark, 
  User, 
  Settings, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronDown,
  Sun,
  Moon,
  Coins
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'India Markets', path: '/markets/india', icon: Compass },
    { name: 'Global Markets', path: '/markets/global', icon: Globe },
    { name: 'AI Forecasts', path: '/predictions', icon: Sparkles },
    { name: 'AI Analyst', path: '/chat', icon: TrendingUp },
    { name: 'News Intel', path: '/news', icon: Newspaper },
    { name: 'Doc RAG', path: '/documents', icon: FileSearch },
    { name: 'Watchlist', path: '/watchlist', icon: Bookmark },
    { name: 'Crypto', path: '/crypto', icon: Coins, badge: 'Soon' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 glass z-50 px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0] shadow-[0_0_20px_-4px_rgba(84,214,176,0.4)] group-hover:scale-105 transition-all">
            <TrendingUp size={22} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight font-sans">
                Bull<span className="text-[#54D6B0]">Rix</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#54D6B0]/15 text-[#54D6B0] border border-[#54D6B0]/30 px-1.5 py-0.5 rounded">
                2.0 AI
              </span>
            </div>
            <span className="text-[9px] text-[#8E9CAE] font-medium tracking-wide">
              Global Financial Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <div className="hidden xl:flex items-center gap-1 p-1.5 rounded-2xl border border-white/5 bg-[#162338]/60">
          {mainNav.slice(0, 7).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#54D6B0] text-[#0B131E] shadow-md shadow-[#54D6B0]/20 font-bold'
                    : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#FFB03A]/20 text-[#FFB03A] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Crypto, Watchlist, Theme Toggle, User Profile */}
      <div className="flex items-center gap-2.5">
        {/* Crypto Coming Soon Tab (Desktop Quick link) */}
        <Link
          to="/crypto"
          className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
            isActive('/crypto')
              ? 'bg-[#FFB03A]/20 text-[#FFB03A] border-[#FFB03A]/40'
              : 'bg-white/5 border-white/5 text-[#8E9CAE] hover:text-[#FFB03A] hover:bg-[#FFB03A]/10'
          }`}
          title="Crypto Markets (Coming Soon in 3.0)"
        >
          <Coins size={14} className="text-[#FFB03A]" />
          <span>Crypto</span>
          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#FFB03A]/20 text-[#FFB03A] font-bold uppercase">
            Soon
          </span>
        </Link>

        {/* Watchlist Quick Link */}
        <Link
          to="/watchlist"
          className={`hidden sm:flex items-center gap-1.5 p-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            isActive('/watchlist')
              ? 'bg-[#54D6B0]/15 text-[#54D6B0] border-[#54D6B0]/30'
              : 'bg-white/5 border-white/5 text-[#8E9CAE] hover:text-white'
          }`}
          title="Watchlist"
        >
          <Bookmark size={15} />
          <span className="hidden lg:inline">Watchlist</span>
        </Link>

        {/* Dark / Light Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#8E9CAE] hover:text-white hover:border-[#54D6B0]/40 transition-all cursor-pointer"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? (
            <Sun size={17} className="text-[#FFB03A] hover:rotate-45 transition-transform" />
          ) : (
            <Moon size={17} className="text-[#3B82F6]" />
          )}
        </button>

        {/* User Account / Auth Dropdown */}
        {user.isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#54D6B0]/40 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl overflow-hidden border border-[#54D6B0]/30">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {user.name}
                  </span>
                  {user.verified && (
                    <ShieldCheck size={11} className="text-[#54D6B0]" />
                  )}
                </div>
              </div>
              <ChevronDown size={13} className="text-[#8E9CAE]" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-3 w-60 bg-[#162338] border border-[#54D6B0]/25 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl"
                >
                  <div className="p-3 border-b border-white/5 mb-1.5">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-[#8E9CAE] truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#54D6B0]/15 text-[#54D6B0]">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#F3F5F7] hover:bg-white/5 transition-colors"
                  >
                    <User size={15} className="text-[#54D6B0]" /> Profile & Identity
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#F3F5F7] hover:bg-white/5 transition-colors"
                  >
                    <Settings size={15} className="text-[#8E9CAE]" /> Preferences & Theme
                  </Link>

                  <div className="h-px bg-white/5 my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#FF5C75] hover:bg-[#FF5C75]/10 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/auth"
            className="btn-primary !px-4 !py-2 text-xs flex items-center gap-1.5 font-bold"
          >
            <LogIn size={14} />
            <span>Sign In</span>
          </Link>
        )}

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:border-[#54D6B0]/40 transition-colors"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-20 left-0 right-0 bg-[#101B2B] border-b border-[#54D6B0]/20 p-5 shadow-2xl flex flex-col gap-2 z-40"
          >
            {mainNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#54D6B0] text-[#0B131E] font-bold'
                      : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FFB03A]/20 text-[#FFB03A] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="h-px bg-white/10 my-2" />
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/5"
            >
              <User size={16} className="text-[#54D6B0]" /> Account Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/5"
            >
              <Settings size={16} className="text-[#8E9CAE]" /> Settings & Theme
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

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
  BookOpen, 
  FileSearch, 
  Bookmark, 
  User, 
  Settings, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
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
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#101B2B]/90 backdrop-blur-md border-b border-[#54D6B0]/15 z-50 px-4 lg:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0] shadow-[0_0_20px_-4px_rgba(84,214,176,0.4)] group-hover:scale-105 transition-all">
            <TrendingUp size={22} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
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
        <div className="hidden xl:flex items-center gap-1 bg-[#162338]/80 p-1.5 rounded-2xl border border-white/5">
          {mainNav.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#54D6B0] text-[#0B131E] shadow-md shadow-[#54D6B0]/20 font-bold'
                    : 'text-[#8E9CAE] hover:text-[#F3F5F7] hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Controls & User Profile */}
      <div className="flex items-center gap-3">
        {/* Watchlist & Doc Quick Links for Medium Screens */}
        <div className="hidden md:flex items-center gap-1.5 mr-2">
          <Link
            to="/documents"
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/documents')
                ? 'bg-[#54D6B0]/15 text-[#54D6B0] border-[#54D6B0]/30'
                : 'bg-[#162338]/60 text-[#8E9CAE] border-white/5 hover:text-white hover:bg-white/5'
            }`}
            title="Document Intelligence & RAG"
          >
            <FileSearch size={16} />
            <span className="hidden lg:inline">RAG Docs</span>
          </Link>
          <Link
            to="/watchlist"
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isActive('/watchlist')
                ? 'bg-[#54D6B0]/15 text-[#54D6B0] border-[#54D6B0]/30'
                : 'bg-[#162338]/60 text-[#8E9CAE] border-white/5 hover:text-white hover:bg-white/5'
            }`}
            title="Watchlist"
          >
            <Bookmark size={16} />
            <span className="hidden lg:inline">Watchlist</span>
          </Link>
        </div>

        {/* User Account / Auth Dropdown */}
        {user.isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-[#162338] border border-white/10 hover:border-[#54D6B0]/40 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#54D6B0]/30">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white max-w-[110px] truncate">
                    {user.name}
                  </span>
                  {user.verified && (
                    <ShieldCheck size={12} className="text-[#54D6B0]" />
                  )}
                </div>
                <span className="text-[10px] text-[#8E9CAE] leading-none">
                  {user.role}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#8E9CAE]" />
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
                    <Settings size={15} className="text-[#8E9CAE]" /> Preferences & Integrations
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
            className="btn-primary !px-4 !py-2 text-xs flex items-center gap-2 font-bold"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </Link>
        )}

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-[#162338] border border-white/10 text-white hover:border-[#54D6B0]/40 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#54D6B0] text-[#0B131E] font-bold'
                      : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="h-px bg-white/10 my-2" />
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/5"
            >
              <User size={18} className="text-[#54D6B0]" /> Account Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/5"
            >
              <Settings size={18} className="text-[#8E9CAE]" /> Settings & DigiLocker
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

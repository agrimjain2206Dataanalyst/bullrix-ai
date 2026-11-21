import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Mail, Calendar, Key, CheckCircle2, Award, Zap, Sun, Moon, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="pt-28 pb-16 px-4 lg:px-8 max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Analyst Profile & Identity
        </h1>
        <p className="text-xs sm:text-sm text-[#8E9CAE] mt-1">
          Manage your verified institutional access credentials, active visual themes, and API quotas.
        </p>
      </div>

      <div className="glass-card bg-[#162338]/85 p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover border-2 border-[#54D6B0]/40 shadow-xl"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            {user.verified && (
              <span className="text-[10px] font-bold text-[#54D6B0] bg-[#54D6B0]/15 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck size={12} /> Verified Identity
              </span>
            )}
          </div>
          <span className="text-xs text-[#8E9CAE] block mb-3">{user.email}</span>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-xl bg-white/5 text-white border border-white/5">
              Role: {user.role}
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/5 text-[#54D6B0] border border-white/5">
              Auth: {user.authProvider ? user.authProvider.toUpperCase() : 'DEMO'}
            </span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/5 flex items-center gap-1.5 cursor-pointer"
            >
              <Palette size={13} className="text-[#54D6B0]" />
              <span>Theme: {isDark ? 'Dark (Navy)' : 'Light (Cloud)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Tier & Quota Limits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card bg-[#162338]/80 p-5">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">AI Research Queries</span>
          <span className="text-2xl font-black font-mono text-[#54D6B0] mt-1 block">Unlimited</span>
          <span className="text-[10px] text-[#8E9CAE]">Gemini 2.5 Flash Engine</span>
        </div>

        <div className="glass-card bg-[#162338]/80 p-5">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Document Vector Storage</span>
          <span className="text-2xl font-black font-mono text-white mt-1 block">50 MB / 500 MB</span>
          <span className="text-[10px] text-[#54D6B0]">ChromaDB Indexed</span>
        </div>

        <div className="glass-card bg-[#162338]/80 p-5">
          <span className="text-[10px] text-[#8E9CAE] uppercase font-mono block">Market Data Frequency</span>
          <span className="text-2xl font-black font-mono text-white mt-1 block">15m Delayed</span>
          <span className="text-[10px] text-[#8E9CAE]">Free-Tier Compliant</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Link to="/settings" className="btn-secondary text-xs font-bold">
          Configure Full Application Settings →
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;

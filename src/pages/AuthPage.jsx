import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, UserCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const { user, loginWithDemo, logout, authLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [customName, setCustomName] = useState('Institutional Analyst');
  const [customEmail, setCustomEmail] = useState('analyst@bullrix.ai');

  const handleDemoSignIn = () => {
    loginWithDemo(customName, customEmail);
    navigate('/dashboard');
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-[#162338]/90 border border-[#54D6B0]/20 p-8 sm:p-10 shadow-2xl rounded-3xl"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 mx-auto flex items-center justify-center text-[#54D6B0] mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            BullRix AI <span className="text-[#54D6B0]">Access Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9CAE] mt-2">
            Secure session verification powered by Google Identity Services.
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-[#FF5C75]/10 border border-[#FF5C75]/30 text-[#FF5C75] text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{authError}</span>
          </div>
        )}

        {user.isLoggedIn ? (
          <div className="flex flex-col gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#101B2B] border border-white/5 flex items-center gap-4 text-left">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#54D6B0]/30"
              />
              <div>
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-[#8E9CAE]">{user.email}</p>
                <span className="text-[10px] text-[#54D6B0] font-semibold mt-0.5 inline-block">
                  Verified {user.authProvider === 'google' ? 'Google Account' : 'Demo Session'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary w-full !py-3 text-sm font-bold"
              >
                Proceed to Dashboard
              </button>
              <button
                onClick={logout}
                className="btn-secondary w-full !py-3 text-sm font-semibold text-[#FF5C75] hover:bg-[#FF5C75]/10"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Google One-Tap / Button Mount Container */}
            <div className="flex flex-col gap-3">
              <div
                id="google-signin-button"
                className="w-full flex justify-center py-1"
              >
                {/* Fallback Google button if script is loading */}
                <button
                  onClick={() => handleDemoSignIn()}
                  className="w-full py-3 px-4 rounded-xl bg-white text-gray-900 font-semibold text-xs flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign In with Google</span>
                </button>
              </div>
              <p className="text-[11px] text-[#8E9CAE] text-center">
                Configure <code className="text-[#54D6B0]">VITE_GOOGLE_CLIENT_ID</code> in <code className="text-white">.env</code> for live cloud verification.
              </p>
            </div>

            <div className="flex items-center gap-4 my-1">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] uppercase font-bold text-[#8E9CAE] tracking-widest">
                or instant demo access
              </span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Custom Demo Sign-in */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#8E9CAE] block mb-1">
                  Analyst Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-[#101B2B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#54D6B0]/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#8E9CAE] block mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full bg-[#101B2B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#54D6B0]/50"
                />
              </div>

              <button
                onClick={handleDemoSignIn}
                className="btn-primary w-full !py-3 text-xs font-bold mt-2 flex items-center justify-center gap-2"
              >
                <UserCheck size={16} />
                <span>Launch Institutional Demo Session</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;

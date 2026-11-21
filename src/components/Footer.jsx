import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0B131E]/80 backdrop-blur-md pt-12 pb-8 px-4 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#54D6B0]/15 border border-[#54D6B0]/30 flex items-center justify-center text-[#54D6B0]">
              <TrendingUp size={20} />
            </div>
            <div>
              <span className="text-lg font-extrabold text-white">
                Bull<span className="text-[#54D6B0]">Rix</span> 2.0 AI
              </span>
              <p className="text-[11px] text-[#8E9CAE]">
                AI-Powered Global Financial Intelligence and Stock Research Platform.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#8E9CAE]">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/markets/india" className="hover:text-white transition-colors">India Markets</Link>
            <Link to="/markets/global" className="hover:text-white transition-colors">Global Markets</Link>
            <Link to="/predictions" className="hover:text-white transition-colors">AI Predictions</Link>
            <Link to="/news" className="hover:text-white transition-colors">News Intel</Link>
            <Link to="/documents" className="hover:text-white transition-colors">Document RAG</Link>
          </div>
        </div>

        {/* Legal & Trust Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9CAE]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/ai-disclaimer" className="hover:text-white transition-colors">AI Ethics & Disclaimer</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Legal Terms</Link>
          </div>

          <p className="text-[11px] text-[#8E9CAE] text-center sm:text-right">
            © {new Date().getFullYear()} BullRix AI 2.0. Built for institutional research & quantitative intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

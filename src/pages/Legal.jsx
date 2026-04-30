import React from 'react';
import { Shield, Lock, FileText, Info } from 'lucide-react';

const LegalPage = ({ title, icon: Icon, children }) => (
  <div className="pt-32 pb-20 px-8 max-w-4xl mx-auto min-h-screen">
    <div className="flex items-center gap-4 mb-12">
      <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30">
        <Icon className="text-primary" size={32} />
      </div>
      <h1 className="text-4xl font-black">{title}</h1>
    </div>
    <div className="glass p-10 rounded-[32px] border border-white/5 prose prose-invert max-w-none">
      {children}
    </div>
  </div>
);

export const Terms = () => (
  <LegalPage title="Terms of Service" icon={FileText}>
    <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
    <p className="text-muted mb-8">By accessing BullRix AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    
    <h2 className="text-xl font-bold mb-4">2. Use of Platform</h2>
    <p className="text-muted mb-8">BullRix is a demo platform for informational and educational purposes only. No actual trading or financial transactions occur on this site.</p>
    
    <h2 className="text-xl font-bold mb-4">3. No Financial Advice</h2>
    <p className="text-muted mb-8 font-bold text-white">THE CONTENT PROVIDED ON BULLRIX AI IS FOR DEMONSTRATION PURPOSES ONLY. IT DOES NOT CONSTITUTE FINANCIAL, INVESTMENT, OR LEGAL ADVICE. ALWAYS CONSULT WITH A CERTIFIED FINANCIAL ADVISOR BEFORE MAKING ANY INVESTMENT DECISIONS.</p>
  </LegalPage>
);

export const Privacy = () => (
  <LegalPage title="Privacy Policy" icon={Lock}>
    <h2 className="text-xl font-bold mb-4">1. Data Storage</h2>
    <p className="text-muted mb-8">BullRix AI primarily uses local browser storage (localStorage) to save your preferences, bookmarks, and notes. We do not store your personal data on our servers in this demo version.</p>
    
    <h2 className="text-xl font-bold mb-4">2. Cookies</h2>
    <p className="text-muted mb-8">We may use essential cookies to maintain your session and preference settings.</p>
  </LegalPage>
);

export const Disclaimer = () => (
  <LegalPage title="Stock Disclaimer" icon={Shield}>
    <h2 className="text-xl font-bold mb-4">Market Risk Warning</h2>
    <p className="text-muted mb-8 italic">"Investment in securities market are subject to market risks. Read all the related documents carefully before investing."</p>
    
    <h2 className="text-xl font-bold mb-4">Simulated Data</h2>
    <p className="text-muted mb-8">All stock prices, trends, news, and AI scores provided on this platform are SIMULATED and MOCKED for demonstration purposes. They do not reflect real-time market data or actual historical performance accurately.</p>
    
    <h2 className="text-xl font-bold mb-4">Limitation of Liability</h2>
    <p className="text-muted mb-8">BullRix AI and its developers shall not be liable for any financial losses or damages resulting from the use of information provided on this platform.</p>
  </LegalPage>
);

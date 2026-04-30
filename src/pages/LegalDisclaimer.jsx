import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Gavel, AlertCircle } from 'lucide-react';

const LegalDisclaimer = () => {
  return (
    <div className="pt-32 pb-20 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30 glow-primary">
            <Scale className="text-primary" size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Legal <span className="gradient-text">Disclaimer</span></h1>
          <p className="text-xl text-muted font-medium">Standard legal information regarding the BullRix AI platform.</p>
        </div>

        <div className="glass-card p-10 space-y-10 border-t-4 border-t-accent">
          <div className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <ShieldAlert className="text-accent" size={28} />
              Demonstration Only
            </h2>
            <p className="text-muted leading-relaxed text-lg font-medium">
              BullRix AI is a demonstration-based analytical platform. It is not a financial services platform and does not offer professional brokerage or advisory services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <AlertCircle size={18} /> Mock Data
              </div>
              <p className="text-xs text-muted leading-relaxed">
                All stock data shown is mock or simulated. Real market values may differ significantly.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <AlertCircle size={18} /> Illustrative Charts
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Charts and insights are for illustrative purposes only and do not represent actual trading signals.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <AlertCircle size={18} /> No Guarantee
              </div>
              <p className="text-xs text-muted leading-relaxed">
                No guarantee of accuracy or completeness is provided. Use of this platform is at your own risk.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <AlertCircle size={18} /> Professional Advice
              </div>
              <p className="text-xs text-muted leading-relaxed">
                The platform does not provide investment, legal, or financial advice. Consult professionals.
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6">
            <Gavel className="text-muted opacity-20" size={60} />
            <p className="text-center text-muted font-bold uppercase tracking-[0.2em] max-w-xl text-sm">
              BY ACCESSING THIS PLATFORM, YOU ACKNOWLEDGE THAT IT IS A DEMO ENVIRONMENT AND AGREE TO ALL TERMS LISTED.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalDisclaimer;

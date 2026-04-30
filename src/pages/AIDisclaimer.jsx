import React from 'react';
import { motion } from 'framer-motion';
import { Bot, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

const AIDisclaimer = () => {
  return (
    <div className="pt-32 pb-20 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30 glow-primary">
            <Bot className="text-primary" size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">AI <span className="gradient-text">Disclaimer</span></h1>
          <p className="text-xl text-muted font-medium">Understanding the nature of our intelligent analysis.</p>
        </div>

        <div className="glass-card p-10 space-y-12">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-black tracking-tight">Simulated Logic</h2>
              <p className="text-muted text-lg leading-relaxed">
                BullRix AI uses simulated logic to generate stock recommendations such as <span className="text-success font-bold">BUY</span>, <span className="text-muted font-bold">HOLD</span>, or <span className="text-accent font-bold">SELL</span>.
              </p>
              <div className="space-y-3">
                {[
                  "Based on predefined technical rules",
                  "Not generated from real-time AI models",
                  "Not intended as financial advice"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 className="text-primary" size={18} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-white/5 border border-white/10 p-8 rounded-[32px] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Bot size={120} />
               </div>
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">Core Principle</h4>
               <p className="text-sm font-medium leading-relaxed italic relative z-10">
                 "BullRix AI aims to demonstrate how AI can assist decision-making, not replace it. The final verdict always lies with the human investor."
               </p>
            </div>
          </div>

          <div className="p-8 bg-accent/10 border border-accent/20 rounded-3xl flex gap-6">
            <AlertTriangle className="text-accent shrink-0" size={32} />
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-accent">Crucial Points</h3>
              <ul className="space-y-4 text-muted font-medium">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Markets are inherently unpredictable and past performance is not indicative of future results.
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  AI insights are only supportive tools and should be used in conjunction with your own research.
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Final financial decisions should always be made independently or with a certified advisor.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIDisclaimer;

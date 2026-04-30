import React from 'react';
import { motion } from 'framer-motion';
import { Info, Target, Zap, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30 glow-primary">
            <Info className="text-primary" size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">About <span className="gradient-text">BullRix AI</span></h1>
          <p className="text-xl text-muted font-medium max-w-2xl mx-auto">
            Simplifying market intelligence through the power of artificial intelligence and elegant design.
          </p>
        </div>

        <div className="glass-card p-10 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Target className="text-primary" size={24} />
              Our Mission
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              BullRix AI is an AI-powered stock analysis platform designed to simplify how users understand market data and make decisions. Our goal is not to replace human judgment, but to enhance it.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold">How BullRix AI Helps You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Visualize Trends', desc: 'Transform complex data into clear, actionable charts.', icon: Zap },
                { title: 'Compare Performance', desc: 'Side-by-side analysis of Nifty 50 leaders.', icon: Shield },
                { title: 'Identify Risk', desc: 'Quantitative risk assessments for every ticker.', icon: Info },
                { title: 'Explore Insights', desc: 'Structured analysis driven by intelligent models.', icon: Target },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex gap-4">
                  <item.icon className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-muted leading-relaxed italic border-l-4 border-primary/40 pl-6 py-2">
              "The platform uses predefined data models and simulated AI logic to demonstrate how intelligent systems can assist in decision-making."
            </p>
            <p className="text-muted leading-relaxed">
              BullRix AI is built as a smart analytical assistant that makes your investment thinking more confident, structured, and informed. It is not a trading platform. It does not execute trades or provide real-time financial advice.
            </p>
          </section>

          <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
            <h3 className="text-xl font-black mb-2 text-primary">Built for Clarity</h3>
            <p className="text-sm text-muted">
              Built with a vision to make financial analysis more accessible, BullRix AI focuses on clarity, simplicity, and intelligent design.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

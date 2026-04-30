import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, ShieldAlert, UserCheck, RefreshCw } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: "1. Usage",
      content: "BullRix AI is intended for educational and demonstration purposes only. Users should not treat any information on the platform as financial advice.",
      icon: UserCheck
    },
    {
      title: "2. No Financial Advice",
      content: "All insights, recommendations, and analytics are simulated and should not be used for actual investment decisions.",
      icon: ShieldAlert
    },
    {
      title: "3. User Responsibility",
      content: "Users are solely responsible for any decisions made based on the information presented.",
      icon: UserCheck
    },
    {
      title: "4. Platform Nature",
      content: "BullRix AI is a demo project and may not reflect real-time or accurate market data.",
      icon: RefreshCw
    },
    {
      title: "5. Changes",
      content: "We reserve the right to modify or update features and content at any time without notice.",
      icon: RefreshCw
    }
  ];

  return (
    <div className="pt-32 pb-20 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/30 glow-primary">
            <ScrollText className="text-primary" size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Terms & <span className="gradient-text">Conditions</span></h1>
          <p className="text-xl text-muted font-medium">By using BullRix AI, you agree to the following terms.</p>
        </div>

        <div className="glass-card p-10 space-y-10">
          {sections.map((s, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors shrink-0">
                <s.icon className="text-muted group-hover:text-primary transition-colors" size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-muted leading-relaxed font-medium">{s.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted font-bold uppercase tracking-widest">
          Last Updated: May 2024
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;

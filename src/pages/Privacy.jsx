import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, EyeOff, Cookie, Globe } from 'lucide-react';

const Privacy = () => {
  const points = [
    {
      title: "1. Data Collection",
      content: "BullRix AI does not collect personal or sensitive user data from external servers. Your data stays where it belongs: with you.",
      icon: Database
    },
    {
      title: "2. Local Storage",
      content: "Some preferences such as theme, bookmarks, and notes may be stored locally in your browser for a better experience. This is never transmitted to our servers.",
      icon: Globe
    },
    {
      title: "3. No Third-Party Sharing",
      content: "We do not sell, share, or transmit user data to third parties. We are focused on intelligence, not advertising.",
      icon: EyeOff
    },
    {
      title: "4. Cookies",
      content: "Basic browser storage mechanisms may be used to improve usability. No tracking or advertising cookies are utilized.",
      icon: Cookie
    },
    {
      title: "5. Transparency",
      content: "This platform is designed to be simple, transparent, and user-controlled. You are in charge of your workspace.",
      icon: Lock
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
            <Lock className="text-primary" size={40} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Privacy <span className="gradient-text">Policy</span></h1>
          <p className="text-xl text-muted font-medium">Your privacy is built into the core of BullRix AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <div key={i} className="glass-card p-8 group hover:border-primary/30 transition-all">
              <p.icon className="text-primary mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted leading-relaxed text-sm font-medium">{p.content}</p>
            </div>
          ))}
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5 text-center italic text-muted">
          "We believe that powerful tools shouldn't come at the cost of your privacy."
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;

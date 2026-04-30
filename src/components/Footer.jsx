import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/agrim-jaindatascientist75524/',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/agrimjain2206Dataanalyst',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/agrim.jain_/',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    }
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 bg-background/50 backdrop-blur-md pt-16 pb-8 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Connection Text */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 animate-pulse">
          Connect with me
        </p>

        {/* Social Links */}
        <div className="flex gap-8 mb-12">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl glass border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <div className="text-muted group-hover:text-primary transition-colors duration-300">
                {social.icon}
              </div>
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg pointer-events-none">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Branding Line */}
        <div className="text-center mb-16">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
            Made with ❤️ in India by <span className="gradient-text">Agrim Jain</span>
          </h3>
          <p className="text-muted text-sm font-medium">Turning data into intelligent finance experiences.</p>
        </div>

        {/* Links Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-12 border-t border-white/5 pt-12 mb-12 max-w-4xl">
          <div className="text-center md:text-right">
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-primary">Platform</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link to="/" className="hover:text-white transition-colors">Market Dashboard</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Portfolio Analyst</Link></li>
              <li><Link to="/analysis" className="hover:text-white transition-colors">Technical Engine</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About BullRix AI</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-primary">Legal & Trust</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/ai-disclaimer" className="hover:text-white transition-colors">AI Disclaimer</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
            © 2026 BullRix AI Intelligence. All rights reserved.
          </p>
          <div className="flex gap-4">
             <div className="flex items-center gap-1 text-[9px] font-black text-muted/30 uppercase">
                <div className="w-1 h-1 rounded-full bg-success/30" /> Secure
             </div>
             <div className="flex items-center gap-1 text-[9px] font-black text-muted/30 uppercase">
                <div className="w-1 h-1 rounded-full bg-primary/30" /> Verified
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

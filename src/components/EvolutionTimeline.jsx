import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Coins, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const EvolutionTimeline = () => {
  const milestones = [
    {
      id: '01',
      version: 'BULLRIX 2025',
      tagline: 'The Beginning',
      status: 'FOUNDATION RELEASE',
      statusType: 'completed',
      description:
        'Started with a focused vision of bringing AI-powered financial intelligence to Indian stock market investors.',
      features: [
        'Indian Stock Market',
        'NSE and BSE Coverage',
        'Indian Equity Research',
        'Market Intelligence',
        'Initial AI-powered analysis'
      ]
    },
    {
      id: '02',
      version: 'BULLRIX 2.0 – 2026',
      tagline: 'Breaking Market Boundaries',
      status: 'CURRENT RELEASE',
      statusType: 'active',
      isCurrent: true,
      description:
        'Expanding financial intelligence beyond India with global equity coverage, advanced analytics, AI research, and professional market visualization.',
      features: [
        'Indian + Global Markets',
        'NASDAQ and NYSE',
        'Advanced Candlestick Charts',
        'Technical Indicators',
        'AI Financial Research',
        'Portfolio Analytics',
        'Global Market Intelligence',
        'Financial News Intelligence'
      ]
    },
    {
      id: '03',
      version: 'BULLRIX 3.0 – 2027',
      tagline: 'Entering the Decentralized Future',
      status: 'UPCOMING ROADMAP',
      statusType: 'upcoming',
      description:
        'Expanding into cryptocurrency, Web3, and blockchain intelligence with institutional security standards.',
      features: [
        'Cryptocurrency Markets',
        'Bitcoin & Ethereum Intelligence',
        'Altcoin Research',
        'Blockchain Analytics',
        'Web3 Ecosystem Intelligence',
        'On-chain Data Analysis',
        'Decentralized Finance Research'
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#54D6B0]/15 text-[#54D6B0] text-xs font-bold font-mono uppercase tracking-wider mb-3">
          <Sparkles size={13} />
          Architectural Journey
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          THE EVOLUTION OF BULLRIX
        </h2>
        <p className="text-xs sm:text-base text-[#8E9CAE] mt-3 leading-relaxed">
          From Indian equity intelligence to a unified global financial intelligence ecosystem.
        </p>
      </div>

      {/* Desktop Horizontal Timeline & Mobile Vertical Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Connecting Line */}
        <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-white/10 via-[#54D6B0] to-white/10 z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.3 }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                m.isCurrent
                  ? 'bg-[#162338] border-2 border-[#54D6B0] shadow-[0_0_35px_-5px_rgba(84,214,176,0.35)] relative scale-[1.02]'
                  : 'bg-[#162338]/70 border border-white/5 hover:border-white/20'
              }`}
            >
              {/* Milestone Indicator Node */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-sm border ${
                      m.isCurrent
                        ? 'bg-[#54D6B0] text-[#0B131E] border-[#54D6B0] shadow-lg shadow-[#54D6B0]/30'
                        : 'bg-[#101B2B] text-[#8E9CAE] border-white/10'
                    }`}
                  >
                    {m.id}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                      m.isCurrent
                        ? 'bg-[#54D6B0]/20 text-[#54D6B0] border border-[#54D6B0]/40'
                        : m.statusType === 'completed'
                        ? 'bg-white/5 text-[#8E9CAE] border border-white/10'
                        : 'bg-[#FFB03A]/15 text-[#FFB03A] border border-[#FFB03A]/30'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    {m.version}
                  </h3>
                  <p className="text-xs font-semibold text-[#54D6B0] mt-0.5">{m.tagline}</p>
                </div>

                <p className="text-xs text-[#8E9CAE] leading-relaxed mb-6">
                  {m.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E9CAE] block mb-2">
                    Key Deliverables
                  </span>
                  {m.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2
                        size={13}
                        className={m.isCurrent ? 'text-[#54D6B0] flex-shrink-0' : 'text-[#8E9CAE] flex-shrink-0'}
                      />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-8 pt-4 border-t border-white/5">
                {m.isCurrent ? (
                  <Link
                    to="/dashboard"
                    className="btn-primary w-full !py-2.5 text-xs font-bold text-center justify-center flex items-center gap-1.5"
                  >
                    <span>Explore Current Platform</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : m.statusType === 'upcoming' ? (
                  <Link
                    to="/crypto"
                    className="btn-secondary w-full !py-2.5 text-xs font-semibold text-center justify-center flex items-center gap-1.5"
                  >
                    <span>View 2027 Roadmap Preview</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <span className="text-[11px] text-[#8E9CAE] font-mono block text-center">
                    Foundation Architecture Deployed
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvolutionTimeline;

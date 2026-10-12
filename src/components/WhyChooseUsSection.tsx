import React from 'react';
import { motion } from 'motion/react';
import { Award, Sprout, HeartHandshake, Leaf, ShieldAlert } from 'lucide-react';
import { FEATURES_DATA } from '../data/content';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-8 h-8 text-[#FFD700]" />;
      case 'Sprout':
        return <Sprout className="w-8 h-8 text-[#FFD700]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-[#FFD700]" />;
      case 'Leaf':
        return <Leaf className="w-8 h-8 text-[#FFD700]" />;
      default:
        return <Award className="w-8 h-8 text-[#FFD700]" />;
    }
  };

  return (
    <section className="relative py-24 bg-[#080808] border-y border-[#D4AF37]/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#1F6B3A]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              The Kanchan Patil Group Difference
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight"
          >
            Why Choose <span className="gold-text-gradient">KANCHAN PATIL GROUP</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            Pioneering ethical, chemical-free agriculture and botanical innovation designed for long-term trust.
          </motion.p>
        </div>

        {/* 4 Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#FFD700]/60 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-tr-2xl pointer-events-none group-hover:opacity-100 transition-opacity opacity-0" />

              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 via-[#141414] to-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:border-[#FFD700] transition-colors">
                  {getIcon(feature.icon)}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                <span>Gold Standard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

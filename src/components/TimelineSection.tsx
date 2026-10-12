import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Globe, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { HenIcon } from './HenIcon';
import { useLanguage } from '../context/LanguageContext';

export const TimelineSection: React.FC = () => {
  const { content, t } = useLanguage();
  const timelineData = content.TIMELINE_DATA;
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-[#FFD700]" />;
      case 'Hen':
      case 'Bird':
        return <HenIcon className="w-6 h-6 text-[#FFD700]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#FFD700]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#FFD700]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#FFD700]" />;
    }
  };

  return (
    <section className="relative py-24 bg-[#080808] border-t border-[#D4AF37]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              {t('timeline.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {t('timeline.titlePre')} <span className="gold-text-gradient">{t('timeline.titleHighlight')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            {t('timeline.subtitle')}
          </motion.p>
        </div>

        {/* Timeline Grid (Horizontal on desktop, vertical on mobile) */}
        <div className="relative">
          {/* Connector Line (Desktop Horizontal) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-[#1F6B3A] via-[#D4AF37] to-[#FFD700] -translate-y-1/2 z-0 opacity-40 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {timelineData.map((item, idx) => (
              <motion.div
                key={`${item.title}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass-card rounded-2xl border border-[#D4AF37]/20 p-8 flex flex-col justify-between hover:border-[#FFD700] transition-all group"
              >
                <div>
                  {/* Year Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl font-black gold-text-gradient">
                      {item.year}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#1F6B3A]/30 border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      {getIcon(item.icon)}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-medium tracking-wider mb-4 uppercase">
                    {item.subtitle}
                  </p>

                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Phase 0{idx + 1}</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD700] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

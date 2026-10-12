import React from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VisionSection: React.FC = () => {
  const { content, t, language } = useLanguage();

  return (
    <section className="relative py-28 bg-[#080808] border-y border-[#D4AF37]/20 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 mb-8"
        >
          <Compass className="w-4 h-4 text-[#FFD700] animate-spin" style={{ animationDuration: '15s' }} />
          <span className="text-xs uppercase tracking-widest text-[#FFD700] font-bold">
            {t('vision.eyebrow')}
          </span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl font-black leading-tight sm:leading-tight gold-text-gradient gold-glow-text tracking-tight mb-8"
        >
          "{content.VISION_TEXT}"
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest text-gray-400 font-semibold"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span>
            {language === 'mr'
              ? 'कांचन पाटील ग्रुप • निसर्गाची समृद्धी. विश्वासाची परंपरा.'
              : 'KANCHAN PATIL GROUP • Growing Nature. Building Trust.'}
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, TrendingUp, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BusinessesSectionProps {
  onExploreBusiness: (slug: 'gavran-poultry-farms' | 'k-group-nursery') => void;
}

export const BusinessesSection: React.FC<BusinessesSectionProps> = ({ onExploreBusiness }) => {
  const { content, t, language } = useLanguage();
  const businesses = content.BUSINESSES_DATA;
  return (
    <section id="businesses" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              {t('businesses.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight"
          >
            {t('businesses.titlePre')} <span className="gold-text-gradient">{t('businesses.titleHighlight')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            {t('businesses.subtitle')}
          </motion.p>
        </div>

        {/* 2 Luxury Business Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {businesses.map((business, index) => {
            const isPoultry = business.id === 'gavran-poultry';
            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="group relative rounded-3xl gold-border-glow p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-full flex flex-col"
              >
                <div className="glass-card rounded-[23px] overflow-hidden p-6 sm:p-8 flex flex-col justify-between h-full bg-[#141414]/90 backdrop-blur-2xl">
                  <div>
                    {/* Top Tag */}
                    <div className="flex items-center justify-end mb-6">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-wider">
                        {isPoultry ? 'Poultry Division' : 'Nursery Division'}
                      </span>
                    </div>

                    {/* Image Header with Glass Effect */}
                    <div className="relative rounded-2xl overflow-hidden mb-6 h-64 group-hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-shadow duration-500">
                      <img
                        src={business.image}
                        alt={business.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute bottom-4 left-4 right-4 p-3 glass-panel rounded-xl border border-[#D4AF37]/30">
                        <p className="text-xs text-[#FFD700] font-semibold tracking-wide">
                          {business.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-[#FFD700] transition-colors">
                      {business.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                      {business.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {business.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Golden CTA Button */}
                  <button
                    onClick={() => onExploreBusiness(business.slug as any)}
                    className="w-full font-btn py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    {language === 'mr' ? (isPoultry ? 'फार्म पहा →' : 'नर्सरी पहा →') : (isPoultry ? 'Explore Farm →' : 'Explore Nursery →')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upcoming Venture Showcase Card - Real Estate & Land Investments */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 sm:mt-16 group relative rounded-3xl gold-border-glow p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="glass-card rounded-[23px] overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-[#141414]/95 via-[#1a1810]/90 to-[#141414]/95 backdrop-blur-2xl relative">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="flex-1">
                {/* Badge Header */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808] border border-[#D4AF37]/40 text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Upcoming Venture • Strategic Expansion
                </div>

                {/* Title & Tagline */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#080808] border border-[#D4AF37]/50 flex items-center justify-center text-[#FFD700] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      Real Estate & Land Investments
                    </h3>
                    <p className="text-xs text-[#FFD700] font-semibold tracking-wide">
                      Strategic Prime Land Acquisitions & Long-Term Land Banking under K Group
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light max-w-3xl">
                  K Group is expanding its strategic asset horizon through dedicated prime land acquisitions, agricultural land banking, and eco-sustainable real estate development. We identify and secure high-growth land parcels designed for future wealth creation, sustainable farming infrastructure, and regional enterprise development.
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200 glass-panel p-2.5 rounded-lg border border-[#D4AF37]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
                    Prime Land Acquisitions
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200 glass-panel p-2.5 rounded-lg border border-[#D4AF37]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
                    Long-Term Land Banking
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200 glass-panel p-2.5 rounded-lg border border-[#D4AF37]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
                    Agri-Real Estate Development
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-200 glass-panel p-2.5 rounded-lg border border-[#D4AF37]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
                    High-Growth Asset Horizon
                  </div>
                </div>
              </div>

              {/* Decorative Card Tag */}
              <div className="shrink-0 w-full lg:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-[#080808]/80 border border-[#D4AF37]/30 text-center min-w-[200px]">
                <Landmark className="w-8 h-8 text-[#FFD700] mb-2" />
                <span className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  K GROUP
                </span>
                <span className="text-[11px] text-[#D4AF37] font-semibold">
                  Future Real Estate Venture
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

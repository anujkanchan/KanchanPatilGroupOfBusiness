import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Sparkles, Star, Leaf, Send, ShieldCheck, Phone, Mail, Award, ArrowRight, X } from 'lucide-react';
import { HenIcon } from './HenIcon';
import { StrategicExpansionSection } from './StrategicExpansionSection';
import { Business } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DedicatedBusinessPageProps {
  slug: 'gavran-poultry-farms' | 'k-group-nursery';
  onBackToHome: () => void;
  onNavigate?: (page: 'home' | 'gavran-poultry-farms' | 'k-group-nursery', sectionId?: string) => void;
}

export const DedicatedBusinessPage: React.FC<DedicatedBusinessPageProps> = ({ slug, onBackToHome, onNavigate }) => {
  const { content, t } = useLanguage();
  const business: Business | undefined = content.BUSINESSES_DATA.find(b => b.slug === slug);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'gallery' | 'benefits' | 'inquiry'>('overview');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!business) return null;

  const isPoultry = business.id === 'gavran-poultry';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 pb-20 relative">
      {/* Background radial blur */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Back to Home Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-white hover:text-[#FFD700] hover:border-[#FFD700] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          {t('dedicated.back')}
        </button>

        <span className="text-xs font-semibold px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-wider">
          {isPoultry ? (t('nav.poultryName') || 'Poultry Division') : (t('nav.nurseryName') || 'Nursery Division')}
        </span>
      </div>

      {/* Dedicated Business Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden gold-border-glow p-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-[23px] overflow-hidden h-[450px] sm:h-[550px]">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/40 mb-4">
                  {isPoultry ? <HenIcon className="w-4 h-4 text-[#FFD700]" /> : <Leaf className="w-4 h-4 text-[#FFD700]" />}
                  <span className="text-xs uppercase tracking-widest text-[#FFD700] font-bold">
                    {business.tagline}
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white gold-text-gradient mb-4">
                  {business.name}
                </h1>

                <p className="text-gray-200 text-base sm:text-lg mb-8 font-light max-w-2xl leading-relaxed">
                  {business.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setInquiryOpen(true)}
                    className="font-btn px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-black" />
                    {t('dedicated.placeOrder')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-heading text-3xl font-bold text-white mb-8 border-b border-[#D4AF37]/20 pb-4">
          {t('dedicated.highlightsPre')} <span className="gold-text-gradient">{t('dedicated.highlightsPost')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {business.features.map((feat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/20 flex items-start gap-3 hover:border-[#FFD700]/50 transition-all duration-300 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-200 leading-snug">{feat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest block mb-2">
            {t('dedicated.offeringsEyebrow')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {t('dedicated.offeringsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {business.services.map((srv, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-[#D4AF37]/30 bg-[#141414]/90 hover:border-[#FFD700] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700] mb-4">
                {isPoultry ? <HenIcon className="w-6 h-6 text-[#FFD700]" /> : <Leaf className="w-6 h-6" />}
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                {srv.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-heading text-3xl font-bold text-white mb-8 border-b border-[#D4AF37]/20 pb-4">
          {t('dedicated.galleryPre')} <span className="gold-text-gradient">{t('dedicated.galleryPost')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {business.gallery.map((gItem, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/20 group h-64 relative"
            >
              <img
                src={gItem.url}
                alt={gItem.caption}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-[#FFD700]">
                {gItem.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/30 bg-[#141414]/90">
          <h2 className="font-heading text-3xl font-bold text-white mb-6 gold-text-gradient">
            {t('dedicated.whyPartner')} {business.name}?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {business.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-[#080808] border border-[#D4AF37]/20">
                <Award className="w-5 h-5 text-[#FFD700] shrink-0" />
                <span className="text-sm font-medium text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Expansion / Future Horizons Chapter (Exclusively for Gavran Poultry Farms) */}
      {isPoultry && (
        <StrategicExpansionSection
          onExploreBusinesses={() => {
            if (onNavigate) {
              onNavigate('home', 'businesses');
            } else {
              onBackToHome();
            }
          }}
          onPartnerWithUs={() => setInquiryOpen(true)}
        />
      )}

      {/* Dedicated Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setInquiryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel max-w-lg w-full rounded-3xl p-8 border border-[#D4AF37]/40 relative bg-[#141414]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setInquiryOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{t('dedicated.inquirySentTitle')}</h3>
                  <p className="text-xs text-gray-300">
                    {t('dedicated.inquirySentDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {t('dedicated.inquireFor')} {business.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {t('dedicated.inquireDesc')}
                  </p>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">{t('dedicated.fullName')}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anuj Kanchan"
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">{t('dedicated.phone')}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 7517004343"
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">{t('dedicated.requirement')}</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify required plant species or poultry quantity..."
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-btn py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                  >
                    {t('dedicated.submitOrder')}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

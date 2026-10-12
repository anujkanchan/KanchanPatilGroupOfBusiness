import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Sparkles, ArrowUpRight, Leaf, Globe } from 'lucide-react';
import { HenIcon } from './HenIcon';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activePage: 'home' | 'gavran-poultry-farms' | 'k-group-nursery';
  onNavigate: (page: 'home' | 'gavran-poultry-farms' | 'k-group-nursery', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40;
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), sectionId: 'hero' },
    { name: t('nav.presence'), sectionId: 'global-presence' },
    { name: t('nav.about'), sectionId: 'about' },
    { name: t('nav.businesses'), isDropdown: true },
    { name: t('nav.founder'), sectionId: 'founder' },
    { name: t('nav.gallery'), sectionId: 'gallery' },
    { name: t('nav.contact'), sectionId: 'contact' },
  ];

  const handleLinkClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    setBusinessDropdownOpen(false);
    if (activePage !== 'home') {
      onNavigate('home', sectionId);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'glass-panel py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-[#D4AF37]/20'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#D4AF37] via-[#FFD700] to-[#1F6B3A] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src={kanchanLogo}
              alt="Kanchan Group of Business"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-heading text-sm sm:text-base font-black tracking-widest gold-text-gradient block leading-tight">
              {t('nav.brand')}
            </span>
            <span className="text-[10px] tracking-wider text-gray-300 block mt-1 font-semibold uppercase">
              {t('nav.tagline')}
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key="businesses-dropdown"
                  className="relative"
                  onMouseEnter={() => setBusinessDropdownOpen(true)}
                  onMouseLeave={() => setBusinessDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleLinkClick('businesses')}
                    className="flex items-center gap-1 text-sm font-medium tracking-wide text-gray-300 hover:text-[#FFD700] transition-colors py-2 cursor-pointer"
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${businessDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {businessDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-72 glass-panel rounded-2xl p-3 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                      >
                        <button
                          onClick={() => {
                            setBusinessDropdownOpen(false);
                            onNavigate('gavran-poultry-farms');
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 hover:bg-[#D4AF37]/10 group cursor-pointer ${
                            activePage === 'gavran-poultry-farms' ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40' : ''
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FFD700]">
                            <HenIcon className="w-5 h-5 text-[#FFD700]" />
                          </div>
                          <div>
                            <div className="font-heading font-semibold text-sm text-white group-hover:text-[#FFD700] flex items-center gap-1">
                              {t('nav.poultryName')}
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{t('nav.poultryDesc')}</div>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setBusinessDropdownOpen(false);
                            onNavigate('k-group-nursery');
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 hover:bg-[#D4AF37]/10 group mt-1 cursor-pointer ${
                            activePage === 'k-group-nursery' ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40' : ''
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FFD700]">
                            <Leaf className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-heading font-semibold text-sm text-white group-hover:text-[#FFD700] flex items-center gap-1">
                              {t('nav.nurseryName')}
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{t('nav.nurseryDesc')}</div>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.sectionId)}
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-[#FFD700] transition-colors relative py-1 group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Simple Language Switcher Pill (English / Marathi) */}
          <div
            className="flex items-center rounded-full p-0.5 border border-[#D4AF37]/40 bg-black/70 backdrop-blur-md shadow-inner"
            role="group"
            aria-label="Language Selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                language === 'mr'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="मराठी (Marathi)"
            >
              मराठी
            </button>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-gemini-chat'))}
            className="px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#FFD700] bg-black/60 hover:bg-[#FFD700]/15 border border-[#D4AF37]/40 transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:border-[#FFD700]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
            <span>{t('nav.aiConcierge')}</span>
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="font-btn px-5 py-2.5 rounded-full text-xs font-bold tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            {t('nav.contactUs')}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Quick Mobile Language Switcher button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
            className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#D4AF37]/50 bg-black/70 text-[#FFD700] flex items-center gap-1"
            aria-label="Toggle Language"
          >
            <Globe className="w-3 h-3 text-[#D4AF37]" />
            <span>{language === 'en' ? 'मराठी' : 'EN'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[#D4AF37]/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Language Switcher Row */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {t('nav.langSwitchLabel')}
                </span>
                <div className="flex items-center rounded-full p-0.5 border border-[#D4AF37]/40 bg-black/80 shadow-inner">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('mr')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      language === 'mr'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    मराठी
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleLinkClick('hero')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                {t('nav.about')}
              </button>

              <div className="pt-2 border-t border-gray-800">
                <div className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">
                  {t('nav.businesses')}
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('gavran-poultry-farms');
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#FFD700] flex items-center gap-2"
                >
                  <HenIcon className="w-4 h-4 text-[#D4AF37]" />
                  {t('nav.poultryName')}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('k-group-nursery');
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#FFD700] flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-[#D4AF37]" />
                  {t('nav.nurseryName')}
                </button>
              </div>

              <button
                onClick={() => handleLinkClick('founder')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                {t('nav.founder')}
              </button>
              <button
                onClick={() => handleLinkClick('gallery')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                {t('nav.gallery')}
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                {t('nav.contact')}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-gemini-chat'));
                }}
                className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs text-[#FFD700] bg-black/80 border border-[#D4AF37]/50 text-center flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                {t('nav.aiConcierge')}
              </button>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full mt-2 font-btn py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-center block uppercase tracking-wider cursor-pointer"
              >
                {t('nav.contactUs')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

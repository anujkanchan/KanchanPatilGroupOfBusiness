import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Sparkles, Phone, ArrowUpRight, Leaf } from 'lucide-react';
import { HenIcon } from './HenIcon';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';

interface NavbarProps {
  activePage: 'home' | 'gavran-poultry-farms' | 'k-group-nursery';
  onNavigate: (page: 'home' | 'gavran-poultry-farms' | 'k-group-nursery', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
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
    { name: 'Home', sectionId: 'hero' },
    { name: 'Presence', sectionId: 'global-presence' },
    { name: 'About', sectionId: 'about' },
    { name: 'Businesses', isDropdown: true },
    { name: 'Founder', sectionId: 'founder' },
    { name: 'Gallery', sectionId: 'gallery' },
    { name: 'Contact', sectionId: 'contact' },
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
          className="flex items-center gap-3.5 group text-left focus:outline-none"
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
              KANCHAN PATIL GROUP
            </span>
            <span className="text-[10px] tracking-wider text-gray-300 block mt-1 font-semibold uppercase">
              Growing Nature. Building Trust.
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
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
                    className="flex items-center gap-1 text-sm font-medium tracking-wide text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                  >
                    Businesses
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
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 hover:bg-[#D4AF37]/10 group ${
                            activePage === 'gavran-poultry-farms' ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40' : ''
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FFD700]">
                            <HenIcon className="w-5 h-5 text-[#FFD700]" />
                          </div>
                          <div>
                            <div className="font-heading font-semibold text-sm text-white group-hover:text-[#FFD700] flex items-center gap-1">
                              Gavran Poultry Farms
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">Fresh Country Chicken & Organic Eggs</div>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setBusinessDropdownOpen(false);
                            onNavigate('k-group-nursery');
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 hover:bg-[#D4AF37]/10 group mt-1 ${
                            activePage === 'k-group-nursery' ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40' : ''
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FFD700]">
                            <Leaf className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-heading font-semibold text-sm text-white group-hover:text-[#FFD700] flex items-center gap-1">
                              K Group of Nursery
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">Indoor, Outdoor & Landscape Nursery</div>
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
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-[#FFD700] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-gemini-chat'))}
            className="px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#FFD700] bg-black/60 hover:bg-[#FFD700]/15 border border-[#D4AF37]/40 transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:border-[#FFD700]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
            <span>AI Concierge</span>
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="font-btn px-5 py-2.5 rounded-full text-xs font-bold tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
              <button
                onClick={() => handleLinkClick('hero')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                About K Group
              </button>

              <div className="pt-2 border-t border-gray-800">
                <div className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">
                  Our Businesses
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('gavran-poultry-farms');
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#FFD700] flex items-center gap-2"
                >
                  <HenIcon className="w-4 h-4 text-[#D4AF37]" />
                  Gavran Poultry Farms
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('k-group-nursery');
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#FFD700] flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-[#D4AF37]" />
                  K Group of Nursery
                </button>
              </div>

              <button
                onClick={() => handleLinkClick('founder')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                Founder
              </button>
              <button
                onClick={() => handleLinkClick('gallery')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                Gallery
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="block w-full text-left font-medium text-white hover:text-[#FFD700]"
              >
                Contact
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-gemini-chat'));
                }}
                className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs text-[#FFD700] bg-black/80 border border-[#D4AF37]/50 text-center flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                Ask AI Concierge (Gemini)
              </button>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full mt-2 font-btn py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-center block uppercase tracking-wider"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

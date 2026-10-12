import React from 'react';
import { Linkedin, Github, ArrowUp, Sparkles, Leaf, Phone, MapPin, BadgeCheck } from 'lucide-react';
import { HenIcon } from './HenIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FOUNDER_DATA } from '../data/content';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';
import { NewsletterSubscription } from './NewsletterSubscription';

interface FooterProps {
  onNavigate: (page: 'home' | 'gavran-poultry-farms' | 'k-group-nursery', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white border-t border-[#D4AF37]/20 pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#D4AF37] via-[#FFD700] to-[#1F6B3A] shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0">
                <img
                  src={kanchanLogo}
                  alt="Kanchan Group of Business"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-heading text-xl font-black tracking-widest gold-text-gradient block leading-none">
                  KANCHAN GROUP
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider block mt-1 uppercase">
                  Kanchan Group of Business
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Growing Nature. Building Trust. A premier corporate group leading sustainable agriculture, free-range country poultry farming, and botanical nursery cultivation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={FOUNDER_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={FOUNDER_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={FOUNDER_DATA.socials.whatsapp || "https://wa.me/917517004343"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFD700] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('home', 'hero')}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'about')}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'founder')}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Founder & CEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'gallery')}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'contact')}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Businesses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFD700] uppercase tracking-wider mb-4">
              Our Businesses
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('gavran-poultry-farms')}
                  className="group flex items-start gap-2 text-left hover:text-[#FFD700] transition-colors"
                >
                  <HenIcon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block group-hover:text-[#FFD700]">
                      Gavran Poultry Farms
                    </span>
                    <span className="text-xs text-gray-400">
                      Fresh Country Chicken & Eggs
                    </span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('k-group-nursery')}
                  className="group flex items-start gap-2 text-left hover:text-[#FFD700] transition-colors"
                >
                  <Leaf className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block group-hover:text-[#FFD700]">
                      K Group of Nursery
                    </span>
                    <span className="text-xs text-gray-400">
                      Indoor, Outdoor Flora & Landscaping
                    </span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFD700] uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-[#FFD700] transition-colors"
                >
                  Kanchan Patil Farms, Shindawane Road, Kaleshivar mala, Uruli Kanchan, Tal - Haveli, Dist - Pune.
                </a>
              </div>
              <a
                href="https://wa.me/917517004343"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#FFD700] transition-colors group py-1"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-semibold text-white group-hover:text-[#FFD700]">
                  +91 7517004343
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Component */}
        <NewsletterSubscription />

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} KANCHAN PATIL GROUP. All Rights Reserved. Designed with Excellence.</p>
            <p className="text-[#D4AF37] font-medium tracking-wide mt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#FFD700]/25 to-[#D4AF37]/20 border border-[#FFD700]/50 text-[#FFD700] text-[11px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(255,215,0,0.25)]">
                <BadgeCheck className="w-3.5 h-3.5 fill-[#FFD700] text-black shrink-0" />
                <span>VERIFIED DEVELOPER</span>
              </span>
              <span>
                Developed by <span className="text-white font-semibold inline-flex items-center gap-1">ANUJ GANESH KANCHAN <BadgeCheck className="w-4 h-4 fill-[#FFD700] text-black shrink-0 inline-block" title="Verified Developer" /></span>, Founder - KANCHAN PATIL GROUP <span className="text-gray-400 font-normal">(Computer Science & Artificial Intelligence Engineer)</span>
              </span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full glass-panel border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

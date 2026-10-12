import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1100ms duration provides a comfortable, elegant display of the brand emblem and logo
    const startTime = performance.now();
    const duration = 1100;
    let animId: number;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        setIsExiting(true);
        setTimeout(onComplete, 250);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onComplete, 100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-white overflow-hidden transition-opacity duration-300 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glowing background radial blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1F6B3A]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Golden Particles effect inside screen */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Crest / Logo Animation - immediately visible so user clearly sees the starting logo */}
        <div className="mb-8 relative transition-transform duration-700 transform scale-100">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#D4AF37]/40 via-[#141414] to-[#1F6B3A]/40 border-2 border-[#D4AF37]/60 p-1 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.5)] backdrop-blur-md overflow-hidden">
            <img
              src={kanchanLogo}
              alt="Kanchan Group of Business"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 border border-dashed border-[#FFD700]/40 rounded-full pointer-events-none"
          />
        </div>

        {/* K GROUP Title */}
        <h1 className="font-heading text-5xl md:text-7xl font-black tracking-widest gold-text-gradient mb-3 gold-glow-text">
          {language === 'mr' ? 'कांचन ग्रुप' : 'K GROUP'}
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-medium tracking-wide text-gray-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFD700]" />
          <span className="text-[#D4AF37]">{language === 'mr' ? 'निसर्गाची समृद्धी.' : 'Growing Nature.'}</span>
          <span className="text-gray-400">{language === 'mr' ? 'विश्वासाची परंपरा.' : 'Building Trust.'}</span>
          <Sparkles className="w-5 h-5 text-[#1F6B3A]" />
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-[#141414] rounded-full mt-10 overflow-hidden border border-[#D4AF37]/20 relative">
          <div
            className="h-full bg-gradient-to-r from-[#1F6B3A] via-[#D4AF37] to-[#FFD700] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-xs tracking-widest text-[#D4AF37] uppercase">
          {t('loading.crafting')} • {progress}%
        </p>

        {/* Skip button for instant access */}
        <button
          onClick={handleSkip}
          className="mt-8 text-xs text-gray-400 hover:text-[#FFD700] flex items-center gap-1 transition-colors uppercase tracking-widest font-btn cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/5"
        >
          {t('loading.skip')} <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

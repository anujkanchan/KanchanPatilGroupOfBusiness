import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import kanchanLogo from '../assets/images/kanchan_group_logo.jpg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // High-performance loading animation ensuring fast Core Web Vitals (LCP < 0.6s)
    const startTime = performance.now();
    const duration = 260; // 260ms smooth progress fill
    let animId: number;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 80);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-white overflow-hidden pointer-events-none"
      >
        {/* Glowing background radial blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1F6B3A]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Golden Particles effect inside screen */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          {/* Crest / Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 relative"
          >
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
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 border border-dashed border-[#FFD700]/40 rounded-full pointer-events-none"
            />
          </motion.div>

          {/* K GROUP Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-black tracking-widest gold-text-gradient mb-3 gold-glow-text"
          >
            K GROUP
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl font-medium tracking-wide text-gray-300 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[#D4AF37]">Growing Nature.</span>
            <span className="text-gray-400">Building Trust.</span>
            <Sparkles className="w-5 h-5 text-[#1F6B3A]" />
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-[#141414] rounded-full mt-10 overflow-hidden border border-[#D4AF37]/20 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1F6B3A] via-[#D4AF37] to-[#FFD700] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="mt-3 text-xs tracking-widest text-[#D4AF37] uppercase"
          >
            Crafting Excellence • {progress}%
          </motion.p>

          {/* Skip button for instant access */}
          <motion.button
            onClick={onComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="mt-8 text-xs text-gray-400 hover:text-[#FFD700] flex items-center gap-1 transition-colors uppercase tracking-widest font-btn"
          >
            Skip Intro <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ChevronDown, Compass } from 'lucide-react';
import { HERO_DATA } from '../data/content';

interface HeroProps {
  onExploreBusinesses: () => void;
  onContactUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreBusinesses, onContactUs }) => {
  const [tilt, setTilt] = React.useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const tiltRafRef = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (tiltRafRef.current !== null) return;

    tiltRafRef.current = requestAnimationFrame(() => {
      tiltRafRef.current = null;
      const rect = target.getBoundingClientRect();
      const xPct = (clientX - rect.left) / rect.width - 0.5;
      const yPct = (clientY - rect.top) / rect.height - 0.5;
      setTilt({
        rotateX: -yPct * 10,
        rotateY: xPct * 10,
        glareX: Math.round(((clientX - rect.left) / rect.width) * 100),
        glareY: Math.round(((clientY - rect.top) / rect.height) * 100),
        active: true,
      });
    });
  };

  const handleMouseLeave = () => {
    if (tiltRafRef.current !== null) {
      cancelAnimationFrame(tiltRafRef.current);
      tiltRafRef.current = null;
    }
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      active: false,
    });
  };

  React.useEffect(() => {
    return () => {
      if (tiltRafRef.current !== null) {
        cancelAnimationFrame(tiltRafRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32">
      {/* Background Hero Asset with Cinematic Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={HERO_DATA.heroImage}
          alt="Kanchan Patil Group Drone Shot"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 10, ease: "easeOut" }}
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/60 to-[#080808]" />

        {/* Subtle Gold Ambient Glow Spots */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1F6B3A]/25 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-gray-200 font-semibold">
            {HERO_DATA.welcome}
          </span>
        </motion.div>

        {/* Title: KANCHAN PATIL GROUP */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider gold-text-gradient mb-4 gold-glow-text leading-tight"
        >
          {HERO_DATA.brand}
        </motion.h1>

        {/* 3D Floating Framed Display Box (Circle Shape) */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-5 sm:my-7 w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto group [perspective:1200px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Depth Glow behind the 3D circle frame */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37]/30 via-[#FFD700]/20 to-[#1F6B3A]/30 rounded-full blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none -z-10" />

          {/* Floating 3D Card Container (Circular) */}
          <motion.div
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              scale: tilt.active ? 1.03 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 22,
              mass: 0.8,
            }}
            className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#F5DE93] via-[#8A6D24] to-[#C99E32] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_12px_28px_rgba(0,0,0,0.8),0_0_28px_rgba(212,175,55,0.25)] transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.98),0_15px_35px_rgba(0,0,0,0.85),0_0_40px_rgba(212,175,55,0.4)] cursor-pointer overflow-hidden"
          >
            {/* Black Glass Inner Circular Frame */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#141414]/90 via-[#0a0a0a]/95 to-black/95 backdrop-blur-xl p-1.5 sm:p-2 overflow-hidden ring-1 ring-white/10 flex items-center justify-center">
              {/* Concentric Gold Trim Ring */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-[#D4AF37]/40 pointer-events-none z-20" />

              {/* Circular Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-black/60 shadow-inner">
                <motion.img
                  src={HERO_DATA.heroImage}
                  alt="Kanchan Patil Group Estate & Farm"
                  className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle glass reflection & vignette */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/70 via-transparent to-white/15 pointer-events-none" />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#D4AF37]/30 pointer-events-none" />

                {/* Dynamic Sheen / Glare Highlight */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                  style={{
                    background: tilt.active
                      ? `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.4), transparent 70%)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Soft floating shadow underneath for realistic 3D depth */}
          <div className="w-44 sm:w-56 md:w-64 h-3 mx-auto mt-3 bg-gradient-to-r from-transparent via-black/85 to-transparent blur-md opacity-80 transform group-hover:scale-x-105 group-hover:opacity-95 transition-all duration-500 rounded-full" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide text-white mb-6 font-heading"
        >
          <span className="text-[#D4AF37]">Growing Nature. </span>
          <span className="text-gray-200">Building Trust.</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed font-light"
        >
          {HERO_DATA.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto"
        >
          <button
            onClick={onExploreBusinesses}
            className="w-full sm:w-1/2 font-btn px-6 py-4 rounded-full font-bold text-sm tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Businesses</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-1/2 font-btn px-6 py-4 rounded-full font-semibold text-sm tracking-wider text-white glass-panel hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-1"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Contact Us</span>
          </button>
        </motion.div>
      </div>

      {/* Interactive Mouse & Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={() => {
          const nextSection = document.getElementById('global-presence') || document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            onExploreBusinesses();
          }
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 group cursor-pointer focus:outline-none transition-all duration-300"
        aria-label="Scroll down to About section"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase text-gray-300 group-hover:text-[#FFD700] font-semibold transition-colors duration-300 pl-[0.25em] text-center">
          Scroll Down
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-[#D4AF37]/50 group-hover:border-[#FFD700] flex justify-center p-1.5 backdrop-blur-md bg-black/30 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]"
          />
        </div>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FFD700] transition-colors duration-300 animate-bounce -mt-1" />
      </motion.button>
    </section>
  );
};

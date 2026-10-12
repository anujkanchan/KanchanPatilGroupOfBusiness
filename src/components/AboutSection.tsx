import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Leaf, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { HenIcon } from './HenIcon';
import aboutImg from '../assets/images/regenerated_image_1791441672721.png';

interface AboutSectionProps {
  onNavigateToBusiness: (slug: 'gavran-poultry-farms' | 'k-group-nursery') => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateToBusiness }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle vertical translations that create layered depth
  const mainImageY = useTransform(smoothProgress, [0, 1], [-35, 35]);
  const badgeY = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const sealY = useTransform(smoothProgress, [0, 1], [15, -15]);
  const backgroundGlowY = useTransform(smoothProgress, [0, 1], [-40, 40]);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Glow accents with subtle parallax */}
      <motion.div
        style={{ y: backgroundGlowY }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#1F6B3A]/20 rounded-full blur-[150px] pointer-events-none"
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Luxury Image Frame with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden gold-border-glow p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="relative rounded-3xl overflow-hidden group h-[450px] sm:h-[550px]">
                {/* Main Parallax Image */}
                <motion.img
                  style={{ y: mainImageY, scale: 1.15 }}
                  src={aboutImg}
                  alt="K Group Nursery & Farm Estate"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-120 will-change-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Gold Quality Seal with subtle parallax */}
                <motion.div
                  style={{ y: sealY }}
                  className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl border border-[#D4AF37]/30 backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#1F6B3A] p-[1px] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <div className="w-full h-full bg-[#080808] rounded-[11px] flex items-center justify-center text-[#FFD700]">
                        <Award className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-base">Uncompromised Standards</h4>
                      <p className="text-xs text-gray-300">Blending sustainable farming traditions with cutting-edge technology to deliver exceptional quality.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Gold Accent Badge with Parallax */}
            <motion.div
              style={{ y: badgeY }}
              className="absolute -top-6 -right-6 hidden sm:flex w-24 h-24 rounded-2xl bg-[#141414] border border-[#D4AF37]/40 flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-2 text-center z-10"
            >
              <ShieldCheck className="w-7 h-7 text-[#FFD700] mb-1" />
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">100% Organic</span>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-widest">
                Our Corporate Identity
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              About <span className="gold-text-gradient">Kanchan Patil Group</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Kanchan Patil Group is a diversified enterprise driving excellence in premium agriculture, authentic Gavran poultry farming, high-tech nursery cultivation, and sustainable real estate - creating a legacy of trust, innovation, and growth.
            </p>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4">
                We Proudly Operate:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gavran Poultry Farms Card */}
                <button
                  onClick={() => onNavigateToBusiness('gavran-poultry-farms')}
                  className="glass-card p-5 rounded-2xl border border-[#D4AF37]/20 text-left hover:border-[#FFD700] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700]">
                      <HenIcon className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">
                    Gavran Poultry Farms
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Free-range country chicken & organic egg farming
                  </p>
                </button>

                {/* K Group of Nursery Card */}
                <button
                  onClick={() => onNavigateToBusiness('k-group-nursery')}
                  className="glass-card p-5 rounded-2xl border border-[#D4AF37]/20 text-left hover:border-[#FFD700] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700]">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">
                    K Group of Nursery
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Indoor plants, flowers, shade trees & landscaping
                  </p>
                </button>
              </div>
            </div>

            <div className="p-6 glass-panel rounded-2xl border border-[#D4AF37]/30 bg-[#141414]/80">
              <h4 className="font-heading text-base font-bold text-[#FFD700] mb-2">
                Our Core Mission
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Our mission is to provide trusted products, quality services, and sustainable solutions while building long-term customer relationships.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

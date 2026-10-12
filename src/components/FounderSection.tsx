import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Quote, Sparkles, Cpu, Award, Target, BadgeCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FOUNDER_DATA } from '../data/content';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#1F6B3A]/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              Leadership & Vision
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Meet Our <span className="gold-text-gradient">Founder</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            Guided by technological precision, sustainable principles, and relentless dedication to quality.
          </motion.p>
        </div>

        {/* Large Premium Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl gold-border-glow p-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-w-5xl mx-auto"
        >
          <div className="bg-[#141414]/90 rounded-[23px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Founder Portrait Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] group">
                <img
                  src={FOUNDER_DATA.image}
                  alt={FOUNDER_DATA.name}
                  className="w-full h-[400px] sm:h-[460px] object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 glass-panel rounded-xl border border-[#D4AF37]/30 text-center">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest block">
                    {FOUNDER_DATA.title}
                  </span>
                  <span className="text-[11px] text-[#FFD700] font-semibold uppercase tracking-wider">ANUJ GANESH KANCHAN</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Name */}
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-white mb-2 gold-text-gradient flex items-center gap-2">
                  <span>{FOUNDER_DATA.name}</span>
                  <BadgeCheck className="w-6 h-6 sm:w-7 sm:h-7 fill-[#FFD700] text-black shrink-0 inline-block" title="Verified Founder" />
                </h3>

                {/* Role Titles Pill Grid */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {FOUNDER_DATA.subtitles.map((sub, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#080808] border border-[#D4AF37]/40 text-xs font-semibold text-[#FFD700] uppercase tracking-wider"
                    >
                      {i === 0 && <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      {i === 1 && <Award className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      {i >= 2 && <Target className="w-3.5 h-3.5 text-[#D4AF37]" />}
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Quote Box */}
                <div className="relative p-6 glass-panel rounded-2xl border border-[#D4AF37]/30 mb-6 bg-[#080808]/60">
                  <Quote className="w-8 h-8 text-[#D4AF37]/40 absolute top-3 right-3 pointer-events-none" />
                  <p className="font-heading text-lg sm:text-xl font-semibold text-white italic leading-relaxed text-[#FFD700]">
                    "{FOUNDER_DATA.quote}"
                  </p>
                </div>

                {/* Bio text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light">
                  <span className="text-[#FFD700] font-semibold">Anuj Ganesh Kanchan</span> combines cutting-edge engineering precision with deep-rooted passion for sustainable agriculture and natural living. As a <span className="text-[#FFD700] font-medium">Computer Science & Artificial Intelligence Engineer</span> turned forward-thinking entrepreneur, he established <span className="text-[#FFD700] font-semibold">Kanchan Patil Group</span> to revolutionize traditional farming and nursery systems with modern technology, organic principles, and uncompromised quality standards.
                </p>
              </div>

              {/* Social Icons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                  Connect With Founder
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={FOUNDER_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#080808] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={FOUNDER_DATA.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#080808] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] transition-all"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={FOUNDER_DATA.socials.whatsapp || "https://wa.me/917517004343"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#080808] border border-[#D4AF37]/30 flex items-center justify-center text-[#25D366] hover:text-black hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                    aria-label="WhatsApp Contact: 7517004343"
                    title="WhatsApp: +91 7517004343"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

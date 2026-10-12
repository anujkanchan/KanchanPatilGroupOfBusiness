import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              Client Endorsements
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            What Our <span className="gold-text-gradient">Partners Say</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/30 relative shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#141414]/80"
            >
              <Quote className="w-12 h-12 text-[#D4AF37]/30 absolute top-8 right-8 pointer-events-none" />

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD700]" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-lg sm:text-2xl text-white font-light leading-relaxed mb-8 italic">
                "{current.comment}"
              </p>

              {/* Author Details */}
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-heading font-bold text-white text-lg">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#FFD700] font-medium">
                    {current.role && current.business && current.role !== current.business ? (
                      <>
                        {current.role} • <span className="text-[#FFD700]">{current.business}</span>
                      </>
                    ) : (
                      <span className="text-[#FFD700]">{current.role || current.business}</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#FFD700]'
                      : 'w-2 bg-gray-700 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full glass-panel border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full glass-panel border border-[#D4AF37]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

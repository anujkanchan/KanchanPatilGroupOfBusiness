import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Eggs', 'Poultry', 'Nursery', 'Farm', 'Corporate'] as const;

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 bg-[#080808] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold">
              Visual Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            K GROUP <span className="gold-text-gradient">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg font-light"
          >
            A visual glimpse into our natural farming, organic feeds, pure Gavran eggs, and free-roaming poultry environment.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((category) => {
            const count =
              category === 'All'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((item) => item.category === category).length;
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30 scale-105'
                    : 'bg-[#141414] text-gray-300 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid Layout */}
        <motion.div
          layout
          className={`grid gap-6 ${
            filteredItems.length === 1
              ? 'max-w-xl mx-auto grid-cols-1'
              : filteredItems.length === 2
              ? 'max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden glass-card border border-[#D4AF37]/20 h-72 cursor-pointer gold-border-glow"
                onClick={() => setActiveItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Overlay details */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="flex justify-end items-start">
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="inline-block text-[11px] uppercase tracking-wider font-semibold text-[#FFD700] mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base group-hover:text-[#FFD700] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full glass-panel rounded-3xl p-4 border border-[#D4AF37]/40 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/80 border border-[#D4AF37]/50 text-[#FFD700] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[75vh]">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-contain max-h-[70vh] mx-auto rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#FFD700] font-semibold block mb-1">
                    {activeItem.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

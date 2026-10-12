import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Building2, Users, Flower, Feather, Egg } from 'lucide-react';
import { HenIcon } from './HenIcon';
import { useLanguage } from '../context/LanguageContext';

export const StatisticsSection: React.FC = () => {
  const { content } = useLanguage();
  const statsData = content.STATS_DATA;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-7 h-7 text-[#FFD700]" />;
      case 'Users':
        return <Users className="w-7 h-7 text-[#FFD700]" />;
      case 'Flower':
        return <Flower className="w-7 h-7 text-[#FFD700]" />;
      case 'Hen':
      case 'Feather':
        return <HenIcon className="w-7 h-7 text-[#FFD700]" />;
      case 'Egg':
        return <Egg className="w-7 h-7 text-[#FFD700]" />;
      default:
        return <Building2 className="w-7 h-7 text-[#FFD700]" />;
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-r from-[#080808] via-[#141414] to-[#080808] border-y border-[#D4AF37]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/20 text-center flex flex-col items-center justify-center hover:border-[#FFD700] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all col-span-1 last:col-span-2 sm:last:col-span-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#1F6B3A]/30 border border-[#D4AF37]/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                {getIcon(stat.icon)}
              </div>

              <div className="font-heading text-3xl sm:text-4xl lg:text-4xl font-black gold-text-gradient mb-2 gold-glow-text">
                {isInView ? (
                  <Counter target={stat.value} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>

              <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300 uppercase leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter Helper Component
const Counter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(target / (duration / 30));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

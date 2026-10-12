import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe2,
  PackageCheck,
  Factory,
  TrendingUp,
  ArrowRight,
  Sparkles,
  PlaneTakeoff,
  Tractor,
  Egg,
  Boxes,
  Truck,
  Landmark,
  ShieldCheck,
  Building2,
  Clock,
  Compass
} from 'lucide-react';

import { StrategicGrowthTrajectoryChart } from './StrategicGrowthTrajectoryChart';

// Corporate Photography Assets
import eggExportImg from '../assets/images/gavran_eggs_tray_1790570785607.jpg';
import packagingImg from '../assets/images/gavran_eggs_collection_1790570823569.jpg';
import globalExpansionImg from '../assets/images/kgroup_innovation_hub_1785388907634.jpg';

interface StrategicExpansionSectionProps {
  onExploreBusinesses?: () => void;
  onPartnerWithUs?: () => void;
}

interface StrategicBusiness {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  image: string;
  keyHighlights: string[];
}

const UPCOMING_BUSINESSES: StrategicBusiness[] = [
  {
    number: '01',
    title: 'EGG EXPORTING',
    subtitle: 'International Egg Distribution & Export',
    description:
      'Planned expansion into international egg markets with a focus on quality, supply reliability and global distribution.',
    badge: 'UPCOMING',
    badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-400/10',
    icon: PlaneTakeoff,
    image: eggExportImg,
    keyHighlights: ['International quality standards', 'Cold-chain export logistics', 'Middle East & Asian target trade routes'],
  },
  {
    number: '02',
    title: 'EGG PACKAGING & BOX BUSINESS',
    subtitle: 'Premium Packaging Solutions',
    description:
      'Planned entry into the egg packaging and box segment, including branded cartons, bulk packaging and scalable packaging solutions.',
    badge: 'IN DEVELOPMENT',
    badgeColor: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10',
    icon: PackageCheck,
    image: packagingImg,
    keyHighlights: ['Eco-friendly molded pulp cartons', 'Custom branding & retail cartons', 'Automated high-capacity box plants'],
  },
  {
    number: '03',
    title: 'GLOBAL MARKET EXPANSION',
    subtitle: 'From Domestic Markets to Global Opportunities',
    description:
      "Long-term expansion of K Group's products, partnerships and distribution network into international markets.",
    badge: 'LONG-TERM VISION',
    badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-400/10',
    icon: Globe2,
    image: globalExpansionImg,
    keyHighlights: ['Bilateral distribution partnerships', 'Cross-border joint ventures', 'Sovereign food security collaboration'],
  },
];

interface EcosystemStage {
  number: string;
  title: string;
  description: string;
  hoverDetail: string;
  icon: React.ElementType;
}

const ECOSYSTEM_STAGES: EcosystemStage[] = [
  {
    number: '01',
    title: 'FARM',
    description: 'Poultry Production',
    hoverDetail: 'Bio-secure breeding facilities & native breed genetics',
    icon: Tractor,
  },
  {
    number: '02',
    title: 'EGGS',
    description: 'Egg Production & Collection',
    hoverDetail: 'Daily 1,000+ pure gavran sorting & laser-stamped freshness',
    icon: Egg,
  },
  {
    number: '03',
    title: 'PACKAGING',
    description: 'Egg Boxes & Cartons',
    hoverDetail: 'Biodegradable protective cartons & sustainable box branding',
    icon: Boxes,
  },
  {
    number: '04',
    title: 'DISTRIBUTION',
    description: 'Domestic Supply Network',
    hoverDetail: 'Refrigerated transit hubs across state & regional retail channels',
    icon: Truck,
  },
  {
    number: '05',
    title: 'EXPORT',
    description: 'International Markets',
    hoverDetail: 'Certified phytosanitary compliance & air/sea trade pathways',
    icon: PlaneTakeoff,
  },
  {
    number: '06',
    title: 'GLOBAL',
    description: 'Global Expansion',
    hoverDetail: 'Integrated multinational footprint & sustainable enterprise',
    icon: Landmark,
  },
];

const ROADMAP_LEVELS = [
  {
    tier: 'TODAY',
    tagline: 'Operational Excellence & Scaled Foundations',
    status: 'ACTIVE PILLARS',
    statusClass: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    items: ['Poultry', 'Egg Production', 'Domestic Distribution'],
  },
  {
    tier: 'NEXT',
    tagline: 'Value Chain Integration & Value-Added Scale',
    status: 'IN PREPARATION',
    statusClass: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    items: ['Packaging', 'Expanded Distribution'],
  },
  {
    tier: 'FUTURE',
    tagline: 'International Footprint & Enterprise Horizons',
    status: 'STRATEGIC VISION',
    statusClass: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    items: ['Egg Export', 'International Markets', 'Global Business Network'],
  },
];

export const StrategicExpansionSection: React.FC<StrategicExpansionSectionProps> = ({
  onExploreBusinesses,
  onPartnerWithUs,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);

  const handleExploreClick = () => {
    if (onExploreBusinesses) {
      onExploreBusinesses();
    } else {
      const el = document.getElementById('businesses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePartnerClick = () => {
    if (onPartnerWithUs) {
      onPartnerWithUs();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="strategic-expansion"
      className="relative py-28 bg-[#070707] border-t border-[#D4AF37]/20 overflow-hidden"
    >
      {/* Luxury Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-[#AA771C]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER: STRATEGIC EXPANSION                       */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700] font-semibold">
              Future Horizons • Planned Initiatives
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4"
          >
            STRATEGIC <span className="gold-text-gradient">EXPANSION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-xl sm:text-2xl text-[#E6C687] font-medium tracking-wide mb-6"
          >
            Building the next generation of K Group businesses.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto"
          >
            “Beyond our current business verticals, K Group is strategically preparing for the next
            stage of growth through new opportunities across packaging, exports, agriculture, food
            and global markets.”
          </motion.p>

          {/* Clarity Notice Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 text-xs text-gray-400 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full"
          >
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Planned upcoming strategic ventures — currently in development & preparation</span>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* UPCOMING STRATEGIC BUSINESSES (4 CARDS)                   */}
        {/* ========================================================= */}
        <div className="mb-28">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                PORTFOLIO PIPELINE
              </span>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">
                Upcoming Strategic Businesses
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>3 In-Development Verticals</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_BUSINESSES.map((biz, idx) => {
              const Icon = biz.icon;
              const isVisionary = biz.number === '03';
              const isInDev = biz.number === '02';

              return (
                <motion.div
                  key={biz.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    isVisionary
                      ? 'bg-gradient-to-b from-[#121218] via-[#0c0c12] to-[#08080c] border-[#D4AF37]/35 hover:border-[#FFD700] hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)]'
                      : 'bg-[#101010] border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {/* Subtle photographic background header with dark vignette */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black">
                    <img
                      src={biz.image}
                      alt={biz.title}
                      className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/50 to-transparent" />

                    {/* Top row: Number and Status Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="font-heading text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                        {biz.number}
                      </span>
                      <span
                        className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md border uppercase ${biz.badgeColor} backdrop-blur-md shadow-sm`}
                      >
                        {biz.badge}
                      </span>
                    </div>

                    {/* Floating Icon emblem */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-black/85 border border-[#D4AF37]/40 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:border-[#FFD700] transition-colors">
                      <Icon className="w-5 h-5 text-[#FFD700]" />
                    </div>

                    {/* Explicit In Development Badge for card 02 */}
                    {isInDev && (
                      <div className="absolute bottom-3 right-4 text-[9px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        Pre-Operational Phase
                      </div>
                    )}
                    {isVisionary && (
                      <div className="absolute bottom-3 right-4 text-[9px] uppercase tracking-wider font-semibold text-blue-300 bg-blue-950/70 border border-blue-500/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        Horizon Target
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-xl font-bold text-white tracking-wide group-hover:text-[#FFD700] transition-colors mb-1">
                        {biz.title}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-medium tracking-wide mb-3">
                        {biz.subtitle}
                      </p>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                        {biz.description}
                      </p>
                    </div>

                    {/* Key Strategic Highlights (Mini bullets) */}
                    <div className="pt-4 border-t border-white/5 space-y-2">
                      {biz.keyHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          <span className="font-normal">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE K GROUP ECOSYSTEM                                     */}
        {/* ========================================================= */}
        <div className="mb-28 pt-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#D4AF37]/30 mb-3"
            >
              <Compass className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700] font-semibold">
                END-TO-END VALUE CHAIN
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mb-3"
            >
              THE <span className="gold-text-gradient">K GROUP</span> ECOSYSTEM
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#E6C687] text-base sm:text-lg font-medium tracking-wide"
            >
              From Farm to Market. From Market to the World.
            </motion.p>
          </div>

          {/* Desktop Connected Horizontal Journey / Mobile Vertical Timeline */}
          <div className="relative">
            {/* Desktop continuous metallic connecting line */}
            <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#FFD700]/70 to-[#D4AF37]/20 z-0" />

            {/* Mobile continuous vertical metallic connecting line */}
            <div className="md:hidden absolute top-10 bottom-10 left-9 w-0.5 bg-gradient-to-b from-[#D4AF37]/20 via-[#FFD700]/60 to-[#D4AF37]/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {ECOSYSTEM_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeStageIndex === idx;

                return (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onMouseEnter={() => setActiveStageIndex(idx)}
                    onMouseLeave={() => setActiveStageIndex(null)}
                    className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-[#151515] border border-[#FFD700] shadow-[0_10px_30px_rgba(212,175,55,0.25)]'
                        : 'bg-[#0e0e0e] border border-white/10 hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <div>
                      {/* Top icon and node circle */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-[#FFD700] to-[#AA771C] text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                              : 'bg-white/[0.04] border border-[#D4AF37]/30 text-[#FFD700] group-hover:border-[#FFD700]'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-[#FFD700]'}`} />
                        </div>

                        <span
                          className={`font-heading text-xs font-bold px-2 py-0.5 rounded-full border ${
                            isActive
                              ? 'border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10'
                              : 'border-white/10 text-gray-500'
                          }`}
                        >
                          STAGE {stage.number}
                        </span>
                      </div>

                      {/* Title & Stage */}
                      <div className="mb-2">
                        <div className="text-[11px] text-[#D4AF37] font-semibold tracking-widest uppercase">
                          {stage.number} {stage.title}
                        </div>
                        <h4 className="font-heading text-base font-bold text-white mt-0.5 leading-snug">
                          {stage.description}
                        </h4>
                      </div>
                    </div>

                    {/* Subtle reveal details on hover without heavy popup */}
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <p
                        className={`text-[11px] leading-relaxed transition-all duration-300 ${
                          isActive
                            ? 'text-[#F3E5AB] font-normal max-h-20 opacity-100'
                            : 'text-gray-400 font-light max-h-12 opacity-80 group-hover:text-gray-300'
                        }`}
                      >
                        {stage.hoverDetail}
                      </p>
                    </div>

                    {/* Right arrow connector for desktop (between items) */}
                    {idx < ECOSYSTEM_STAGES.length - 1 && (
                      <>
                        <div className="hidden lg:flex absolute -right-3.5 top-[52px] -translate-y-1/2 w-7 h-7 rounded-full bg-[#080808] border border-[#D4AF37]/40 items-center justify-center z-20 pointer-events-none">
                          <ArrowRight className="w-3.5 h-3.5 text-[#FFD700]" />
                        </div>
                        <div className="md:hidden flex absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#080808] border border-[#D4AF37]/40 items-center justify-center z-20 pointer-events-none">
                          <ArrowRight className="w-3 h-3 text-[#FFD700] rotate-90" />
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STRATEGIC VISION STATEMENT                                */}
        {/* ========================================================= */}
        <div className="mb-28 text-center relative py-16 px-6 sm:px-12 rounded-3xl bg-gradient-to-b from-[#111111] via-[#0b0b0b] to-[#070707] border border-[#D4AF37]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Subtle gold watermark pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-4">
              K GROUP CORE MANIFESTO
            </span>

            {/* Large Premium Typography */}
            <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight mb-2">
              FROM FARM TO MARKET.
            </h3>
            <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black gold-text-gradient tracking-tight uppercase leading-tight mb-8">
              FROM MARKET TO THE WORLD.
            </h3>

            <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              “K Group is building an integrated business ecosystem connecting production, packaging,
              distribution and future global opportunities.”
            </p>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* GROWTH ROADMAP (TODAY -> NEXT -> FUTURE)                  */}
        {/* ========================================================= */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              HORIZON PLANNING
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Three-Level Growth Roadmap
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              A single continuous strategic trajectory driving disciplined expansion.
            </p>
          </div>

          <div className="relative">
            {/* Single Continuous Connecting Timeline Line (Desktop Horizontal) */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-emerald-500/50 via-[#FFD700]/70 to-blue-500/50 -translate-y-1/2 z-0 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {ROADMAP_LEVELS.map((lvl, idx) => (
                <motion.div
                  key={lvl.tier}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative bg-[#101010] rounded-2xl border border-white/10 p-7 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Header: Tier & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading text-3xl font-extrabold text-white tracking-wider group-hover:text-[#FFD700] transition-colors">
                        {lvl.tier}
                      </span>
                      <span
                        className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md border uppercase ${lvl.statusClass}`}
                      >
                        {lvl.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#D4AF37] font-medium mb-6">{lvl.tagline}</p>

                    {/* Timeline Path Flow - arranged with uniform min-height & balanced flex */}
                    <div className="bg-black/50 rounded-xl p-4 sm:p-5 border border-white/5 flex flex-col justify-center gap-3.5 min-h-[172px]">
                      {lvl.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-[#D4AF37]/25 transition-all"
                        >
                          <div className="w-5 h-5 rounded-full bg-white/[0.05] border border-[#D4AF37]/40 flex items-center justify-center text-[10px] text-[#FFD700] font-bold shrink-0">
                            0{itemIdx + 1}
                          </div>
                          <span className="text-sm text-gray-200 font-medium tracking-wide">
                            {item}
                          </span>
                          {itemIdx < lvl.items.length - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]/60 ml-auto shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span>Horizon Phase 0{idx + 1}</span>
                    <TrendingUp className="w-4 h-4 text-[#FFD700]" />
                  </div>

                  {/* Desktop single continuous timeline connector node between tiers */}
                  {idx < ROADMAP_LEVELS.length - 1 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0d0d0d] border border-[#D4AF37]/60 items-center justify-center z-20 shadow-[0_0_15px_rgba(212,175,55,0.35)] pointer-events-none">
                      <ArrowRight className="w-4 h-4 text-[#FFD700]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STRATEGIC GROWTH TRAJECTORY (D3.JS INTERACTIVE SVG CHART) */}
        {/* ========================================================= */}
        <StrategicGrowthTrajectoryChart />

        {/* ========================================================= */}
        {/* FINAL CTA: THE NEXT CHAPTER STARTS NOW                     */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 px-6 sm:px-12 rounded-3xl bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-[#D4AF37]/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative overflow-hidden"
        >
          {/* Subtle gold ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FFD700] font-bold mb-3 block">
              COLLABORATION & ALLIANCES
            </span>

            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mb-4">
              THE NEXT CHAPTER STARTS NOW
            </h3>

            <p className="text-gray-300 text-base sm:text-lg font-light mb-8">
              “Explore the businesses shaping the future of K Group.”
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-heading text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#FFD700] via-[#F3E5AB] to-[#D4AF37] hover:brightness-110 shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE OUR BUSINESSES</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handlePartnerClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-heading text-sm font-bold tracking-wider uppercase text-white bg-transparent border border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:border-[#FFD700] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PARTNER WITH K GROUP</span>
                <Building2 className="w-4 h-4 text-[#FFD700]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

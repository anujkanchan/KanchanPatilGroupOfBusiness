import React, { useEffect, useRef, useState, useId } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  PlaneTakeoff,
  Egg,
  ShieldCheck,
  Package,
  Globe2,
  Info,
  Maximize2
} from 'lucide-react';

export interface MilestoneTrajectoryPoint {
  id: string;
  year: string;
  periodLabel: string;
  stageName: string;
  horizon: 'TODAY' | 'NEXT' | 'FUTURE';
  status: 'COMPLETED' | 'OPERATIONAL' | 'ACTIVE MILESTONE' | 'IN DEVELOPMENT' | 'UPCOMING PIPELINE' | 'STRATEGIC HORIZON';
  statusClass: string;
  scalingIndex: number; // 0 to 100 non-financial scale index
  eggYield: number; // daily egg production count
  eggYieldLabel: string;
  flockScale: number; // bird count
  flockLabel: string;
  biosecurityLevel: string;
  logisticsReach: string;
  summary: string;
  operationalDetails: string[];
  icon: React.ElementType;
}

export const TRAJECTORY_DATA: MilestoneTrajectoryPoint[] = [
  {
    id: 'pt-2025',
    year: '2025',
    periodLabel: 'Completed',
    stageName: 'Initial Pure Gavran Foundation (Completed)',
    horizon: 'TODAY',
    status: 'COMPLETED',
    statusClass: 'border-emerald-400/50 text-emerald-300 bg-emerald-500/10',
    scalingIndex: 25,
    eggYield: 100,
    eggYieldLabel: '100 eggs daily',
    flockScale: 300,
    flockLabel: '300+ Native Parent Stock',
    biosecurityLevel: 'Bio-Secure Tier 1 Sanctuary',
    logisticsReach: 'Local Farmgate & Direct Supply',
    summary: 'Initial pure Gavran layer stock foundation establishing consistent 100 pure Gavran eggs / day harvest with zero antibiotics and natural forage.',
    operationalDetails: [
      'Preservation of indigenous hardy breed bloodlines',
      'Free-range pasture enclosure architecture',
      'Daily 100 pure Gavran eggs / day harvest'
    ],
    icon: ShieldCheck,
  },
  {
    id: 'pt-2026',
    year: '2026',
    periodLabel: 'Present Peak',
    stageName: 'Currently Operational Hub (Present Peak / Active Milestone)',
    horizon: 'TODAY',
    status: 'ACTIVE MILESTONE',
    statusClass: 'border-amber-400/80 text-amber-300 bg-amber-400/20 ring-1 ring-amber-400/50',
    scalingIndex: 50,
    eggYield: 200,
    eggYieldLabel: '200 eggs daily',
    flockScale: 400,
    flockLabel: '400+ Pure Gavran Layers',
    biosecurityLevel: 'Bio-Secure Tier 2 Perimeter',
    logisticsReach: 'Western Maharashtra Regional Fresh Grid',
    summary: 'Currently operating at 200 eggs daily (present peak) with certified Gavran purity, daily morning harvest, and established Western Maharashtra regional fresh grid.',
    operationalDetails: [
      'Currently 200 eggs daily (present peak)',
      '100% genuine free-range Gavran certified diet',
      'Western Maharashtra Regional Fresh Grid dispatch'
    ],
    icon: CheckCircle2,
  },
  {
    id: 'pt-2027',
    year: '2027',
    periodLabel: 'In Development',
    stageName: 'Expanded Production & Packaging (In Development)',
    horizon: 'NEXT',
    status: 'IN DEVELOPMENT',
    statusClass: 'border-[#D4AF37]/60 text-[#FFD700] bg-[#D4AF37]/10',
    scalingIndex: 75,
    eggYield: 500,
    eggYieldLabel: '500 eggs daily',
    flockScale: 800,
    flockLabel: '800+ Free-Range Layers',
    biosecurityLevel: 'Automated Housing & Bio-Tier 3',
    logisticsReach: 'Inter-District Cold-Transit Network & molded pulp packaging integration',
    summary: 'Capacity expansion scaling to 500 eggs daily supported by modern automated housing, molded pulp packaging integration, and inter-district cold-transit network.',
    operationalDetails: [
      'Targeted ramp to 500 eggs daily',
      'Eco-friendly molded pulp carton packaging integration',
      'Automated temperature-controlled egg collection lines'
    ],
    icon: Package,
  },
  {
    id: 'pt-2027-july',
    year: '2027 July ( Month )',
    periodLabel: 'Target Milestone',
    stageName: 'Daily 1,000+ Production Hub (Target Milestone / Upcoming Pipeline)',
    horizon: 'FUTURE',
    status: 'UPCOMING PIPELINE',
    statusClass: 'border-blue-400/50 text-blue-300 bg-blue-500/10',
    scalingIndex: 100,
    eggYield: 1000,
    eggYieldLabel: '1000+ eggs daily',
    flockScale: 1500,
    flockLabel: '1500+ Certified Gavran Birds',
    biosecurityLevel: 'High-Density Bio-Secure Sanctuary',
    logisticsReach: 'Statewide Metro Logistics & planned international export distribution readiness',
    summary: 'Strategic milestone achieving 1000+ eggs daily pure Gavran output with high-density bio-secure sanctuary, statewide metro logistics, and export distribution readiness.',
    operationalDetails: [
      'Achieving 1000+ eggs daily milestone by 2027 July ( Month )',
      'Automated grading, optical inspection & laser timestamps',
      'Statewide metro logistics & planned international export readiness'
    ],
    icon: Egg,
  },
];

type MetricLens = 'scalingIndex' | 'eggYield' | 'flockScale';

export const StrategicGrowthTrajectoryChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chartId = useId();

  // Component state
  const [activeMetric, setActiveMetric] = useState<MetricLens>('eggYield');
  const [selectedPoint, setSelectedPoint] = useState<MilestoneTrajectoryPoint>(TRAJECTORY_DATA[1]); // Default to 2026 present peak
  const [hoveredPoint, setHoveredPoint] = useState<MilestoneTrajectoryPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [horizonFilter, setHorizonFilter] = useState<'ALL' | 'TODAY' | 'NEXT' | 'FUTURE'>('ALL');
  const [containerWidth, setContainerWidth] = useState(900);

  // Filtered data points with continuous connection
  const displayedData = React.useMemo(() => {
    if (horizonFilter === 'ALL') return TRAJECTORY_DATA;
    if (horizonFilter === 'TODAY') return TRAJECTORY_DATA.filter((p) => p.horizon === 'TODAY');
    if (horizonFilter === 'NEXT') return [TRAJECTORY_DATA[1], TRAJECTORY_DATA[2]];
    return [TRAJECTORY_DATA[2], TRAJECTORY_DATA[3]];
  }, [horizonFilter]);

  // Responsive Resize Observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main D3 Rendering & Non-Financial Animation Sequence
  const renderChart = (animate = false) => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const height = isMobile ? 320 : isTablet ? 380 : 440;

    const margin = {
      top: 40,
      right: isMobile ? 30 : 60,
      bottom: isMobile ? 50 : 60,
      left: isMobile ? 45 : 75,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Define defs (gradients, glows, shadows)
    const defs = svg.append('defs');

    // Metallic Gold Line Gradient
    const goldGrad = defs
      .append('linearGradient')
      .attr('id', `goldLineGrad-${chartId}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    goldGrad.append('stop').attr('offset', '0%').attr('stop-color', '#10B981'); // 2025 Foundation green
    goldGrad.append('stop').attr('offset', '35%').attr('stop-color', '#FFD700'); // 2026 Present Peak gold
    goldGrad.append('stop').attr('offset', '70%').attr('stop-color', '#F59E0B'); // 2027 Scale-Up amber
    goldGrad.append('stop').attr('offset', '100%').attr('stop-color', '#60A5FA'); // 2027 July 1000+ blue

    // Trajectory Area Fill Gradient
    const areaGrad = defs
      .append('linearGradient')
      .attr('id', `areaFillGrad-${chartId}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    areaGrad.append('stop').attr('offset', '0%').attr('stop-color', '#D4AF37').attr('stop-opacity', 0.28);
    areaGrad.append('stop').attr('offset', '50%').attr('stop-color', '#FFD700').attr('stop-opacity', 0.08);
    areaGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0a0a0a').attr('stop-opacity', 0);

    // Glow Filter
    const filter = defs.append('filter').attr('id', `goldGlow-${chartId}`).attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', isMobile ? 3 : 5).attr('result', 'blur');
    filter.append('feMerge').selectAll('feMergeNode').data(['blur', 'SourceGraphic']).enter().append('feMergeNode').attr('in', (d) => d);

    // Main Chart Canvas Group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Discrete ScalePoint for Milestone Years
    const xScale = d3
      .scalePoint<string>()
      .domain(displayedData.map((d) => d.year))
      .range([0, innerWidth])
      .padding(0.12);

    // Y Scale depending on active non-financial metric
    let yDomain: [number, number] = [0, 100];
    let yTickFormat: (d: d3.NumberValue) => string = (d) => `${d}%`;

    if (activeMetric === 'scalingIndex') {
      yDomain = [0, 100];
      yTickFormat = (d) => `${d}%`;
    } else if (activeMetric === 'eggYield') {
      yDomain = [0, 1200];
      yTickFormat = (d) => (Number(d) >= 1000 ? `${d}+/d` : `${d}/d`);
    } else {
      yDomain = [0, 4500];
      yTickFormat = (d) => (Number(d) >= 1000 ? `${(Number(d) / 1000).toFixed(1)}k` : `${d}`);
    }

    const yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]).nice();

    // Horizontal Subtle Gridlines
    const yTicks = isMobile ? 4 : 5;
    const gridGroup = g.append('g').attr('class', 'grid-lines');
    gridGroup
      .selectAll('line.grid-y')
      .data(yScale.ticks(yTicks))
      .enter()
      .append('line')
      .attr('class', 'grid-y')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255, 255, 255, 0.06)')
      .attr('stroke-dasharray', '3 4');

    // Baseline Separator
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', innerHeight)
      .attr('y2', innerHeight)
      .attr('stroke', 'rgba(212, 175, 55, 0.25)')
      .attr('stroke-width', 1.5);

    // Y Axis (Left)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(yTicks)
      .tickFormat(yTickFormat)
      .tickSize(-6);

    const yAxisG = g
      .append('g')
      .attr('class', 'y-axis text-xs text-gray-400')
      .call(yAxis);

    yAxisG.select('.domain').remove();
    yAxisG.selectAll('.tick line').attr('stroke', 'rgba(212, 175, 55, 0.2)');
    yAxisG
      .selectAll('.tick text')
      .attr('fill', '#9CA3AF')
      .attr('font-size', isMobile ? '10px' : '11px')
      .attr('font-family', 'sans-serif')
      .attr('dx', '-8px');

    // Y Axis Label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', isMobile ? -32 : -52)
      .attr('text-anchor', 'middle')
      .attr('fill', '#D4AF37')
      .attr('font-size', isMobile ? '9px' : '11px')
      .attr('font-weight', '600')
      .attr('letter-spacing', '0.08em')
      .text(
        activeMetric === 'scalingIndex'
          ? 'OPERATIONAL SCALING INDEX (%)'
          : activeMetric === 'eggYield'
          ? 'DAILY EGG YIELD (UNITS / DAY)'
          : 'FLOCK BIO-CAPACITY (NATIVE BIRDS)'
      );

    // X Axis (Bottom)
    const xAxis = d3.axisBottom(xScale).tickSize(6);
    const xAxisG = g
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisG.select('.domain').attr('stroke', 'rgba(212, 175, 55, 0.3)');
    xAxisG.selectAll('.tick line').attr('stroke', 'rgba(212, 175, 55, 0.3)');
    xAxisG
      .selectAll('.tick text')
      .attr('fill', '#E5E7EB')
      .attr('font-size', isMobile ? '10px' : '12px')
      .attr('font-weight', '600')
      .attr('font-family', 'sans-serif')
      .attr('dy', '14px');

    // Value accessor helper
    const getValue = (d: MilestoneTrajectoryPoint) => {
      if (activeMetric === 'scalingIndex') return d.scalingIndex;
      if (activeMetric === 'eggYield') return d.eggYield;
      return d.flockScale;
    };

    // D3 Line & Area Generators
    const lineGenerator = d3
      .line<MilestoneTrajectoryPoint>()
      .x((d) => xScale(d.year) || 0)
      .y((d) => yScale(getValue(d)))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3
      .area<MilestoneTrajectoryPoint>()
      .x((d) => xScale(d.year) || 0)
      .y0(innerHeight)
      .y1((d) => yScale(getValue(d)))
      .curve(d3.curveMonotoneX);

    // Render Area Fill
    const areaPath = g
      .append('path')
      .datum(displayedData)
      .attr('class', 'area-trajectory')
      .attr('fill', `url(#areaFillGrad-${chartId})`)
      .attr('d', areaGenerator);

    // Render Main Curve Line
    const mainPath = g
      .append('path')
      .datum(displayedData)
      .attr('class', 'line-trajectory')
      .attr('fill', 'none')
      .attr('stroke', `url(#goldLineGrad-${chartId})`)
      .attr('stroke-width', isMobile ? 3 : 4)
      .attr('filter', `url(#goldGlow-${chartId})`)
      .attr('d', lineGenerator);

    // Projected Future Dash Overlay for upcoming horizon (from 2026 peak onwards)
    const futureSegmentData = displayedData.filter((d) => d.year === '2026' || ['NEXT', 'FUTURE'].includes(d.horizon));
    if (futureSegmentData.length > 1) {
      g.append('path')
        .datum(futureSegmentData)
        .attr('fill', 'none')
        .attr('stroke', '#60A5FA')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '4 4')
        .attr('opacity', 0.6)
        .attr('d', lineGenerator);
    }

    // Dynamic Animation Sequence
    if (animate) {
      setIsAnimating(true);
      const totalLength = (mainPath.node() as SVGPathElement)?.getTotalLength?.() || 800;

      // Stroke dash drawing animation
      mainPath
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1800)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0)
        .on('end', () => setIsAnimating(false));

      // Area fill opacity fade in
      areaPath
        .attr('opacity', 0)
        .transition()
        .delay(300)
        .duration(1400)
        .attr('opacity', 1);
    }

    // Vertical Cursor Tracking Line (Hidden initially)
    const scanLine = g
      .append('line')
      .attr('class', 'scanline-tracker')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#FFD700')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3 3')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    // Milestone Data Nodes Group
    const nodesGroup = g.append('g').attr('class', 'milestone-nodes');

    displayedData.forEach((point, idx) => {
      const cx = xScale(point.year) || 0;
      const cy = yScale(getValue(point));
      const isSelected = selectedPoint?.id === point.id;
      const isPresentPeak = point.year === '2026' || point.id === 'pt-2026';

      const nodeG = nodesGroup
        .append('g')
        .attr('class', `milestone-node node-${point.id} cursor-pointer`)
        .attr('transform', `translate(${cx},${cy})`);

      // Outer Pulsing Radar Ring on present/selected points
      if (isPresentPeak || isSelected) {
        nodeG
          .append('circle')
          .attr('r', isMobile ? 14 : 18)
          .attr('fill', 'none')
          .attr('stroke', isPresentPeak ? '#FFD700' : '#38BDF8')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.6)
          .append('animate')
          .attr('attributeName', 'r')
          .attr('values', `${isMobile ? 12 : 16};${isMobile ? 22 : 28};${isMobile ? 12 : 16}`)
          .attr('dur', '2.5s')
          .attr('repeatCount', 'indefinite');

        nodeG
          .append('circle')
          .attr('r', isMobile ? 14 : 18)
          .attr('fill', 'none')
          .attr('stroke', isPresentPeak ? '#FFD700' : '#38BDF8')
          .attr('stroke-width', 1)
          .attr('opacity', 0.8)
          .append('animate')
          .attr('attributeName', 'opacity')
          .attr('values', '0.8;0.1;0.8')
          .attr('dur', '2.5s')
          .attr('repeatCount', 'indefinite');
      }

      // Outer glow boundary circle
      nodeG
        .append('circle')
        .attr('r', isSelected ? (isMobile ? 9 : 12) : isMobile ? 6 : 8)
        .attr('fill', isPresentPeak ? '#1a1402' : '#0d0d0d')
        .attr('stroke', isPresentPeak ? '#FFD700' : point.horizon === 'FUTURE' ? '#60A5FA' : '#D4AF37')
        .attr('stroke-width', isSelected ? 3 : 2)
        .attr('filter', isSelected ? `url(#goldGlow-${chartId})` : null);

      // Core inner solid milestone dot
      nodeG
        .append('circle')
        .attr('r', isSelected ? (isMobile ? 4.5 : 6) : isMobile ? 3 : 4)
        .attr('fill', isPresentPeak ? '#FFD700' : point.horizon === 'FUTURE' ? '#93C5FD' : '#F3E5AB');

      // Direct Metric Output Text Label Above Node (e.g. 100 eggs daily, 200 eggs daily, 500 eggs daily, 1000+ eggs daily)
      nodeG
        .append('text')
        .attr('y', cy < 50 ? 36 : -30)
        .attr('text-anchor', 'middle')
        .attr('fill', isPresentPeak ? '#FFD700' : isSelected ? '#FFFFFF' : '#E5E7EB')
        .attr('font-size', isMobile ? '8px' : '10.5px')
        .attr('font-weight', 'bold')
        .attr('letter-spacing', '0.02em')
        .text(
          activeMetric === 'eggYield'
            ? point.eggYieldLabel
            : activeMetric === 'scalingIndex'
            ? `${point.scalingIndex}% Index`
            : point.flockLabel
        );

      // Milestone Tag Label Above Node (e.g. Foundation, Present Peak, Expansion Phase, Target Milestone)
      nodeG
        .append('text')
        .attr('y', cy < 50 ? 22 : -16)
        .attr('text-anchor', 'middle')
        .attr('fill', isPresentPeak ? '#FBBF24' : isSelected ? '#F3E5AB' : '#9CA3AF')
        .attr('font-size', isMobile ? '7.5px' : '9px')
        .attr('font-weight', isSelected || isPresentPeak ? 'bold' : 'normal')
        .attr('letter-spacing', '0.04em')
        .text(point.periodLabel);

      // Animated entrance if sequence triggered
      if (animate) {
        nodeG
          .attr('opacity', 0)
          .transition()
          .delay(500 + idx * 220)
          .duration(500)
          .ease(d3.easeBackOut)
          .attr('opacity', 1);
      }

      // Interactive Events
      nodeG
        .on('mouseenter', (event) => {
          setHoveredPoint(point);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: cx + margin.left,
              y: cy + margin.top,
            });
          }
          scanLine
            .attr('x1', cx)
            .attr('x2', cx)
            .attr('opacity', 0.8);
        })
        .on('mouseleave', () => {
          setHoveredPoint(null);
          setTooltipPos(null);
          scanLine.attr('opacity', 0);
        })
        .on('click', () => {
          setSelectedPoint(point);
        });
    });

    // Invisible Interactive Overlay for scrub interaction
    const overlay = g
      .append('rect')
      .attr('class', 'interactive-overlay')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair')
      .lower(); // Keep below circles so direct clicks on dots are prioritized

    overlay
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        // Find closest data point
        let closest: MilestoneTrajectoryPoint = displayedData[0];
        let minDiff = Infinity;

        displayedData.forEach((d) => {
          const ptX = xScale(d.year) || 0;
          const diff = Math.abs(ptX - mx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = d;
          }
        });

        const closestX = xScale(closest.year) || 0;
        const closestY = yScale(getValue(closest));

        scanLine
          .attr('x1', closestX)
          .attr('x2', closestX)
          .attr('opacity', 0.7);

        setHoveredPoint(closest);
        setTooltipPos({
          x: closestX + margin.left,
          y: closestY + margin.top,
        });
      })
      .on('mouseleave', () => {
        setHoveredPoint(null);
        setTooltipPos(null);
        scanLine.attr('opacity', 0);
      });
  };

  // Trigger render on mount and parameter updates
  useEffect(() => {
    renderChart(false);
  }, [containerWidth, activeMetric, selectedPoint, horizonFilter]);

  // Handle Play/Replay Sequence
  const handleTriggerAnimation = () => {
    renderChart(true);
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#0c0c0c] border border-[#D4AF37]/30 p-5 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden my-12">
      {/* Background Decorative Ambient Radial Sheen */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              NON-FINANCIAL TRAJECTORY • OPERATIONAL SCALE
            </span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            STRATEGIC GROWTH <span className="gold-text-gradient">TRAJECTORY</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Interactive D3.js timeline modeling Gavran Poultry Farms’ production ramp: 2025 (100 eggs daily),
            2026 (200 eggs daily present peak), 2027 (500 eggs daily), and 2027 July ( Month ) (1000+ eggs daily target hub).
          </p>
        </div>

        {/* Action Controls: Sequence Replay & Horizon Filter */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleTriggerAnimation}
            disabled={isAnimating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#1a1708] border border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_0_15px_rgba(255,215,0,0.15)] cursor-pointer disabled:opacity-50"
            title="Replay the non-financial growth trajectory animation sequence"
          >
            {isAnimating ? (
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isAnimating ? 'DRAWING...' : 'REPLAY SEQUENCE'}</span>
          </button>

          {/* Horizon Filters */}
          <div className="flex rounded-xl bg-black/60 p-1 border border-white/10">
            {(['ALL', 'TODAY', 'NEXT', 'FUTURE'] as const).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizonFilter(h)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  horizonFilter === h
                    ? 'bg-[#D4AF37] text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Lens Selector Tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-6 pb-4">
        <span className="text-xs text-gray-400 font-medium mr-2">Operational Metric Lens:</span>

        <button
          type="button"
          onClick={() => setActiveMetric('scalingIndex')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            activeMetric === 'scalingIndex'
              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFD700] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/20'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Operational Scaling Index (0–100%)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('eggYield')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            activeMetric === 'eggYield'
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/20'
          }`}
        >
          <Egg className="w-3.5 h-3.5" />
          <span>Daily Pure Gavran Egg Output (Units / Day)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('flockScale')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            activeMetric === 'flockScale'
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/20'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Flock & Breeding Colony Scale (Birds)</span>
        </button>
      </div>

      {/* SVG Chart Container */}
      <div ref={containerRef} className="relative w-full select-none">
        <svg
          ref={svgRef}
          width="100%"
          height={containerWidth < 640 ? 320 : containerWidth < 1024 ? 380 : 440}
          className="overflow-visible block"
        />

        {/* Floating Responsive Tooltip */}
        <AnimatePresence>
          {hoveredPoint && tooltipPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-3"
              style={{
                left: Math.max(130, Math.min(containerWidth - 140, tooltipPos.x)),
                top: Math.max(120, tooltipPos.y) - 12,
              }}
            >
              <div className="w-64 sm:w-72 bg-[#121212]/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/50 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.85)]">
                {/* Tooltip Header */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-lg font-black text-white">{hoveredPoint.year}</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">({hoveredPoint.periodLabel})</span>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${hoveredPoint.statusClass}`}>
                    {hoveredPoint.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#FFD700] mb-2 leading-tight">
                  {hoveredPoint.stageName}
                </div>

                {/* Non-Financial Metric Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-2.5">
                  <div className="bg-black/60 rounded-lg p-1.5 border border-white/5">
                    <span className="text-[9px] text-gray-400 block uppercase font-medium">Daily Output</span>
                    <span className="text-white font-bold">{hoveredPoint.eggYieldLabel}</span>
                  </div>
                  <div className="bg-black/60 rounded-lg p-1.5 border border-white/5">
                    <span className="text-[9px] text-gray-400 block uppercase font-medium">Scaling Index</span>
                    <span className="text-[#FFD700] font-bold">{hoveredPoint.scalingIndex}% / 100%</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-300 leading-snug line-clamp-2">
                  {hoveredPoint.summary}
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-400">
                  <span>Click node for deep dive</span>
                  <Sparkles className="w-3 h-3 text-[#FFD700]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Milestone Inspection Drawer */}
      {selectedPoint && (
        <motion.div
          key={selectedPoint.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {/* Milestone Overview Left */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#D4AF37]/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                {React.createElement(selectedPoint.icon, { className: 'w-5 h-5 text-[#FFD700]' })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">{selectedPoint.year}</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${selectedPoint.statusClass}`}>
                    {selectedPoint.status}
                  </span>
                </div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
                  {selectedPoint.stageName}
                </h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              {selectedPoint.summary}
            </p>
          </div>

          {/* Key Non-Financial Indicators Center */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="bg-black/50 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Daily Production</span>
              <span className="text-sm font-bold text-white mt-1 block">{selectedPoint.eggYieldLabel}</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Pure Gavran Grade
              </span>
            </div>

            <div className="bg-black/50 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Flock & Breeding</span>
              <span className="text-sm font-bold text-white mt-1 block">{selectedPoint.flockLabel}</span>
              <span className="text-[10px] text-gray-400 mt-0.5 block">{selectedPoint.biosecurityLevel}</span>
            </div>

            <div className="bg-black/50 rounded-xl p-3 border border-white/5 col-span-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Logistics & Market Footprint</span>
              <span className="text-xs font-semibold text-[#D4AF37] mt-1 block">{selectedPoint.logisticsReach}</span>
            </div>
          </div>

          {/* Operational Implementation Highlights Right */}
          <div className="lg:col-span-3 bg-white/[0.02] rounded-xl p-3.5 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-[#FFD700] font-bold block mb-2">
              Key Operational Pillars
            </span>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {selectedPoint.operationalDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                  <span className="leading-snug">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Trajectory Footnote */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Non-financial metric modeled using D3.js vector geometry. Projections reflect planned capacity expansions.</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Completed / Operational
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] inline-block" /> Active Milestone
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Future Horizon
          </span>
        </div>
      </div>
    </div>
  );
};

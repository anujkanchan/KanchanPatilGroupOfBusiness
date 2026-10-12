import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  baseAlpha: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayOffset: number;
}

export const PremiumAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseGlowRef = useRef<HTMLDivElement | null>(null);
  const aurora1Ref = useRef<HTMLDivElement | null>(null);
  const aurora2Ref = useRef<HTMLDivElement | null>(null);
  const aurora3Ref = useRef<HTMLDivElement | null>(null);
  const aurora4Ref = useRef<HTMLDivElement | null>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // 1. Device and Motion Checks
    const touchCheck =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);
    setIsTouchDevice(touchCheck);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. High-DPI Canvas & Particle Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Elegant sparse particle count
    const isMobile = width < 768 || touchCheck;
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 12 : 30;

    const goldPalette = [
      'rgba(212, 175, 55, ',   // Classic champagne gold
      'rgba(229, 197, 131, ',  // Pale silk gold
      'rgba(255, 240, 185, ',  // Warm ivory highlight
      'rgba(186, 140, 50, ',   // Deep amber gold
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.65, // Very small: 0.65px - 1.55px
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        baseAlpha: Math.random() * 0.18 + 0.12, // Low opacity: 0.12 - 0.30
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.18 + 0.12), // Gentle upward drift
        swaySpeed: Math.random() * 0.0015 + 0.0008,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    // 3. Smooth Mouse Coordinates with RAF Lerp (Zero layout thrashing)
    let targetX = width * 0.5;
    let targetY = height * 0.4;
    let currX = targetX;
    let currY = targetY;
    let normX = 0;
    let normY = 0;
    let targetNormX = 0;
    let targetNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetNormX = (e.clientX / width - 0.5) * 2; // -1 to 1
      targetNormY = (e.clientY / height - 0.5) * 2;
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.opacity = '0';
      }
      targetNormX = 0;
      targetNormY = 0;
    };

    if (!touchCheck) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Pause RAF when document is hidden to conserve power
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Unified 60fps Animation Loop
    let time = 0;
    const render = () => {
      if (!isVisible) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      time += 1;

      // Mouse Lerp (Smooth inertia: 0.065 factor)
      if (!touchCheck && !prefersReducedMotion) {
        currX += (targetX - currX) * 0.065;
        currY += (targetY - currY) * 0.065;
        normX += (targetNormX - normX) * 0.04;
        normY += (targetNormY - normY) * 0.04;

        // Apply interactive mouse glow via direct transform
        if (mouseGlowRef.current) {
          mouseGlowRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0)`;
        }
      }

      // Render Floating Particles
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && particleCount > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Slow organic drifting
          p.y += p.vy;
          p.x += p.vx + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.12;

          // Subtle parallax displacement
          const renderX = p.x + normX * 2.5;
          const renderY = p.y + normY * 2.5;

          // Wrap edges smoothly
          if (p.y < -15) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 10;
          if (p.x > width + 15) p.x = -10;

          // Subtle sinusoidal breathing alpha
          const dynamicAlpha =
            p.baseAlpha + Math.sin(time * 0.015 + p.swayOffset) * 0.05;
          const clampedAlpha = Math.max(0.06, Math.min(0.35, dynamicAlpha));

          ctx.beginPath();
          ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${clampedAlpha})`;
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!touchCheck) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#050505]"
      aria-hidden="true"
    >
      {/* 1. Deep Luxury Foundation & Subtle Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#070707] to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

      {/* 2. Slow-Moving Aurora & Mesh Lighting (2-4 large organic blurred light sources) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light Source 1: Champagne Gold Core Aurora */}
        <div ref={aurora1Ref} className="absolute inset-0 will-change-transform">
          <div
            className="absolute -top-[10%] left-[10%] w-[580px] sm:w-[720px] h-[580px] sm:h-[720px] rounded-full blur-[140px] sm:blur-[180px] animate-aurora-1 opacity-80"
            style={{
              background:
                'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(197, 160, 89, 0.04) 48%, rgba(0, 0, 0, 0) 75%)',
            }}
          />
        </div>

        {/* Light Source 2: Warm Honey Amber Aurora */}
        <div ref={aurora2Ref} className="absolute inset-0 will-change-transform">
          <div
            className="absolute top-[35%] -right-[8%] w-[620px] sm:w-[800px] h-[620px] sm:h-[800px] rounded-full blur-[150px] sm:blur-[190px] animate-aurora-2 opacity-75"
            style={{
              background:
                'radial-gradient(circle, rgba(170, 124, 17, 0.10) 0%, rgba(212, 175, 55, 0.03) 50%, rgba(0, 0, 0, 0) 75%)',
            }}
          />
        </div>

        {/* Light Source 3: Refined Agricultural Emerald Undertone */}
        <div ref={aurora3Ref} className="absolute inset-0 will-change-transform">
          <div
            className="absolute -bottom-[12%] left-[18%] w-[550px] sm:w-[680px] h-[550px] sm:h-[680px] rounded-full blur-[140px] sm:blur-[170px] animate-aurora-3 opacity-70"
            style={{
              background:
                'radial-gradient(circle, rgba(31, 107, 58, 0.08) 0%, rgba(20, 65, 35, 0.02) 50%, rgba(0, 0, 0, 0) 75%)',
            }}
          />
        </div>

        {/* Light Source 4: Soft Pale Gold Atmosphere */}
        <div ref={aurora4Ref} className="absolute inset-0 will-change-transform">
          <div
            className="absolute top-[20%] left-[45%] w-[480px] sm:w-[600px] h-[480px] sm:h-[600px] rounded-full blur-[130px] sm:blur-[160px] animate-aurora-4 opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 240, 185, 0.06) 0%, rgba(212, 175, 55, 0.02) 45%, rgba(0, 0, 0, 0) 70%)',
            }}
          />
        </div>
      </div>

      {/* 3. Floating Particles Canvas (Sparse, delicate, cinematic dust motes) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Interactive Mouse Ambient Glow (Soft radial illumination following cursor) */}
      {!isTouchDevice && (
        <div
          ref={mouseGlowRef}
          className="absolute top-0 left-0 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform transition-opacity duration-700 opacity-0"
          style={{
            background:
              'radial-gradient(circle, rgba(212, 175, 55, 0.075) 0%, rgba(197, 160, 89, 0.03) 38%, rgba(212, 175, 55, 0) 70%)',
          }}
        />
      )}

      {/* 5. Contrast Veil ensuring absolute text readability across all sections */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
    </div>
  );
};

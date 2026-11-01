import React, { useState, useEffect, useRef } from 'react';
import { Layers, Sparkles, Eye, Info, Move } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const CROP_ICONS = {
  apple: '🍎', banana: '🍌', blackgram: '🌱', chickpea: '🧆',
  coconut: '🥥', coffee: '☕', cotton: '☁️', grapes: '🍇',
  jute: '🌾', kidneybeans: '🫘', lentil: '🥣', maize: '🌽',
  mango: '🥭', mothbeans: '🌿', mungbean: '🥗', muskmelon: '🍈',
  orange: '🍊', papaya: '🍈', pigeonpeas: '🌾', pomegranate: '🪴',
  rice: '🌾', watermelon: '🍉'
};

export default function ThreeDBarChart({
  labels = [],
  values = [],
  maxValue = 100,
  unit = 'samples',
  title = 'Dataset Class Distribution (22 Categories)',
  colorScheme = 'emerald', // 'emerald' | 'dynamic-status' | 'blue' | 'purple'
  getColor = null
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const chartRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3D Parallax Tilt Physics on mouse move
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -py * 7, // rotateX
      y: px * 7   // rotateY
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTilt({ x: 0, y: 0 });
  };

  const safeMax = maxValue || Math.max(...values, 100);

  // Helper to determine 3D column color palette
  const resolveColumnTheme = (val, idx, label) => {
    if (getColor) {
      return getColor(val, idx, label);
    }

    if (colorScheme === 'dynamic-status') {
      // Used for precision/recall/f1 metrics
      const pct = val <= 1 ? val * 100 : val;
      if (pct >= 95) {
        return {
          top: 'radial-gradient(ellipse at center, #6ee7b7 0%, #10b981 100%)',
          body: 'linear-gradient(90deg, #047857 0%, #10b981 35%, #059669 70%, #064e3b 100%)',
          glow: 'rgba(52, 211, 153, 0.55)',
          topBorder: 'rgba(167, 243, 208, 0.9)',
          text: 'text-emerald-300'
        };
      } else if (pct >= 85) {
        return {
          top: 'radial-gradient(ellipse at center, #fde68a 0%, #f59e0b 100%)',
          body: 'linear-gradient(90deg, #b45309 0%, #f59e0b 35%, #d97706 70%, #78350f 100%)',
          glow: 'rgba(245, 158, 11, 0.55)',
          topBorder: 'rgba(253, 230, 138, 0.9)',
          text: 'text-amber-300'
        };
      } else {
        return {
          top: 'radial-gradient(ellipse at center, #fca5a5 0%, #ef4444 100%)',
          body: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 35%, #dc2626 70%, #7f1d1d 100%)',
          glow: 'rgba(239, 68, 68, 0.55)',
          topBorder: 'rgba(254, 202, 202, 0.9)',
          text: 'text-rose-300'
        };
      }
    }

    // Default: Lush Emerald 3D
    return {
      top: 'radial-gradient(ellipse at center, #34d399 0%, #059669 100%)',
      body: 'linear-gradient(90deg, #047857 0%, #10b981 30%, #059669 70%, #064e3b 100%)',
      glow: 'rgba(52, 211, 153, 0.5)',
      topBorder: 'rgba(167, 243, 208, 0.85)',
      text: 'text-emerald-300'
    };
  };

  return (
    <div ref={chartRef} className="w-full space-y-4 select-none">
      
      {/* 3D Stage Arena Container with Interactive Parallax Perspective */}
      <div 
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-x-auto pb-4 pt-6 px-2 sm:px-4 rounded-3xl bg-gradient-to-b from-[#06180E] via-forest-950 to-[#031109] border border-forest-800 shadow-2xl transition-transform duration-200"
        style={{
          perspective: '1200px',
        }}
      >
        
        {/* Holographic Ambient Grid Floor in 3D Space */}
        <div 
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(52, 211, 153, 0.25) 1px, transparent 1px),
              linear-gradient(to top, rgba(52, 211, 153, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            transform: 'perspective(500px) rotateX(64deg) translateY(18px)',
            transformOrigin: 'bottom center'
          }}
        />

        {/* Ambient Top Glow & Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Top Floating Legend / Info Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-3 pb-4 border-b border-forest-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></span>
            <span className="font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <span>✨ 3D Volumetric Isometric Arena</span>
            </span>
            <span className="text-slate-400 text-[11px] hidden md:inline">
              · Interactive Parallax Tilt & Depth Shading
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-300">
            <span className="hidden sm:inline text-slate-400">Total:</span>
            <strong className="text-emerald-300 font-bold bg-forest-900/80 px-2.5 py-1 rounded-lg border border-forest-700/60">
              <AnimatedCounter value={values.reduce((a, b) => a + b, 0)} suffix={` ${unit}`} />
            </strong>
          </div>
        </div>

        {/* 3D Bar Grid Stage with Dynamic Tilt */}
        <div 
          className="relative z-10 min-w-[760px] h-72 sm:h-80 flex items-end justify-between gap-1.5 sm:gap-2.5 px-4 pt-12 pb-14 transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          
          {/* Y-axis Reference Grid Lines */}
          <div className="absolute inset-x-4 top-12 bottom-14 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] font-mono text-slate-400">
            <div className="border-b border-dashed border-emerald-400 flex justify-between"><span>{safeMax}</span></div>
            <div className="border-b border-dashed border-emerald-400 flex justify-between"><span>{Math.round(safeMax * 0.75)}</span></div>
            <div className="border-b border-dashed border-emerald-400 flex justify-between"><span>{Math.round(safeMax * 0.5)}</span></div>
            <div className="border-b border-dashed border-emerald-400 flex justify-between"><span>{Math.round(safeMax * 0.25)}</span></div>
            <div className="border-b border-slate-600 flex justify-between"><span>0</span></div>
          </div>

          {labels.map((label, idx) => {
            const rawVal = values[idx] !== undefined ? values[idx] : 100;
            const heightPercent = Math.min(Math.max((rawVal / safeMax) * 100, 4), 100);
            const isHovered = hoveredIndex === idx;
            const cropKey = label.toLowerCase().replace(/[^a-z]/g, '');
            const cropIcon = CROP_ICONS[cropKey] || '🌱';
            const theme = resolveColumnTheme(rawVal, idx, label);

            return (
              <div
                key={label}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                {/* 3D Floating Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-30 px-3.5 py-1.5 rounded-xl bg-forest-950/95 border-2 border-emerald-400 text-white text-[11px] font-bold shadow-2xl flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150 pointer-events-none whitespace-nowrap">
                    <span className="text-base">{cropIcon}</span>
                    <span className="capitalize">{label}:</span>
                    <span className="text-emerald-300 font-black">
                      {rawVal} {unit}
                    </span>
                  </div>
                )}

                {/* Number above bar — animates on scroll */}
                <div 
                  className={`text-[10px] font-mono font-bold mb-1.5 transition-all duration-300 ${
                    isHovered ? `${theme.text} scale-125 -translate-y-1` : 'text-slate-400 opacity-80'
                  }`}
                >
                  {isInView ? <AnimatedCounter value={rawVal} duration={1200} /> : '0'}
                </div>

                {/* 3D Cylinder / Column Wrapper with Depth Shadow */}
                <div 
                  className="relative w-full max-w-[28px] sm:max-w-[34px] transition-all duration-300"
                  style={{
                    height: isInView ? `${heightPercent}%` : '0%',
                    transition: `height 1.15s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 30}ms, transform 0.25s ease-out`,
                    transform: isHovered ? 'translateY(-12px) scale(1.12)' : 'translateY(0) scale(1)'
                  }}
                >
                  {/* 3D Top Cap (Elliptical Cylinder Head with specular ring) */}
                  <div 
                    className="absolute -top-2 inset-x-0 h-4 rounded-[50%] z-20 shadow-md transition-all duration-300"
                    style={{
                      background: isHovered 
                        ? 'radial-gradient(ellipse at center, #a7f3d0 0%, #10b981 100%)'
                        : theme.top,
                      border: `1px solid ${theme.topBorder}`,
                      boxShadow: isHovered ? `0 0 16px ${theme.glow}` : 'none'
                    }}
                  />

                  {/* 3D Column Body with Multi-angle Specular Sheen and Depth Shadow */}
                  <div 
                    className="w-full h-full rounded-b-md shadow-2xl relative overflow-hidden transition-all duration-300"
                    style={{
                      background: theme.body,
                      boxShadow: isHovered 
                        ? `0 0 24px ${theme.glow}, inset 0 2px 4px rgba(255,255,255,0.4)`
                        : '0 8px 18px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Left vertical specular light sheen (gives cylindrical curve effect) */}
                    <div className="absolute top-0 bottom-0 left-[22%] w-[20%] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-[0.5px] pointer-events-none" />

                    {/* Right vertical cylindrical depth shadow */}
                    <div className="absolute top-0 bottom-0 right-0 w-[28%] bg-gradient-to-l from-black/45 to-transparent pointer-events-none" />
                  </div>

                  {/* 3D Bottom Neon Light Ring (Ground contact reflection) */}
                  <div 
                    className="absolute -bottom-2 inset-x-0 h-3 rounded-[50%] blur-[2px] z-0 pointer-events-none transform scale-125 transition-all duration-300"
                    style={{
                      background: isHovered ? theme.glow : 'rgba(0,0,0,0.65)'
                    }}
                  />
                </div>

                {/* X-axis Crop Label (Tilted 45 degrees for isometric feel) */}
                <div className="absolute -bottom-10 inset-x-0 flex items-center justify-center pointer-events-none">
                  <span 
                    className={`text-[10px] font-semibold whitespace-nowrap transition-colors transform -rotate-45 origin-top-left ${
                      isHovered ? 'text-emerald-300 font-bold scale-110' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

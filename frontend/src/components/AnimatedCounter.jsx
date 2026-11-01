import React, { useState, useEffect, useRef, useCallback } from 'react';
 
 /**
  * AnimatedCounter — Smoothly counts up to target value when scrolled into view.
  * 
  * Features:
  * - Guaranteed truthful fallback display: Never gets stuck at '0' if value is non-zero
  * - Seamless re-animation when async prop values update (e.g. API load)
  * - Full prefers-reduced-motion accessibility compliance
  * - Ease-out exponential animation curve for premium iOS feel
  */
 export default function AnimatedCounter({
   value,
   duration = 1400,
   decimals,
   prefix = '',
   suffix = '',
   className = '',
   formatThousands = true
 }) {
   // Parse numeric target
   const numValue = typeof value === 'number' 
     ? value 
     : parseFloat(String(value ?? 0).replace(/[^0-9.-]+/g, '')) || 0;
 
   // Detect decimal places if not specified
   const detectedDecimals = decimals !== undefined 
     ? decimals 
     : (String(value ?? '').includes('.') ? (String(value).split('.')[1]?.length || 0) : 0);
 
   const formatVal = useCallback((val) => {
     let formatted = Number(val).toFixed(detectedDecimals);
     if (formatThousands && detectedDecimals === 0) {
       formatted = Math.round(val).toLocaleString();
     } else if (formatThousands && detectedDecimals > 0) {
       const parts = formatted.split('.');
       parts[0] = parseInt(parts[0], 10).toLocaleString();
       formatted = parts.join('.');
     }
     return formatted;
   }, [detectedDecimals, formatThousands]);
 
   // Default initial display is the formatted value so zero-flicker is eliminated
   const [displayValue, setDisplayValue] = useState(() => formatVal(numValue));
   const elementRef = useRef(null);
   const prevValRef = useRef(0);
   const isVisibleRef = useRef(false);
   const animFrameRef = useRef(null);
 
   const animateCount = useCallback((startVal, endVal) => {
     if (animFrameRef.current) {
       cancelAnimationFrame(animFrameRef.current);
     }
 
     // Respect reduced motion
     if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       setDisplayValue(formatVal(endVal));
       prevValRef.current = endVal;
       return;
     }
 
     const startTime = performance.now();
 
     const step = (currentTime) => {
       const elapsed = currentTime - startTime;
       const progress = Math.min(elapsed / duration, 1);
 
       // Smooth easeOutExpo curve for premium Apple-like feel
       const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
       const current = startVal + (endVal - startVal) * ease;
 
       setDisplayValue(formatVal(current));
 
       if (progress < 1) {
         animFrameRef.current = requestAnimationFrame(step);
       } else {
         setDisplayValue(formatVal(endVal));
         prevValRef.current = endVal;
       }
     };
 
     animFrameRef.current = requestAnimationFrame(step);
   }, [duration, formatVal]);
 
   useEffect(() => {
     const el = elementRef.current;
     if (!el) return;
 
     // If IntersectionObserver is not supported, display immediately
     if (!('IntersectionObserver' in window)) {
       setDisplayValue(formatVal(numValue));
       return;
     }
 
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             const wasVisible = isVisibleRef.current;
             isVisibleRef.current = true;
             if (!wasVisible) {
               animateCount(0, numValue);
             }
           }
         });
       },
       { threshold: 0.1 }
     );
 
     observer.observe(el);
 
     // If value changes while already visible, animate from previous to new
     if (isVisibleRef.current && numValue !== prevValRef.current) {
       animateCount(prevValRef.current, numValue);
     }
 
     return () => {
       observer.disconnect();
       if (animFrameRef.current) {
         cancelAnimationFrame(animFrameRef.current);
       }
     };
   }, [numValue, animateCount, formatVal]);
 
   return (
     <span ref={elementRef} className={`inline-block font-sans tabular-nums ${className}`}>
       {prefix}{displayValue}{suffix}
     </span>
   );
 }

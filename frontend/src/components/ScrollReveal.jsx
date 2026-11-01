import React, { useState, useEffect, useRef } from 'react';

/**
 * ScrollReveal — 3D perspective reveal container that animates into view when scrolled.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  distance = 30
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `perspective(1000px) rotateX(10deg) translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `perspective(1000px) rotateX(-10deg) translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `perspective(1000px) rotateY(-8deg) translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `perspective(1000px) rotateY(8deg) translate3d(-${distance}px, 0, 0)`;
      default:
        return `perspective(1000px) rotateX(10deg) translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={`preserve-3d ${className}`}
    >
      {children}
    </div>
  );
}

"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  dataCursor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  dataCursor = "OPEN",
  onClick,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(isFinePointer && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Limit maximum displacement to 10px
    const maxDist = 12;
    const clampedX = Math.max(-maxDist, Math.min(maxDist, deltaX));
    const clampedY = Math.max(-maxDist, Math.min(maxDist, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}

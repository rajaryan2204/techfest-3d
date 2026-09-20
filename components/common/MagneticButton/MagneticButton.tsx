"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.45,
  radius = 160,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let isRunning = false;

    const updatePhysics = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1 || targetX !== 0 || targetY !== 0) {
        setPosition({ x: currentX, y: currentY });
        animFrameId = requestAnimationFrame(updatePhysics);
      } else {
        setPosition({ x: 0, y: 0 });
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * (radius * 0.22) * strength;
        targetX = (dx / dist) * pull;
        targetY = (dy / dist) * pull;
        if (!isRunning) {
          isRunning = true;
          animFrameId = requestAnimationFrame(updatePhysics);
        }
      } else if (targetX !== 0 || targetY !== 0) {
        targetX = 0;
        targetY = 0;
        if (!isRunning) {
          isRunning = true;
          animFrameId = requestAnimationFrame(updatePhysics);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [radius, strength]);

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
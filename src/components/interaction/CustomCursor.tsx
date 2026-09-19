"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor for desktop pointers with fine precision
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isFinePointer || isTouch) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      if (interactive) {
        setHovered(true);
        const label = interactive.getAttribute("data-cursor");
        setCursorLabel(label || null);
      } else {
        setHovered(false);
        setCursorLabel(null);
      }
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth RAF loop for the trailing ring
    let rafId: number;
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-transform duration-75 will-change-transform ${
          hovered ? "scale-0" : "scale-100"
        }`}
      />

      {/* Trailing Outer Ring / Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center border transition-all duration-300 will-change-transform ${
          hovered
            ? cursorLabel
              ? "-ml-6 -mt-6 w-12 h-12 bg-white/10 border-white/40 backdrop-blur-xs scale-100"
              : "-ml-4 -mt-4 w-8 h-8 bg-white/15 border-white/40 scale-100"
            : "-ml-3 -mt-3 w-6 h-6 border-white/25 scale-75"
        }`}
      >
        {cursorLabel && hovered && (
          <span className="text-[8px] font-mono tracking-widest text-white uppercase select-none">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}

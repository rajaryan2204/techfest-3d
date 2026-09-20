"use client";

import React, { useEffect, useRef, useState } from "react";

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // Only enable on desktop with fine pointer (mouse / trackpad)
    // Completely disabled on mobile phones / tablets / touchscreens
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isFinePointer || isTouch) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn subtle neon trail particles when moving
      const dx = mousePos.current.x - prevMousePos.current.x;
      const dy = mousePos.current.y - prevMousePos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const count = Math.min(3, Math.max(1, Math.floor(dist / 14)));
        const colors = ["#00D9FF", "#00FFCC", "#38bdf8", "#7dd3fc"];

        for (let i = 0; i < count; i++) {
          const interp = i / count;
          particlesRef.current.push({
            x: prevMousePos.current.x + dx * interp + (Math.random() - 0.5) * 4,
            y: prevMousePos.current.y + dy * interp + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.8 - dx * 0.05,
            vy: (Math.random() - 0.5) * 0.8 - dy * 0.05,
            size: 2.2 + Math.random() * 1.8,
            alpha: 0.75,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        // Keep particle array lean for 120 FPS performance
        if (particlesRef.current.length > 40) {
          particlesRef.current = particlesRef.current.slice(-40);
        }

        prevMousePos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("a, button, [role='button'], input, select, textarea, [data-cursor], .cursor-pointer")
        );
        setIsHovered(interactive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const newId = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-3), { id: newId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newId));
      }, 450);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    // Smooth RAF loop for canvas particles and soft glow trailing
    let rafId: number;

    const render = () => {
      // 1. Soft glowing aura follows pointer smoothly
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.28;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.28;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Draw subtle neon particles on transparent canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (particlesRef.current.length > 0) {
            particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.04);

            particlesRef.current.forEach((p) => {
              p.x += p.vx;
              p.y += p.vy;
              p.vx *= 0.92;
              p.vy *= 0.92;
              p.alpha -= 0.038;

              ctx.save();
              ctx.globalAlpha = Math.max(0, p.alpha);
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.alpha), 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            });
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Canvas resize handler
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999998] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Neon Comet Trail Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Ambient Soft Neon Aura behind the standard OS pointer */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-all duration-300 ${
          isHovered
            ? "w-16 h-16 bg-[#00FFCC]/25 shadow-[0_0_35px_rgba(0,255,204,0.45)]"
            : "w-10 h-10 bg-[#00D9FF]/20 shadow-[0_0_20px_rgba(0,217,255,0.3)]"
        }`}
        style={{
          filter: "blur(8px)",
        }}
      />

      {/* 3. Subtle Cyber Click Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed rounded-full pointer-events-none border border-[#00D9FF]/70 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "36px",
            height: "36px",
            marginLeft: "-18px",
            marginTop: "-18px",
            animationDuration: "450ms",
            animationIterationCount: 1,
            boxShadow: "0 0 16px rgba(0, 217, 255, 0.6)",
          }}
        />
      ))}
    </div>
  );
}

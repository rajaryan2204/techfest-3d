"use client";

import React, { useEffect, useRef, useState } from "react";
import "./rocketCursor.css";

interface ExhaustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function RocketCursor() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const rocketRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ExhaustParticle[]>([]);
  const isCanvasRunningRef = useRef(false);
  const animCanvasIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (!isTouch) {
      setIsDesktop(true);
    }
  }, []);

  // High-Performance Particle Canvas Loop (Pauses completely when 0 particles)
  const renderParticles = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isCanvasRunningRef.current = false;
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      isCanvasRunningRef.current = false;
      return;
    }

    if (particlesRef.current.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isCanvasRunningRef.current = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.03);

    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.alpha -= p.decay;

      const alpha = Math.max(0, p.alpha);

      // Outer soft glow circle (hardware-accelerated, zero shadowBlur cost)
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, p.size * alpha * 1.5), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha * 0.35;
      ctx.fill();

      // Inner intense core spark
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * alpha * 0.7), 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    animCanvasIdRef.current = requestAnimationFrame(renderParticles);
  }, []);

  // Desktop Rocket Physics and Movement Loop
  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let shipX = mouseX;
    let shipY = mouseY;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    let isHoveringInteractive = false;
    let isMouseDown = false;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        isHoveringInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer')
        );
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      spawnExhaustBurst(shipX, shipY, currentAngle, 12);
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const wakeParticleCanvas = () => {
      if (!isCanvasRunningRef.current) {
        isCanvasRunningRef.current = true;
        animCanvasIdRef.current = requestAnimationFrame(renderParticles);
      }
    };

    const spawnExhaustBurst = (x: number, y: number, angle: number, count: number) => {
      if (particlesRef.current.length > 30) return; // Performance cap

      const nozzleDist = 18;
      const nozzleX = x - Math.cos(angle - Math.PI / 2) * nozzleDist;
      const nozzleY = y - Math.sin(angle - Math.PI / 2) * nozzleDist;
      const colors = ["#ffffff", "#00FFCC", "#0CC7F8", "#38bdf8"];

      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 1.2;
        const blastAngle = angle + Math.PI / 2 + spread;
        const speed = 3.0 + Math.random() * 5.0;

        particlesRef.current.push({
          x: nozzleX,
          y: nozzleY,
          vx: Math.cos(blastAngle) * speed,
          vy: Math.sin(blastAngle) * speed,
          size: 2.0 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.9,
          decay: 0.04 + Math.random() * 0.03,
        });
      }
      wakeParticleCanvas();
    };

    const lerpAngle = (from: number, to: number, step: number) => {
      const diff = (to - from + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      return from + diff * step;
    };

    const updateShip = () => {
      const ease = 0.35;
      shipX += (mouseX - shipX) * ease;
      shipY += (mouseY - shipY) * ease;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const rawSpeed = Math.hypot(dx, dy);

      velocity += (rawSpeed - velocity) * 0.25;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      if (rawSpeed > 0.8) {
        targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
      }
      currentAngle = lerpAngle(currentAngle, targetAngle, 0.28);

      if (rocketRef.current) {
        const rotDeg = (currentAngle * 180) / Math.PI;
        const scale = isMouseDown ? 1.12 : isHoveringInteractive ? 1.08 : 1.0;
        rocketRef.current.style.transform = `translate3d(${shipX}px, ${shipY}px, 0) rotate(${rotDeg}deg) scale(${scale})`;
      }

      if (flameRef.current) {
        const flameScaleY = Math.min(3.2, 0.5 + velocity * 0.07 + (isMouseDown ? 0.8 : 0));
        const flameScaleX = Math.min(1.8, 0.8 + velocity * 0.03);
        const flameGlow = Math.min(1, 0.4 + velocity * 0.05);
        flameRef.current.style.transform = `scale(${flameScaleX}, ${flameScaleY})`;
        flameRef.current.style.opacity = `${flameGlow}`;
      }

      // Smooth lightweight particle emission
      if ((velocity > 2.0 || isMouseDown) && particlesRef.current.length < 25) {
        const spawnCount = Math.min(2, Math.ceil(velocity * 0.1));
        const nozzleDist = 18;
        const nozzleX = shipX - Math.cos(currentAngle - Math.PI / 2) * nozzleDist;
        const nozzleY = shipY - Math.sin(currentAngle - Math.PI / 2) * nozzleDist;
        const colors = ["#ffffff", "#00FFCC", "#0CC7F8"];

        for (let i = 0; i < spawnCount; i++) {
          const spread = (Math.random() - 0.5) * 0.7;
          const blastAngle = currentAngle + Math.PI / 2 + spread;
          const speed = 1.5 + Math.random() * (velocity * 0.15 + 2);

          particlesRef.current.push({
            x: nozzleX + (Math.random() - 0.5) * 3,
            y: nozzleY + (Math.random() - 0.5) * 3,
            vx: Math.cos(blastAngle) * speed,
            vy: Math.sin(blastAngle) * speed,
            size: Math.min(3.5, 1.6 + velocity * 0.05),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.85,
            decay: 0.04 + Math.random() * 0.03,
          });
        }
        wakeParticleCanvas();
      }

      animFrameId = requestAnimationFrame(updateShip);
    };

    animFrameId = requestAnimationFrame(updateShip);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isDesktop, renderParticles]);


  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    return () => {
      if (animCanvasIdRef.current) cancelAnimationFrame(animCanvasIdRef.current);
      isCanvasRunningRef.current = false;
      window.removeEventListener("resize", resize);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Lightweight Exhaust Sparks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* Futuristic Sci-Fi Rocket Craft */}
      <div ref={rocketRef} className="rocket-craft-container">
        
        {/* Dynamic Thruster Flame */}
        <div ref={flameRef} className="rocket-thruster-flame">
          <div className="flame-core" />
          <div className="flame-outer" />
          <div className="flame-glow" />
        </div>

        {/* Vector Rocket SVG Hull */}
        <svg
          className="rocket-svg"
          viewBox="0 0 36 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#c5d0e0" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0CC7F8" />
              <stop offset="100%" stopColor="#002C07" />
            </linearGradient>

            <linearGradient id="cockpitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FFCC" />
              <stop offset="100%" stopColor="#0CC7F8" />
            </linearGradient>
          </defs>

          {/* Left Wing Stabilizer */}
          <path
            d="M 10 24 L 2 34 L 10 33 Z"
            fill="url(#wingGrad)"
            stroke="#0CC7F8"
            strokeWidth="0.8"
          />

          {/* Right Wing Stabilizer */}
          <path
            d="M 26 24 L 34 34 L 26 33 Z"
            fill="url(#wingGrad)"
            stroke="#0CC7F8"
            strokeWidth="0.8"
          />

          {/* Main Aerodynamic Rocket Body */}
          <path
            d="M 18 3 C 14 10 10 20 10 32 L 26 32 C 26 20 22 10 18 3 Z"
            fill="url(#hullGrad)"
            stroke="#0CC7F8"
            strokeWidth="1"
          />

          {/* Rocket Nosecone Tip Accent */}
          <path
            d="M 18 3 C 16 6 15 9 15 11 L 21 11 C 21 9 20 6 18 3 Z"
            fill="#0CC7F8"
          />

          {/* Glowing Cockpit Visor Window */}
          <ellipse
            cx="18"
            cy="17"
            rx="3.2"
            ry="4.8"
            fill="url(#cockpitGrad)"
            stroke="#ffffff"
            strokeWidth="0.8"
          />

          {/* Center Spine Telemetry Line */}
          <line
            x1="18"
            y1="23"
            x2="18"
            y2="31"
            stroke="#0CC7F8"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Exhaust Nozzle Engine Bell */}
          <path
            d="M 13 32 L 12 36 L 24 36 L 23 32 Z"
            fill="#0f172a"
            stroke="#0CC7F8"
            strokeWidth="0.8"
          />
        </svg>

      </div>
    </div>
  );
}
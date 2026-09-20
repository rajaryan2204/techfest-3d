"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./satelliteCursor.css";

interface IonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function SatelliteCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const satelliteRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<IonParticle[]>([]);
  const isCanvasRunningRef = useRef(false);
  const animCanvasIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (!isTouch) {
      setIsDesktop(true);
    }
  }, []);

  // High-Performance Particle Canvas Loop (Pauses completely when 0 particles)
  const renderParticles = useCallback(() => {
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

      // Outer soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, p.size * alpha * 1.5), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha * 0.4;
      ctx.fill();

      // Inner core
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * alpha * 0.6), 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = alpha * 0.9;
      ctx.fill();
    }

    animCanvasIdRef.current = requestAnimationFrame(renderParticles);
  }, []);

  // Desktop Flight Physics & Movement Loop
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
    let isMouseDown = false;
    let isHovering = false;
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
        const interactive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], [data-cursor], .cursor-pointer')
        );
        isHovering = interactive;
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      setIsClicked(true);
      spawnIonBurst(shipX, shipY, currentAngle, 10);
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsClicked(false);
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

    const spawnIonBurst = (x: number, y: number, angle: number, count: number) => {
      if (particlesRef.current.length > 30) return;

      const nozzleDist = 16;
      const nozzleX = x - Math.cos(angle - Math.PI / 2) * nozzleDist;
      const nozzleY = y - Math.sin(angle - Math.PI / 2) * nozzleDist;
      const colors = ["#ffffff", "#00FFCC", "#00D9FF", "#38bdf8"];

      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 1.0;
        const blastAngle = angle + Math.PI / 2 + spread;
        const speed = 2.5 + Math.random() * 4.5;

        particlesRef.current.push({
          x: nozzleX,
          y: nozzleY,
          vx: Math.cos(blastAngle) * speed,
          vy: Math.sin(blastAngle) * speed,
          size: 1.8 + Math.random() * 2.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.85,
          decay: 0.045 + Math.random() * 0.03,
        });
      }
      wakeParticleCanvas();
    };

    const lerpAngle = (from: number, to: number, step: number) => {
      const diff = (to - from + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      return from + diff * step;
    };

    const updateSatellite = () => {
      const ease = 0.38;
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
      currentAngle = lerpAngle(currentAngle, targetAngle, 0.3);

      if (satelliteRef.current) {
        const rotDeg = (currentAngle * 180) / Math.PI;
        const scale = isMouseDown ? 1.15 : isHovering ? 1.1 : 1.0;
        satelliteRef.current.style.transform = `translate3d(${shipX}px, ${shipY}px, 0) rotate(${rotDeg}deg) scale(${scale})`;
      }

      if (flameRef.current) {
        const flameScaleY = Math.min(2.8, 0.5 + velocity * 0.06 + (isMouseDown ? 0.7 : 0));
        const flameScaleX = Math.min(1.6, 0.8 + velocity * 0.03);
        const flameGlow = Math.min(1, 0.4 + velocity * 0.05);
        flameRef.current.style.transform = `scale(${flameScaleX}, ${flameScaleY})`;
        flameRef.current.style.opacity = `${flameGlow}`;
      }

      // Smooth lightweight ion particle emission
      if ((velocity > 1.8 || isMouseDown) && particlesRef.current.length < 24) {
        const spawnCount = Math.min(2, Math.ceil(velocity * 0.08));
        const nozzleDist = 16;
        const nozzleX = shipX - Math.cos(currentAngle - Math.PI / 2) * nozzleDist;
        const nozzleY = shipY - Math.sin(currentAngle - Math.PI / 2) * nozzleDist;
        const colors = ["#ffffff", "#00FFCC", "#00D9FF"];

        for (let i = 0; i < spawnCount; i++) {
          const spread = (Math.random() - 0.5) * 0.6;
          const blastAngle = currentAngle + Math.PI / 2 + spread;
          const speed = 1.4 + Math.random() * (velocity * 0.12 + 1.8);

          particlesRef.current.push({
            x: nozzleX + (Math.random() - 0.5) * 2.5,
            y: nozzleY + (Math.random() - 0.5) * 2.5,
            vx: Math.cos(blastAngle) * speed,
            vy: Math.sin(blastAngle) * speed,
            size: Math.min(3.2, 1.5 + velocity * 0.04),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.8,
            decay: 0.04 + Math.random() * 0.03,
          });
        }
        wakeParticleCanvas();
      }

      animFrameId = requestAnimationFrame(updateSatellite);
    };

    animFrameId = requestAnimationFrame(updateSatellite);

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
      aria-hidden="true"
    >
      {/* Ion Plasma Exhaust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* ISRO Space Satellite Craft Container */}
      <div ref={satelliteRef} className="satellite-cursor-container">
        {/* 1. Forward Scanning Laser Beam (Locks onto interactive elements) */}
        <div className={`satellite-scan-beam ${isHovered ? "scanning" : ""}`}>
          <svg viewBox="0 0 24 26" fill="none" className="w-full h-full">
            <polygon
              points="12,26 0,0 24,0"
              fill="url(#scanBeamGrad)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="scanBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#00D9FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 2. Rear Ion Propulsion Thruster Flame */}
        <div ref={flameRef} className="satellite-ion-thruster">
          <div className="ion-flame-core" />
          <div className="ion-flame-outer" />
          <div className="ion-flame-glow" />
        </div>

        {/* 3. Authentic High-Detail ISRO Satellite Vector SVG */}
        <svg
          className="satellite-svg"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Satellite Main Body Gradient */}
            <linearGradient id="satBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="45%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Gold Thermal MLI Blanket Accent */}
            <linearGradient id="goldMliGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Solar Panel Deep Blue Cells */}
            <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            {/* Optical Sensor Aperture Glow */}
            <linearGradient id="sensorApertureGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#00FFCC" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>

          {/* LEFT SOLAR PANEL ARRAY WING */}
          <g transform="translate(1, 14)">
            {/* Wing Boom Bracket */}
            <line x1="10" y1="8" x2="15" y2="8" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Main Panel Frame */}
            <rect
              x="0"
              y="2"
              width="10"
              height="12"
              rx="1"
              fill="url(#solarCellGrad)"
              stroke="#38bdf8"
              strokeWidth="0.7"
            />
            {/* Solar Cell Grid Lines */}
            <line x1="5" y1="2" x2="5" y2="14" stroke="#38bdf8" strokeWidth="0.5" opacity="0.8" />
            <line x1="0" y1="8" x2="10" y2="8" stroke="#38bdf8" strokeWidth="0.5" opacity="0.8" />
            {/* Green Starboard Nav LED */}
            <circle cx="1" cy="3" r="0.8" fill="#22c55e" />
          </g>

          {/* RIGHT SOLAR PANEL ARRAY WING */}
          <g transform="translate(33, 14)">
            {/* Wing Boom Bracket */}
            <line x1="-5" y1="8" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Main Panel Frame */}
            <rect
              x="0"
              y="2"
              width="10"
              height="12"
              rx="1"
              fill="url(#solarCellGrad)"
              stroke="#38bdf8"
              strokeWidth="0.7"
            />
            {/* Solar Cell Grid Lines */}
            <line x1="5" y1="2" x2="5" y2="14" stroke="#38bdf8" strokeWidth="0.5" opacity="0.8" />
            <line x1="0" y1="8" x2="10" y2="8" stroke="#38bdf8" strokeWidth="0.5" opacity="0.8" />
            {/* Red Port Nav LED */}
            <circle cx="9" cy="3" r="0.8" fill="#ef4444" />
          </g>

          {/* MAIN SATELLITE CHASSIS BUS */}
          <rect
            x="16"
            y="13"
            width="12"
            height="18"
            rx="2"
            fill="url(#satBodyGrad)"
            stroke="#00D9FF"
            strokeWidth="0.9"
          />

          {/* Gold MLI Thermal Foil Central Band */}
          <rect
            x="17"
            y="17"
            width="10"
            height="10"
            rx="1"
            fill="url(#goldMliGrad)"
            stroke="#f59e0b"
            strokeWidth="0.5"
          />

          {/* ISRO / TechFest High-Gain Communication Dish */}
          <ellipse
            cx="22"
            cy="22"
            rx="3"
            ry="2.5"
            fill="#0f172a"
            stroke="#00FFCC"
            strokeWidth="0.6"
          />
          <circle cx="22" cy="22" r="1" fill="#00FFCC" />

          {/* FORWARD OPTICAL SENSOR & LASER TIP (Click Point) */}
          <polygon
            points="22,6 18,13 26,13"
            fill="url(#sensorApertureGrad)"
            stroke="#00D9FF"
            strokeWidth="0.7"
          />
          <circle cx="22" cy="6" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 3px #00FFCC)" />

          {/* REAR ION THRUSTER NOZZLE */}
          <path
            d="M 19 31 L 18 34 L 26 34 L 25 31 Z"
            fill="#1e293b"
            stroke="#00D9FF"
            strokeWidth="0.7"
          />
        </svg>
      </div>
    </div>
  );
}

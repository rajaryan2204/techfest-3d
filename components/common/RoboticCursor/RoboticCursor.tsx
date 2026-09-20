"use client";

import React, { useEffect, useRef, useState } from "react";
import "./roboticCursor.css";

interface Shockwave {
  id: number;
  x: number;
  y: number;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

export default function RoboticCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorHudRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  // Shockwaves state
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const shockwaveIdRef = useRef(0);

  // Spark Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touchscreens/phones)
    if (typeof window === "undefined") return;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let hudX = -100;
    let hudY = -100;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      setCoords({ x: Math.round(mouseX), y: Math.round(mouseY) });

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    // Smooth Lerp Animation for Robotic HUD Reticle
    const render = () => {
      const ease = 0.18;
      hudX += (mouseX - hudX) * ease;
      hudY += (mouseY - hudY) * ease;

      if (cursorHudRef.current) {
        cursorHudRef.current.style.transform = `translate3d(${hudX}px, ${hudY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    // Click handler for Shockwave & Sparks
    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Spawn EMP Shockwave
      const newId = ++shockwaveIdRef.current;
      setShockwaves((prev) => [...prev.slice(-4), { id: newId, x: clickX, y: clickY }]);
      setTimeout(() => {
        setShockwaves((prev) => prev.filter((sw) => sw.id !== newId));
      }, 700);

      // Spawn Electric Spark Particles
      const sparkCount = 10;
      const newSparks: Spark[] = [];
      const colors = ["#0CC7F8", "#00FFCC", "#ffffff", "#38bdf8"];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = 2.5 + Math.random() * 4.5;
        newSparks.push({
          id: Math.random(),
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
        });
      }

      sparksRef.current = [...sparksRef.current, ...newSparks];
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

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
  }, [isVisible]);

  // Particle Physics Animation Loop for Sparks
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sparksRef.current.length > 0) {
        sparksRef.current = sparksRef.current.filter((p) => p.life > 0.02);

        sparksRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94; // friction
          p.vy *= 0.94;
          p.life -= 0.035; // fade rate

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      animId = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* Particle Canvas for Electrical Click Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* Dynamic Electromagnetic Shockwave Distortion Rings on Click */}
      {shockwaves.map((sw) => (
        <div
          key={sw.id}
          className="robotic-shockwave absolute rounded-full pointer-events-none"
          style={{ left: sw.x, top: sw.y }}
        >
          <div className="robotic-shockwave-inner" />
        </div>
      ))}

      {/* 1. Precision Center Laser Dot */}
      <div
        ref={cursorDotRef}
        className={`robotic-cursor-dot ${isClicked ? "robotic-dot-click" : ""} ${
          isHovered ? "robotic-dot-hover" : ""
        }`}
      />

      {/* 2. Robotic Targeting Reticle & HUD Telemetry */}
      <div
        ref={cursorHudRef}
        className={`robotic-cursor-hud ${isHovered ? "robotic-hud-locked" : ""} ${
          isClicked ? "robotic-hud-clicked" : ""
        }`}
      >
        {/* 4 Cyber Corner Brackets */}
        <span className="hud-corner hud-top-left" />
        <span className="hud-corner hud-top-right" />
        <span className="hud-corner hud-bottom-left" />
        <span className="hud-corner hud-bottom-right" />

        {/* Rotating Outer Reticle Ring */}
        <div className="hud-ring" />

        {/* Crosshair Ticks */}
        <span className="hud-crosshair hud-cross-top" />
        <span className="hud-crosshair hud-cross-bottom" />
        <span className="hud-crosshair hud-cross-left" />
        <span className="hud-crosshair hud-cross-right" />

        {/* Telemetry Readout */}
        <div className="hud-telemetry">
          <span className="hud-status">
            {isHovered ? "[ LOCKED ]" : "[ SCAN ]"}
          </span>
          <span className="hud-coords">
            {coords.x.toString().padStart(4, "0")}:{coords.y.toString().padStart(4, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
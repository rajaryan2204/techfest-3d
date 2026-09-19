"use client";

import React, { useRef, useEffect } from "react";

interface EarthPortalSphereProps {
  size?: number;
}

export default function EarthPortalSphere({ size = 220 }: EarthPortalSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create high-res cylindrical Earth map
    const mapWidth = 1024;
    const mapHeight = 512;
    const mapCanvas = document.createElement("canvas");
    mapCanvas.width = mapWidth;
    mapCanvas.height = mapHeight;
    const mctx = mapCanvas.getContext("2d");
    if (!mctx) return;

    // Deep Ocean gradient
    const oceanGrad = mctx.createLinearGradient(0, 0, 0, mapHeight);
    oceanGrad.addColorStop(0, "#081b2e");
    oceanGrad.addColorStop(0.5, "#0d2b45");
    oceanGrad.addColorStop(1, "#081b2e");
    mctx.fillStyle = oceanGrad;
    mctx.fillRect(0, 0, mapWidth, mapHeight);

    // Realistic Continents
    const drawLand = (x: number, y: number, w: number, h: number, color: string) => {
      mctx.fillStyle = color;
      mctx.beginPath();
      mctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
      mctx.fill();
    };

    mctx.filter = "blur(4px)";
    drawLand(220, 180, 130, 85, "#1e3a24"); // North America
    drawLand(320, 340, 75, 110, "#19331e");  // South America
    drawLand(550, 220, 95, 110, "#2c3b20");  // Africa
    drawLand(680, 170, 180, 95, "#1f3825");  // Eurasia
    drawLand(730, 230, 65, 55, "#25422a");   // India / SLIET region
    drawLand(860, 350, 75, 55, "#3d321d");   // Australia
    drawLand(512, 495, 500, 35, "#cbe3f7");  // Antarctica
    drawLand(512, 15, 500, 25, "#cbe3f7");   // Arctic

    // Swirling Cloud Bands onto offscreen cloud canvas
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = mapWidth;
    cloudCanvas.height = mapHeight;
    const cctx = cloudCanvas.getContext("2d")!;
    cctx.fillStyle = "rgba(0,0,0,0)";
    cctx.fillRect(0, 0, mapWidth, mapHeight);
    cctx.filter = "blur(8px)";
    cctx.fillStyle = "rgba(255, 255, 255, 0.45)";

    for (let i = 0; i < 40; i++) {
      const cx = (i * 28 + Math.random() * 20) % mapWidth;
      const cy = 100 + Math.random() * 300;
      const rx = 40 + Math.random() * 80;
      const ry = 15 + Math.random() * 25;
      cctx.beginPath();
      cctx.ellipse(cx, cy, rx, ry, Math.PI / 12, 0, Math.PI * 2);
      cctx.fill();
    }

    // Render loop for continuous slow Earth rotation + cloud drift
    let animId: number;
    let earthRot = 0;
    let cloudRot = 0;

    const render = () => {
      // Extremely slow, natural planetary rotation
      earthRot = (earthRot + 0.15) % mapWidth;
      // Clouds drift at slightly faster velocity
      cloudRot = (cloudRot + 0.26) % mapWidth;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const r = canvas.width / 2;
      ctx.save();

      // Circular Earth Mask
      ctx.beginPath();
      ctx.arc(r, r, r - 2, 0, Math.PI * 2);
      ctx.clip();

      // 1. Draw Earth continents
      ctx.drawImage(mapCanvas, -earthRot, 0, mapWidth, mapHeight, 0, 0, canvas.width * 2, canvas.height);
      ctx.drawImage(mapCanvas, mapWidth - earthRot, 0, mapWidth, mapHeight, 0, 0, canvas.width * 2, canvas.height);

      // 2. Draw Moving Cloud Layer
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.drawImage(cloudCanvas, -cloudRot, 0, mapWidth, mapHeight, 0, 0, canvas.width * 2, canvas.height);
      ctx.drawImage(cloudCanvas, mapWidth - cloudRot, 0, mapWidth, mapHeight, 0, 0, canvas.width * 2, canvas.height);
      ctx.restore();

      // 3. Realistic Spherical Shading & Day/Night Terminator
      const sphereGrad = ctx.createRadialGradient(r * 0.72, r * 0.65, r * 0.1, r, r, r);
      sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.28)");
      sphereGrad.addColorStop(0.55, "rgba(56, 189, 248, 0.08)");
      sphereGrad.addColorStop(0.85, "rgba(3, 7, 18, 0.65)");
      sphereGrad.addColorStop(1, "rgba(3, 7, 18, 0.95)");
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Atmospheric Rayleigh Rim Glow
      const atmoGrad = ctx.createRadialGradient(r, r, r * 0.76, r, r, r);
      atmoGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      atmoGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.25)");
      atmoGrad.addColorStop(1, "rgba(186, 230, 253, 0.9)");
      ctx.fillStyle = atmoGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full pointer-events-none select-none drop-shadow-[0_0_40px_rgba(56,189,248,0.8)]"
    >
      {/* Outer Atmospheric Glow */}
      <div className="absolute -inset-4 rounded-full bg-cyan-400/25 blur-2xl animate-pulse" />
      <div className="absolute -inset-1 rounded-full border border-cyan-400/40 shadow-[0_0_25px_rgba(56,189,248,0.7)]" />

      {/* Rotating 2.5D Earth Canvas with moving cloud bands */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full rounded-full"
      />

      {/* Subtle Orbital Ring */}
      <div
        style={{ animation: "spin 36s linear infinite reverse" }}
        className="absolute -inset-6 rounded-full border border-cyan-400/30 border-dashed opacity-60"
      />
    </div>
  );
}

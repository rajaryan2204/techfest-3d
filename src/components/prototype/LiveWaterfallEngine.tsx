"use client";

import React, { useRef, useEffect } from "react";

interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  length: number;
  alpha: number;
  color: string;
}

interface MistPuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface LakeRipple {
  x: number;
  y: number;
  rx: number;
  ry: number;
  maxR: number;
  speed: number;
  alpha: number;
}

interface SplashDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  gravity: number;
}

export default function LiveWaterfallEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Compute exact waterfall geometry based on 1376x768 aspect ratio object-cover:
    const getGeometry = () => {
      const imgAspect = 1376 / 768;
      const screenAspect = width / height;
      let renderW = width;
      let renderH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (screenAspect > imgAspect) {
        // Wider screen: image cropped top & bottom
        renderW = width;
        renderH = width / imgAspect;
        offsetY = (height - renderH) / 2;
      } else {
        // Taller screen: image cropped sides
        renderH = height;
        renderW = height * imgAspect;
        offsetX = (width - renderW) / 2;
      }

      // In original generated 1376x768 artwork:
      // Waterfall top: X = 50.8% (700px), Y = 52.5% (403px)
      // Waterfall bottom (lake impact): Y = 75.5% (580px)
      // Top stream width: ~17% of renderW
      // Bottom stream width: ~23% of renderW
      const topX = offsetX + renderW * 0.508;
      const topY = offsetY + renderH * 0.525;
      const botY = offsetY + renderH * 0.755;
      const topWidth = Math.max(60, renderW * 0.17);
      const botWidth = Math.max(90, renderW * 0.23);
      const lakeBottom = offsetY + renderH * 0.98;

      return { topX, topY, botY, topWidth, botWidth, lakeBottom, renderW, renderH, offsetX, offsetY };
    };

    // 1. Water Falling Droplets & Spray
    const droplets: Droplet[] = [];
    const dropletCount = width < 768 ? 120 : 260;
    const { topX, topY, botY, topWidth, botWidth } = getGeometry();

    for (let i = 0; i < dropletCount; i++) {
      const t = Math.random();
      const currentWidth = topWidth + (botWidth - topWidth) * t;
      droplets.push({
        x: topX - currentWidth / 2 + Math.random() * currentWidth,
        y: topY + t * (botY - topY),
        vx: (Math.random() - 0.5) * 1.8,
        vy: 14 + Math.random() * 16, // Rapid gravitational acceleration
        size: 1.2 + Math.random() * 2.2,
        length: 14 + Math.random() * 28,
        alpha: 0.35 + Math.random() * 0.6,
        color: Math.random() > 0.35 ? "#ffffff" : "#bae6fd",
      });
    }

    // 2. Billowing Impact Mist at Waterfall Base
    const mistPuffs: MistPuff[] = [];
    const maxMist = width < 768 ? 40 : 85;

    // 3. Upward Splashing Water Beads
    const splashes: SplashDrop[] = [];

    // 4. Lake Concentric Ripples
    const ripples: LakeRipple[] = [];

    let flowTime = 0;
    let animId: number;

    const render = () => {
      flowTime += 0.09;
      ctx.clearRect(0, 0, width, height);

      const geo = getGeometry();
      const fallDistance = geo.botY - geo.topY;

      // =========================================================================
      // LAYER 1: MULTI-STREAM FLOWING TURBULENT WATER COLUMN
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // A. Backing Blue/White Water Glow Column
      const waterBackGrad = ctx.createLinearGradient(0, geo.topY, 0, geo.botY);
      waterBackGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      waterBackGrad.addColorStop(0.25, "rgba(186, 230, 253, 0.88)");
      waterBackGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.75)");
      waterBackGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

      ctx.fillStyle = waterBackGrad;
      ctx.beginPath();
      ctx.moveTo(geo.topX - geo.topWidth * 0.5, geo.topY);
      ctx.lineTo(geo.topX + geo.topWidth * 0.5, geo.topY);
      ctx.lineTo(geo.topX + geo.botWidth * 0.55, geo.botY);
      ctx.lineTo(geo.topX - geo.botWidth * 0.55, geo.botY);
      ctx.closePath();
      ctx.fill();

      // B. Cascading Dynamic Water Ribbons (Natural Turbulence & Flow)
      const streamCount = 16;
      for (let s = 0; s < streamCount; s++) {
        const streamRatio = s / (streamCount - 1) - 0.5; // -0.5 to 0.5
        const topStreamX = geo.topX + streamRatio * geo.topWidth;
        const botStreamX = geo.topX + streamRatio * geo.botWidth * 1.08;

        const speed = 12 + (s % 5) * 3;
        const phase = flowTime * speed;

        ctx.beginPath();
        ctx.moveTo(topStreamX - 3, geo.topY);

        // Curving turbulent descent
        const cp1X = topStreamX + Math.sin(phase * 0.5 + s) * 4;
        const cp1Y = geo.topY + fallDistance * 0.35;
        const cp2X = botStreamX + Math.cos(phase * 0.7 + s * 1.5) * 7;
        const cp2Y = geo.topY + fallDistance * 0.7;

        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, botStreamX + 3.5, geo.botY);
        ctx.lineTo(botStreamX - 3.5, geo.botY);
        ctx.bezierCurveTo(cp2X - 5, cp2Y, cp1X - 3, cp1Y, topStreamX - 3, geo.topY);
        ctx.closePath();

        const ribbonAlpha = 0.35 + Math.sin(phase + s) * 0.15;
        ctx.fillStyle = s % 2 === 0 ? `rgba(255, 255, 255, ${ribbonAlpha})` : `rgba(186, 230, 253, ${ribbonAlpha * 0.9})`;
        ctx.fill();
      }

      // C. Rapid Vertical White Foam Streaks (Cascading Downwards at High Velocity)
      for (let i = 0; i < 35; i++) {
        const streakProgress = ((flowTime * 28 + i * 38) % fallDistance) / fallDistance;
        const currentW = geo.topWidth + (geo.botWidth - geo.topWidth) * streakProgress;
        const streakX = geo.topX + (Math.sin(i * 91 + flowTime * 0.3) * currentW * 0.45);
        const streakY = geo.topY + streakProgress * fallDistance;
        const streakLen = 22 + (i % 6) * 9;
        const streakW = 1.8 + (i % 3) * 1.5;

        const streakGrad = ctx.createLinearGradient(streakX, streakY, streakX, streakY + streakLen);
        streakGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        streakGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
        streakGrad.addColorStop(1, "rgba(186, 230, 253, 0)");

        ctx.fillStyle = streakGrad;
        ctx.fillRect(streakX - streakW / 2, streakY, streakW, streakLen);
      }

      ctx.restore();

      // =========================================================================
      // LAYER 2: FAST-FALLING SPRAY DROPLETS (PARTICLE DYNAMICS)
      // =========================================================================
      ctx.save();
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.y += d.vy;
        d.x += d.vx;

        // Flare slightly outward as they fall
        if (d.x < geo.topX) d.x -= 0.15;
        else d.x += 0.15;

        // Reset droplet at top when hitting the lake
        if (d.y > geo.botY) {
          d.y = geo.topY;
          d.x = geo.topX - geo.topWidth * 0.5 + Math.random() * geo.topWidth;
          d.vy = 14 + Math.random() * 16;
        }

        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fillRect(d.x, d.y, d.size, d.length);
      }
      ctx.restore();

      // =========================================================================
      // LAYER 3: UPWARD IMPACT SPLASH DROPLETS
      // =========================================================================
      if (Math.random() > 0.3 && splashes.length < 50) {
        splashes.push({
          x: geo.topX + (Math.random() - 0.5) * geo.botWidth * 0.9,
          y: geo.botY + Math.random() * 6,
          vx: (Math.random() - 0.5) * 3.5,
          vy: -Math.random() * 4.5 - 2.0, // Launches upward
          size: 1.2 + Math.random() * 2.0,
          alpha: 0.8,
          gravity: 0.22,
        });
      }

      ctx.save();
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity; // Gravity pull down
        s.alpha -= 0.025;

        if (s.alpha <= 0 || s.y > geo.botY + 12) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // =========================================================================
      // LAYER 4: BILLOWING BASE MIST & VAPOR CLOUDS AT WATERFALL POOL
      // =========================================================================
      if (mistPuffs.length < maxMist && Math.random() > 0.15) {
        mistPuffs.push({
          x: geo.topX + (Math.random() - 0.5) * geo.botWidth * 1.5,
          y: geo.botY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -Math.random() * 1.4 - 0.5, // Floats upward & billows out
          radius: 20 + Math.random() * 35,
          alpha: 0.4 + Math.random() * 0.3,
          life: 0,
          maxLife: 65 + Math.random() * 45,
        });
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = mistPuffs.length - 1; i >= 0; i--) {
        const m = mistPuffs[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        m.radius += 0.45; // Mist expands as it billows

        const progress = m.life / m.maxLife;
        const currentAlpha = m.alpha * (1 - progress);

        if (progress >= 1) {
          mistPuffs.splice(i, 1);
          continue;
        }

        const mistGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius);
        mistGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.75})`);
        mistGrad.addColorStop(0.45, `rgba(186, 230, 253, ${currentAlpha * 0.45})`);
        mistGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = mistGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // =========================================================================
      // LAYER 5: LAKE WATER RIPPLES AT IMPACT POINT
      // =========================================================================
      if (Math.random() > 0.85 && ripples.length < 15) {
        ripples.push({
          x: geo.topX + (Math.random() - 0.5) * geo.botWidth * 0.7,
          y: geo.botY + 8,
          rx: 6,
          ry: 2.2,
          maxR: 95 + Math.random() * 75,
          speed: 1.1 + Math.random() * 0.8,
          alpha: 0.75,
        });
      }

      ctx.save();
      ctx.lineWidth = 1.6;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.rx += rip.speed * 1.8;
        rip.ry += rip.speed * 0.48;

        const ripProgress = rip.rx / (rip.maxR * 1.8);
        const currentAlpha = rip.alpha * (1 - ripProgress);

        if (ripProgress >= 1) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${currentAlpha * 0.7})`;
        ctx.beginPath();
        ctx.ellipse(rip.x, rip.y, rip.rx, rip.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // LAYER 6: LAKE SURFACE WATERFALL REFLECTION SHIMMER
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const lakeTop = geo.botY + 12;
      const lakeHeight = geo.lakeBottom - lakeTop;
      const reflWidth = geo.botWidth * 1.35;

      const lakeReflGrad = ctx.createLinearGradient(0, lakeTop, 0, geo.lakeBottom);
      lakeReflGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
      lakeReflGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.4)");
      lakeReflGrad.addColorStop(0.75, "rgba(2, 132, 199, 0.2)");
      lakeReflGrad.addColorStop(1, "transparent");

      ctx.fillStyle = lakeReflGrad;

      // Draw undulating reflection bands on the lake
      for (let y = lakeTop; y < geo.lakeBottom; y += 10) {
        const waveOffset = Math.sin(y * 0.09 + flowTime * 2.2) * 9;
        const waveAlpha = 0.28 + Math.sin(y * 0.06 + flowTime) * 0.16;
        ctx.globalAlpha = waveAlpha;
        ctx.fillRect(geo.topX - reflWidth / 2 + waveOffset, y, reflWidth, 5);
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-15 w-full h-full"
    />
  );
}

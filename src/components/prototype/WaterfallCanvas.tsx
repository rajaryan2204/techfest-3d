"use client";

import React, { useRef, useEffect } from "react";

interface Droplet {
  x: number;
  y: number;
  vy: number;
  vx: number;
  length: number;
  width: number;
  alpha: number;
  color: string;
}

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxLife: number;
  life: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
}

export default function WaterfallCanvas() {
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

    // Geometry of the waterfall based on portal_waterfall.jpg:
    // Earth base is around 50% width, 52% height
    // Lake impact zone is around 50% width, 75% height
    // Lake surface extends from 75% height down to 96% height

    const getWaterfallBounds = () => {
      const startX = width * 0.498;
      const startY = height * 0.518;
      const streamWidth = Math.max(70, width * 0.088);
      const endY = height * 0.745;
      return { startX, startY, streamWidth, endY };
    };

    // 1. Water Falling Droplets & Tendrils
    const droplets: Droplet[] = [];
    const dropletCount = width < 768 ? 90 : 180;
    const { startX, startY, streamWidth, endY } = getWaterfallBounds();

    for (let i = 0; i < dropletCount; i++) {
      droplets.push({
        x: startX - streamWidth / 2 + Math.random() * streamWidth,
        y: startY + Math.random() * (endY - startY),
        vy: 12 + Math.random() * 14, // Rapid downward water velocity
        vx: (Math.random() - 0.5) * 1.5,
        length: 12 + Math.random() * 24,
        width: 1.2 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.6,
        color: Math.random() > 0.3 ? "#ffffff" : "#bae6fd",
      });
    }

    // 2. Billowing Mist at Waterfall Base
    const mistParticles: MistParticle[] = [];
    const maxMist = width < 768 ? 35 : 70;

    // 3. Lake Impact Ripples
    const ripples: Ripple[] = [];

    // Continuous flow noise offset
    let flowTime = 0;

    let animId: number;

    const render = () => {
      flowTime += 0.08;
      ctx.clearRect(0, 0, width, height);

      const { startX, startY, streamWidth, endY } = getWaterfallBounds();
      const fallHeight = endY - startY;

      // =========================================================================
      // LAYER A: CONTINUOUS TURBULENT WATER COLUMN (CANVAS NOISE & GRADIENTS)
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // 1. Main Water Column Back Glow
      const waterGrad = ctx.createLinearGradient(0, startY, 0, endY);
      waterGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      waterGrad.addColorStop(0.3, "rgba(186, 230, 253, 0.85)");
      waterGrad.addColorStop(0.7, "rgba(125, 211, 252, 0.75)");
      waterGrad.addColorStop(1, "rgba(56, 189, 248, 0.95)");

      ctx.fillStyle = waterGrad;

      // Draw multi-stream turbulent ribbons
      const numStreams = 14;
      for (let s = 0; s < numStreams; s++) {
        const streamOffset = (s / numStreams - 0.5) * streamWidth;
        const waveSpeed = 8 + (s % 4) * 3;
        const yOffset = (flowTime * waveSpeed * 10) % fallHeight;

        ctx.beginPath();
        const topX = startX + streamOffset;
        const bottomSpread = streamOffset * 1.35; // Water flares outward slightly as it falls
        const botX = startX + bottomSpread;

        ctx.moveTo(topX - 4, startY);
        ctx.bezierCurveTo(
          topX + Math.sin(flowTime + s) * 3,
          startY + fallHeight * 0.3,
          botX + Math.cos(flowTime * 1.5 + s) * 6,
          startY + fallHeight * 0.7,
          botX + 6,
          endY
        );
        ctx.lineTo(botX - 6, endY);
        ctx.bezierCurveTo(
          botX - 6,
          startY + fallHeight * 0.7,
          topX - 4,
          startY + fallHeight * 0.3,
          topX - 4,
          startY
        );
        ctx.closePath();

        ctx.fillStyle = s % 2 === 0 ? "rgba(255, 255, 255, 0.28)" : "rgba(186, 230, 253, 0.35)";
        ctx.fill();
      }

      // 2. High-speed Falling Foam Streaks
      for (let i = 0; i < 28; i++) {
        const streakX = startX + (Math.sin(i * 99 + flowTime * 0.2) * streamWidth * 0.45);
        const streakY = startY + ((flowTime * 25 + i * 45) % fallHeight);
        const streakLen = 20 + (i % 5) * 8;
        const streakW = 1.5 + (i % 3) * 1.2;

        const streakGrad = ctx.createLinearGradient(streakX, streakY, streakX, streakY + streakLen);
        streakGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        streakGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
        streakGrad.addColorStop(1, "rgba(186, 230, 253, 0)");

        ctx.fillStyle = streakGrad;
        ctx.fillRect(streakX - streakW / 2, streakY, streakW, streakLen);
      }

      ctx.restore();

      // =========================================================================
      // LAYER B: FAST-FALLING SPRAY DROPLETS
      // =========================================================================
      ctx.save();
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.y += d.vy;
        d.x += d.vx;

        // Reset droplet when hitting bottom
        if (d.y > endY) {
          d.y = startY;
          d.x = startX - streamWidth / 2 + Math.random() * streamWidth;
          d.vy = 12 + Math.random() * 14;
        }

        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fillRect(d.x, d.y, d.width, d.length);
      }
      ctx.restore();

      // =========================================================================
      // LAYER C: BILLOWING BASE MIST & VAPOR CLOUDS
      // =========================================================================
      if (mistParticles.length < maxMist && Math.random() > 0.2) {
        mistParticles.push({
          x: startX + (Math.random() - 0.5) * streamWidth * 1.4,
          y: endY + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 2.2,
          vy: -Math.random() * 1.2 - 0.4, // Floats upward and outwards
          radius: 18 + Math.random() * 32,
          alpha: 0.35 + Math.random() * 0.3,
          maxLife: 60 + Math.random() * 40,
          life: 0,
        });
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = mistParticles.length - 1; i >= 0; i--) {
        const m = mistParticles[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        m.radius += 0.35; // Expands as it rises

        const progress = m.life / m.maxLife;
        const currentAlpha = m.alpha * (1 - progress);

        if (progress >= 1) {
          mistParticles.splice(i, 1);
          continue;
        }

        const mistGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius);
        mistGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.7})`);
        mistGrad.addColorStop(0.5, `rgba(186, 230, 253, ${currentAlpha * 0.4})`);
        mistGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = mistGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // =========================================================================
      // LAYER D: LAKE WATER RIPPLES AT IMPACT POINT
      // =========================================================================
      if (Math.random() > 0.88 && ripples.length < 12) {
        ripples.push({
          x: startX + (Math.random() - 0.5) * streamWidth * 0.6,
          y: endY + 8,
          r: 5,
          maxR: 90 + Math.random() * 60,
          alpha: 0.65,
          speed: 0.9 + Math.random() * 0.7,
        });
      }

      ctx.save();
      ctx.lineWidth = 1.6;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += rip.speed;
        const ripProgress = rip.r / rip.maxR;
        const currentAlpha = rip.alpha * (1 - ripProgress);

        if (ripProgress >= 1) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${currentAlpha * 0.65})`;
        ctx.beginPath();
        // Elliptical ripple on the water perspective plane
        ctx.ellipse(rip.x, rip.y, rip.r * 1.6, rip.r * 0.42, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // LAYER E: LAKE WATER SURFACE REFLECTIVE SHIMMER
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const lakeReflectionY = endY + 15;
      const lakeHeight = height - lakeReflectionY;

      // Vertical reflection pillar of the waterfall in the lake
      const reflWidth = streamWidth * 1.2;
      const reflGrad = ctx.createLinearGradient(0, lakeReflectionY, 0, height);
      reflGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      reflGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.35)");
      reflGrad.addColorStop(0.8, "rgba(2, 132, 199, 0.15)");
      reflGrad.addColorStop(1, "transparent");

      ctx.fillStyle = reflGrad;

      // Draw rippling reflection stripes
      for (let y = lakeReflectionY; y < height; y += 12) {
        const waveShift = Math.sin(y * 0.08 + flowTime * 2) * 8;
        const stripAlpha = 0.25 + Math.sin(y * 0.05 + flowTime) * 0.15;
        ctx.globalAlpha = stripAlpha;
        ctx.fillRect(startX - reflWidth / 2 + waveShift, y, reflWidth, 6);
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

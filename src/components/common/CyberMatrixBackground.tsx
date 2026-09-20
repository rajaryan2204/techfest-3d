"use client";

import React, { useEffect, useRef } from "react";

interface EarthSpaceBackgroundProps {
  opacity?: number;
  showAtmosphere?: boolean;
  showOrbits?: boolean;
  showStars?: boolean;
  showSatellites?: boolean;
  showNebula?: boolean;
  className?: string;
  // Backward compatibility
  showScanline?: boolean;
  showGrid?: boolean;
  showCircuits?: boolean;
  showParticles?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  color: string;
}

interface Satellite {
  id: string;
  orbitRadiusX: number;
  orbitRadiusY: number;
  orbitCenterX: number;
  orbitCenterY: number;
  orbitTilt: number;
  angle: number;
  speed: number;
  size: number;
  beaconColor: string;
  label: string;
  telemetryActive: boolean;
}

interface Stardust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function CyberMatrixBackground({
  opacity = 0.95,
  showAtmosphere = true,
  showOrbits = true,
  showStars = true,
  showSatellites = true,
  showNebula = true,
  className = "",
}: EarthSpaceBackgroundProps) {
  const optsRef = useRef({ showAtmosphere, showOrbits, showStars, showSatellites, showNebula });
  optsRef.current = { showAtmosphere, showOrbits, showStars, showSatellites, showNebula };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // =========================================================================
    // 1. STARFIELD (DENSE, VIBRANT, MULTI-DEPTH FOR VIEWPORT)
    // =========================================================================
    const starColors = ["#FFFFFF", "#E0F2FE", "#38BDF8", "#00D9FF", "#FDE68A", "#C084FC", "#00FFCC"];
    const starCount = Math.min(220, Math.floor((width * height) / 8000));
    let stars: Star[] = [];

    const initStars = () => {
      stars = Array.from({ length: starCount }, () => {
        const z = Math.random() < 0.55 ? 1 : Math.random() < 0.85 ? 2 : 3;
        const size = z === 1 ? 0.8 + Math.random() * 0.8 : z === 2 ? 1.5 + Math.random() * 1.0 : 2.4 + Math.random() * 1.4;
        const baseAlpha = z === 1 ? 0.35 + Math.random() * 0.4 : z === 2 ? 0.6 + Math.random() * 0.35 : 0.85 + Math.random() * 0.15;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        };
      });
    };

    initStars();

    // =========================================================================
    // 2. SHOOTING STARS / METEORS POOL
    // =========================================================================
    let meteors: Meteor[] = [];
    const spawnMeteor = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35; // ~45 deg diagonal
      const startX = Math.random() * width * 1.2 - width * 0.1;
      const startY = Math.random() * (height * 0.6);
      meteors.push({
        x: startX,
        y: startY,
        length: 90 + Math.random() * 110,
        speed: 14 + Math.random() * 10,
        angle,
        alpha: 1,
        active: true,
        color: Math.random() > 0.35 ? "#00D9FF" : "#00FFCC",
      });
    };

    // =========================================================================
    // 3. ORBITAL SATELLITES & SPACE STATIONS
    // =========================================================================
    let satellites: Satellite[] = [];
    const initSatellites = () => {
      satellites = [
        {
          id: "EOS-07",
          orbitRadiusX: width * 0.48,
          orbitRadiusY: Math.max(140, height * 0.28),
          orbitCenterX: width * 0.5,
          orbitCenterY: height * 0.78,
          orbitTilt: -0.14,
          angle: 0.2,
          speed: 0.004,
          size: 3.5,
          beaconColor: "#00FFCC",
          label: "EOS-07 // SUSTAINABLE EARTH OBSERVATION",
          telemetryActive: true,
        },
        {
          id: "SLIET-SAT-1",
          orbitRadiusX: width * 0.58,
          orbitRadiusY: Math.max(180, height * 0.36),
          orbitCenterX: width * 0.52,
          orbitCenterY: height * 0.82,
          orbitTilt: 0.16,
          angle: 3.1,
          speed: 0.003,
          size: 4,
          beaconColor: "#00D9FF",
          label: "SLIET-SAT // DOWNLINK LOCK 30.22° N",
          telemetryActive: true,
        },
      ];
    };

    initSatellites();

    // =========================================================================
    // 4. INTERACTIVE COSMIC STARDUST (ZERO-GRAVITY PARTICLES)
    // =========================================================================
    const stardustCount = Math.min(50, Math.floor(width / 30));
    const stardust: Stardust[] = Array.from({ length: stardustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.0 + Math.random() * 1.8,
      alpha: 0.3 + Math.random() * 0.5,
      color: Math.random() > 0.5 ? "#00D9FF" : "#00FFCC",
    }));

    // =========================================================================
    // EVENT LISTENERS & RESIZE
    // =========================================================================
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initSatellites();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let frame = 0;

    // =========================================================================
    // MAIN COSMIC RENDER LOOP (BUTTERY SMOOTH 60FPS)
    // =========================================================================
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      frame++;

      // 1. Clear with Deep Space Cosmic Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#01040f");
      bgGrad.addColorStop(0.45, "#02071a");
      bgGrad.addColorStop(1, "#030a24");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 2. VIBRANT COSMIC NEBULAE (Glowing Volumetric Gas Clouds)
      // -----------------------------------------------------------------------
      if (optsRef.current.showNebula) {
        // Cyan Nebula (Top Left)
        const neb1 = ctx.createRadialGradient(width * 0.15, height * 0.2, 10, width * 0.15, height * 0.2, width * 0.45);
        neb1.addColorStop(0, "rgba(0, 217, 255, 0.14)");
        neb1.addColorStop(0.5, "rgba(6, 182, 212, 0.06)");
        neb1.addColorStop(1, "transparent");
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, width, height);

        // Ultraviolet Nebula (Center Right)
        const neb2 = ctx.createRadialGradient(width * 0.85, height * 0.45, 10, width * 0.85, height * 0.45, width * 0.5);
        neb2.addColorStop(0, "rgba(139, 92, 246, 0.13)");
        neb2.addColorStop(0.5, "rgba(109, 40, 217, 0.05)");
        neb2.addColorStop(1, "transparent");
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, width, height);

        // Emerald Nebula (Bottom Center - Sustainable Earth luminescence)
        const neb3 = ctx.createRadialGradient(width * 0.4, height * 0.75, 10, width * 0.4, height * 0.75, width * 0.45);
        neb3.addColorStop(0, "rgba(0, 255, 204, 0.11)");
        neb3.addColorStop(0.6, "rgba(16, 185, 129, 0.04)");
        neb3.addColorStop(1, "transparent");
        ctx.fillStyle = neb3;
        ctx.fillRect(0, 0, width, height);
      }

      // -----------------------------------------------------------------------
      // 3. CONSTELLATION LINES (Subtle Celestial Navigation Map)
      // -----------------------------------------------------------------------
      if (optsRef.current.showStars) {
        for (let i = 0; i < stars.length; i += 6) {
          const s1 = stars[i];
          if (s1.z < 2) continue;
          for (let j = i + 1; j < Math.min(i + 4, stars.length); j++) {
            const s2 = stars[j];
            if (s2.z < 2) continue;
            const dx = s1.x - s2.x;
            const dy = s1.y - s2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.16;
              ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }
        }
      }

      // -----------------------------------------------------------------------
      // 4. STARFIELD WITH DYNAMIC PARALLAX & TWINKLE
      // -----------------------------------------------------------------------
      if (optsRef.current.showStars) {
        const mouse = mouseRef.current;
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          s.twinklePhase += s.twinkleSpeed;
          s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35 * s.baseAlpha;

          let drawX = s.x;
          let drawY = s.y;
          if (mouse.active) {
            const pFactor = s.z * 0.012;
            drawX += (mouse.x - width / 2) * pFactor;
            drawY += (mouse.y - height / 2) * pFactor;
          }

          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0.15, Math.min(1, s.alpha));
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
          ctx.fill();

          // Luminous halo for foreground stars
          if (s.z === 3 && s.alpha > 0.7) {
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.alpha * 0.3;
            ctx.beginPath();
            ctx.arc(drawX, drawY, s.size * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      // -----------------------------------------------------------------------
      // 5. SHOOTING STARS / METEORS (FIRES EVERY ~160 FRAMES)
      // -----------------------------------------------------------------------
      if (frame % 160 === 0 && Math.random() > 0.15) {
        spawnMeteor();
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        if (!meteor.active) continue;

        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= 0.016;

        if (meteor.alpha <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteor.active = false;
          meteors.splice(m, 1);
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const mGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        mGrad.addColorStop(0, "transparent");
        mGrad.addColorStop(0.7, "rgba(0, 217, 255, 0.5)");
        mGrad.addColorStop(1, meteor.color);

        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = meteor.alpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Glowing nucleus head
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#00D9FF";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // -----------------------------------------------------------------------
      // 6. CURVED EARTH HORIZON & ATMOSPHERIC LIMB GLOW
      // -----------------------------------------------------------------------
      if (optsRef.current.showAtmosphere) {
        const earthRadius = Math.max(width * 1.1, height * 1.3);
        const earthCenterX = width * 0.5;
        const earthCenterY = height + earthRadius * 0.92;

        ctx.save();
        // Earth dark body
        ctx.beginPath();
        ctx.arc(earthCenterX, earthCenterY, earthRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#010512";
        ctx.fill();

        // Outer atmospheric cyan glow (Rayleigh scattering)
        ctx.strokeStyle = "rgba(0, 217, 255, 0.45)";
        ctx.lineWidth = 5;
        ctx.shadowColor = "#00D9FF";
        ctx.shadowBlur = 30;
        ctx.stroke();

        // Inner royal blue ozone layer
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Ground station beacon for SLIET Longowal [30.22° N, 75.83° E]
        const groundX = earthCenterX - 30;
        const groundY = earthCenterY - earthRadius + 16;

        ctx.fillStyle = "#F59E0B";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(groundX, groundY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#38BDF8";
        ctx.font = "10px monospace";
        ctx.globalAlpha = 0.8;
        ctx.fillText("SLIET LONGOWAL [30.22° N, 75.83° E]", groundX + 10, groundY + 4);
        ctx.globalAlpha = 1;

        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 7. ORBITAL SATELLITES, TRAJECTORIES & DOWNLINK TELEMETRY
      // -----------------------------------------------------------------------
      if (optsRef.current.showOrbits) {
        for (let sIdx = 0; sIdx < satellites.length; sIdx++) {
          const sat = satellites[sIdx];

          // 1. Orbital dashed ellipse
          ctx.save();
          ctx.translate(sat.orbitCenterX, sat.orbitCenterY);
          ctx.rotate(sat.orbitTilt);

          ctx.strokeStyle = "rgba(0, 217, 255, 0.18)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.beginPath();
          ctx.ellipse(0, 0, sat.orbitRadiusX, sat.orbitRadiusY, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // 2. Position calculation
          sat.angle += sat.speed;
          if (sat.angle > Math.PI * 2) sat.angle -= Math.PI * 2;

          const satLocalX = Math.cos(sat.angle) * sat.orbitRadiusX;
          const satLocalY = Math.sin(sat.angle) * sat.orbitRadiusY;

          const cosT = Math.cos(sat.orbitTilt);
          const sinT = Math.sin(sat.orbitTilt);
          const worldX = sat.orbitCenterX + (satLocalX * cosT - satLocalY * sinT);
          const worldY = sat.orbitCenterY + (satLocalX * sinT + satLocalY * cosT);

          ctx.restore();

          // 3. Draw Satellite
          ctx.save();
          // Solar panels
          ctx.fillStyle = "#38BDF8";
          ctx.fillRect(worldX - 8, worldY - 1.5, 16, 3);

          // Core
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(worldX, worldY, sat.size * 0.75, 0, Math.PI * 2);
          ctx.fill();

          // Blinking Beacon
          const beaconPulse = Math.sin(frame * 0.09 + sIdx) * 0.5 + 0.5;
          ctx.fillStyle = sat.beaconColor;
          ctx.shadowColor = sat.beaconColor;
          ctx.shadowBlur = 12 * beaconPulse;
          ctx.globalAlpha = 0.6 + beaconPulse * 0.4;
          ctx.beginPath();
          ctx.arc(worldX, worldY, sat.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;

          // 4. Downlink Laser Telemetry
          if (sat.telemetryActive && satLocalY < 0) {
            const groundX = width * 0.5 - 30;
            const groundY = height * 0.94;

            ctx.strokeStyle = "rgba(0, 217, 255, 0.25)";
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 6]);
            ctx.beginPath();
            ctx.moveTo(worldX, worldY);
            ctx.lineTo(groundX, groundY);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // 5. Satellite Label
          if (satLocalY < 0 && width > 768) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
            ctx.font = "9px monospace";
            ctx.fillText(sat.label, worldX + 12, worldY - 6);
          }

          ctx.restore();
        }
      }

      // -----------------------------------------------------------------------
      // 8. INTERACTIVE ZERO-GRAVITY STARDUST
      // -----------------------------------------------------------------------
      const mouse = mouseRef.current;
      for (let p = 0; p < stardust.length; p++) {
        const dust = stardust[p];

        dust.x += dust.vx;
        dust.y += dust.vy;

        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;
        if (dust.y < -10) dust.y = height + 10;
        if (dust.y > height + 10) dust.y = -10;

        if (mouse.active) {
          const dx = mouse.x - dust.x;
          const dy = mouse.y - dust.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            dust.vx += (dx / dist) * force * 0.05;
            dust.vy += (dy / dist) * force * 0.05;
          }
        }

        dust.vx *= 0.985;
        dust.vy *= 0.985;

        ctx.fillStyle = dust.color;
        ctx.globalAlpha = dust.alpha;
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* 1. VIBRANT COSMIC NEBULA GLOWS */}
      <div className="absolute top-[5%] left-[3%] w-[600px] h-[600px] rounded-full bg-[#00D9FF]/18 blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-[40%] right-[3%] w-[700px] h-[700px] rounded-full bg-[#8B5CF6]/16 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="absolute top-[75%] left-[8%] w-[650px] h-[650px] rounded-full bg-[#00FFCC]/15 blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: "9s" }} />

      {/* 2. CELESTIAL WATERMARK TELEMETRY */}
      <div className="absolute top-16 right-8 text-right font-mono text-[9px] text-cyan-400/40 tracking-[0.3em] uppercase pointer-events-none hidden lg:block">
        <div>// MISSION: SUSTAINABLE EARTH • LEO 420KM</div>
        <div>// GROUND STATION: 30.2217° N, 75.8344° E</div>
        <div>// SLIET LONGOWAL • PUNJAB</div>
      </div>

      <div className="absolute bottom-16 left-8 font-mono text-[9px] text-emerald-400/40 tracking-[0.3em] uppercase pointer-events-none hidden lg:block">
        <div>// THEME: TECHNOLOGY & SCIENCES FOR SUSTAINABLE EARTH</div>
        <div>// CELESTIAL WINDOW: 16—17 OCTOBER 2026</div>
      </div>

      {/* 3. CANVAS (VIEWPORT-LOCKED) */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 4. SOFT RADIAL VIGNETTE FOR CLEAN LEGIBILITY */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(1,4,15,0.3)_75%,#01040f_100%)] pointer-events-none" />
    </div>
  );
}

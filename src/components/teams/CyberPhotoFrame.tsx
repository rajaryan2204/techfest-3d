"use client";

import React, { useId } from "react";

export interface CyberPhotoFrameProps {
  image: string;
  alt?: string;
  className?: string;
  /** Zoom level: 1 = default, 1.15 = 15% zoom in, 0.9 = 10% zoom out */
  zoom?: number;
  scale?: number;
  /** Horizontal shift in pixels: + moves right, - moves left */
  x?: number | string;
  offsetX?: number | string;
  /** Vertical shift in pixels: + moves down, - moves up */
  y?: number | string;
  offsetY?: number | string;
  /** Background color behind photo: default '#0c0f17' (e.g. '#ffffff' for white background photos) */
  bgColor?: string;
}

/**
 * Reusable Cyberpunk Circuit Photo Frame for TechFest'26
 *
 * Takes ANY raw or existing photo and programmatically clips it to
 * the signature TechFest chamfered tech polygon with animated cyan/neon circuit traces,
 * glowing via nodes, telemetry crosshairs, and hover surges.
 */
export default function CyberPhotoFrame({
  image,
  alt = "Team member",
  className = "",
  zoom,
  scale,
  x,
  offsetX,
  y,
  offsetY,
  bgColor = "#0c0f17",
}: CyberPhotoFrameProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `cyber-clip-${safeId}`;
  const surgeGradId = `cyber-surge-${safeId}`;

  // Parse zoom factor (supports 1.1, 0.9 or percentages like 110, 90)
  const rawZoom = zoom ?? scale ?? 1;
  let finalZoom = typeof rawZoom === "number" && !isNaN(rawZoom) && rawZoom > 0 ? rawZoom : 1;
  if (finalZoom > 5) finalZoom = finalZoom / 100;

  // Parse offsets (supports numbers in SVG units or percentage strings e.g. "10%", "-5%")
  const parseCoord = (val: number | string | undefined, axisLength: number) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed.endsWith("%")) {
        const num = parseFloat(trimmed);
        return isNaN(num) ? 0 : (num / 100) * axisLength;
      }
      const num = parseFloat(trimmed);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const finalX = parseCoord(x ?? offsetX, 1205);
  const finalY = parseCoord(y ?? offsetY, 824);

  return (
    <div className={`relative w-full aspect-[1205/824] ${className}`}>
      {/* Subtle Ambient Behind-Glow on Hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00D9FF]/0 via-[#00D9FF]/30 to-[#00FFCC]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

      {/* Outer Frame Container */}
      <div className="cyber-frame-container">
        {/* Main Cyber SVG (Auto-Clipped Image + Circuit Vector Frame) */}
        <svg
          viewBox="0 0 1205 824"
          className="w-full h-full cyber-frame-svg overflow-visible block"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={alt}
        >
          <defs>
            {/* Exact Sci-Fi Chamfered Polygon Clip */}
            <clipPath id={clipId}>
              <path d="M92.5 30L32 91V528.5L68.5 565V710.5L147.5 782H1108L1167 723.5V608L1122.5 565V324L1167 281.5V91L1108 30H92.5Z" />
            </clipPath>

            {/* Glowing Pulse Current Gradient */}
            <linearGradient id={surgeGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00FFCC" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Chamber Backdrop */}
          <path
            d="M92.5 30L32 91V528.5L68.5 565V710.5L147.5 782H1108L1167 723.5V608L1122.5 565V324L1167 281.5V91L1108 30H92.5Z"
            fill={bgColor}
          />

          {/* The Member Portrait */}
          <g clipPath={`url(#${clipId})`}>
            <g
              transform={`translate(${finalX}, ${finalY}) translate(602.5, 412) scale(${finalZoom}) translate(-602.5, -412)`}
            >
              <image
                href={image}
                width="1205"
                height="824"
                preserveAspectRatio="xMidYMid slice"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.03] origin-center"
              />
            </g>
          </g>

          {/* Inner Portal Vignette Overlay */}
          <path
            d="M92.5 30L32 91V528.5L68.5 565V710.5L147.5 782H1108L1167 723.5V608L1122.5 565V324L1167 281.5V91L1108 30H92.5Z"
            fill="black"
            fillOpacity={bgColor && bgColor.toLowerCase() !== "#0c0f17" && bgColor.toLowerCase() !== "#0f131c" ? "0.02" : "0.06"}
            pointerEvents="none"
          />

          {/* ── BASE CIRCUIT FRAME (Cyan / Neon Green) ── */}
          <g
            stroke="#00D9FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:stroke-[#00FFCC]"
          >
            {/* Primary Chamfered Polygon Border */}
            <path d="M92.5 30L32 91V528.5L68.5 565V710.5L147.5 782H1108L1167 723.5V608L1122.5 565V324L1167 281.5V91L1108 30H92.5Z" />

            {/* Bottom-Right Outer Trace */}
            <path d="M836 813.5H1128.5L1194 748.5V705" />

            {/* Right Vertical Outer Trace */}
            <path d="M1178 326.5V583" />

            {/* Top-Right Outer Trace */}
            <path d="M830 19H1122L1189 84.5V127.5" />

            {/* Top-Left Outer Trace */}
            <path d="M10 173V93.5L95.5 10.5H159" />

            {/* Bottom-Left Outer Trace */}
            <path d="M35 574.5V737.5L94.5 793.5" />

            {/* Top-Left Diagonal Corner Accent */}
            <path d="M41.5 101L99.5 40.5" strokeWidth="2.5" opacity="0.65" />
          </g>

          {/* ── INTERACTIVE HOVER ELECTRIC SURGE PULSES ── */}
          <g
            stroke={`url(#${surgeGradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cyber-circuit-surge pointer-events-none"
          >
            <path d="M92.5 30L32 91V528.5L68.5 565V710.5L147.5 782H1108L1167 723.5V608L1122.5 565V324L1167 281.5V91L1108 30H92.5Z" />
            <path d="M836 813.5H1128.5L1194 748.5V705" />
            <path d="M830 19H1122L1189 84.5V127.5" />
            <path d="M10 173V93.5L95.5 10.5H159" />
            <path d="M35 574.5V737.5L94.5 793.5" />
          </g>

          {/* ── VIA NODE CONTACT PADS (GLOWING SPHERES) ── */}
          <g fill="#00FFCC" className="cyber-node">
            {/* Bottom-Right Nodes */}
            <circle cx="836.5" cy="813.5" r="10.5" />
            <circle cx="1194.5" cy="704.5" r="10.5" />

            {/* Right Vertical Nodes */}
            <circle cx="1178.5" cy="582.5" r="10.5" />
            <circle cx="1178.5" cy="327.5" r="10.5" />

            {/* Top-Right Nodes */}
            <circle cx="1190.5" cy="124.5" r="10.5" />
            <circle cx="830.5" cy="18.5" r="10.5" />

            {/* Top-Left Nodes */}
            <circle cx="159.5" cy="10.5" r="10.5" />
            <circle cx="10.5" cy="172.5" r="10.5" />

            {/* Bottom-Left Nodes */}
            <circle cx="35.5" cy="574.5" r="10.5" />
            <circle cx="94.5" cy="792.5" r="10.5" />
          </g>

          {/* Telemetry Crosshairs */}
          <g opacity="0.45" stroke="#00D9FF" strokeWidth="1.5">
            <line x1="30" y1="20" x2="30" y2="30" />
            <line x1="25" y1="25" x2="35" y2="25" />
            <line x1="1170" y1="795" x2="1170" y2="805" />
            <line x1="1165" y1="800" x2="1175" y2="800" />
          </g>
        </svg>

        {/* Holographic Sheen Sweep on Hover */}
        <div className="cyber-sheen" />
      </div>
    </div>
  );
}

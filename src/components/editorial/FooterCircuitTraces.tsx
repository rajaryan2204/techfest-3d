"use client";

import React, { useEffect, useState } from "react";

export default function FooterCircuitTraces() {
  const [isOverloaded, setIsOverloaded] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setIsOverloaded(true);
      const timer = setTimeout(() => setIsOverloaded(false), 800);
      return () => clearTimeout(timer);
    };
    window.addEventListener("mousedown", handleClick, { passive: true });
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Intense Neon Glow Filter */}
          <filter id="footer-glow-contour" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="footer-contour-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0CC7F8" stopOpacity="0" />
            <stop offset="40%" stopColor="#00FFCC" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#0CC7F8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="footer-contour-emerald" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FFCC" stopOpacity="0" />
            <stop offset="50%" stopColor="#0CC7F8" stopOpacity="1" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00FFCC" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="footer-chip-contour" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0CC7F8" stopOpacity={isOverloaded ? 0.8 : 0.4} />
            <stop offset="100%" stopColor="#002C07" stopOpacity={isOverloaded ? 0.9 : 0.6} />
          </linearGradient>
        </defs>

        {/* ═══════════════════════════════════════════════════════════════
            BASE COPPER TRACES ROUTED STRICTLY AROUND CONTENT & MASCOT
        ═══════════════════════════════════════════════════════════════ */}
        <g
          stroke={isOverloaded ? "#00FFCC" : "#0CC7F8"}
          strokeWidth={isOverloaded ? "2.8" : "1.6"}
          opacity={isOverloaded ? 0.85 : 0.38}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-200"
        >
          {/* 1. TOP HEADER PERIMETER (Above text & mascot) */}
          <path d="M 0 35 L 580 35 L 640 90 L 1100 90 L 1160 35 L 1920 35" strokeWidth="2.2" />
          <path d="M 0 65 L 560 65 L 610 115 L 1080 115 L 1130 65 L 1920 65" strokeDasharray="8 4" />

          {/* 2. FAR LEFT MARGIN (Hugging outer screen edge) */}
          <path d="M 35 0 L 35 340 L 75 380 L 75 620 L 35 660 L 35 1080" />
          <path d="M 70 0 L 70 320 L 105 355 L 105 600 L 70 635 L 70 1080" />

          {/* 3. CENTRAL SEPARATION CHANNEL (Between left text grid and right mascot graphic) */}
          <path d="M 1120 90 L 1120 420 L 1160 460 L 1160 740 L 1120 780 L 1120 980" strokeWidth="2" />
          <path d="M 1150 90 L 1150 400 L 1190 440 L 1190 720 L 1150 760 L 1150 960" />
          <path d="M 1080 115 L 1080 360 L 1120 400" />
          <path d="M 1160 740 L 1220 800 L 1220 940 L 1180 980" />

          {/* 4. OUTER RIGHT MARGIN (Behind / around right side of robot mascot) */}
          <path d="M 1885 0 L 1885 360 L 1845 400 L 1845 700 L 1885 740 L 1885 1080" />
          <path d="M 1850 0 L 1850 340 L 1810 380 L 1810 680 L 1850 720 L 1850 1080" />
          <path d="M 1920 160 L 1760 160 L 1700 100 L 1600 100" />
          <path d="M 1920 880 L 1760 880 L 1700 940 L 1580 940" />

          {/* 5. BOTTOM PERIMETER (Below bottom logos and text) */}
          <path d="M 0 1015 L 560 1015 L 620 955 L 1120 955 L 1180 1015 L 1920 1015" strokeWidth="2.4" />
          <path d="M 0 1045 L 540 1045 L 590 995 L 1100 995 L 1150 1045 L 1920 1045" strokeDasharray="10 5" />
        </g>

        {/* ═══════════════════════════════════════════════════════════════
            GLOWING NEON CURRENT PULSE WAVES CONTOURING THE PERIMETER
        ═══════════════════════════════════════════════════════════════ */}
        <g strokeLinecap="round" strokeLinejoin="round" filter="url(#footer-glow-contour)">
          {/* Top Outer Pulse */}
          <path
            d="M 0 35 L 580 35 L 640 90 L 1100 90 L 1160 35 L 1920 35"
            stroke="url(#footer-contour-cyan)"
            strokeWidth={isOverloaded ? "5.5" : "3.2"}
            className={`footer-pulse-wave ${isOverloaded ? "pulse-turbo" : "pulse-rapid"}`}
          />

          {/* Far Left Vertical Pulse */}
          <path
            d="M 35 0 L 35 340 L 75 380 L 75 620 L 35 660 L 35 1080"
            stroke="url(#footer-contour-emerald)"
            strokeWidth={isOverloaded ? "5" : "3"}
            className={`footer-pulse-wave ${isOverloaded ? "pulse-turbo" : "pulse-fast"}`}
          />

          {/* Central Channel Vertical Pulse */}
          <path
            d="M 1120 90 L 1120 420 L 1160 460 L 1160 740 L 1120 780 L 1120 980"
            stroke="url(#footer-contour-cyan)"
            strokeWidth={isOverloaded ? "5.5" : "3.2"}
            className={`footer-pulse-wave ${isOverloaded ? "pulse-turbo" : "pulse-rapid"}`}
          />

          {/* Outer Right Vertical Pulse */}
          <path
            d="M 1885 0 L 1885 360 L 1845 400 L 1845 700 L 1885 740 L 1885 1080"
            stroke="url(#footer-contour-emerald)"
            strokeWidth={isOverloaded ? "5" : "3"}
            className={`footer-pulse-wave ${isOverloaded ? "pulse-turbo" : "pulse-reverse-fast"}`}
          />

          {/* Bottom Outer Pulse */}
          <path
            d="M 0 1015 L 560 1015 L 620 955 L 1120 955 L 1180 1015 L 1920 1015"
            stroke="url(#footer-contour-cyan)"
            strokeWidth={isOverloaded ? "6" : "3.6"}
            className={`footer-pulse-wave ${isOverloaded ? "pulse-turbo" : "pulse-rapid"}`}
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════════
            PERIMETER MICROCHIP PACKAGES (Located outside content)
        ═══════════════════════════════════════════════════════════════ */}
        {/* Top-Right Perimeter IC */}
        <g transform="translate(1620, 48)" className="footer-chip-glow">
          <rect
            x="0"
            y="0"
            width="84"
            height="46"
            rx="4"
            fill="url(#footer-chip-contour)"
            stroke={isOverloaded ? "#ffffff" : "#0CC7F8"}
            strokeWidth={isOverloaded ? "2.5" : "1.5"}
            className="transition-all duration-200"
          />
          <text x="8" y="20" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5">
            {isOverloaded ? "SURGE!" : "TF26_BUS"}
          </text>
          <text x="8" y="34" fill="#00FFCC" fontSize="7" fontFamily="monospace" letterSpacing="1">
            SLIET_NODE
          </text>
          {[-4, 84].map((px, idx) => (
            <g key={idx} fill="#0CC7F8">
              <rect x={px} y="10" width="4" height="4" />
              <rect x={px} y="20" width="4" height="4" />
              <rect x={px} y="30" width="4" height="4" />
            </g>
          ))}
        </g>

        {/* Central Channel IC */}
        <g transform="translate(1100, 520)" className="footer-chip-glow">
          <rect
            x="0"
            y="0"
            width="76"
            height="44"
            rx="4"
            fill="url(#footer-chip-contour)"
            stroke={isOverloaded ? "#ffffff" : "#00FFCC"}
            strokeWidth={isOverloaded ? "2.5" : "1.5"}
            className="transition-all duration-200"
          />
          <text x="8" y="20" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1.2">
            {isOverloaded ? "OVERLOAD" : "CTRL_HUB"}
          </text>
          <text x="8" y="32" fill="#0CC7F8" fontSize="7" fontFamily="monospace" letterSpacing="1">
            PORT_26
          </text>
          {[-4, 76].map((px, idx) => (
            <g key={idx} fill="#00FFCC">
              <rect x={px} y="10" width="4" height="4" />
              <rect x={px} y="20" width="4" height="4" />
              <rect x={px} y="30" width="4" height="4" />
            </g>
          ))}
        </g>

        {/* ═══════════════════════════════════════════════════════════════
            CORNER & PERIMETER VIA SPARK NODES
        ═══════════════════════════════════════════════════════════════ */}
        <g fill={isOverloaded ? "#ffffff" : "#0CC7F8"} filter="url(#footer-glow-contour)">
          <circle cx="580" cy="35" r={isOverloaded ? 5.5 : 3.5} className="footer-node-spark" />
          <circle cx="1160" cy="35" r={isOverloaded ? 5.5 : 3.5} className="footer-node-pulse" />
          <circle cx="75" cy="380" r={isOverloaded ? 5 : 3.5} className="footer-node-spark" />
          <circle cx="75" cy="620" r={isOverloaded ? 5 : 3.5} className="footer-node-pulse" />
          <circle cx="1160" cy="460" r={isOverloaded ? 5.5 : 3.5} className="footer-node-spark" />
          <circle cx="1160" cy="740" r={isOverloaded ? 5.5 : 3.5} className="footer-node-pulse" />
          <circle cx="1845" cy="400" r={isOverloaded ? 5.5 : 3.5} className="footer-node-spark" />
          <circle cx="1845" cy="700" r={isOverloaded ? 5.5 : 3.5} className="footer-node-pulse" />
          <circle cx="560" cy="1015" r={isOverloaded ? 5.5 : 3.5} className="footer-node-spark" />
          <circle cx="1180" cy="1015" r={isOverloaded ? 5.5 : 3.5} className="footer-node-pulse" />
        </g>
      </svg>
    </div>
  );
}

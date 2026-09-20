"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WORKSHOPS_DATA } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

interface WorkshopEnhanced {
  id: string;
  title: string;
  domain: string;
  instructor: string;
  duration: string;
  date: string;
  venue: string;
  description: string;
  registrationUrl: string;
  seatsBooked: number;
  totalSeats: number;
  colorTheme: {
    accent: string;
    border: string;
    hoverBorder: string;
    shadow: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    btnGrad: string;
  };
  tags: string[];
  takeaways: string[];
  iconType: "drone" | "ai" | "security" | "iot";
}

const ENHANCED_WORKSHOPS: WorkshopEnhanced[] = [
  {
    ...WORKSHOPS_DATA[0],
    domain: "ROBOTICS & AVIONICS",
    seatsBooked: 44,
    totalSeats: 60,
    colorTheme: {
      accent: "#00D9FF",
      border: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-400",
      shadow: "hover:shadow-[0_0_40px_rgba(0,217,255,0.25)]",
      badgeBg: "bg-cyan-500/15 border-cyan-400/40",
      badgeText: "text-cyan-300",
      glow: "bg-[#00D9FF]/15",
      btnGrad: "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,217,255,0.35)]",
    },
    tags: ["PX4 Autopilot", "3D LiDAR Point Cloud", "ESC Tuning", "Avionics Bus"],
    takeaways: ["Hardware Quadcopter Flight Testing", "Official SLIET Drone Lab Certificate"],
    iconType: "drone",
  },
  {
    ...WORKSHOPS_DATA[1],
    domain: "ARTIFICIAL INTELLIGENCE",
    seatsBooked: 52,
    totalSeats: 60,
    colorTheme: {
      accent: "#A855F7",
      border: "border-purple-500/30",
      hoverBorder: "hover:border-purple-400",
      shadow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]",
      badgeBg: "bg-purple-500/15 border-purple-400/40",
      badgeText: "text-purple-300",
      glow: "bg-[#A855F7]/15",
      btnGrad: "from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]",
    },
    tags: ["Autonomous Agent Loops", "Vector RAG Memory", "Tool-Calling Pipelines", "LLM Inference"],
    takeaways: ["Cloud GPU Cluster Access Included", "Production Agentic Framework Deployment"],
    iconType: "ai",
  },
  {
    ...WORKSHOPS_DATA[2],
    domain: "ETHICAL HACKING & CTF",
    seatsBooked: 39,
    totalSeats: 60,
    colorTheme: {
      accent: "#10B981",
      border: "border-emerald-500/30",
      hoverBorder: "hover:border-emerald-400",
      shadow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]",
      badgeBg: "bg-emerald-500/15 border-emerald-400/40",
      badgeText: "text-emerald-300",
      glow: "bg-[#10B981]/15",
      btnGrad: "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]",
    },
    tags: ["Binary Exploitation", "Web App Penetration", "Privilege Escalation", "Zero-Day Patching"],
    takeaways: ["Live Isolated Attack Sandbox", "Certified Red Teamer Recognition"],
    iconType: "security",
  },
  {
    ...WORKSHOPS_DATA[3],
    domain: "CLEAN ENERGY & IOT",
    seatsBooked: 36,
    totalSeats: 60,
    colorTheme: {
      accent: "#F59E0B",
      border: "border-amber-500/30",
      hoverBorder: "hover:border-amber-400",
      shadow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]",
      badgeBg: "bg-amber-500/15 border-amber-400/40",
      badgeText: "text-amber-300",
      glow: "bg-[#F59E0B]/15",
      btnGrad: "from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    },
    tags: ["Solar MPPT Controller", "Real-Time MQTT Telemetry", "Embedded Micro-Inverter", "Smart Sensors"],
    takeaways: ["Hardware Prototyping Kit Included", "Cloud IoT Dashboard Architecture"],
    iconType: "iot",
  },
];

export default function WorkshopsEditorial() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const renderIcon = (type: "drone" | "ai" | "security" | "iot", accentColor: string) => {
    switch (type) {
      case "drone":
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Drone body */}
            <circle cx="16" cy="16" r="3.5" fill={accentColor} fillOpacity="0.3" stroke={accentColor} strokeWidth="1.5" />
            <circle cx="16" cy="16" r="1.5" fill={accentColor} />
            {/* Arms */}
            <line x1="7" y1="7" x2="13.5" y2="13.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="7" x2="18.5" y2="13.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="25" x2="13.5" y2="18.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="25" x2="18.5" y2="18.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            {/* Rotors */}
            <ellipse cx="6" cy="6" rx="4" ry="1.5" stroke={accentColor} strokeWidth="1.2" className="animate-spin origin-[6px_6px]" />
            <ellipse cx="26" cy="6" rx="4" ry="1.5" stroke={accentColor} strokeWidth="1.2" className="animate-spin origin-[26px_6px]" />
            <ellipse cx="6" cy="26" rx="4" ry="1.5" stroke={accentColor} strokeWidth="1.2" className="animate-spin origin-[6px_26px]" />
            <ellipse cx="26" cy="26" rx="4" ry="1.5" stroke={accentColor} strokeWidth="1.2" className="animate-spin origin-[26px_26px]" />
            {/* Radar scanner sweep */}
            <circle cx="16" cy="16" r="11" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
          </svg>
        );
      case "ai":
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Neural Core */}
            <rect x="11" y="11" width="10" height="10" rx="2" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1.5" />
            <circle cx="16" cy="16" r="2" fill={accentColor} className="animate-ping" style={{ animationDuration: "3s" }} />
            {/* Synaptic Nodes */}
            <circle cx="6" cy="8" r="2" fill={accentColor} />
            <circle cx="26" cy="8" r="2" fill={accentColor} />
            <circle cx="4" cy="20" r="2" fill={accentColor} />
            <circle cx="28" cy="20" r="2" fill={accentColor} />
            <circle cx="16" cy="28" r="2" fill={accentColor} />
            {/* Connection lines */}
            <line x1="8" y1="9" x2="11" y2="12" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="24" y1="9" x2="21" y2="12" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="6" y1="20" x2="11" y2="18" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="26" y1="20" x2="21" y2="18" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="16" y1="21" x2="16" y2="26" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
          </svg>
        );
      case "security":
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cyber Shield */}
            <path
              d="M16 4L6 8V15C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 15V8L16 4Z"
              fill={accentColor}
              fillOpacity="0.2"
              stroke={accentColor}
              strokeWidth="1.5"
            />
            {/* Keyhole / Lock Core */}
            <circle cx="16" cy="14" r="2.5" fill={accentColor} />
            <path d="M15 16.5H17L17.5 20H14.5L15 16.5Z" fill={accentColor} />
            {/* Binary / terminal line */}
            <line x1="10" y1="11" x2="22" y2="11" stroke={accentColor} strokeWidth="0.8" strokeDasharray="1 2" opacity="0.7" />
          </svg>
        );
      case "iot":
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Microchip Package */}
            <rect x="9" y="9" width="14" height="14" rx="2" fill={accentColor} fillOpacity="0.2" stroke={accentColor} strokeWidth="1.5" />
            {/* Solar / Energy Wave in Core */}
            <path d="M12 16L14.5 13L17.5 19L20 16" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Pins */}
            <line x1="12" y1="5" x2="12" y2="9" stroke={accentColor} strokeWidth="1.2" />
            <line x1="16" y1="5" x2="16" y2="9" stroke={accentColor} strokeWidth="1.2" />
            <line x1="20" y1="5" x2="20" y2="9" stroke={accentColor} strokeWidth="1.2" />
            <line x1="12" y1="23" x2="12" y2="27" stroke={accentColor} strokeWidth="1.2" />
            <line x1="16" y1="23" x2="16" y2="27" stroke={accentColor} strokeWidth="1.2" />
            <line x1="20" y1="23" x2="20" y2="27" stroke={accentColor} strokeWidth="1.2" />
            <line x1="5" y1="12" x2="9" y2="12" stroke={accentColor} strokeWidth="1.2" />
            <line x1="5" y1="16" x2="9" y2="16" stroke={accentColor} strokeWidth="1.2" />
            <line x1="5" y1="20" x2="9" y2="20" stroke={accentColor} strokeWidth="1.2" />
            <line x1="23" y1="12" x2="27" y2="12" stroke={accentColor} strokeWidth="1.2" />
            <line x1="23" y1="16" x2="27" y2="16" stroke={accentColor} strokeWidth="1.2" />
            <line x1="23" y1="20" x2="27" y2="20" stroke={accentColor} strokeWidth="1.2" />
          </svg>
        );
    }
  };

  return (
    <section className="relative z-20 w-full min-h-screen flex items-center py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto text-white font-sans overflow-hidden">
      {/* Ambient Section Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full space-y-16 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER WITH LIVE SCI-FI TELEMETRY HUD                          */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>// CERTIFIED TECHNICAL MASTERCLASSES</span>
            </div>
            <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
              BATCH 2026 • LIMITED REGISTRATIONS
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
                Hands-on Masterclasses <br />
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                  &amp; Technical Bootcamps
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl leading-relaxed">
                Intensive certified engineering masterclasses conducted by aerospace engineers, cybersecurity practitioners, and AI researchers. Every session features live hardware testbenches, take-home development kits, and official SLIET credentials.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <div className="px-3 py-2 rounded-xl bg-[#060e22]/80 border border-cyan-500/30 text-center">
                <div className="text-lg font-bold text-cyan-400 font-mono">04</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">TRACKS</div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#060e22]/80 border border-purple-500/30 text-center">
                <div className="text-lg font-bold text-purple-400 font-mono">600+</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">SEATS</div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#060e22]/80 border border-emerald-500/30 text-center">
                <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">HANDS-ON</div>
              </div>
            </div>
          </div>

          {/* Key Feature Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { label: "100% HANDS-ON LABS", sub: "Live hardware setups & testbenches", icon: "⚡" },
              { label: "GOVT & SLIET CERTIFICATION", sub: "Official credential for resumes", icon: "📜" },
              { label: "HARDWARE KITS INCLUDED", sub: "Keep your prototype boards", icon: "🛠️" },
              { label: "INDUSTRY RESEARCH MENTORS", sub: "Direct 1-on-1 expert guidance", icon: "👨‍🏫" },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 backdrop-blur-md"
              >
                <span className="text-lg">{feat.icon}</span>
                <div>
                  <div className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                    {feat.label}
                  </div>
                  <div className="text-[9px] text-neutral-400 font-light truncate">
                    {feat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ENHANCED HOLOGRAPHIC CYBER CARDS GRID                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {ENHANCED_WORKSHOPS.map((ws) => {
            const isHovered = hoveredCard === ws.id;
            return (
              <div
                key={ws.id}
                onMouseEnter={() => setHoveredCard(ws.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.06] via-[#060f26]/85 to-[#020512]/95 backdrop-blur-xl border ${ws.colorTheme.border} ${ws.colorTheme.hoverBorder} ${ws.colorTheme.shadow} transition-all duration-500 flex flex-col justify-between space-y-6 overflow-hidden`}
              >
                {/* Ambient dynamic glow on hover */}
                <div
                  className={`absolute -top-16 -right-16 w-48 h-48 rounded-full ${ws.colorTheme.glow} blur-3xl pointer-events-none transition-opacity duration-500 ${
                    isHovered ? "opacity-100 scale-125" : "opacity-30 scale-100"
                  }`}
                />

                {/* Cyber Corner Brackets */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-white/20 group-hover:border-white/60 transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-white/20 group-hover:border-white/60 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-white/20 group-hover:border-white/60 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-white/20 group-hover:border-white/60 transition-colors pointer-events-none" />

                {/* Top Section: Domain Badge + Live Seats Counter */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: ws.colorTheme.accent }}
                      />
                      <span
                        className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-md border ${ws.colorTheme.badgeBg} ${ws.colorTheme.badgeText}`}
                      >
                        {ws.domain}
                      </span>
                    </div>

                    {/* Seats Fill Indicator */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                      <span className="text-white font-bold">{ws.seatsBooked}/{ws.totalSeats}</span>
                      <span className="text-emerald-400">SEATS BOOKED</span>
                    </div>
                  </div>

                  {/* Header with Custom Cyber Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0 p-2 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      {renderIcon(ws.iconType, ws.colorTheme.accent)}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
                        <span>📅 {ws.date}</span>
                        <span>•</span>
                        <span style={{ color: ws.colorTheme.accent }}>⏱️ {ws.duration}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-normal text-white leading-snug group-hover:text-white transition-colors">
                        {ws.title}
                      </h3>
                    </div>
                  </div>

                  {/* Instructor / Mentor Pill */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-neutral-300">
                    <span className="text-sm">👨‍🏫</span>
                    <span className="text-neutral-400">MENTOR:</span>
                    <span className="text-white font-semibold truncate">{ws.instructor}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {ws.description}
                  </p>

                  {/* Tech Tags / Keywords */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ws.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[9px] font-mono text-neutral-400 tracking-wider hover:border-white/30 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5 pt-2">
                    {ws.takeaways.map((take, tkIdx) => (
                      <div key={tkIdx} className="flex items-center gap-2 text-[10px] font-mono text-neutral-300">
                        <span style={{ color: ws.colorTheme.accent }}>✔</span>
                        <span>{take}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Venue + Interactive Enroll CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider truncate">
                    <span>📍</span>
                    <span className="truncate">{ws.venue}</span>
                  </div>

                  <MagneticButton dataCursor="ENROLL">
                    <Link
                      href="/package"
                      className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${ws.colorTheme.btnGrad} font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shrink-0 group-hover:scale-105`}
                    >
                      <span>ENROLL NOW</span>
                      <span>→</span>
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

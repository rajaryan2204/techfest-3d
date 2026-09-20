"use client";

import React, { useState } from "react";

interface SampleEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (eventName: string) => void;
}

interface EventItem {
  id: string;
  title: string;
  category: "hackathon" | "robotics" | "coding" | "ai" | "gaming" | "aero";
  categoryLabel: string;
  tagline: string;
  prize: string;
  teamSize: string;
  venue: string;
  color: string;
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: "hack-sliet",
    title: "Hack-SLIET 2026",
    category: "hackathon",
    categoryLabel: "Flagship Hackathon",
    tagline: "36-Hour National Hackathon tackling Sustainable Earth & AI Challenges",
    prize: "₹1,50,000",
    teamSize: "2 - 4 Members",
    venue: "Computer Science Complex",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "robowars",
    title: "RoboWars // Heavyweight",
    category: "robotics",
    categoryLabel: "Robotics Arena",
    tagline: "High-impact combat robotics in an enclosed bulletproof steel arena",
    prize: "₹1,00,000",
    teamSize: "3 - 5 Members",
    venue: "Mechanical Arena",
    color: "from-amber-500 to-red-600",
  },
  {
    id: "codesprint",
    title: "CodeSprint Algorithmic",
    category: "coding",
    categoryLabel: "Competitive Programming",
    tagline: "Fastest problem solvers compete under strict time & memory constraints",
    prize: "₹60,000",
    teamSize: "Individual / Duo",
    venue: "Central Computing Lab",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "drone-prix",
    title: "FPV Drone Grand Prix",
    category: "aero",
    categoryLabel: "Aeromodelling",
    tagline: "Obstacle course night race through glowing neon gates across SLIET grounds",
    prize: "₹80,000",
    teamSize: "1 - 3 Members",
    venue: "SLIET Main Grounds",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "ai-synth",
    title: "Neural Genesis (AI/ML)",
    category: "ai",
    categoryLabel: "AI & Data Science",
    tagline: "Build multimodal agents & generative AI tools for climate telemetry",
    prize: "₹75,000",
    teamSize: "1 - 3 Members",
    venue: "Innovation Centre (TBI)",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "valorant-clash",
    title: "CyberClash Esports",
    category: "gaming",
    categoryLabel: "Esports Arena",
    tagline: "National Valorant & BGMI championship on 240Hz LAN battle stations",
    prize: "₹50,000",
    teamSize: "5 Players",
    venue: "Student Activity Centre (SAC)",
    color: "from-orange-500 to-amber-600",
  },
];

export default function SampleEventsModal({
  isOpen,
  onClose,
  onSelectEvent,
}: SampleEventsModalProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  if (!isOpen) return null;

  const filteredEvents =
    activeTab === "all"
      ? SAMPLE_EVENTS
      : SAMPLE_EVENTS.filter((e) => e.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-xl bg-[#06152D] border border-[#00D9FF]/40 shadow-[0_0_80px_rgba(0,217,255,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-[#00D9FF] uppercase block">
              // COMPETITION DIRECTORY
            </span>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              TechFEST&apos;26 Flagship Events
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-0.5 sm:mt-1">
              ₹5,00,000+ Total Prize Pool • National Trophies • SLIET Certifications
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer font-mono text-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Categories Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 bg-[#020817]/60 flex items-center gap-2 overflow-x-auto text-[11px] sm:text-xs font-mono scrollbar-none">
          {[
            { id: "all", label: "ALL EVENTS" },
            { id: "hackathon", label: "HACKATHONS" },
            { id: "robotics", label: "ROBOTICS" },
            { id: "coding", label: "CODING" },
            { id: "aero", label: "AERO & DRONE" },
            { id: "ai", label: "AI & ML" },
            { id: "gaming", label: "ESPORTS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#00D9FF] text-[#020817] font-bold shadow-[0_0_15px_rgba(0,217,255,0.5)]"
                  : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 overscroll-contain">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-4 sm:p-5 rounded-lg border border-white/10 bg-[#020817]/70 hover:border-[#00D9FF]/60 hover:bg-[#020817] transition-all flex flex-col justify-between group space-y-3.5 sm:space-y-4 shadow-lg"
            >
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00D9FF] uppercase px-2 py-0.5 rounded-sm bg-[#00D9FF]/10 border border-[#00D9FF]/30">
                    {evt.categoryLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    🏆 {evt.prize}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans group-hover:text-[#00D9FF] transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {evt.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <div className="flex flex-col gap-0.5">
                  <span>📍 {evt.venue}</span>
                  <span>👥 {evt.teamSize}</span>
                </div>
                <button
                  onClick={() => {
                    onSelectEvent(evt.title);
                    onClose();
                  }}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] hover:brightness-110 text-[#020817] font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,217,255,0.4)] min-h-[36px]"
                >
                  REGISTER →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
          <span className="truncate mr-2">16 • 17 OCT 2026 // SLIET</span>
          <button
            onClick={onClose}
            className="text-[#00D9FF] hover:underline cursor-pointer shrink-0"
          >
            Close Directory ✕
          </button>
        </div>
      </div>
    </div>
  );
}

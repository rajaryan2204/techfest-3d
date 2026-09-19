"use client";

import React, { useState } from "react";

interface SampleScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScheduleEntry {
  time: string;
  title: string;
  category: string;
  venue: string;
  highlight?: boolean;
}

const DAY_1_SCHEDULE: ScheduleEntry[] = [
  {
    time: "08:30 AM",
    title: "Delegate Check-in & Kit Distribution",
    category: "WELCOME",
    venue: "Main Auditorium Foyer",
  },
  {
    time: "10:00 AM",
    title: "Grand Inauguration Ceremony // Dignitary Keynotes",
    category: "CEREMONY",
    venue: "Main Auditorium",
    highlight: true,
  },
  {
    time: "12:00 PM",
    title: "Hack-SLIET 36-Hour National Hackathon Begins",
    category: "HACKATHON",
    venue: "CSE Labs & Innovation Hub",
    highlight: true,
  },
  {
    time: "02:00 PM",
    title: "RoboWars: Round 1 Combat Eliminations",
    category: "ROBOTICS",
    venue: "Mechanical Steel Arena",
  },
  {
    time: "04:30 PM",
    title: "Guest Talk: Next-Gen Autonomous Robotics & AI",
    category: "KEYNOTE",
    venue: "Auditorium Hall B",
  },
  {
    time: "07:30 PM",
    title: "Cosmic Star Watch & Neon Drone Light Show",
    category: "SHOWCASE",
    venue: "Main Stadium Grounds",
    highlight: true,
  },
  {
    time: "09:00 PM",
    title: "Pronite Day 1: National Indie Rock Band Live",
    category: "CULTURAL",
    venue: "Open Air Theatre (OAT)",
    highlight: true,
  },
];

const DAY_2_SCHEDULE: ScheduleEntry[] = [
  {
    time: "09:00 AM",
    title: "CodeSprint Algorithmic Championship",
    category: "CODING",
    venue: "Central Computing Lab",
  },
  {
    time: "11:00 AM",
    title: "FPV Drone Grand Prix Final Heats",
    category: "AERO",
    venue: "SLIET Main Grounds",
    highlight: true,
  },
  {
    time: "01:30 PM",
    title: "CyberClash Esports Grand Finals (Valorant/BGMI)",
    category: "ESPORTS",
    venue: "Student Activity Centre",
  },
  {
    time: "03:30 PM",
    title: "Hack-SLIET Final Pitching to National VCs",
    category: "HACKATHON",
    venue: "Main Auditorium",
    highlight: true,
  },
  {
    time: "05:30 PM",
    title: "RoboWars Grand Championship Finals",
    category: "ROBOTICS",
    venue: "Mechanical Arena",
    highlight: true,
  },
  {
    time: "07:00 PM",
    title: "Grand Valedictory & Prize Distribution (₹5L+ Prizes)",
    category: "CEREMONY",
    venue: "Main Auditorium",
    highlight: true,
  },
  {
    time: "08:30 PM",
    title: "Mega Pronite Celebrity Artist & DJ Night",
    category: "CULTURAL",
    venue: "Main Stadium",
    highlight: true,
  },
];

export default function SampleScheduleModal({
  isOpen,
  onClose,
}: SampleScheduleModalProps) {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const currentList = selectedDay === 1 ? DAY_1_SCHEDULE : DAY_2_SCHEDULE;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-xl bg-[#06152D] border border-[#00D9FF]/40 shadow-[0_0_80px_rgba(0,217,255,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-[#00D9FF] uppercase block">
              // TIMELINE &amp; ITINERARY
            </span>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              TechFEST&apos;26 Schedule
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-0.5 sm:mt-1">
              SLIET Longowal • 09 &amp; 10 October 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer font-mono text-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Day Switcher */}
        <div className="p-2.5 sm:p-4 border-b border-white/10 bg-[#020817]/60 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSelectedDay(1)}
            className={`flex-1 py-2 sm:py-2.5 px-2 rounded-lg font-mono text-[11px] sm:text-xs tracking-wider font-bold transition-all cursor-pointer text-center ${
              selectedDay === 1
                ? "bg-[#00D9FF] text-[#020817] shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="sm:hidden">DAY 1: 09 OCT</span>
            <span className="hidden sm:inline">DAY 1: 09 OCTOBER 2026 (INVENT)</span>
          </button>
          <button
            onClick={() => setSelectedDay(2)}
            className={`flex-1 py-2 sm:py-2.5 px-2 rounded-lg font-mono text-[11px] sm:text-xs tracking-wider font-bold transition-all cursor-pointer text-center ${
              selectedDay === 2
                ? "bg-[#00D9FF] text-[#020817] shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="sm:hidden">DAY 2: 10 OCT</span>
            <span className="hidden sm:inline">DAY 2: 10 OCTOBER 2026 (CONQUER)</span>
          </button>
        </div>

        {/* Schedule Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 sm:space-y-3 overscroll-contain">
          {currentList.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 sm:p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 transition-all ${
                item.highlight
                  ? "border-[#00D9FF]/40 bg-[#00D9FF]/10"
                  : "border-white/10 bg-[#020817]/60"
              }`}
            >
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#00D9FF] min-w-[68px] sm:min-w-[75px] shrink-0">
                  {item.time}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white font-sans">
                    {item.title}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                    📍 {item.venue}
                  </span>
                </div>
              </div>

              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm bg-white/10 text-neutral-300 self-start sm:self-center">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
          <span>IST (UTC+05:30)</span>
          <button
            onClick={onClose}
            className="text-[#00D9FF] hover:underline cursor-pointer shrink-0"
          >
            Close Schedule ✕
          </button>
        </div>
      </div>
    </div>
  );
}

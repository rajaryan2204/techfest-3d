"use client";

import React from "react";

interface SampleCampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusAuditorium: () => void;
}

interface CampusPOI {
  id: string;
  name: string;
  category: string;
  coordinates: string;
  elevation: string;
  desc: string;
  highlight?: boolean;
}

const CAMPUS_POIS: CampusPOI[] = [
  {
    id: "auditorium",
    name: "Main Auditorium Complex",
    category: "FEATURED IN DRONE SHOT",
    coordinates: "30.2244° N, 75.6983° E",
    elevation: "65m AGL",
    desc: "Iconic blue-domed amphitheater featured directly in the hero drone video. Hosts 1200+ delegates, national keynote speakers, and celebrity pronites.",
    highlight: true,
  },
  {
    id: "library",
    name: "Central Knowledge & Research Library",
    category: "RESEARCH & STUDY",
    coordinates: "30.2251° N, 75.6995° E",
    elevation: "230m ASL",
    desc: "Four-level central repository equipped with high-speed digital research bays, journal archives, and silent hackathon pods.",
  },
  {
    id: "tbi",
    name: "Innovation & Incubation Centre (TBI)",
    category: "STARTUP & AI LABS",
    coordinates: "30.2238° N, 75.6972° E",
    elevation: "228m ASL",
    desc: "State-of-the-art incubation incubator with advanced 3D printers, IoT labs, and prototyping stations funded by DST.",
  },
  {
    id: "workshops",
    name: "Mechanical Engineering Workshops",
    category: "ROBOTICS & MANUFACTURING",
    coordinates: "30.2260° N, 75.6968° E",
    elevation: "229m ASL",
    desc: "Heavy industrial labs, CNC machining units, laser cutters, and fabrication base for RoboWars combat bots.",
  },
  {
    id: "sac",
    name: "Lakeside Student Activity Centre (SAC)",
    category: "ESPORTS & RECREATION",
    coordinates: "30.2229° N, 75.7001° E",
    elevation: "227m ASL",
    desc: "Lakeside hub hosting TechFEST esports battleground, open-air art displays, cultural jams, and food stalls.",
  },
];

export default function SampleCampusTourModal({
  isOpen,
  onClose,
  onFocusAuditorium,
}: SampleCampusTourModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-xl bg-[#06152D] border border-[#00D9FF]/40 shadow-[0_0_80px_rgba(0,217,255,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-[#00D9FF] uppercase block">
              // CAMPUS RECONNAISSANCE
            </span>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              SLIET Longowal Campus Tour
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-0.5 sm:mt-1">
              450-Acre Lush Green Campus • Sangrur, Punjab
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer font-mono text-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* POI List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-3.5 overscroll-contain">
          {CAMPUS_POIS.map((poi) => (
            <div
              key={poi.id}
              className={`p-3.5 sm:p-4 rounded-lg border transition-all ${
                poi.highlight
                  ? "border-[#00D9FF]/60 bg-[#00D9FF]/10 shadow-[0_0_25px_rgba(0,217,255,0.15)]"
                  : "border-white/10 bg-[#020817]/60 hover:border-white/20 hover:bg-[#020817]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm ${
                        poi.highlight
                          ? "bg-[#00D9FF] text-[#020817] font-bold"
                          : "bg-white/10 text-neutral-300"
                      }`}
                    >
                      {poi.category}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
                      {poi.coordinates}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans mt-1">
                    {poi.name}
                  </h3>
                </div>

                {poi.highlight && (
                  <button
                    onClick={() => {
                      onFocusAuditorium();
                      onClose();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#008CFF] text-[#020817] font-mono text-xs font-bold hover:brightness-110 cursor-pointer shadow-[0_0_15px_rgba(0,217,255,0.5)] self-stretch sm:self-center min-h-[36px]"
                  >
                    <span>🎯 FOCUS DRONE CAM</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                {poi.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
          <span className="truncate mr-2">SLIET CAMPUS MAP</span>
          <button
            onClick={onClose}
            className="text-[#00D9FF] hover:underline cursor-pointer shrink-0"
          >
            Close Guide ✕
          </button>
        </div>
      </div>
    </div>
  );
}

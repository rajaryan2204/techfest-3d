"use client";

import React, { useEffect, useState } from "react";
import { scrollStore } from "@/lib/scrollStore";

const sections = [
  { id: "01", name: "ROBOZAR", range: [0.14, 0.28] },
  { id: "02", name: "PLEXUS", range: [0.28, 0.42] },
  { id: "03", name: "KARYARACHNA", range: [0.42, 0.56] },
  { id: "04", name: "KERMIS", range: [0.56, 0.70] },
  { id: "05", name: "ELECTRICA", range: [0.70, 0.84] },
  { id: "06", name: "MECHANICA", range: [0.84, 0.98] },
];

export default function SectionProgress() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const p = scrollStore.currentProgress;
      // Show during the entire 3D exhibition journey (0.14 to 0.98)
      if (p >= 0.14 && p <= 0.98) {
        setVisible(true);
        const idx = sections.findIndex(
          (s) => p >= s.range[0] && p <= s.range[1]
        );
        setActiveIdx(idx !== -1 ? idx : null);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 text-[10px] font-mono select-none pointer-events-none transition-opacity duration-500"
      aria-label="Event Sections Progress"
    >
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-white/20" />
      {sections.map((sec, i) => {
        const isActive = activeIdx === i;
        return (
          <div
            key={sec.id}
            className={`flex items-center gap-2 transition-all duration-300 ${
              isActive ? "text-white scale-110" : "text-neutral-600 scale-95"
            }`}
          >
            <span className="font-light tracking-widest">{sec.id}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </div>
        );
      })}
      <div className="w-px h-8 bg-gradient-to-b from-white/20 via-white/20 to-transparent" />
    </nav>
  );
}

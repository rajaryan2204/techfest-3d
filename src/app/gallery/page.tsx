"use client";

import React, { useState } from "react";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

const GALLERY_MEDIA = [
  {
    id: "g1",
    title: "ROBOWARS COMBAT ARENA",
    category: "ROBOTICS",
    subtitle: "Heavyweight 60kg pneumatic weapon battle in the electrified cage.",
    image: "https://wsrv.nl/?url=https://lh3.googleusercontent.com/d/13Exkjs-Xffc1j3pgkpTz_xW1tIQEWpYo&output=webp",
  },
  {
    id: "g2",
    title: "AUTONOMOUS DRONE OBSTACLE RUSH",
    category: "AEROSPACE",
    subtitle: "High-speed FPV and spatial LiDAR drone navigation across obstacles.",
    image: "https://wsrv.nl/?url=https://lh3.googleusercontent.com/d/1o9u6CkTdCtGkfgFywojviZvPtKrCukxu&output=webp",
  },
  {
    id: "g3",
    title: "RAPID LINE FOLLOWER TRACK",
    category: "ROBOTICS",
    subtitle: "High-speed precision optical sensor autonomous racers.",
    image: "https://wsrv.nl/?url=https://lh3.googleusercontent.com/d/1V4O7kRLJa2EJrxQwgayQMPZhwMY_MVeu&output=webp",
  },
  {
    id: "g4",
    title: "24-HOUR HACKATHON ARENA",
    category: "SOFTWARE",
    subtitle: "Over 1,000 developers building production AI agents and web3 apps.",
    image: "https://wsrv.nl/?url=https://lh3.googleusercontent.com/d/1BfE4Y6xX8cT_zR9qM5bC2lP9k7rV1aO&output=webp",
  },
  {
    id: "g5",
    title: "STAR NIGHT PRONITE CONCERT",
    category: "PRONITES",
    subtitle: "Thousands of students cheering under spectacular laser shows.",
    image: "https://wsrv.nl/?url=https://lh3.googleusercontent.com/d/1K9jP2mN4vL7rX8yQ1bC3lA6k8wF2oI&output=webp",
  },
  {
    id: "g6",
    title: "SLIET CAMPUS EXPO & 451-ACRE GROUNDS",
    category: "CAMPUS",
    subtitle: "Aerial perspective of the sprawling green institution in Longowal.",
    image: "/videos/hero/earth-zoom-drone-poster.jpg",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "ROBOTICS", "SOFTWARE", "AEROSPACE", "PRONITES", "CAMPUS"];

  const filteredMedia =
    activeCategory === "ALL"
      ? GALLERY_MEDIA
      : GALLERY_MEDIA.filter((item) => item.category === activeCategory);

  return (
    <CyberPageWrapper
      activeBadge="VISUAL ARCHIVE"
      title="FESTIVAL GALLERY"
      subtitle="Relive the sheer adrenaline, engineering battles, innovative prototypes, and electrifying cultural nights of TechFEST SLIET."
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                : "border-cyan-500/20 bg-cyan-500/5 text-neutral-300 hover:border-cyan-500/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {filteredMedia.map((item, idx) => (
          <div
            key={item.id}
            className="cyber-card flex flex-col justify-between overflow-hidden group"
          >
            <div className="cyber-card-glow" />

            <div className="relative w-full h-56 overflow-hidden bg-black/60">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/videos/hero/earth-zoom-drone-poster.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-transparent to-black/30" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-white font-mono text-[10px] backdrop-blur-xs">
                ARCHIVE // 0{idx + 1}
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] backdrop-blur-xs font-bold">
                {item.category}
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CyberPageWrapper>
  );
}

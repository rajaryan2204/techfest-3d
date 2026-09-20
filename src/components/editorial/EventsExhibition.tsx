"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_EVENTS, DetailedEvent } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";
import MagneticButton from "@/components/interaction/MagneticButton";

const DOMAIN_THEMES: Record<
  string,
  {
    primary: string;
    border: string;
    bg: string;
    glow: string;
    badge: string;
    image: string;
    prize: string;
  }
> = {
  robozar: {
    primary: "#00D9FF",
    border: "border-[#00D9FF]/40",
    bg: "bg-[#00D9FF]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(0,217,255,0.25)]",
    badge: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
    image: "/domain/robozar.webp",
    prize: "₹75,000+ CASH POOL",
  },
  plexus: {
    primary: "#00FFCC",
    border: "border-[#00FFCC]/40",
    bg: "bg-[#00FFCC]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(0,255,204,0.25)]",
    badge: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
    image: "/domain/plexus.webp",
    prize: "₹1,00,000+ CASH POOL",
  },
  karyarachna: {
    primary: "#C084FC",
    border: "border-[#C084FC]/40",
    bg: "bg-[#C084FC]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(192,132,252,0.25)]",
    badge: "bg-purple-500/15 border-purple-400/40 text-purple-300",
    image: "/domain/karyarachna.webp",
    prize: "₹60,000+ CASH POOL",
  },
  kermis: {
    primary: "#FB923C",
    border: "border-[#FB923C]/40",
    bg: "bg-[#FB923C]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(251,146,60,0.25)]",
    badge: "bg-orange-500/15 border-orange-400/40 text-orange-300",
    image: "/domain/kermis.webp",
    prize: "₹50,000+ CASH POOL",
  },
  electrica: {
    primary: "#FACC15",
    border: "border-[#FACC15]/40",
    bg: "bg-[#FACC15]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]",
    badge: "bg-yellow-500/15 border-yellow-400/40 text-yellow-300",
    image: "/domain/electrica.webp",
    prize: "₹50,000+ CASH POOL",
  },
  mechanica: {
    primary: "#F472B6",
    border: "border-[#F472B6]/40",
    bg: "bg-[#F472B6]/10",
    glow: "group-hover:shadow-[0_0_35px_rgba(244,114,182,0.25)]",
    badge: "bg-pink-500/15 border-pink-400/40 text-pink-300",
    image: "/domain/mechanica.webp",
    prize: "₹55,000+ CASH POOL",
  },
};

const FILTER_TABS = [
  { label: "ALL DOMAINS", value: "ALL" },
  { label: "ROBOTICS", value: "ROBOTICS" },
  { label: "SOFTWARE", value: "SOFTWARE" },
  { label: "HARDWARE", value: "HARDWARE" },
  { label: "GAMING", value: "GAMING" },
  { label: "ELECTRICAL", value: "ELECTRICAL" },
  { label: "MECHANICAL", value: "MECHANICAL" },
];

export default function EventsExhibition() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredEvents =
    activeFilter === "ALL"
      ? EDITORIAL_EVENTS
      : EDITORIAL_EVENTS.filter((e) => e.filterTag === activeFilter);

  return (
    <section id="events-section" className="relative py-16 sm:py-28 px-4 sm:px-12 md:px-16 max-w-7xl mx-auto space-y-10 sm:space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 relative">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.35em] text-[#00D9FF] uppercase font-semibold">
              // MISSION DOMAINS // EARTH & SPACE INNOVATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white uppercase font-sans leading-none">
            PLANETARY <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#00FFCC] to-white">
              DOMAINS & ARENAS
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl leading-relaxed">
            Engineering sustainable solutions for planet Earth and the cosmic frontier: battle across 6 flagship domains featuring 40+ national competitions, robotics, aerospace challenges, and certified cash prize pools.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xs font-mono space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[#00FFCC] font-bold">TOTAL CASH POOL</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              ₹5,00,000+
            </div>
            <p className="text-[10px] text-neutral-500 uppercase">Cash + Trophies + Certificates</p>
          </div>

          <Link
            href="/events"
            className="px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-400/30 hover:border-cyan-400 text-cyan-300 hover:text-black font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 self-start md:self-end"
          >
            <span>VIEW ALL 13 DOMAINS</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#00D9FF] text-[#020817] shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 6 Editorial Event Exhibits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredEvents.map((event) => {
          const theme = DOMAIN_THEMES[event.id] || {
            primary: "#00D9FF",
            border: "border-cyan-500/40",
            bg: "bg-cyan-500/10",
            glow: "group-hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]",
            badge: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
            image: `/domain/${event.id}.webp`,
            prize: "CASH PRIZES & TROPHIES",
          };

          return (
            <div
              key={event.id}
              onClick={() => eventStore.setSelectedEvent(event)}
              className={`group relative bg-[#060c1c]/90 hover:bg-[#09122a]/95 border border-white/10 hover:border-cyan-400/70 p-4.5 sm:p-7 transition-all duration-500 rounded-2xl flex flex-col justify-between space-y-5 sm:space-y-6 cursor-pointer shadow-xl ${theme.glow} backdrop-blur-md overflow-hidden`}
            >
              {/* Corner Sci-Fi Accent Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />

              {/* Ambient Hover Glow behind card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

              {/* 1. Card Top Telemetry & Tags */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors">
                    {event.num} // DOMAIN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-md border uppercase font-bold ${theme.badge}`}>
                    {event.filterTag}
                  </span>
                </div>
              </div>

              {/* 2. Authentic 3D Domain Banner Artwork with CRT Scanline Effect */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/15 group-hover:border-cyan-400/50 transition-colors bg-[#030712]">
                <Image
                  src={theme.image}
                  alt={event.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Cyber Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c1c] via-transparent to-transparent opacity-80" />

                {/* CRT Horizontal Scanlines Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Top Corner Telemetry Badge on Image */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[9px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>LIVE TRACK</span>
                </div>

                {/* Bottom Prize Pool Chip on Image */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-yellow-500/40 text-[10px] font-mono text-yellow-300 font-bold flex items-center gap-1.5 shadow-lg">
                  <span>🏆</span>
                  <span>{theme.prize}</span>
                </div>
              </div>

              {/* 3. Event Name, Category & Description */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00D9FF] transition-colors font-sans tracking-tight">
                    {event.name}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {event.eventCount} EVENTS
                  </span>
                </div>

                <p className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider font-semibold">
                  {event.category}
                </p>

                <p className="text-xs text-neutral-300 font-light line-clamp-3 leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>

              {/* 4. Featured Competitions Mini Tags */}
              {event.featuredEvents && event.featuredEvents.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/10 relative z-10">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block font-semibold">
                    TOP COMPETITIONS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {event.featuredEvents.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-neutral-200 bg-white/5 group-hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-md transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                    {event.featuredEvents.length > 3 && (
                      <span className="text-[10px] font-mono text-cyan-400/80 px-2 py-1">
                        +{event.featuredEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* 5. CTA Trigger */}
              <div className="pt-2 relative z-10">
                <MagneticButton dataCursor="VIEW">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      eventStore.setSelectedEvent(event);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] group-hover:bg-[#00D9FF] border border-white/15 group-hover:border-[#00D9FF] transition-all duration-300 flex items-center justify-between cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`Explore track for ${event.name}`}
                  >
                    <span className="text-xs font-mono tracking-[0.2em] text-white group-hover:text-[#020817] font-bold uppercase transition-colors">
                      EXPLORE TRACK
                    </span>
                    <span className="text-cyan-400 group-hover:text-[#020817] transform group-hover:translate-x-1 transition-transform font-mono font-bold">
                      &rarr;
                    </span>
                  </button>
                </MagneticButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore All Domains Cyber Banner */}
      <div className="relative p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#030919] via-[#081530] to-[#030919] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,217,255,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FFCC] uppercase font-bold block">
            // ALL COMPETITIONS ARCHIVE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
            WANT TO EXPLORE ALL 13 DOMAINS & 60+ EVENTS?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-light">
            Check out the complete competition catalog including Chemica, Civicon, Electronica, Foodocrats, Genesis, Inventia, and Atomheimer.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/events"
            className="px-6 py-3.5 rounded-xl bg-[#00D9FF] hover:bg-white text-[#020817] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,217,255,0.4)]"
          >
            VIEW ALL 13 DOMAINS &rarr;
          </Link>
          <Link
            href="/package"
            className="px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            GET PASSES
          </Link>
        </div>
      </div>
    </section>
  );
}

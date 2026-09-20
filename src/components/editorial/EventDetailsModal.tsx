"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventStore } from "@/lib/eventStore";
import { DetailedEvent } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

const DOMAIN_THEMES: Record<
  string,
  {
    primary: string;
    border: string;
    glow: string;
    badge: string;
    image: string;
    prize: string;
  }
> = {
  robozar: {
    primary: "#00D9FF",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_35px_rgba(0,217,255,0.25)]",
    badge: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
    image: "/domain/robozar.webp",
    prize: "₹75,000+ CASH POOL",
  },
  plexus: {
    primary: "#00FFCC",
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_35px_rgba(0,255,204,0.25)]",
    badge: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
    image: "/domain/plexus.webp",
    prize: "₹1,00,000+ CASH POOL",
  },
  karyarachna: {
    primary: "#C084FC",
    border: "border-purple-500/40",
    glow: "shadow-[0_0_35px_rgba(192,132,252,0.25)]",
    badge: "bg-purple-500/15 border-purple-400/40 text-purple-300",
    image: "/domain/karyarachna.webp",
    prize: "₹60,000+ CASH POOL",
  },
  kermis: {
    primary: "#FB923C",
    border: "border-orange-500/40",
    glow: "shadow-[0_0_35px_rgba(251,146,60,0.25)]",
    badge: "bg-orange-500/15 border-orange-400/40 text-orange-300",
    image: "/domain/kermis.webp",
    prize: "₹50,000+ CASH POOL",
  },
  electrica: {
    primary: "#FACC15",
    border: "border-yellow-500/40",
    glow: "shadow-[0_0_35px_rgba(250,204,21,0.25)]",
    badge: "bg-yellow-500/15 border-yellow-400/40 text-yellow-300",
    image: "/domain/electrica.webp",
    prize: "₹50,000+ CASH POOL",
  },
  mechanica: {
    primary: "#38BDF8",
    border: "border-sky-500/40",
    glow: "shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    badge: "bg-sky-500/15 border-sky-400/40 text-sky-300",
    image: "/domain/mechanica.webp",
    prize: "₹50,000+ CASH POOL",
  },
};

export default function EventDetailsModal() {
  const [event, setEvent] = useState<DetailedEvent | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unsubscribe = eventStore.subscribe(() => {
      const selected = eventStore.getSelectedEvent();
      setEvent(selected);
      setShowRules(false);
      setCopied(false);

      if (selected) {
        document.body.style.overflow = "hidden";
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `?event=${selected.id}`);
        }
        setTimeout(() => closeButtonRef.current?.focus(), 50);
      } else {
        document.body.style.overflow = "auto";
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    });

    return () => {
      document.body.style.overflow = "auto";
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        eventStore.setSelectedEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyShareLink = () => {
    if (!event || typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?event=${event.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!event) return null;

  const theme = DOMAIN_THEMES[event.id] || {
    primary: "#00D9FF",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_35px_rgba(0,217,255,0.25)]",
    badge: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
    image: `/domain/${event.id}.webp`,
    prize: "CASH PRIZES & TROPHIES",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      {/* Backdrop Click Dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => eventStore.setSelectedEvent(null)}
        aria-hidden="true"
      />

      {/* Futuristic Earth & Space Holographic Mission Window */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#030919]/95 border border-cyan-500/35 p-5 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,217,255,0.25)] z-10 space-y-6 text-white rounded-3xl backdrop-blur-2xl scrollbar-thin scrollbar-thumb-cyan-500/30">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Corner Sci-Fi Accent Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* 1. Header Bar with Mission Telemetry & Close */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>MISSION CODEX // {event.num}</span>
            </div>

            {event.filterTag && (
              <span className={`text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-md border uppercase font-bold ${theme.badge}`}>
                {event.filterTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Share Link */}
            <button
              onClick={copyShareLink}
              className="text-[10px] font-mono tracking-widest text-cyan-400 hover:text-white uppercase px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Copy share link"
            >
              <span>{copied ? "COPIED ✓" : "SHARE ↗"}</span>
            </button>

            {/* Close Button with Cyan Hover Ring */}
            <button
              ref={closeButtonRef}
              onClick={() => eventStore.setSelectedEvent(null)}
              className="text-xs font-mono tracking-widest text-white hover:text-cyan-300 uppercase px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,217,255,0.3)]"
              aria-label="Close event details"
            >
              CLOSE ×
            </button>
          </div>
        </div>

        {/* 2. 3D Domain Banner Artwork with CRT Scanlines & Badges */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#020614] shadow-xl group">
          <Image
            src={theme.image}
            alt={event.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />

          {/* Sci-Fi CRT Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

          {/* Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030919] via-[#030919]/40 to-transparent" />

          {/* Top Left Live Status */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" />
            <span>AUTHENTIC 3D DOMAIN ARTWORK</span>
          </div>

          {/* Top Right Prize Chip */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-yellow-500/40 text-[10px] font-mono text-yellow-300 font-bold flex items-center gap-1.5 shadow-lg">
            <span>🏆</span>
            <span>{theme.prize}</span>
          </div>

          {/* Bottom Title Overlay inside Image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h2
                id="modal-event-title"
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-sans leading-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
              >
                {event.name}
              </h2>
              {event.category && (
                <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider uppercase pt-1 drop-shadow-md">
                  // {event.category}
                </p>
              )}
            </div>

            <span className="text-[10px] font-mono text-neutral-300 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 hidden sm:inline-block">
              {event.eventCount} SUB-EVENTS
            </span>
          </div>
        </div>

        {/* 3. About Description */}
        {event.description && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-cyan-500/20 space-y-2 relative">
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold block">
              // DOMAIN NARRATIVE & OVERVIEW
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* 4. Event Details Telemetry Matrix */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold block">
            // ARENA SPECIFICATIONS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {event.date && (
              <div className="p-3.5 rounded-xl bg-[#061026]/80 border border-cyan-500/25 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                  DATE
                </span>
                <span className="text-xs font-medium text-white block">
                  {event.date}
                </span>
              </div>
            )}

            {event.venue && (
              <div className="p-3.5 rounded-xl bg-[#061026]/80 border border-cyan-500/25 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                  VENUE
                </span>
                <span className="text-xs font-medium text-white block truncate" title={event.venue}>
                  {event.venue}
                </span>
              </div>
            )}

            {event.teamSize && (
              <div className="p-3.5 rounded-xl bg-[#061026]/80 border border-cyan-500/25 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                  TEAM SIZE
                </span>
                <span className="text-xs font-medium text-white block">
                  {event.teamSize}
                </span>
              </div>
            )}

            {event.prizeSummary && (
              <div className="p-3.5 rounded-xl bg-[#061026]/80 border border-amber-500/30 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase block">
                  RECOGNITION
                </span>
                <span className="text-xs font-medium text-amber-200 block truncate" title={event.prizeSummary}>
                  {event.prizeSummary}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 5. Featured Competitions Grid */}
        {event.featuredEvents && event.featuredEvents.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00FFCC] uppercase font-bold block">
              // KEY COMPETITIVE ARENAS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {event.featuredEvents.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 text-xs text-neutral-200 font-light flex items-center justify-between transition-colors group/item"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/item:scale-125 transition-transform shrink-0" />
                    <span>{item}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/70 group-hover/item:text-cyan-300">
                    ARENA &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Rules Accordion with Sci-Fi Terminal Styling */}
        {event.rules && event.rules.length > 0 && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <button
              onClick={() => setShowRules(!showRules)}
              className="text-xs font-mono tracking-widest text-neutral-300 hover:text-cyan-300 uppercase flex items-center justify-between w-full cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">//</span>
                <span>RULES & PARTICIPATION GUIDELINES {showRules ? "▲" : "▼"}</span>
              </div>
              <span className="text-[10px] text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30">
                {showRules ? "HIDE" : "EXPAND"}
              </span>
            </button>
            {showRules && (
              <ul className="space-y-2 list-disc list-inside text-xs text-neutral-300 font-light leading-relaxed pt-2 border-t border-white/10 animate-in fade-in duration-200">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="pl-1">{rule}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 7. Action Bar & Registration */}
        <div className="pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block font-semibold">
              // SLIET TECHFEST 2026 • SUSTAINABLE EARTH
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider block">
              16—17 OCTOBER 2026 • LONGOWAL, PUNJAB
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Direct Domain Page Link */}
            <Link
              href={`/events/${event.id}`}
              onClick={() => eventStore.setSelectedEvent(null)}
              className="flex-1 sm:flex-initial text-center px-5 py-3 rounded-xl border border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-500/15 text-cyan-300 font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,217,255,0.15)]"
            >
              FULL DOMAIN ARCHIVE ↗
            </Link>

            {event.registrationUrl && (
              <MagneticButton dataCursor="JOIN">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-8 py-3 rounded-xl bg-[#00D9FF] hover:bg-white text-[#020817] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer inline-block"
                >
                  REGISTER NOW →
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

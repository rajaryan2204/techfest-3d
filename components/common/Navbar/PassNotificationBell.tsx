"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./passBell.css";

export default function PassNotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      {/* Ringing Bell Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-[#0CC7F8]/20 border border-white/20 hover:border-[#0CC7F8] text-white hover:text-[#0CC7F8] transition-all duration-300 shadow-[0_0_15px_rgba(12,199,248,0.15)] cursor-pointer group"
        title="Important Festival Access Notice"
        aria-label="Festival Access Notice"
      >
        {/* Animated Swinging Bell */}
        <svg className="w-5 h-5 ringing-bell group-hover:text-[#0CC7F8] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* Active Notification Badge Mark */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 text-[9px] font-mono font-bold text-black items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.9)]">
            !
          </span>
        </span>
      </button>

      {/* High-Tech Access Notice Popover Modal */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-13 z-[1000] w-[320px] sm:w-[380px] bg-[#08090f]/95 border border-[#0CC7F8]/50 rounded-2xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(12,199,248,0.25)] backdrop-blur-xl text-white select-none animate-in fade-in zoom-in-95 duration-200"
        >
          {/* 4 Corner HUD Tech Accents */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#0CC7F8] rounded-tl" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#0CC7F8] rounded-tr" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#0CC7F8] rounded-bl" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#0CC7F8] rounded-br" />

          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#0CC7F8] tracking-widest uppercase block">{"//FESTIVAL ADVISORY"}</span>
                <h4 className="text-sm font-bold tracking-wide text-white">
                  Official Pass Requirement
                </h4>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Message */}
          <div className="py-3.5 space-y-3">
            <p className="text-xs leading-relaxed text-neutral-300 font-light">
              Please acquire an <strong className="text-white font-semibold">official delegate pass</strong> to secure full access to all competition arenas*, campus accommodation facilities, hands-on workshops, and keynote seminars.
            </p>

            {/* Checklist items */}
            <div className="space-y-2 text-[11px] font-mono bg-black/50 border border-white/10 rounded-xl p-3 text-neutral-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold text-white">All Events &amp; Competition Arenas*</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Campus Accommodation &amp; Meals</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Workshops, Talks &amp; Masterclasses</span>
              </div>

              {/* Asterisk Footnote */}
              <div className="pt-1.5 border-t border-white/10 text-[9.5px] text-neutral-400 font-sans italic leading-tight">
                *Specific event participation also requires team registration on the Unstop portal.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Dismiss
            </button>

            <Link
              href="/package"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0CC7F8] hover:bg-white text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(12,199,248,0.4)] no-underline"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span>Get Fest Pass</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
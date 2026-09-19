"use client";

import React, { useState, useEffect, useRef } from "react";
import { eventStore } from "@/lib/eventStore";
import { DetailedEvent } from "@/data/festData";
import MagneticButton from "@/components/interaction/MagneticButton";

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
        // Update URL hash/query without triggering full page reload
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      {/* Backdrop Dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => eventStore.setSelectedEvent(null)}
        aria-hidden="true"
      />

      {/* Large Editorial Detail Window */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0d] border border-white/15 p-6 sm:p-10 md:p-12 shadow-2xl z-10 space-y-8 text-white rounded-xs">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-[0.35em] text-neutral-400">
              {event.num} // DOMAIN
            </span>
            {event.filterTag && (
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 bg-white/5 px-2 py-0.5 uppercase">
                {event.filterTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Share Link */}
            <button
              onClick={copyShareLink}
              className="text-[10px] font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
              aria-label="Copy share link"
            >
              {copied ? "LINK COPIED ✓" : "SHARE ↗"}
            </button>

            {/* Close Trigger */}
            <button
              ref={closeButtonRef}
              onClick={() => eventStore.setSelectedEvent(null)}
              className="text-xs font-mono tracking-widest text-neutral-300 hover:text-white uppercase px-2.5 py-1 rounded-xs hover:bg-white/10 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
              aria-label="Close event details"
            >
              CLOSE ×
            </button>
          </div>
        </div>

        {/* Event Name & Subtitle */}
        <div className="space-y-1">
          <h2
            id="modal-event-title"
            className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-none font-sans"
          >
            {event.name}
          </h2>
          {event.category && (
            <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider uppercase pt-1">
              {event.category}
            </p>
          )}
        </div>

        {/* ABOUT (Description) */}
        {event.description && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
              // ABOUT
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
              {event.description}
            </p>
          </div>
        )}

        {/* EVENT DETAILS Matrix (Only non-empty fields) */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
            // EVENT DETAILS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {event.date && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  DATE
                </span>
                <span className="text-xs font-light text-neutral-200 block">
                  {event.date}
                </span>
              </div>
            )}

            {event.venue && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  VENUE
                </span>
                <span className="text-xs font-light text-neutral-200 block">
                  {event.venue}
                </span>
              </div>
            )}

            {event.teamSize && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  TEAM SIZE
                </span>
                <span className="text-xs font-light text-neutral-200 block">
                  {event.teamSize}
                </span>
              </div>
            )}

            {event.prizeSummary && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  PRIZES & RECOGNITION
                </span>
                <span className="text-xs font-light text-neutral-200 block">
                  {event.prizeSummary}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* FEATURED TRACKS */}
        {event.featuredEvents && event.featuredEvents.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block">
              // FEATURED COMPETITIONS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.featuredEvents.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white/[0.02] border border-white/5 text-xs text-neutral-300 font-light flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RULES Accordion */}
        {event.rules && event.rules.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setShowRules(!showRules)}
              className="text-xs font-mono tracking-widest text-neutral-300 hover:text-white uppercase flex items-center justify-between w-full cursor-pointer py-1"
            >
              <span>RULES & GUIDELINES {showRules ? "↑" : "→"}</span>
              <span className="text-[10px] text-neutral-500">
                {showRules ? "[HIDE]" : "[EXPAND]"}
              </span>
            </button>
            {showRules && (
              <ul className="space-y-2 list-disc list-inside text-xs text-neutral-400 font-light leading-relaxed pt-2 animate-in fade-in duration-200">
                {event.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
            SLIET NATIONAL TECHNICAL FESTIVAL // 2026
          </span>

          {event.registrationUrl && (
            <MagneticButton dataCursor="JOIN">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-3.5 bg-white text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 inline-block"
              >
                REGISTER →
              </a>
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  );
}

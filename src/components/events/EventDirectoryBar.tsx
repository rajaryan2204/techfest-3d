"use client";

import React, { useState, useEffect, useMemo } from "react";
import { EDITORIAL_EVENTS, EVENT_FILTER_CATEGORIES } from "@/data/festData";
import { eventStore } from "@/lib/eventStore";

export default function EventDirectoryBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  useEffect(() => {
    const syncState = () => {
      setIsOpen(eventStore.isSearchOpen());
    };
    const unsubscribe = eventStore.subscribe(syncState);

    // Keyboard shortcut handler (Cmd/Ctrl + K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        eventStore.setSearchOpen(!eventStore.isSearchOpen());
      }
      if (e.key === "Escape" && eventStore.isSearchOpen()) {
        eventStore.setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      unsubscribe();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    return EDITORIAL_EVENTS.filter((e) => {
      const matchesCategory =
        activeCategory === "ALL" || e.filterTag === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.featuredEvents.some((fe) => fe.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => eventStore.setSearchOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search & Filter Events"
    >
      <div
        className="w-full max-w-xl bg-[#0d0d12] border border-white/15 p-5 sm:p-6 rounded-lg shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Search Input */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SEARCH COMPETITIONS</span>
          </div>
          <button
            onClick={() => eventStore.setSearchOpen(false)}
            className="text-xs font-mono text-neutral-400 hover:text-white px-2 py-1 uppercase"
            aria-label="Close search"
          >
            ESC [✕]
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search robotics, hackathon, cad, esports..."
            className="w-full bg-white/[0.04] border border-white/15 px-4 py-2.5 text-sm font-sans text-white placeholder-neutral-500 rounded-md focus:outline-hidden focus:border-cyan-400 transition-colors"
            aria-label="Search keyword"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {EVENT_FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase transition-all rounded-sm cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold"
                  : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-60 overflow-y-auto space-y-1.5 border-t border-white/10 pt-3">
          {filteredEvents.length === 0 ? (
            <p className="text-xs font-mono text-neutral-500 py-4 text-center">
              No matching competitions found.
            </p>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  eventStore.setSelectedEvent(ev);
                  eventStore.setSearchOpen(false);
                }}
                className="p-3 bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all rounded-md cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-500">
                    {ev.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-light text-white group-hover:text-cyan-300 transition-colors">
                      {ev.name}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase">
                      {ev.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded-xs bg-white/5 border border-white/10">
                    {ev.filterTag}
                  </span>
                  <span className="text-neutral-400 text-sm transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

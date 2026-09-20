"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import officialEventsData from "@/data/officialEventsData.json";

interface EventItem {
  eventCode: string;
  title: string;
  description: string;
  image: string;
  link: string;
  external: string;
  details: {
    timing: string;
    date: string;
    venue: string;
  };
  isGroupEvent: boolean;
  maxTeamSize: number;
}

interface DomainItem {
  url: string;
  name: string;
  description: string;
  image: string;
  link: string;
  events: EventItem[];
}

const domains: DomainItem[] = officialEventsData as DomainItem[];

export default function EventsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Flattened events for global search
  const allEvents = useMemo(() => {
    return domains.flatMap((d) =>
      d.events.map((e) => ({
        ...e,
        domainUrl: d.url,
        domainName: d.name,
      }))
    );
  }, []);

  // Filtered domains and events
  const filteredDomains = useMemo(() => {
    return domains.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.events.some((e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchSearch;
    });
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.domainName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allEvents, searchQuery]);

  return (
    <CyberPageWrapper
      activeBadge="COMPETITIONS & EXHIBITIONS"
      title="OFFICIAL EVENT DOMAINS"
      subtitle="Explore 13 specialized engineering and innovation domains featuring 61 national-level competitions, hackathons, and challenges at TechFEST'26 SLIET."
    >
      {/* Search & Filter Bar */}
      <div className="mb-12 space-y-4">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 61 competitions (e.g. Robowar, Hackathon, CAD, BGMI)..."
            className="cyber-input pl-11 pr-16 text-xs sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-white text-xs font-mono cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Stats Banner */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
          <span className="text-cyan-300 font-semibold">13 DOMAINS</span>
          <span>•</span>
          <span className="text-cyan-300 font-semibold">61 COMPETITIONS</span>
          <span>•</span>
          <span>16—17 OCTOBER 2026</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">UNSTOP CERTIFIED</span>
        </div>
      </div>

      {/* Direct Search Results View when user is querying */}
      {searchQuery.trim() !== "" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <h2 className="text-sm font-mono tracking-widest text-cyan-400 uppercase">
              SEARCH RESULTS ({searchResults.length} COMPETITIONS FOUND)
            </h2>
          </div>

          {searchResults.length === 0 ? (
            <div className="cyber-card p-12 text-center">
              <p className="font-mono text-neutral-400 text-sm">
                No events found matching &ldquo;{searchQuery}&rdquo;. Try another keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((ev) => (
                <div
                  key={ev.eventCode}
                  className="cyber-card p-6 flex flex-col justify-between group"
                >
                  <div className="cyber-card-glow" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase font-bold">
                        {ev.domainName}
                      </span>
                      <span className="text-neutral-400">
                        {ev.isGroupEvent ? `Team 1—${ev.maxTeamSize}` : "Solo"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-mono">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                    <Link
                      href={`/events/${ev.domainUrl}/${ev.eventCode}`}
                      className="text-neutral-300 hover:text-cyan-300 underline underline-offset-4"
                    >
                      DETAILS →
                    </Link>

                    {ev.external && (
                      <a
                        href={ev.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-1 font-semibold"
                      >
                        <span>REGISTER</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Domain Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDomains.map((domain, index) => (
            <div
              key={domain.url}
              className="cyber-card flex flex-col justify-between overflow-hidden group"
            >
              <div className="cyber-card-glow" />

              {/* Header Image with Cyber Tint */}
              <div className="relative w-full h-48 overflow-hidden bg-black/40">
                {domain.image && (
                  <img
                    src={domain.image}
                    alt={domain.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-transparent to-black/40" />

                {/* Domain Number Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-white font-mono text-[10px] backdrop-blur-xs">
                  DOM // {String(index + 1).padStart(2, "0")}
                </div>

                {/* Event Count Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] backdrop-blur-xs font-bold">
                  {domain.events.length} EVENTS
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 tracking-tight transition-colors font-sans">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-mono">
                    {domain.description}
                  </p>
                </div>

                {/* Featured Events Pill List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-cyan-400/70 uppercase block">
                    FEATURED TRACKS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.events.slice(0, 3).map((ev) => (
                      <span
                        key={ev.eventCode}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {ev.title}
                      </span>
                    ))}
                    {domain.events.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 text-cyan-400">
                        +{domain.events.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/events/${domain.url}`}
                    className="cyber-btn-outline w-full text-center"
                  >
                    <span>EXPLORE ALL EVENTS</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CyberPageWrapper>
  );
}

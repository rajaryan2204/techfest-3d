import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import officialEventsData from "@/data/officialEventsData.json";

interface EventItem {
  eventCode: string;
  title: string;
  description: string;
  image: string;
  headerPhone: string;
  headerDesktop: string;
  link: string;
  external: string;
  details: {
    timing: string;
    date: string;
    venue: string;
  };
  psLink?: string;
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

export function generateStaticParams() {
  const domains = officialEventsData as DomainItem[];
  return domains.map((d) => ({
    domain: d.url,
  }));
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const resolvedParams = await params;
  const domainSlug = resolvedParams.domain;
  const domains = officialEventsData as DomainItem[];
  const domain = domains.find((d) => d.url === domainSlug);

  if (!domain) {
    notFound();
  }

  return (
    <CyberPageWrapper
      activeBadge={`DOMAIN // ${domain.name.toUpperCase()}`}
      title={domain.name}
      subtitle={domain.description}
    >
      {/* Breadcrumb & Top Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-400">
          <Link href="/" className="hover:text-cyan-300">
            HOME
          </Link>
          <span>/</span>
          <Link href="/events" className="hover:text-cyan-300">
            EVENTS
          </Link>
          <span>/</span>
          <span className="text-cyan-300 font-bold">{domain.name}</span>
        </div>

        <div className="flex items-center gap-3 text-neutral-400">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
            {domain.events.length} COMPETITIONS
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold">
            16—17 OCT 2026
          </span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {domain.events.map((ev, idx) => (
          <div
            key={ev.eventCode}
            className="cyber-card flex flex-col justify-between overflow-hidden group"
          >
            <div className="cyber-card-glow" />

            {/* Event Header Banner */}
            <div className="relative w-full h-48 overflow-hidden bg-black/50">
              {ev.image ? (
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-950/40 to-black/80 flex items-center justify-center font-mono text-xs text-neutral-500">
                  TECHFEST&apos;26 ARENA
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-transparent to-black/50" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-white font-mono text-[10px] backdrop-blur-xs">
                EV // {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] backdrop-blur-xs font-bold">
                {ev.isGroupEvent ? `Team (1—${ev.maxTeamSize})` : "Solo Entry"}
              </div>
            </div>

            {/* Event Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                  {ev.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 font-mono">
                  {ev.description}
                </p>
              </div>

              {/* Event Metadata (Date, Timing, Venue) */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400">
                <div>
                  <span className="text-cyan-400/70 block uppercase">DATE</span>
                  <span className="text-white">16—17 OCT 2026</span>
                </div>
                <div>
                  <span className="text-cyan-400/70 block uppercase">VENUE</span>
                  <span className="text-white">SLIET LONGOWAL</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                <Link
                  href={`/events/${domain.url}/${ev.eventCode}`}
                  className="text-neutral-300 hover:text-cyan-300 underline underline-offset-4 py-1"
                >
                  DETAILS →
                </Link>

                {ev.external && (
                  <a
                    href={ev.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>REGISTER</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CyberPageWrapper>
  );
}

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
  const params: { domain: string; event: string }[] = [];

  for (const domain of domains) {
    for (const ev of domain.events) {
      params.push({
        domain: domain.url,
        event: ev.eventCode,
      });
    }
  }

  return params;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ domain: string; event: string }>;
}) {
  const resolvedParams = await params;
  const { domain: domainSlug, event: eventSlug } = resolvedParams;

  const domains = officialEventsData as DomainItem[];
  const domain = domains.find((d) => d.url === domainSlug);
  if (!domain) notFound();

  const ev = domain.events.find((e) => e.eventCode === eventSlug);
  if (!ev) notFound();

  return (
    <CyberPageWrapper
      activeBadge={`${domain.name.toUpperCase()} // TRACK`}
      title={ev.title}
      subtitle={ev.description}
    >
      {/* Breadcrumb */}
      <div className="mb-10 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 border-b border-cyan-500/20 pb-4">
        <Link href="/" className="hover:text-cyan-300">
          HOME
        </Link>
        <span>/</span>
        <Link href="/events" className="hover:text-cyan-300">
          EVENTS
        </Link>
        <span>/</span>
        <Link href={`/events/${domain.url}`} className="hover:text-cyan-300">
          {domain.name}
        </Link>
        <span>/</span>
        <span className="text-cyan-300 font-bold">{ev.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Event Media & Comprehensive Overview */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Media Banner */}
          <div className="cyber-card overflow-hidden">
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-black/60">
              {ev.headerDesktop || ev.image ? (
                <img
                  src={ev.headerDesktop || ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-950/40 to-[#061226] flex items-center justify-center font-mono text-sm text-neutral-500">
                  TECHFEST&apos;26 OFFICIAL ARENA
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061226] via-transparent to-black/40" />

              {/* Quick Floating Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs backdrop-blur-md font-bold">
                  {domain.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white font-mono text-xs backdrop-blur-md">
                  {ev.isGroupEvent ? `Team (1—${ev.maxTeamSize} Members)` : "Individual / Solo"}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="cyber-card p-6 sm:p-8 space-y-4">
            <div className="cyber-card-glow" />
            <h2 className="text-lg sm:text-xl font-bold font-mono tracking-wider text-cyan-300 uppercase">
              // ARENA MISSION & OBJECTIVE
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              {ev.description}
            </p>
          </div>

          {/* Rules & Guidelines */}
          <div className="cyber-card p-6 sm:p-8 space-y-4">
            <div className="cyber-card-glow" />
            <h2 className="text-lg sm:text-xl font-bold font-mono tracking-wider text-cyan-300 uppercase">
              // GENERAL RULES & ELIGIBILITY
            </h2>
            <ul className="space-y-3 text-sm text-neutral-300 font-mono">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">01.</span>
                <span>All registered undergraduate, postgraduate, and diploma students with a valid college ID card are eligible to participate.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">02.</span>
                <span>
                  {ev.isGroupEvent
                    ? `Teams may consist of 1 to ${ev.maxTeamSize} members. Cross-college teams are permitted.`
                    : "This is an individual competition track."}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">03.</span>
                <span>Any form of plagiarism, unauthorized third-party aid, or unsporting conduct will lead to immediate disqualification.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">04.</span>
                <span>Decisions taken by the event judges and faculty coordinators are absolute, final, and binding on all participants.</span>
              </li>
            </ul>
          </div>

          {/* Problem Statement Section if available */}
          {ev.psLink && (
            <div className="cyber-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="cyber-card-glow" />
              <div>
                <h3 className="text-base font-bold font-mono text-white uppercase">
                  OFFICIAL PROBLEM STATEMENT AVAILABLE
                </h3>
                <p className="text-xs text-neutral-300 font-mono">
                  Download the technical rulebook and challenge documentation.
                </p>
              </div>
              <a
                href={ev.psLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn-primary shrink-0"
              >
                <span>DOWNLOAD PS</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Key Details & Registration Action Box */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="cyber-card p-6 space-y-6">
            <div className="cyber-card-glow" />
            <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase border-b border-cyan-500/20 pb-3">
              // COMPETITION TELEMETRY
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500">DATES</span>
                <span className="text-white font-semibold">16—17 OCT 2026</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500">TIMING</span>
                <span className="text-white font-semibold">SCHEDULE TBA</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500">VENUE</span>
                <span className="text-white font-semibold">SLIET LONGOWAL</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500">TEAM SIZE</span>
                <span className="text-white font-semibold">
                  {ev.isGroupEvent ? `1 to ${ev.maxTeamSize} Members` : "Solo Entry"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-500">CERTIFICATION</span>
                <span className="text-cyan-300 font-semibold">OFFICIAL SLIET & UNSTOP</span>
              </div>
            </div>

            {/* Registration Action */}
            <div className="space-y-3 pt-2">
              {ev.external ? (
                <a
                  href={ev.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-primary w-full text-center"
                >
                  <span>REGISTER ON UNSTOP</span>
                  <span>↗</span>
                </a>
              ) : (
                <Link
                  href="/package"
                  className="cyber-btn-primary w-full text-center"
                >
                  GET ALL-ACCESS PASS
                </Link>
              )}

              <Link
                href="/package"
                className="cyber-btn-outline w-full text-center"
              >
                VIEW FEST PACKAGES (₹299 / ₹599)
              </Link>
            </div>
          </div>

          {/* Quick Domain Navigator */}
          <div className="cyber-card p-5 space-y-3">
            <span className="text-[10px] font-mono tracking-wider text-cyan-400/80 uppercase block">
              MORE IN {domain.name.toUpperCase()}
            </span>
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {domain.events
                .filter((e) => e.eventCode !== ev.eventCode)
                .slice(0, 5)
                .map((other) => (
                  <Link
                    key={other.eventCode}
                    href={`/events/${domain.url}/${other.eventCode}`}
                    className="p-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-cyan-300 transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">{other.title}</span>
                    <span className="text-neutral-600 text-[10px]">→</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </CyberPageWrapper>
  );
}

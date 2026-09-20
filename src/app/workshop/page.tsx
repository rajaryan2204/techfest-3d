"use client";

import React from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import { WORKSHOPS_DATA } from "@/data/festData";

export default function WorkshopPage() {
  return (
    <CyberPageWrapper
      activeBadge="HANDS-ON BOOTCAMPS"
      title="TECHNICAL WORKSHOPS"
      subtitle="Intensive, industry-certified masterclasses and hands-on laboratory sessions conducted during TechFEST'26 on 16—17 October 2026."
    >
      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {WORKSHOPS_DATA.map((ws, idx) => (
          <div
            key={ws.id}
            className="cyber-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
          >
            <div className="cyber-card-glow" />

            <div className="space-y-4">
              {/* Header Meta */}
              <div className="flex items-center justify-between gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold uppercase">
                  WORKSHOP // 0{idx + 1}
                </span>
                <span className="text-neutral-400">{ws.duration}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                {ws.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {ws.description}
              </p>

              {/* Workshop Telemetry */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-400">
                <div>
                  <span className="text-cyan-400/70 block text-[10px] uppercase">INSTRUCTOR</span>
                  <span className="text-white font-medium">{ws.instructor}</span>
                </div>
                <div>
                  <span className="text-cyan-400/70 block text-[10px] uppercase">DATE & TIME</span>
                  <span className="text-cyan-300 font-medium">{ws.date}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-cyan-400/70 block text-[10px] uppercase">VENUE</span>
                  <span className="text-white font-medium">{ws.venue}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
              <span className="text-[11px] text-neutral-400">
                CERTIFICATE INCLUDED
              </span>

              <Link
                href="/package"
                className="cyber-btn-primary w-full sm:w-auto text-center"
              >
                ENROLL VIA PASS →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Workshop Registration Notice */}
      <div className="cyber-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="cyber-card-glow" />
        <div className="space-y-1">
          <h3 className="text-base font-bold font-mono text-white uppercase">
            WORKSHOPS ARE INCLUDED IN ALL-ACCESS PASSES
          </h3>
          <p className="text-xs text-neutral-300 font-mono">
            Grab a TechFEST All-Access pass (₹299 standard or ₹599 with hostel stay) to enter all workshops and competitions.
          </p>
        </div>
        <Link
          href="/package"
          className="cyber-btn-primary shrink-0 text-center"
        >
          VIEW PASS OPTIONS →
        </Link>
      </div>
    </CyberPageWrapper>
  );
}

"use client";

import React from "react";
import { FEST_DATA } from "@/data/festData";

export default function ContactSection() {
  return (
    <section className="relative z-20 w-full min-h-screen flex items-center py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-white font-sans">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Communications */}
        <div className="lg:col-span-6 space-y-8">
          <span className="text-[11px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
            COMMUNICATIONS // REACH US
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
            Connect With <br />
            <span className="text-neutral-400 font-light">The Coordinators</span>
          </h2>

          <div className="w-16 h-px bg-white/20" />

          {/* Coordinators List */}
          <div className="space-y-6 pt-2">
            {FEST_DATA.contacts.map((contact, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                  {contact.role}
                </span>
                <p className="text-base sm:text-lg font-light text-white">
                  {contact.name}
                </p>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-xs font-mono text-neutral-400 hover:text-cyan-300 transition-colors inline-block pt-0.5"
                >
                  {contact.phone}
                </a>
              </div>
            ))}

            {/* Email */}
            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                OFFICIAL INQUIRIES & PARTNERSHIPS
              </span>
              <a
                href={`mailto:${FEST_DATA.email}`}
                className="text-sm font-mono text-white hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                {FEST_DATA.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Campus Location & Connectivity */}
        <div className="lg:col-span-6 space-y-8 lg:pt-14">
          <div className="p-6 sm:p-8 bg-[#0a0a0d] border border-white/10 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                INSTITUTE CAMPUS VENUE
              </span>
              <h3 className="text-lg sm:text-xl font-light text-white">
                {FEST_DATA.institution}
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                {FEST_DATA.location}
              </p>
            </div>

            {/* Transit details */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                // TRAVEL & CONNECTIVITY
              </span>
              <div className="space-y-2.5 text-xs text-neutral-300 font-light">
                {FEST_DATA.transit.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-neutral-500 font-mono text-[10px] uppercase w-14 shrink-0 pt-0.5">
                      {t.type}
                    </span>
                    <span className="text-neutral-300">{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                // OFFICIAL SOCIAL CHANNELS
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-mono tracking-wider text-neutral-400 pt-1">
                {FEST_DATA.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";
import { FEST_DATA } from "@/data/festData";

export default function ReachUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Event Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "Event Inquiry", message: "" });
    }, 4000);
  };

  return (
    <CyberPageWrapper
      activeBadge="TRANSIT & HELPDESK"
      title="REACH US & CAMPUS NAVIGATION"
      subtitle="Complete transit guide, rail/air connections, campus shuttle schedules, and official inquiry helpdesk for TechFEST'26 SLIET."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start mb-16">
        {/* Left Column: Transit Modes */}
        <div className="lg:col-span-7 space-y-8">
          {/* By Train */}
          <div className="cyber-card p-6 sm:p-8 space-y-4">
            <div className="cyber-card-glow" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-lg">
                🚆
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono text-white uppercase">
                  BY RAILWAY (NEAREST STATIONS)
                </h2>
                <span className="text-xs text-neutral-400 font-mono">
                  Direct express connections to Northern Railway
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-neutral-300 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-cyan-300 font-bold block">SANGRUR (SAG)</span>
                <p className="text-neutral-400">18 km from campus. Direct auto/bus & festival shuttles.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-cyan-300 font-bold block">SUNAM (SFM)</span>
                <p className="text-neutral-400">16 km from campus. Regular local transit available.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-cyan-300 font-bold block">DHURI JUNCTION (DUI)</span>
                <p className="text-neutral-400">32 km from campus. Major railway junction with express trains.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-cyan-300 font-bold block">LUDHIANA (LDH) / PATIALA</span>
                <p className="text-neutral-400">100 km & 80 km. Connected via express highway buses.</p>
              </div>
            </div>
          </div>

          {/* By Air & Road */}
          <div className="cyber-card p-6 sm:p-8 space-y-4">
            <div className="cyber-card-glow" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-lg">
                ✈️
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono text-white uppercase">
                  BY AIR & HIGHWAYS
                </h2>
                <span className="text-xs text-neutral-400 font-mono">
                  Domestic & International Airport Hubs
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-neutral-300 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                <span>Chandigarh International Airport (IXC)</span>
                <span className="text-cyan-300 font-semibold">145 KM</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                <span>Amritsar International Airport (ATQ)</span>
                <span className="text-cyan-300 font-semibold">210 KM</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                <span>New Delhi IGI Airport (DEL)</span>
                <span className="text-cyan-300 font-semibold">280 KM</span>
              </div>
            </div>
          </div>

          {/* Campus Shuttle Notice */}
          <div className="cyber-card p-6 space-y-2 font-mono">
            <div className="cyber-card-glow" />
            <span className="text-[10px] tracking-widest text-cyan-300 uppercase block font-semibold">
              // FESTIVAL BUS SHUTTLES
            </span>
            <h3 className="text-base font-bold text-white uppercase">
              SANGRUR RAILWAY STATION ⇄ SLIET CAMPUS
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Dedicated SLIET TechFEST bus shuttles will be operating between Sangrur Railway Station and the campus main gate on 16th and 17th October 2026. Look for TechFEST helpdesk volunteers at Sangrur platform 1.
            </p>
          </div>
        </div>

        {/* Right Column: Contact & Inquiry Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card p-6 sm:p-8 space-y-6">
            <div className="cyber-card-glow" />
            <div className="space-y-1 border-b border-cyan-500/20 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                // GET IN TOUCH
              </span>
              <h2 className="text-xl font-bold font-mono text-white uppercase">
                SEND AN INQUIRY
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-mono text-xs space-y-2">
                <p className="font-bold text-sm">✓ MESSAGE TRANSMITTED SUCCESSFULLY</p>
                <p className="text-neutral-300">
                  Our coordinator team will respond to your registered email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase">NAME *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="cyber-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase">EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="cyber-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase">SUBJECT *</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="cyber-input cursor-pointer"
                  >
                    <option value="Event Inquiry">Competition / Event Inquiry</option>
                    <option value="Accommodation Query">Hostel / Accommodation Query</option>
                    <option value="Sponsorship Collaboration">Sponsorship & Partnership</option>
                    <option value="General Query">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase">MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can our team help you?"
                    className="cyber-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="cyber-btn-primary w-full text-center"
                >
                  TRANSMIT MESSAGE →
                </button>
              </form>
            )}

            {/* Direct Contacts */}
            <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-neutral-400">
              <span className="text-[10px] text-cyan-400/80 block uppercase">COORDINATOR CONTACTS:</span>
              <p className="text-white">Shubham Kumar Singh: <a href="tel:+919771174465" className="text-cyan-300 hover:underline">+91 97711-74465</a></p>
              <p className="text-white">Naman Kumar Sinha: <a href="tel:+917856893952" className="text-cyan-300 hover:underline">+91 78568-93952</a></p>
              <p className="text-white">Email: <a href={`mailto:${FEST_DATA.email}`} className="text-cyan-300 hover:underline">{FEST_DATA.email}</a></p>
            </div>
          </div>
        </div>
      </div>
    </CyberPageWrapper>
  );
}

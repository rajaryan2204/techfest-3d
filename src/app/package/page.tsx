"use client";

import React from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

export default function PackagePage() {
  return (
    <CyberPageWrapper
      activeBadge="OFFICIAL DELEGATE PASSES"
      title="FESTIVAL PACKAGES & TICKETS"
      subtitle="Choose your TechFEST'26 delegate pass. Gain complete access to 61 competitions, technical workshops, exhibition zones, and celebrity pronites on 16—17 October 2026."
    >
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {/* Pass 1: With Accommodation */}
        <div className="cyber-card p-8 sm:p-10 flex flex-col justify-between space-y-8 group border-cyan-400 shadow-[0_0_40px_rgba(0,217,255,0.25)]">
          <div className="cyber-card-glow" />

          {/* Badge */}
          <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-cyan-400 text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-md">
            RECOMMENDED FOR OUTSTATION
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase block">
                FULL ACCESS + HOSTEL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
                WITH ACCOMMODATION
              </h2>
            </div>

            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-4xl sm:text-5xl font-black text-cyan-300">₹599</span>
              <span className="text-xs text-neutral-400 uppercase">/ PER DELEGATE</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Designed specifically for outstation engineering students travelling to the 451-acre SLIET Longowal campus. Includes secure 2-day on-campus hostel stay.
            </p>

            {/* Inclusions */}
            <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>2-Day On-Campus Hostel Stay (16—17 Oct 2026)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Access to all 61 competitions across 13 domains</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Access to all industry-certified workshops</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Entry to EDM Night, Star Concerts & Comedy Gala</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Campus Dining available at subsidized rate (@₹50/diet)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Official SLIET TechFEST&apos;26 Participation Certificate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Delegate Kit, ID Badge & Official Merchandise</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/package/register?type=accommodation"
              className="cyber-btn-primary w-full text-center"
            >
              <span>BOOK PASS WITH HOSTEL (₹599)</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Pass 2: Without Accommodation */}
        <div className="cyber-card p-8 sm:p-10 flex flex-col justify-between space-y-8 group">
          <div className="cyber-card-glow" />

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block">
                FESTIVAL ACCESS ONLY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
                WITHOUT ACCOMMODATION
              </h2>
            </div>

            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-4xl sm:text-5xl font-black text-white">₹299</span>
              <span className="text-xs text-neutral-400 uppercase">/ PER DELEGATE</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Ideal for day attendees, local students, or participants arranging external lodging in Sangrur, Sunam, or Longowal.
            </p>

            {/* Inclusions */}
            <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Access to all 61 competitions across 13 domains</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Access to technical workshops & masterclasses</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Entry to EDM Night, Star Concerts & Comedy Gala</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Official SLIET TechFEST&apos;26 Participation Certificate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Delegate Kit & ID Badge</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-500">
                <span>✕</span>
                <span>Hostel Accommodation Not Included</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/package/register?type=standard"
              className="cyber-btn-outline w-full text-center"
            >
              <span>BOOK STANDARD PASS (₹299)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Guidelines & FAQs regarding Accommodation */}
      <div className="max-w-5xl mx-auto cyber-card p-6 sm:p-8 space-y-6">
        <div className="cyber-card-glow" />
        <h3 className="text-base font-bold font-mono tracking-wider text-cyan-300 uppercase">
          // CAMPUS ACCOMMODATION GUIDELINES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-neutral-300">
          <div className="space-y-1.5">
            <span className="text-white font-bold block uppercase">CHECK-IN & CHECK-OUT</span>
            <p className="text-neutral-400 leading-relaxed">
              Check-in opens at 07:00 AM on 16th October 2026 at the SLIET Guest / Hostel Registration Desk. Check-out is by 12:00 PM on 18th October 2026.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-white font-bold block uppercase">MANDATORY IDENTIFICATION</span>
            <p className="text-neutral-400 leading-relaxed">
              A valid College/University ID card along with a government-issued photo ID (Aadhaar / Voter ID / Passport) is strictly required upon arrival.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-white font-bold block uppercase">MESS & FOOD CHARGES</span>
            <p className="text-neutral-400 leading-relaxed">
              Wholesome vegetarian breakfast, lunch, and dinner are served in the campus hostel messes at a subsidized rate of ₹50 per meal.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-white font-bold block uppercase">SECURITY & DISCIPLINE</span>
            <p className="text-neutral-400 leading-relaxed">
              The SLIET campus is under 24/7 CCTV surveillance and security supervision. Alcohol, narcotics, or any hazardous substances are strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </CyberPageWrapper>
  );
}

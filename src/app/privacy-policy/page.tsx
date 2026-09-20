"use client";

import React from "react";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

export default function PrivacyPolicyPage() {
  return (
    <CyberPageWrapper
      activeBadge="LEGAL POLICIES"
      title="PRIVACY POLICY"
      subtitle="Data protection and privacy guidelines for TechFEST'26 SLIET participants, attendees, and partners."
    >
      <div className="max-w-4xl mx-auto cyber-card p-8 sm:p-12 space-y-8 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed mb-16">
        <div className="cyber-card-glow" />
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            01. INFORMATION WE COLLECT
          </h2>
          <p>
            When registering for TechFEST&apos;26 at SLIET Longowal (online or on-spot), we collect necessary identifying details including your Full Name, Email Address, Phone Number, College/University Name, Student ID/Roll Number, and Branch of Study. For outstation participants requesting hostel accommodation, gender and identity verification details are collected for hostel security compliance.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            02. PURPOSE OF DATA UTILIZATION
          </h2>
          <p>
            The collected data is exclusively used for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-400">
            <li>Issuing official TechFEST&apos;26 delegate passes and entry QR credentials.</li>
            <li>Verification of student eligibility for competitions and workshops.</li>
            <li>Issuing official SLIET participation and merit certificates.</li>
            <li>Emergency communications and event scheduling notifications.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            03. DATA PROTECTION & SHARING
          </h2>
          <p>
            SLIET TechFEST does NOT sell, lease, or rent your personal information to third-party marketing entities. Information is only shared with authorized festival partners (such as Unstop for competition management) strictly for festival operational purposes.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            04. PHOTOGRAPHY & MEDIA NOTICE
          </h2>
          <p>
            TechFEST&apos;26 is a public collegiate technical festival. By attending, participants consent to being photographed and video-recorded for official SLIET press releases, festival highlight reels, and institutional archives.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-neutral-500 text-[11px]">
          Last updated: September 2026 // Sant Longowal Institute of Engineering & Technology (SLIET)
        </div>
      </div>
    </CyberPageWrapper>
  );
}

"use client";

import React from "react";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

export default function TermsPage() {
  return (
    <CyberPageWrapper
      activeBadge="CODE OF CONDUCT"
      title="TERMS & CONDITIONS"
      subtitle="Official rules, code of conduct, and participation guidelines governing all attendees of TechFEST'26 SLIET."
    >
      <div className="max-w-4xl mx-auto cyber-card p-8 sm:p-12 space-y-8 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed mb-16">
        <div className="cyber-card-glow" />
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            01. ELIGIBILITY & IDENTIFICATION
          </h2>
          <p>
            Participation is open to all enrolled students of recognized colleges, universities, polytechnics, and schools. A valid institution ID card is mandatory at the time of entry and competition reporting. Failure to present authentic student identification will result in denial of access without refund.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            02. CODE OF CONDUCT & CAMPUS DISCIPLINE
          </h2>
          <p>
            SLIET Longowal is a smoke-free, alcohol-free, and drug-free academic campus. Any attendee found in possession of or under the influence of illicit substances, alcohol, or involved in unruly behavior, ragging, or vandalism will face immediate expulsion, forfeiture of passes, and formal disciplinary action reported to their parent institution and local authorities.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            03. COMPETITION INTEGRITY & JUDGING
          </h2>
          <p>
            Participants must strictly abide by the rules and timeframes prescribed for each of the 61 competitions. Plagiarism, unauthorized code generation, pre-built models (unless explicitly permitted in specific tracks), or tampering with competition hardware will result in automatic disqualification. The decisions of the judging committees and faculty coordinators are absolute and final.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white uppercase text-cyan-300">
            04. PASS CANCELLATION & REFUNDS
          </h2>
          <p>
            Delegate passes (With Accommodation ₹599 and Standard ₹299) are non-refundable and non-transferable once issued, as resources and hostel bed allocations are committed in advance.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-neutral-500 text-[11px]">
          Official Terms // TechFEST&apos;26 Central Organizing Committee // SLIET Longowal
        </div>
      </div>
    </CyberPageWrapper>
  );
}

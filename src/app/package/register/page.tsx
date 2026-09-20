"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

function PassRegistrationForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "accommodation" ? "accommodation" : "standard";

  const [passType, setPassType] = useState<"accommodation" | "standard">(initialType);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    rollNo: "",
    branch: "",
    year: "3rd Year",
    gender: "Male",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passConfirmed, setPassConfirmed] = useState<boolean>(false);
  const [delegateId, setDelegateId] = useState<string>("");

  useEffect(() => {
    if (searchParams.get("type") === "accommodation") {
      setPassType("accommodation");
    } else if (searchParams.get("type") === "standard") {
      setPassType("standard");
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = "TF26-" + Math.floor(100000 + Math.random() * 900000);
      setDelegateId(randomId);
      setIsSubmitting(false);
      setPassConfirmed(true);
    }, 1200);
  };

  const amount = passType === "accommodation" ? 599 : 299;

  return (
    <CyberPageWrapper
      activeBadge="REGISTRATION DESK"
      title="DELEGATE PASS REGISTRATION"
      subtitle="Complete your registration to secure your official TechFEST'26 delegate credentials and festival pass."
    >
      {passConfirmed ? (
        /* Confirmed Cyber Pass View */
        <div className="max-w-2xl mx-auto cyber-card p-8 sm:p-12 space-y-8 animate-in zoom-in-95 duration-500 border-cyan-400 shadow-[0_0_50px_rgba(0,217,255,0.3)]">
          <div className="cyber-card-glow" />
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase">
                // OFFICIAL FESTIVAL PASS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
                TECHFEST&apos;26 SLIET
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold uppercase">
              CONFIRMED
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">DELEGATE ID</span>
              <span className="text-cyan-300 font-bold text-sm sm:text-base">{delegateId}</span>
            </div>
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">DELEGATE NAME</span>
              <span className="text-white font-semibold">{formData.fullName || "Student Delegate"}</span>
            </div>
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">PASS TIER</span>
              <span className="text-cyan-300 font-semibold uppercase">
                {passType === "accommodation" ? "With Hostel (₹599)" : "Standard (₹299)"}
              </span>
            </div>
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">INSTITUTION</span>
              <span className="text-white font-semibold truncate block">{formData.college || "SLIET / CFTI"}</span>
            </div>
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">STUDENT ID</span>
              <span className="text-white font-semibold">{formData.rollNo || "TF26-REG"}</span>
            </div>
            <div>
              <span className="text-cyan-400/70 block text-[10px] uppercase">VALIDITY</span>
              <span className="text-emerald-400 font-semibold">16—17 OCT 2026</span>
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
            <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
              {/* SVG QR Code Simulation */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="currentColor">
                <rect width="30" height="30" />
                <rect x="70" width="30" height="30" />
                <rect y="70" width="30" height="30" />
                <rect x="10" y="10" width="10" height="10" fill="white" />
                <rect x="80" y="10" width="10" height="10" fill="white" />
                <rect x="10" y="80" width="10" height="10" fill="white" />
                <rect x="40" y="10" width="20" height="10" />
                <rect x="40" y="30" width="10" height="20" />
                <rect x="60" y="40" width="30" height="10" />
                <rect x="40" y="70" width="20" height="20" />
                <rect x="70" y="70" width="10" height="20" />
              </svg>
            </div>
            <div className="space-y-1 text-center sm:text-left text-xs text-neutral-300">
              <p className="text-white font-bold uppercase">SCAN AT CAMPUS ENTRY DESK</p>
              <p className="text-[11px] text-neutral-400">
                Present this digital QR code along with your College ID card at the SLIET Main Entrance on 16th October 2026.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <button
              onClick={() => window.print()}
              className="cyber-btn-primary w-full sm:w-auto"
            >
              PRINT / SAVE PASS (PDF)
            </button>
            <Link
              href="/events"
              className="cyber-btn-outline w-full sm:w-auto"
            >
              EXPLORE EVENTS →
            </Link>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <div className="max-w-3xl mx-auto cyber-card p-6 sm:p-10 space-y-8">
          <div className="cyber-card-glow" />

          {/* Pass Type Selector Tabs */}
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block">
              // SELECT YOUR PASS TIER
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPassType("accommodation")}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  passType === "accommodation"
                    ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs font-bold text-white uppercase">
                    WITH ACCOMMODATION
                  </span>
                  <span className="font-mono text-sm font-black text-cyan-300">₹599</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans">
                  2-Day on-campus hostel stay + All events & workshops access
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPassType("standard")}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  passType === "standard"
                    ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs font-bold text-white uppercase">
                    WITHOUT ACCOMMODATION
                  </span>
                  <span className="font-mono text-sm font-black text-white">₹299</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Complete festival entry + All events & workshops access
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">FULL NAME *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aryan Sharma"
                  className="cyber-input"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. aryan@college.edu"
                  className="cyber-input"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">PHONE NUMBER *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="cyber-input"
                />
              </div>

              {/* College */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">COLLEGE / INSTITUTION *</label>
                <input
                  type="text"
                  name="college"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. SLIET Longowal / IIT / NIT"
                  className="cyber-input"
                />
              </div>

              {/* Roll No */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">STUDENT ID / ROLL NO *</label>
                <input
                  type="text"
                  name="rollNo"
                  required
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g. GCS/2240012"
                  className="cyber-input"
                />
              </div>

              {/* Branch */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">BRANCH / DISCIPLINE *</label>
                <input
                  type="text"
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science / Mechanical"
                  className="cyber-input"
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-neutral-300 uppercase">YEAR OF STUDY</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="cyber-input cursor-pointer"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate/Diploma">Postgraduate / Diploma</option>
                </select>
              </div>

              {/* Gender */}
              {passType === "accommodation" && (
                <div className="space-y-2">
                  <label className="text-neutral-300 uppercase">GENDER (FOR HOSTEL BLOCK) *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="cyber-input cursor-pointer"
                  >
                    <option value="Male">Male (Boys Hostel Block)</option>
                    <option value="Female">Female (Girls Hostel Block)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Total Payable Summary */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-center justify-between font-mono">
              <span className="text-xs text-neutral-400 uppercase">TOTAL PAYABLE AMOUNT:</span>
              <span className="text-2xl font-black text-cyan-300">₹{amount}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cyber-btn-primary w-full text-center"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>PROCESSING REGISTRATION...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM & SECURE PASS (₹{amount})</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </CyberPageWrapper>
  );
}

export default function PassRegistrationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white font-mono">Loading Registration...</div>}>
      <PassRegistrationForm />
    </Suspense>
  );
}

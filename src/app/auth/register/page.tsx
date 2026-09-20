"use client";

import React, { useState } from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <CyberPageWrapper
      activeBadge="CREATE ACCOUNT"
      title="DELEGATE REGISTRATION"
      subtitle="Register an official TechFEST'26 account to book festival passes, register teams for 61 competitions, and download participation certificates."
    >
      <div className="max-w-xl mx-auto cyber-card p-8 sm:p-10 space-y-6 mb-16">
        <div className="cyber-card-glow" />
        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 font-mono">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-white uppercase">
              ACCOUNT CREATED SUCCESSFULLY
            </h3>
            <p className="text-xs text-neutral-300">
              Welcome to TechFEST&apos;26! Now select your festival pass to complete registration.
            </p>
            <div className="pt-2">
              <Link
                href="/package"
                className="cyber-btn-primary"
              >
                CHOOSE FESTIVAL PASS (₹299 / ₹599) →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase">FULL NAME *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aryan Sharma"
                className="cyber-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aryan@college.edu"
                  className="cyber-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase">PHONE NUMBER *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="cyber-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase">COLLEGE / INSTITUTION NAME *</label>
              <input
                type="text"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. SLIET Longowal / IIT / NIT / Thapar"
                className="cyber-input"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase">CREATE PASSWORD *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                className="cyber-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-btn-primary w-full text-center mt-4"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <span>REGISTER DELEGATE ACCOUNT →</span>
              )}
            </button>

            <div className="text-center pt-4 border-t border-white/10 text-neutral-400 text-xs">
              Already registered?{" "}
              <Link href="/auth/login" className="text-cyan-300 font-bold hover:underline">
                SIGN IN HERE
              </Link>
            </div>
          </form>
        )}
      </div>
    </CyberPageWrapper>
  );
}

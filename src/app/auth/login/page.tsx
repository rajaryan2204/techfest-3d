"use client";

import React, { useState } from "react";
import Link from "next/link";
import CyberPageWrapper from "@/components/layout/CyberPageWrapper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <CyberPageWrapper
      activeBadge="DELEGATE PORTAL"
      title="SIGN IN TO TECHFEST'26"
      subtitle="Access your registered competitions, festival passes, certificates, and schedule."
    >
      <div className="max-w-md mx-auto cyber-card p-8 sm:p-10 space-y-6 mb-16">
        <div className="cyber-card-glow" />
        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 font-mono">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-white uppercase">
              AUTHENTICATION SUCCESSFUL
            </h3>
            <p className="text-xs text-neutral-300">
              Welcome back to TechFEST&apos;26! Redirecting to delegate portal...
            </p>
            <div className="pt-2">
              <Link
                href="/package"
                className="cyber-btn-primary"
              >
                VIEW YOUR PASSES →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 uppercase">EMAIL OR DELEGATE ID *</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu or TF26-XXXXX"
                className="cyber-input"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-neutral-300 uppercase">PASSWORD *</label>
                <a href="#" className="text-cyan-400 text-[10px] hover:underline">
                  FORGOT?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="cyber-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-btn-primary w-full text-center"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>SIGN IN →</span>
              )}
            </button>

            <div className="text-center pt-4 border-t border-white/10 text-neutral-400 text-xs">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-cyan-300 font-bold hover:underline">
                CREATE ONE HERE
              </Link>
            </div>
          </form>
        )}
      </div>
    </CyberPageWrapper>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function GlobalExternalRedirect() {
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(5.0);

  // Global Link Interceptor for any external URL
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip tel:, mailto:, internal anchors, and internal paths
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/')) {
        return;
      }

      // Check if external http/https link
      const isHttp = href.startsWith('http://') || href.startsWith('https://');
      if (!isHttp) return;

      const currentOrigin = window.location.origin;
      const isSameOrigin = href.startsWith(currentOrigin) || href.includes('techfest26.com') || href.includes('techfestsliet.com');

      if (!isSameOrigin) {
        e.preventDefault();
        e.stopPropagation();
        setTargetUrl(href);
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  const handleProceed = () => {
    if (!targetUrl) return;
    const urlToOpen = targetUrl;
    setTargetUrl(null);
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setTargetUrl(null);
  };

  // 5-second countdown timer
  useEffect(() => {
    if (!targetUrl) {
      setTimeLeft(5.0);
      return;
    }

    setTimeLeft(5.0);
    const stepMs = 50;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - stepMs / 1000;
        if (next <= 0) {
          clearInterval(interval);
          handleProceed();
          return 0;
        }
        return next;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [targetUrl]);

  // Keyboard shortcut: Escape to abort
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && targetUrl) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetUrl]);

  if (!targetUrl) return null;

  const progressPercent = Math.max(0, Math.min(100, (timeLeft / 5.0) * 100));

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 Candara select-none">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Cyber HUD Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0a0a0d] border border-white/25 p-7 sm:p-9 shadow-[0_0_80px_rgba(0,0,0,0.95)] text-white">
        
        {/* 4 Architectural Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0CC7F8]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#0CC7F8]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#0CC7F8]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#0CC7F8]" />

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-xs tracking-wider text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0CC7F8] animate-ping" />
            <span className="text-white font-bold tracking-widest uppercase">
              techFEST &apos;26 // GATEWAY
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-white px-2 py-0.5 rounded border border-white/10 hover:border-white/40 transition-colors cursor-pointer"
          >
            [ ESC / CLOSE ✕ ]
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center text-center mt-6 space-y-4">
          
          {/* Fest Logo / Icon Badge */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/20 shadow-inner">
            <Image
              src="/logo/techfest.webp"
              alt="techFEST"
              width={48}
              height={48}
              className="w-10 h-auto object-contain"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#0CC7F8] tracking-[0.2em] uppercase font-semibold">{"//EXTERNAL REDIRECT INITIATED"}</span>
            <h2 className="text-2xl sm:text-3xl font-bold italic tracking-wide text-white">
              Leaving SLIET techFEST
            </h2>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Opening external link in a new tab in{" "}
              <strong className="text-[#0CC7F8] font-mono text-lg font-bold">
                {Math.ceil(timeLeft)}s
              </strong>
            </p>
          </div>

          {/* High-Tech Countdown Progress Bar */}
          <div className="w-full space-y-2 pt-2">
            <div className="w-full h-2.5 bg-white/10 border border-white/20 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#002C07] via-[#0CC7F8] to-[#0CC7F8] transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(12,199,248,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                OPENING IN NEW TAB
              </span>
              <span className="text-[#0CC7F8] font-semibold">
                {timeLeft.toFixed(1)}s REMAINING
              </span>
            </div>
          </div>

          {/* Destination URL Terminal Card */}
          {targetUrl && (
            <div className="w-full bg-black/60 border border-white/10 p-3 text-left font-mono text-xs">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>DESTINATION TARGET:</span>
                <span className="text-emerald-400">VERIFIED EXTERNAL LINK</span>
              </div>
              <p className="text-neutral-200 truncate font-mono select-all" title={targetUrl}>
                &gt; {targetUrl}
              </p>
            </div>
          )}

          {/* Authentic Theme Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleProceed}
              className="flex-1 py-3 px-6 bg-[#002C07] hover:bg-[#004d10] text-white border border-[#0CC7F8]/40 hover:border-[#0CC7F8] font-bold italic text-base tracking-wide transition-all shadow-[0_0_20px_rgba(0,44,7,0.8)] hover:shadow-[0_0_25px_rgba(12,199,248,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Click Now (Open New Tab)</span>
              <span className="font-mono text-sm not-italic">↗</span>
            </button>

            <button
              onClick={handleClose}
              className="py-3 px-5 border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
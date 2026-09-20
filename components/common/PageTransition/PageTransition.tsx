"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import './pageTransition.css';

export default function PageTransition() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [targetPath, setTargetPath] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Animated TV Noise Generator on Canvas for 60fps lightweight static
  useEffect(() => {
    if (!isActive) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = Math.min(window.innerWidth / 2, 400);
    canvas.height = Math.min(window.innerHeight / 2, 250);

    const imgData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(imgData.data.buffer);

    const renderNoise = () => {
      const len = buffer.length;
      for (let i = 0; i < len; i++) {
        // Random grayscale noise with alpha
        const val = Math.random() < 0.5 ? (Math.random() * 80 + 20) : (Math.random() * 200 + 40);
        buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }
      ctx.putImageData(imgData, 0, 0);
      animFrameRef.current = requestAnimationFrame(renderNoise);
    };

    renderNoise();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive]);

  // Hook into Next.js Route Changes
  useEffect(() => {
    const handleStart = (url: string) => {
      // Don't trigger transition if clicking same page or hash link
      if (url === router.asPath || url.startsWith('#')) return;

      setTargetPath(url.split('?')[0]);
      setIsActive(true);

      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, ease: 'power2.out' }
        );
      }
    };

    const handleComplete = () => {
      // Instant dismissal on page load completion (near zero duration)
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.08,
          ease: 'power2.out',
          onComplete: () => {
            setIsActive(false);
          }
        });
      } else {
        setIsActive(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="network-transition fixed inset-0 z-[99999] bg-[#070709] text-white flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
    >
      {/* Dynamic TV Noise Layer */}
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
      />

      {/* Retro CRT Scanlines */}
      <div className="transition-scanlines absolute inset-0 pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex items-center justify-between w-full font-mono text-xs sm:text-sm tracking-widest text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0CC7F8] animate-ping" />
          <span className="uppercase text-white font-medium">{"//NETWORK ROUTE BUFFER"}</span>
        </div>
        <div className="px-3 py-1 bg-blue-600/90 text-white font-bold text-xs tracking-wider border border-white/20 shadow-[0_0_15px_rgba(0,60,255,0.6)]">
          NO SIGNAL
        </div>
      </div>

      {/* Center Network Buffering Telemetry (hle.io style) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-4">
        <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-400/40 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(12,199,248,0.25)]">
          <div className="w-2 h-2 rounded-full bg-[#0CC7F8] animate-pulse" />
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#0CC7F8] uppercase">
            SYNCING FREQUENCY
          </span>
        </div>

        <h2 className="text-2xl sm:text-5xl md:text-6xl font-light font-mono tracking-tight text-white uppercase">
          BUFFERING ROUTE
        </h2>

        {targetPath && (
          <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 bg-white/5 px-4 py-1.5 rounded border border-white/10">
            REQUESTING &gt;&gt; <span className="text-white font-semibold">{targetPath}</span>
          </p>
        )}
      </div>

      {/* Bottom Beam Progress Bar */}
      <div className="relative z-10 w-full flex flex-col gap-2 font-mono text-xs text-neutral-400">
        <div className="flex items-center justify-between tracking-wider text-[11px]">
          <span>FREQ: 433.92 MHz // 60 FPS</span>
          <span className="text-[#0CC7F8] animate-pulse">ACQUIRING SIGNAL...</span>
        </div>

        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
          <div className="transition-beam absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#0CC7F8] to-transparent" />
        </div>
      </div>
    </div>
  );
}
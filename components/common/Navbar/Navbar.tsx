"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PassNotificationBell from './PassNotificationBell';
import { BROCHURE_DRIVE_LINK } from "@/lib/constants";

// --- Mobile Navbar Hook for Scroll Detection ---
const useMobileNavbarScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [, setIsScrollingDown] = useState(false);
  const [, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      setIsAtTop(currentScrollY < 50);
      
      if (scrollDelta > 5) {
        setIsScrollingDown(true);
        setIsVisible(false);
      } else if (scrollDelta < -5) {
        setIsScrollingDown(false);
        setIsVisible(true);
      }
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        if (currentScrollY < 50) {
          setIsVisible(true);
        }
      }, 150);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return { isVisible };
};

// --- Main Navbar Component ---
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleNavbar = () => setIsActive(!isActive);
  const { isVisible } = useMobileNavbarScroll();

  return (
    <header 
      className={`
        flex flex-col w-full h-auto fixed justify-between items-center z-[50] shadow-md backdrop-blur-[28px] bg-[#020817]/85 border-b border-cyan-500/20 Candara
        md:translate-y-0 md:opacity-100
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className='w-full h-auto py-3.5 flex items-center justify-center shadow'>
        <div className='w-11/12 h-auto flex flex-row md:gap-0 gap-6 justify-between items-center relative font-medium text-white'>

          {/* Brand / Logo */}
          <Link href='/' className='cursor-pointer flex items-center gap-3 group'>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14.5L18 21.5L12 17.5L6 21.5L7.5 14.5L2.5 9.5L9.5 8.5L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase font-mono group-hover:text-cyan-300 transition-colors">
                TECHFEST&apos;26
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-cyan-400/80 uppercase font-mono">
                SLIET LONGOWAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className='flex md:flex-row flex-col md:gap-8 gap-4 items-center font-mono text-xs tracking-widest uppercase'>
            <Link href='/about-us' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              About Us
            </Link>
            <Link href='/events' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              Events
            </Link>
            <Link href='/workshop' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              Workshops
            </Link>
            <Link href='/sponsors' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              Sponsors
            </Link>
            <Link href='/teams' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              Teams
            </Link>
            <Link href='/package' className='md:flex hidden hover:text-cyan-300 transition-colors py-1'>
              Passes
            </Link>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className='md:flex hidden items-center gap-3.5 font-mono'>
            {/* Ringing Bell Notification */}
            <PassNotificationBell />

            <a 
              href={BROCHURE_DRIVE_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-full px-5 py-2 text-xs font-bold tracking-wider transition-all bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-400/40 text-cyan-300 hover:text-black shadow-[0_0_15px_rgba(0,217,255,0.2)] flex items-center gap-1.5"
            >
              <span>BROCHURE</span>
              <span>↗</span>
            </a>

            <Link
              href='/package'
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
            >
              <span>GET PASS</span>
              <span>→</span>
            </Link>

            <Link
              href='/auth/login'
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 hover:border-cyan-400 bg-white/5 hover:bg-cyan-500/10 text-white hover:text-cyan-300 text-xs tracking-wider uppercase transition-all"
              title="Sign In"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>SIGN IN</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className='md:hidden flex items-center gap-2'>
            <PassNotificationBell />

            <Link
              href='/auth/login'
              className="flex items-center justify-center w-9 h-9 rounded-full border border-cyan-400/60 bg-cyan-500/15 text-cyan-300 shadow-[0_0_10px_rgba(0,217,255,0.25)]"
              title="Sign In"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <button 
              className='flex w-9 h-9 rounded-lg items-center justify-center cursor-pointer bg-white/5 border border-white/15 text-white active:bg-white/10' 
              onClick={toggleNavbar}
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Full Screen Menu */}
          {isActive && (
            <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#020817]/98 backdrop-blur-xl text-white transition-all flex flex-col items-center gap-4 z-50 p-6 overflow-y-auto">
              <div className='w-full flex flex-row justify-between items-center py-2 border-b border-white/10'>
                <Link href='/' className='cursor-pointer' onClick={toggleNavbar}>
                  <span className="text-sm font-bold font-mono tracking-widest text-cyan-300 uppercase">
                    TECHFEST&apos;26 SLIET
                  </span>
                </Link>

                <button 
                  className='flex w-9 h-9 rounded-lg items-center justify-center cursor-pointer bg-white/5 border border-white/15 text-white' 
                  onClick={toggleNavbar}
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className='flex flex-col gap-2.5 items-start w-full font-mono text-sm py-4'>
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about-us" },
                  { label: "Events & Competitions", href: "/events" },
                  { label: "Workshops", href: "/workshop" },
                  { label: "Sponsors & Partners", href: "/sponsors" },
                  { label: "Teams & Leadership", href: "/teams" },
                  { label: "Passes & Accommodation", href: "/package" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Transit & Reach Us", href: "/reach-us" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleNavbar}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-neutral-300 hover:text-cyan-300 transition-all"
                  >
                    <span>{item.label}</span>
                    <span className="text-neutral-500">→</span>
                  </Link>
                ))}
              </div>

              <div className="w-full pt-4 border-t border-white/10 flex flex-col gap-3 font-mono">
                <Link
                  href="/package"
                  onClick={toggleNavbar}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs tracking-widest uppercase text-center shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                >
                  GET FESTIVAL PASS (₹299 / ₹599) →
                </Link>
                <Link
                  href="/auth/login"
                  onClick={toggleNavbar}
                  className="w-full py-3 rounded-xl border border-white/20 bg-white/5 text-neutral-300 font-bold text-xs tracking-widest uppercase text-center hover:bg-white/10"
                >
                  SIGN IN TO ACCOUNT
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;

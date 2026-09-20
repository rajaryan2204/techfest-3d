import gsap from "gsap";
import { runTerminal } from "./terminal";

let tl: gsap.core.Timeline;

export function startTimeline() {

    tl = gsap.timeline();

    // Initial TV state
    gsap.set(".tv", {
        scale: 4.5,
        y: 30,
        rotationX: 8,
        transformOrigin: "center center",
    });

    // Hide everything initially
    gsap.set(".channel", { opacity: 0 });
    gsap.set(".connected", { opacity: 0 });

    // Zoom out
    tl.to(".tv", {
        delay: 0.5,
        scale: 0.95,
        y: -5,
        rotationX: 0,
        duration: 0.55,
        ease: "expo.out",
    });

    // Settle
    tl.to(".tv", {
        scale: 1,
        y: 0,
        duration: 0.12,
        ease: "power2.out",
    });

    // Hide NO SIGNAL
    tl.to(".no-signal", {
        opacity: 0,
        duration: 0.1,
    });

    // Channel 1
    tl.to(".channel1", {
        opacity: 1,
        duration: 0.12,
    });

    tl.to({}, {
        duration: 0.25,
    });

    tl.to(".channel1", {
        opacity: 0,
        duration: 0.08,
    });

    // Channel 2
    tl.to(".channel2", {
        opacity: 1,
        duration: 0.12,
    });

    tl.to({}, {
        duration: 0.25,
    });

    tl.to(".channel2", {
        opacity: 0,
        duration: 0.08,
    });

    // Channel 3
    tl.to(".channel3", {
        opacity: 1,
        duration: 0.12,
    });

    tl.to({}, {
        duration: 0.3,
    });

    // CONNECTED
    tl.to(".connected", {
        opacity: 1,
        duration: 0.15,
    });

    tl.to({}, {
        duration: 0.35,
    });

    tl.to(".connected", {
        opacity: 0,
        duration: 0.15,
    });

    // Linux splash
    tl.to(".linux", {
        opacity: 1,
        duration: 0.25,
    });

    tl.to({}, {
        duration: 0.5,
    });

    tl.to(".linux", {
        opacity: 0,
        duration: 0.25,
    });

    tl.to(".terminal", {
        opacity: 1,
        duration: 0.25,
    });

    tl.call(() => {
        runTerminal();
    });

    return tl;
}

export function skipTimeline() {
    if (tl) {
        tl.progress(1);
    }
}
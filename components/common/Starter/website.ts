import gsap from "gsap";

export function launchWebsite() {

    const tl = gsap.timeline();

    // Small pause after browser opens
    tl.to({}, {
        duration: 0.5,
    });

    // Hide browser chrome
    tl.to(".browser-header", {
        scaleY: 0,
        duration: 0.2,
        ease: "power2.inOut",
    });

    // Camera flies into the TV screen
    tl.to(".world", {
        scale: 15,
        duration: 1,
        ease: "expo.inOut",
    });

    // Fade away the intro
    tl.to(".starter", {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
            try {
                sessionStorage.setItem("intro-seen", "true");
            } catch {}
            document.querySelector(".starter")?.remove();
        },
    });
}
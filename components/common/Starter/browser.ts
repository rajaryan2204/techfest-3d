import gsap from "gsap";
import { launchWebsite } from "./website";
import { markIntroAtEnd, waitForGate } from "./gate";

export function openBrowser() {

    const tl = gsap.timeline();

    tl.to(".terminal", {
        opacity: 0,
        duration: 0.25,
    });

tl.fromTo(
    ".browser",
    {
        opacity: 0,
        scale: 0.75,
    },
    {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.4)",
    }
);

// Let the user see the homepage
tl.to({}, {
    duration: 1,
});

// The animation has reached its end — hold here (showing the homepage
// preview) until the landing page's assets have finished downloading,
// then begin the final transition. If they were already ready, this
// resolves immediately.
tl.call(() => {
    markIntroAtEnd();
    waitForGate().then(launchWebsite);
});


}
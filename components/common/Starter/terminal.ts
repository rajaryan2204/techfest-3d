import gsap from "gsap";
import { skipped } from "./skip";
import { openBrowser } from "./browser";

const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

async function typeLine(
    element: HTMLElement,
    text: string,
    minSpeed = 12,
    maxSpeed = 28
) {
    element.textContent = "";

    for (const char of text) {

        if (skipped) {
            element.textContent = text;
            return;
        }

        element.textContent += char;

        const delay =
            minSpeed + Math.random() * (maxSpeed - minSpeed);

        await sleep(delay);
    }
}

export async function runTerminal() {

    if (skipped) {
        openBrowser();
        return;
    }

    const terminal = document.querySelector(".terminal") as HTMLElement;
    const body = document.querySelector(".terminal-body") as HTMLElement;

    if (!terminal || !body) return;

    gsap.set(terminal, {
        opacity: 1
    });

    body.innerHTML = "";

    function createLine() {

        const line = document.createElement("div");

        line.className = "line";

        body.appendChild(line);

        body.scrollTop = body.scrollHeight;

        return line;
    }

    async function write(
        text: string,
        pause = 250
    ) {

        if (skipped) {
            openBrowser();
            return;
        }

        const line = createLine();

        await typeLine(line, text);

        if (skipped) {
            openBrowser();
            return;
        }

        await sleep(pause);

        if (skipped) {
            openBrowser();
            return;
        }
    }

    await sleep(300);

    if (skipped) {
        openBrowser();
        return;
    }

    await write("$ cd techfest26");
    if (skipped) return;

    await write("$ git pull");
    if (skipped) return;

    await write("Already up to date.");
    if (skipped) return;

    await write("$ npm install");
    if (skipped) return;

    await write("✓ added 1487 packages in 2.1s");
    if (skipped) return;

    await write("$ npm run dev");
    if (skipped) return;

    await write("");
    if (skipped) return;

    await write("▲ Next.js 16.0.1");
    if (skipped) return;

    await write("✓ Ready in 684ms");
    if (skipped) return;

    await write("");
    if (skipped) return;

    await write("Local:   http://localhost:3000", 150);
    if (skipped) return;

    // await write("Network: https://techfest26.live", 400);

    await write("");
    if (skipped) return;

    await write("[TIP] Copy this live URL. Your resume will thank you. 😊😊😊", 700);
    if (skipped) return;

    await write("");
    if (skipped) return;

    await write("Launching browser...", 800);
    if (skipped) return;

    await sleep(500);

    if (skipped) {
        openBrowser();
        return;
    }

    openBrowser();
}
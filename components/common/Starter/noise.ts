export function startNoise() {

    const noise = document.querySelector(".noise") as HTMLElement;

    if (!noise) {
        return () => {};
    }

    let frame = 0;

    const offsets = [
        [0, 0],
        [35, -20],
        [-28, 12],
        [15, 38],
        [-22, -18],
        [40, 10],
        [-35, 30],
        [0, -25],
    ];

    const interval = setInterval(() => {

        const [x, y] = offsets[frame % offsets.length];

        noise.style.backgroundPosition = `${x}px ${y}px`;

        noise.style.opacity =
            (0.35 + Math.random() * 0.2).toFixed(2);

        frame++;

    }, 70);

    return () => clearInterval(interval);
}
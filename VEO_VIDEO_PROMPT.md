# Production-Ready Google Veo / Gemini Video Generation Prompt

This document provides the exact, production-grade text-to-video / image-to-video prompts for **Google Veo 2 / Gemini Video Generation** to produce the final 4K/8K 10–12 second seamless cinematic hero loop for TechFEST'26.

---

## 🎬 Master Google Veo Prompt (Copy & Paste)

```text
A photorealistic, high-end cinematic sci-fi film wide shot. A massive futuristic circular energy portal ring stands in a vast dark mountainous landscape at dusk. Inside the circular portal is a breathtaking view of a futuristic Earth integrated with glowing blue oceans, cloud layers, sustainable futuristic architecture, wind turbines, and atmospheric layers. A large realistic waterfall cascades naturally from the lower hemisphere of the Earth down toward the ground, falling into a wet reflective misty lake with volumetric fog, rising vapor, and delicate water spray. Continuous, physically realistic fluid motion: water rapidly pours down under gravity with varying turbulent stream velocities, splashing beads, and rising billowing mist at the base. Slow, majestic natural planetary rotation of the Earth inside the ring with independent cloud drift. The circular mechanical energy ring has electric blue light and photons travelling smoothly around its 360-degree perimeter with subtle rhythmic energy pulses. A lone small person in a dark jacket stands far in the foreground looking up at the immense monumental portal. Deep navy, black, electric blue, and cyan cinematic lighting, dark starry sky, realistic physics and fluid dynamics. Slow, subtle cinematic camera push-in with organic spatial depth. Zero text, zero typography, zero logos, zero interface, 8k resolution, cinematic VFX, photorealistic.
```

---

## ⚙️ Technical Specifications for Veo / Video Generator

| Parameter | Recommended Setting |
| :--- | :--- |
| **Model** | Google Veo 2 / Runway Gen-3 Alpha / Sora |
| **Resolution** | 1920x1080 (Full HD) or 3840x2160 (4K UHD) |
| **Aspect Ratio** | 16:9 Landscape |
| **Frame Rate** | 30 fps or 60 fps |
| **Duration** | 10 to 12 seconds (Seamless Loopable) |
| **Motion Score / Intensity** | 4 to 5 (Natural fluid movement, slow environmental drift) |
| **Negative Prompt** | `text, watermark, typography, letters, logo, UI, HUD, glitch, cartoon, anime, 3D render look, oversaturated neon, fast jerky camera, jump cuts` |

---

## 📂 Asset Replacement Pipeline

When you generate the final video from Google Veo or your VFX studio:
1. Export as `.mp4` (H.264 / H.265) or `.webm`.
2. Optimize bitrate (~4 Mbps for 1080p web playback).
3. Place the file directly in:
   ```
   public/hero/cinematic_portal_hero.mp4
   ```
4. The website will automatically play the new video seamlessly with zero code changes!

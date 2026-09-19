"use client";

import React from "react";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#f8fafc" />

      {/* Main Key Sun (Studio directional light from top-left) */}
      <directionalLight
        position={[-5, 5, 4.5]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* Subtle cold rim fill from back-right */}
      <directionalLight
        position={[5, -3, -4]}
        intensity={1.1}
        color="#38bdf8"
      />

      {/* Soft front studio fill */}
      <directionalLight
        position={[2, 1, 5]}
        intensity={1.2}
        color="#f1f5f9"
      />
    </>
  );
}

"use client";

import React from "react";

export default function FilmLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Key Light: Crisp Pure White */}
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#ffffff" />
      {/* Fill Light: Deep Slate */}
      <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#64748b" />
      {/* Rim Light: Cold Cyan / Atmospheric */}
      <directionalLight position={[0, -4, -4]} intensity={1.2} color="#0284c7" />
    </>
  );
}

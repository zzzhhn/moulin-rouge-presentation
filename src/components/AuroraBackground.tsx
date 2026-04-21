"use client";

import React from "react";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(122,31,46,0.4) 0%, transparent 50%)",
          animationDuration: "25s",
        }}
      />
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(158,27,50,0.3) 0%, transparent 60%)",
          animationDuration: "20s",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(circle at 50% 80%, rgba(212,175,55,0.08) 0%, transparent 50%)",
          animationDuration: "18s",
          animationDelay: "-10s",
        }}
      />
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(circle at 60% 20%, rgba(74,14,14,0.5) 0%, transparent 40%)",
          animationDuration: "22s",
          animationDelay: "-15s",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

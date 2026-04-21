"use client";

import React from "react";

interface GlassmorphismPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassmorphismPanel({ children, className = "", glow = false }: GlassmorphismPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {glow && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.3) 0%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

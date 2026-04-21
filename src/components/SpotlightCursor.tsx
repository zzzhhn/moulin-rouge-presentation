"use client";

import React, { useEffect, useRef, useState } from "react";

interface SpotlightCursorProps {
  enabled?: boolean;
}

export default function SpotlightCursor({ enabled = true }: SpotlightCursorProps) {
  const posRef = useRef({ x: -600, y: -600 });
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }

    let throttleTimer: number | null = null;
    let active = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!active) return;
      if (throttleTimer) return;

      throttleTimer = window.setTimeout(() => {
        throttleTimer = null;
      }, 16);

      posRef.current = { x: e.clientX - 300, y: e.clientY - 300 };
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      active = false;
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      ref={spotlightRef}
      className="fixed z-[5] pointer-events-none"
      style={{
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
        transform: `translate3d(-600px, -600px, 0)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        willChange: "transform",
      }}
    />
  );
}

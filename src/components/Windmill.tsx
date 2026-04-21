"use client";

import React from "react";

interface WindmillProps {
  className?: string;
}

export default function Windmill({ className = "" }: WindmillProps) {
  return (
    <div className={`w-32 h-32 mb-8 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        <g transform="translate(50,50)">
          {/* Blades */}
          {[0, 90, 180, 270].map((rotation) => (
            <g key={rotation} transform={`rotate(${rotation})`}>
              <ellipse
                cx="0"
                cy="-30"
                rx="12"
                ry="30"
                fill="#9e1b32"
                opacity="0.9"
              />
            </g>
          ))}
          {/* Center dot */}
          <circle cx="0" cy="0" r="6" fill="#d4af37" />
        </g>
      </svg>
    </div>
  );
}

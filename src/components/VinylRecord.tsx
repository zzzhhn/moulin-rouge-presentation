"use client";

import React, { useState } from "react";

interface VinylRecordProps {
  labelColor: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
}

export default function VinylRecord({ labelColor, title, artist, isPlaying = false }: VinylRecordProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      style={{ perspective: "600px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="transition-all duration-400 ease-out"
        style={{
          transform: isHovered
            ? "rotateX(0deg) scale(1.1)"
            : `rotateX(55deg) ${isPlaying ? "scale(1)" : "scale(1)"}`,
          transition: "transform 0.4s ease",
          animation: isPlaying && !isHovered ? "spin 4s linear infinite" : "none",
        }}
      >
        <circle cx="80" cy="80" r="80" fill="#111" stroke="#333" strokeWidth="1" />
        {[20, 30, 40, 50, 60, 70].map((r) => (
          <circle
            key={r}
            cx="80"
            cy="80"
            r={r}
            stroke={isHovered ? "#444" : "#222"}
            strokeWidth="0.5"
            fill="none"
            className="transition-colors duration-400"
          />
        ))}
        <circle cx="80" cy="80" r="18" fill={labelColor} />
        <text
          x="80"
          y="76"
          textAnchor="middle"
          fontSize="8"
          fill="white"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          {title}
        </text>
        <text
          x="80"
          y="88"
          textAnchor="middle"
          fontSize="6"
          fill="white"
          fontFamily="Inter, sans-serif"
          opacity="0.7"
        >
          {artist}
        </text>
        <circle cx="80" cy="80" r="4" fill="#111" />
      </svg>
    </div>
  );
}

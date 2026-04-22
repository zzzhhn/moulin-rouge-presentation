export default function BohemianOverlay() {
  return (
    <>
      {/* Paisley / Art Nouveau tapestry pattern — very low opacity */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.045 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="paisley"
            x="0"
            y="0"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(12)"
          >
            {/* Paisley droplet */}
            <path
              d="M140 40 C 180 40, 210 70, 210 110 C 210 150, 180 180, 145 180 C 120 180, 100 165, 95 145 C 110 155, 140 155, 160 140 C 180 125, 185 100, 170 80 C 158 65, 140 60, 125 70 C 140 50, 140 40, 140 40 Z"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.2"
            />
            <circle cx="155" cy="100" r="4" fill="#d4af37" />
            <circle cx="140" cy="125" r="2" fill="#d4af37" />
            {/* Small floral motif */}
            <g transform="translate(60,220)">
              {[0, 60, 120, 180, 240, 300].map((r) => (
                <ellipse
                  key={r}
                  cx="0"
                  cy="-12"
                  rx="3"
                  ry="9"
                  fill="#9e1b32"
                  opacity="0.7"
                  transform={`rotate(${r})`}
                />
              ))}
              <circle r="3" fill="#d4af37" />
            </g>
            {/* Diamond accents */}
            <path
              d="M 240 240 L 250 230 L 260 240 L 250 250 Z"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.8"
            />
            <path
              d="M 20 60 L 28 52 L 36 60 L 28 68 Z"
              fill="none"
              stroke="#9e1b32"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paisley)" />
      </svg>

      {/* Grain / noise overlay for velvet texture */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.08, mixBlendMode: "overlay" }}
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values="0 0 0 0 0.85
                    0 0 0 0 0.7
                    0 0 0 0 0.3
                    0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Vignette corners for stage framing */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,2,2,0.55) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

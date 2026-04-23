interface PhonographProps {
  labelColor: string;
  accent: string;
  title: string;
  year: string;
  playing: boolean;
}

// One unified vintage phonograph/record player:
// - mahogany wooden cabinet with gold inlay + ornament grille
// - turntable platter sitting on top (recessed into cabinet lid)
// - vinyl record on platter, spins via CSS keyframe when `playing`
// - tonearm hinged at the right rear, tip moves onto the outer groove when playing
// - brass horn emerging from the back-left, angled up and out
// Everything in a single SVG so the components read as one object, not separate widgets.
export default function Phonograph({
  labelColor,
  accent,
  title,
  year,
  playing,
}: PhonographProps) {
  return (
    <div className="relative w-full max-w-[520px] aspect-[6/5]">
      <svg
        viewBox="0 0 600 500"
        className="w-full h-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ph-wood-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b3820" />
            <stop offset="50%" stopColor="#4a2410" />
            <stop offset="100%" stopColor="#2d1608" />
          </linearGradient>
          <linearGradient id="ph-wood-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a2410" />
            <stop offset="100%" stopColor="#1e0d05" />
          </linearGradient>
          <linearGradient id="ph-horn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4d67a" />
            <stop offset="40%" stopColor="#c79a3c" />
            <stop offset="100%" stopColor="#6b4a18" />
          </linearGradient>
          <linearGradient id="ph-horn-inner" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2d0a0a" />
            <stop offset="100%" stopColor="#1a0505" />
          </linearGradient>
          <radialGradient id="ph-platter" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="80%" stopColor="#151515" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="300" cy="475" rx="220" ry="10" fill="#000" opacity="0.55" />

        {/* Horn — behind the cabinet, emerges from back-left, curves up and out */}
        <g>
          {/* Brass tube connecting cabinet to horn */}
          <path
            d="M 130 310 Q 100 290 90 255 Q 82 230 95 210"
            stroke="#c79a3c"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 130 310 Q 100 290 90 255 Q 82 230 95 210"
            stroke="#f4d67a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Horn bell */}
          <g transform="translate(95, 210) rotate(-25)">
            <path
              d="M 0 0 L -10 -75 Q 0 -115 30 -128 Q 75 -140 120 -115 Q 140 -100 128 -75 Q 115 -55 85 -45 Q 55 -35 35 -20 Q 18 -8 0 0 Z"
              fill="url(#ph-horn)"
              stroke="#4a2817"
              strokeWidth="1.2"
            />
            {/* Horn mouth interior (ellipse seen at angle) */}
            <ellipse
              cx="70"
              cy="-95"
              rx="55"
              ry="22"
              fill="url(#ph-horn-inner)"
              transform="rotate(12 70 -95)"
            />
            {/* Highlight on horn rim */}
            <path
              d="M 30 -128 Q 75 -140 120 -115"
              stroke="#ffe8a6"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          </g>
        </g>

        {/* Cabinet body — the wooden base */}
        {/* Cabinet front face (darker, shadowed) */}
        <path
          d="M 80 310 L 520 310 L 520 440 Q 520 450 510 450 L 90 450 Q 80 450 80 440 Z"
          fill="url(#ph-wood-front)"
          stroke="#2d1608"
          strokeWidth="1"
        />
        {/* Cabinet top (lighter, catches light) */}
        <path
          d="M 80 310 Q 80 298 92 295 L 508 295 Q 520 298 520 310 L 520 315 L 80 315 Z"
          fill="url(#ph-wood-top)"
          stroke="#2d1608"
          strokeWidth="1"
        />

        {/* Wood grain lines */}
        {[325, 350, 375, 400, 425].map((y) => (
          <line
            key={y}
            x1="90"
            y1={y}
            x2="510"
            y2={y}
            stroke="#2d1608"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}

        {/* Gold inlay border on cabinet front */}
        <rect
          x="100"
          y="330"
          width="400"
          height="100"
          rx="4"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          opacity="0.85"
        />
        <rect
          x="104"
          y="334"
          width="392"
          height="92"
          rx="3"
          fill="none"
          stroke="#d4af37"
          strokeWidth="0.5"
          opacity="0.55"
        />

        {/* Speaker grille — front center of cabinet */}
        <g transform="translate(300, 380)">
          <ellipse cx="0" cy="0" rx="80" ry="30" fill="#1a0a05" stroke="#d4af37" strokeWidth="1" />
          {/* Grille pattern — vertical slats */}
          {[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60].map((x) => (
            <line
              key={x}
              x1={x}
              y1="-22"
              x2={x}
              y2="22"
              stroke="#d4af37"
              strokeWidth="0.5"
              opacity={Math.abs(x) > 48 ? 0.3 : 0.55}
            />
          ))}
        </g>

        {/* Control knobs on cabinet front */}
        <g>
          <circle cx="150" cy="380" r="8" fill="#1a0a05" stroke="#d4af37" strokeWidth="1" />
          <circle cx="150" cy="380" r="3" fill="#d4af37" />
          <line x1="150" y1="378" x2="150" y2="374" stroke="#d4af37" strokeWidth="1" />

          <circle cx="450" cy="380" r="8" fill="#1a0a05" stroke="#d4af37" strokeWidth="1" />
          <circle cx="450" cy="380" r="3" fill="#d4af37" />
          <line x1="450" y1="378" x2="452" y2="373" stroke="#d4af37" strokeWidth="1" />
        </g>

        {/* Cabinet feet */}
        <rect x="95" y="450" width="18" height="8" fill="#1a0a05" rx="1" />
        <rect x="487" y="450" width="18" height="8" fill="#1a0a05" rx="1" />

        {/* Turntable platter — sits on top of cabinet */}
        {/* Platter rim (gold ring) */}
        <circle cx="300" cy="195" r="118" fill="#3a2010" stroke="#d4af37" strokeWidth="1.5" />
        {/* Platter top */}
        <circle cx="300" cy="195" r="112" fill="url(#ph-platter)" />
        {/* Platter groove ring */}
        <circle cx="300" cy="195" r="108" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.3" />

        {/* Vinyl record — spins when playing */}
        <g
          style={{
            transformOrigin: "300px 195px",
            animation: playing ? "turntable-spin 3.2s linear infinite" : "none",
          }}
        >
          <circle cx="300" cy="195" r="100" fill="#0a0a0a" />
          {/* Concentric grooves */}
          {Array.from({ length: 22 }).map((_, i) => (
            <circle
              key={i}
              cx="300"
              cy="195"
              r={46 + i * 2.4}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="0.5"
            />
          ))}
          {/* Record label */}
          <circle cx="300" cy="195" r="42" fill={labelColor} stroke={accent} strokeWidth="1.5" />
          {/* Label text */}
          <text
            x="300"
            y="190"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="11"
            fontStyle="italic"
            fill={accent}
          >
            {title.length > 16 ? title.slice(0, 14) + "…" : title}
          </text>
          <text
            x="300"
            y="205"
            textAnchor="middle"
            fontFamily="'Cinzel Decorative', serif"
            fontSize="8"
            letterSpacing="1.5"
            fill={accent}
            opacity="0.85"
          >
            {year}
          </text>
          {/* Spindle hole */}
          <circle cx="300" cy="195" r="3" fill="#0a0202" stroke={accent} strokeWidth="0.8" />
        </g>

        {/* Tonearm — pivots at back-right of cabinet, arcs over the record */}
        <g>
          {/* Tonearm pivot base — a small brass cylinder seated on cabinet top */}
          <ellipse cx="465" cy="305" rx="18" ry="5" fill="#1a0a05" />
          <circle cx="465" cy="300" r="11" fill="#c79a3c" stroke="#4a2817" strokeWidth="1" />
          <circle cx="465" cy="300" r="4" fill="#2d0a0a" />
          <circle cx="465" cy="300" r="1.5" fill="#f4d67a" />

          {/* Tonearm shaft — two segments hinged, pivot at (465, 300) */}
          {(() => {
            // When playing: head rests near outer edge of record (around r=95 from platter center)
            // When paused: head rests on cradle at the right, well clear of record
            const headX = playing ? 350 : 415;
            const headY = playing ? 155 : 270;
            return (
              <g style={{ transition: "all 0.6s ease-in-out" }}>
                <line
                  x1="465"
                  y1="300"
                  x2={headX}
                  y2={headY}
                  stroke="#d4af37"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="465"
                  y1="300"
                  x2={headX}
                  y2={headY}
                  stroke="#f4d67a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                {/* Tonearm cartridge (head) */}
                <circle cx={headX} cy={headY} r="6" fill="#2d0a0a" stroke="#d4af37" strokeWidth="1" />
                <rect x={headX - 4} y={headY} width="8" height="6" fill="#1a0505" stroke="#d4af37" strokeWidth="0.6" />
              </g>
            );
          })()}

          {/* Tonearm cradle (when paused, head rests here) */}
          <rect x="403" y="268" width="24" height="6" rx="2" fill="#1a0a05" stroke="#d4af37" strokeWidth="0.6" />
        </g>

        {/* Top edge highlight on cabinet */}
        <line
          x1="95"
          y1="296"
          x2="505"
          y2="296"
          stroke="#8a5a28"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

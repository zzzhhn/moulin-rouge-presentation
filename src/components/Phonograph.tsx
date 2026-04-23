interface PhonographProps {
  labelColor: string;
  accent: string;
  title: string;
  year: string;
  playing: boolean;
}

// Modern turntable in 3/4 perspective (mid-century / audiophile deck).
// The deck is drawn as a slanted trapezoid (narrower at the back, wider at
// the front) to imply looking down at ~35°. Platter + vinyl are ellipses.
// Tonearm pivots on a real hinge at the back-right: smooth transition
// between the cradle (paused) and the outer-groove cue (playing).
export default function Phonograph({
  labelColor,
  accent,
  title,
  year,
  playing,
}: PhonographProps) {
  // Tonearm angle: rest ~18°, playing ~52° (swept over the record).
  const tonearmAngle = playing ? 52 : 18;

  return (
    <div className="relative w-full max-w-[560px] aspect-[7/5]">
      <svg
        viewBox="0 0 700 500"
        className="w-full h-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-deck-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2010" />
            <stop offset="100%" stopColor="#5a3418" />
          </linearGradient>
          <linearGradient id="pg-deck-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1608" />
            <stop offset="100%" stopColor="#140a04" />
          </linearGradient>
          <radialGradient id="pg-platter" cx="0.5" cy="0.5" r="0.55">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="70%" stopColor="#141414" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>
          <linearGradient id="pg-tonearm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f4d67a" />
            <stop offset="50%" stopColor="#c79a3c" />
            <stop offset="100%" stopColor="#8a6a18" />
          </linearGradient>
          <filter id="pg-innershadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="350" cy="470" rx="280" ry="14" fill="#000" opacity="0.55" />

        {/* ───── DECK ───── */}
        {/* Front face (dark, visible strip below the top face) */}
        <path
          d="M 40 340 L 660 340 L 640 410 Q 635 418 625 418 L 75 418 Q 65 418 60 410 Z"
          fill="url(#pg-deck-front)"
          stroke="#0f0604"
          strokeWidth="1"
        />

        {/* Top face — trapezoid, perspective */}
        <path
          d="M 130 140 L 570 140 L 660 340 L 40 340 Z"
          fill="url(#pg-deck-top)"
          stroke="#0f0604"
          strokeWidth="1.2"
        />

        {/* Gold inlay border following the top face shape */}
        <path
          d="M 150 158 L 552 158 L 628 328 L 72 328 Z"
          fill="none"
          stroke="#d4af37"
          strokeWidth="0.9"
          opacity="0.7"
        />

        {/* Wood grain hints on the top face */}
        {[200, 240, 280].map((y) => (
          <path
            key={y}
            d={`M 80 ${y + 20} L 620 ${y + 20}`}
            stroke="#2a1608"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* ───── PLATTER (recessed well) ───── */}
        {/* Gold ring around the platter well */}
        <ellipse
          cx="310"
          cy="258"
          rx="180"
          ry="68"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.6"
          opacity="0.85"
        />
        {/* Recess shadow */}
        <ellipse cx="310" cy="259" rx="176" ry="66" fill="#0a0a0a" opacity="0.9" />
        {/* Platter surface */}
        <ellipse cx="310" cy="258" rx="170" ry="62" fill="url(#pg-platter)" />

        {/* ───── VINYL ─────
            Draw the vinyl as ellipse (perspective-flattened circle).
            A single rotating tick mark signals spinning without visual
            wobble — a full-disc rotation on an ellipse would look wrong. */}
        <ellipse cx="310" cy="258" rx="160" ry="58" fill="#080808" />
        {/* Concentric grooves */}
        {Array.from({ length: 14 }).map((_, i) => {
          const rx = 80 + i * 5.7;
          const ry = rx * (58 / 160);
          return (
            <ellipse
              key={i}
              cx="310"
              cy="258"
              rx={rx}
              ry={ry}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="0.45"
            />
          );
        })}
        {/* Highlight sweep on the vinyl (glossy reflection) */}
        <ellipse
          cx="310"
          cy="258"
          rx="160"
          ry="58"
          fill="none"
          stroke="url(#pg-tonearm)"
          strokeWidth="0.8"
          opacity="0.18"
          strokeDasharray="40 120"
        />

        {/* Record label — ellipse with track title */}
        <ellipse
          cx="310"
          cy="258"
          rx="62"
          ry="23"
          fill={labelColor}
          stroke={accent}
          strokeWidth="1.5"
        />
        <text
          x="310"
          y="254"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="12"
          fontStyle="italic"
          fill={accent}
        >
          {title.length > 18 ? title.slice(0, 16) + "…" : title}
        </text>
        <text
          x="310"
          y="268"
          textAnchor="middle"
          fontFamily="'Cinzel Decorative', serif"
          fontSize="8"
          letterSpacing="1.5"
          fill={accent}
          opacity="0.85"
        >
          {year}
        </text>

        {/* Rotating tick mark — a gold dot at the label's edge.
            `transform-origin` is the label center; the perspective ry
            squish is baked in through the elliptical motion math via
            scale(1, 58/160) on the parent <g>. */}
        <g
          style={{
            transformOrigin: "310px 258px",
            transform: "scale(1, 0.3625)",
          }}
        >
          <g
            style={{
              transformOrigin: "310px 258px",
              animation: playing
                ? "turntable-spin 3.2s linear infinite"
                : "none",
            }}
          >
            <circle cx="370" cy="258" r="3.5" fill={accent} />
            <circle cx="310" cy="198" r="2" fill={accent} opacity="0.65" />
          </g>
        </g>

        {/* Spindle */}
        <circle cx="310" cy="258" r="2.4" fill="#0a0202" stroke={accent} strokeWidth="0.8" />

        {/* ───── TONEARM ASSEMBLY ───── */}
        {/* Pivot tower — seated on deck back-right */}
        <g>
          {/* base shadow under tower */}
          <ellipse cx="555" cy="220" rx="24" ry="7" fill="#0a0505" opacity="0.7" />
          {/* cylindrical pivot tower (silver with gold top) */}
          <rect
            x="540"
            y="180"
            width="30"
            height="38"
            rx="3"
            fill="#d4af37"
            stroke="#4a2817"
            strokeWidth="0.8"
          />
          <ellipse cx="555" cy="180" rx="15" ry="4.5" fill="#f4d67a" stroke="#4a2817" strokeWidth="0.8" />
          <ellipse cx="555" cy="180" rx="6" ry="2" fill="#2d0a0a" />
        </g>

        {/* Tonearm — pivots from (555, 180), rotates based on playing state.
            Transform-origin is the pivot; the <g> holds the tube + cartridge. */}
        <g
          style={{
            transformOrigin: "555px 180px",
            transform: `rotate(${tonearmAngle}deg)`,
            transition: "transform 1.2s cubic-bezier(0.45, 0, 0.25, 1)",
          }}
        >
          {/* Tonearm tube (tapered — thicker near pivot) */}
          <path
            d="M 555 185 L 555 268 Q 555 276 552 281 L 546 300"
            stroke="url(#pg-tonearm)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 555 185 L 555 268 Q 555 276 552 281 L 546 300"
            stroke="#f4d67a"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Counterweight (small cylinder just above the pivot) */}
          <ellipse cx="555" cy="172" rx="10" ry="3.2" fill="#c79a3c" stroke="#4a2817" strokeWidth="0.5" />
          <rect x="545" y="168" width="20" height="6" fill="#c79a3c" stroke="#4a2817" strokeWidth="0.5" />
          {/* Headshell cartridge — rectangular block at tip */}
          <g transform="translate(546, 300)">
            <rect
              x="-9"
              y="0"
              width="18"
              height="10"
              rx="1.5"
              fill="#2d0a0a"
              stroke="#d4af37"
              strokeWidth="0.8"
            />
            <rect x="-6" y="10" width="12" height="3" fill="#1a0505" />
            {/* Stylus tip */}
            <path d="M 0 13 L -1.5 16 L 1.5 16 Z" fill="#d4af37" />
          </g>
        </g>

        {/* Cradle (where the stylus rests when paused) */}
        <g>
          <ellipse cx="612" cy="282" rx="14" ry="5" fill="#0a0505" stroke="#d4af37" strokeWidth="0.7" />
          <rect x="602" y="277" width="20" height="4" rx="1" fill="#1a0a05" />
        </g>

        {/* ───── CONTROL BUTTONS on the deck front-left ───── */}
        <g>
          {[80, 110, 140].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="300" r="6" fill="#1a0a05" stroke="#d4af37" strokeWidth="0.8" />
              <text
                x={x}
                y="303"
                textAnchor="middle"
                fontSize="6"
                fontFamily="sans-serif"
                fill="#d4af37"
                opacity="0.8"
              >
                {["▶", "■", "⏻"][i]}
              </text>
            </g>
          ))}
        </g>

        {/* Speed selector (33/45) on the deck front-right */}
        <g>
          <rect x="580" y="320" width="40" height="10" rx="2" fill="#1a0a05" stroke="#d4af37" strokeWidth="0.6" />
          <text x="592" y="328" fontSize="7" fontFamily="sans-serif" fill="#d4af37">33</text>
          <text x="608" y="328" fontSize="7" fontFamily="sans-serif" fill="#d4af37" opacity="0.5">45</text>
        </g>

        {/* Highlight edge on top face */}
        <path
          d="M 130 140 L 570 140"
          stroke="#8a5a28"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

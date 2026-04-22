import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WindmillProps {
  className?: string;
}

// Stylized illustration of the Moulin Rouge windmill: weathered red tower,
// 4 large wooden sails with internal lattice, lamp halo, a night-sky glow.
export default function Windmill({ className = "" }: WindmillProps) {
  const sailsRef = useRef<SVGGElement>(null);
  const lampsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (sailsRef.current) {
      gsap.to(sailsRef.current, {
        rotation: 360,
        duration: 22,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }
    if (lampsRef.current) {
      const bulbs = lampsRef.current.querySelectorAll<SVGCircleElement>(".lamp-bulb");
      bulbs.forEach((b, i) => {
        gsap.to(b, {
          opacity: 0.35,
          duration: 0.8 + Math.random() * 0.6,
          delay: i * 0.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Radial backlight halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(212,175,55,0.22) 0%, rgba(158,27,50,0.15) 30%, transparent 65%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 520"
        className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(158,27,50,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brickGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a1f2e" />
            <stop offset="50%" stopColor="#5a1420" />
            <stop offset="100%" stopColor="#3d0d16" />
          </linearGradient>
          <linearGradient id="sailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c79a3c" />
            <stop offset="50%" stopColor="#e8c872" />
            <stop offset="100%" stopColor="#a47a22" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9e1b32" />
            <stop offset="100%" stopColor="#5a1420" />
          </linearGradient>
          <radialGradient id="hubGrad" cx="0.4" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#f4e4c1" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#8a6a18" />
          </radialGradient>
          <filter id="warmGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="200" cy="505" rx="130" ry="8" fill="#000" opacity="0.45" />

        {/* Tower base — trapezoidal brick body */}
        <polygon
          points="130,500 270,500 255,340 145,340"
          fill="url(#brickGrad)"
          stroke="#2d0a0a"
          strokeWidth="1.5"
        />
        {/* Brick courses */}
        {[360, 385, 410, 435, 460, 485].map((y, i) => (
          <line
            key={y}
            x1={142 + i * 0.5}
            y1={y}
            x2={258 - i * 0.5}
            y2={y}
            stroke="#2d0a0a"
            strokeWidth="0.6"
            opacity="0.55"
          />
        ))}
        {/* Offset brick pattern marks */}
        {[365, 395, 425, 455, 485].map((y, ri) => (
          <g key={y}>
            {[0, 1, 2, 3, 4].map((ci) => (
              <rect
                key={ci}
                x={155 + ci * 20 + (ri % 2) * 10}
                y={y - 4}
                width="14"
                height="2"
                fill="#2d0a0a"
                opacity="0.35"
                rx="1"
              />
            ))}
          </g>
        ))}

        {/* Arched wooden door */}
        <path
          d="M 188 500 L 188 462 Q 188 445 200 445 Q 212 445 212 462 L 212 500 Z"
          fill="#2a0a05"
          stroke="#d4af37"
          strokeWidth="1"
        />
        <circle cx="208" cy="475" r="1.2" fill="#d4af37" />

        {/* Windows with warm glow */}
        <rect x="160" y="395" width="12" height="16" rx="2" fill="#f4e4c1" opacity="0.75" filter="url(#warmGlow)" />
        <rect x="228" y="395" width="12" height="16" rx="2" fill="#f4e4c1" opacity="0.75" filter="url(#warmGlow)" />

        {/* Signage banner "MOULIN ROUGE" */}
        <rect x="150" y="355" width="100" height="22" rx="3" fill="#1a0505" stroke="#d4af37" strokeWidth="0.8" />
        <text
          x="200"
          y="371"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1.5"
          fontFamily="'Cinzel Decorative', serif"
          fontWeight="700"
          fill="#d4af37"
        >
          MOULIN ROUGE
        </text>

        {/* Roof / cap with balcony gallery */}
        <rect x="140" y="326" width="120" height="16" fill="#1a0505" stroke="#d4af37" strokeWidth="0.8" />
        {/* balcony balusters */}
        {Array.from({ length: 11 }).map((_, i) => (
          <rect
            key={i}
            x={146 + i * 11}
            y={329}
            width="2"
            height="10"
            fill="#d4af37"
            opacity="0.8"
          />
        ))}
        {/* Dome roof */}
        <path
          d="M 155 326 Q 200 260 245 326 Z"
          fill="url(#roofGrad)"
          stroke="#2d0a0a"
          strokeWidth="1"
        />
        {/* Roof ribs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={155 + i * 22}
            y1={326 - i * 1.5}
            x2={200}
            y2={260 + i * 3}
            stroke="#2d0a0a"
            strokeWidth="0.6"
            opacity="0.6"
          />
        ))}
        {/* Finial spire */}
        <line x1="200" y1="260" x2="200" y2="232" stroke="#d4af37" strokeWidth="2" />
        <circle cx="200" cy="230" r="3.5" fill="#d4af37" />
        <polygon points="200,222 203,230 200,238 197,230" fill="#d4af37" />

        {/* Lamp string (marquee bulbs) around roof edge */}
        <g ref={lampsRef}>
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 150 + (i * 100) / 13;
            return (
              <circle
                key={i}
                className="lamp-bulb"
                cx={x}
                cy={345}
                r="1.8"
                fill="#f4e4c1"
                filter="url(#warmGlow)"
                opacity="0.85"
              />
            );
          })}
        </g>

        {/* Windmill sails — rotating around hub at (200, 180) */}
        <g ref={sailsRef} style={{ transformOrigin: "200px 180px" }}>
          {[0, 90, 180, 270].map((rot) => (
            <g key={rot} transform={`rotate(${rot} 200 180)`}>
              {/* Sail spar (main wooden beam) */}
              <rect
                x="198"
                y="30"
                width="4"
                height="150"
                fill="#4a2817"
                stroke="#2d0a0a"
                strokeWidth="0.4"
              />
              {/* Sail canvas — trapezoidal blade */}
              <polygon
                points="200,35 218,40 230,175 200,180"
                fill="url(#sailGrad)"
                stroke="#6b4a18"
                strokeWidth="1"
                opacity="0.95"
              />
              {/* Lattice battens on blade */}
              {[55, 75, 95, 115, 135, 155].map((y) => (
                <line
                  key={y}
                  x1="202"
                  y1={y}
                  x2={200 + (y - 35) * 0.22}
                  y2={y}
                  stroke="#6b4a18"
                  strokeWidth="0.6"
                  opacity="0.7"
                />
              ))}
              {/* Edge trim */}
              <line
                x1="218"
                y1="40"
                x2="230"
                y2="175"
                stroke="#8a6a18"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>

        {/* Central hub (on top of sails) */}
        <circle
          cx="200"
          cy="180"
          r="14"
          fill="url(#hubGrad)"
          stroke="#2d0a0a"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="180" r="7" fill="#2d0a0a" />
        <circle cx="200" cy="180" r="2.2" fill="#d4af37" />
        {/* Hub decorative rivets */}
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <circle
            key={r}
            cx={200 + Math.cos((r * Math.PI) / 180) * 10}
            cy={180 + Math.sin((r * Math.PI) / 180) * 10}
            r="1"
            fill="#8a6a18"
          />
        ))}
      </svg>
    </div>
  );
}

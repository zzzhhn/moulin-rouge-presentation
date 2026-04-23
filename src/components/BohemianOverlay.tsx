// Visible bohemian atmosphere layer:
// - denser paisley + medallion pattern
// - brighter colors (warm ivory + terracotta) so they read against dark red
// - side-hanging Art Nouveau vertical rules (tapestry "ropes")
// - opacity tuned for clearly visible texture without drowning content
export default function BohemianOverlay() {
  // Denser paisley motif with brighter palette — tile is 320px for reasonable density
  const paisleySvg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'>
      <g fill='none' stroke-width='1.3'>
        <!-- Paisley droplet main -->
        <g stroke='#f0d98a' opacity='0.9'>
          <path d='M170 50 C 215 50, 248 85, 248 130 C 248 170, 215 200, 180 200 C 155 200, 132 184, 127 162 C 148 178, 180 178, 202 160 C 225 140, 230 115, 212 92 C 195 72, 167 72, 152 85 C 167 62, 170 50, 170 50 Z'/>
          <circle cx='190' cy='120' r='4' fill='#f0d98a'/>
          <circle cx='172' cy='148' r='2.2' fill='#f0d98a'/>
          <path d='M 162 72 Q 166 80 172 78' />
          <path d='M 200 110 Q 210 115 214 128' />
        </g>
        <!-- Small floral medallion top-left -->
        <g transform='translate(58, 70)' stroke='#e8956c' opacity='0.75'>
          <circle r='14' />
          <circle r='8' />
          <path d='M 0 -14 L 0 -22 M 0 14 L 0 22 M -14 0 L -22 0 M 14 0 L 22 0' stroke-width='0.9'/>
          <circle r='2.5' fill='#e8956c'/>
        </g>
        <!-- Diamond accents -->
        <g stroke='#f0d98a' opacity='0.65'>
          <path d='M 280 260 L 294 246 L 308 260 L 294 274 Z'/>
          <path d='M 40 250 L 50 240 L 60 250 L 50 260 Z'/>
        </g>
        <!-- Connecting vines -->
        <g stroke='#d4af37' opacity='0.5' stroke-width='0.8'>
          <path d='M 80 30 Q 140 10 200 30 T 310 30'/>
          <path d='M 10 290 Q 80 280 150 290 T 310 290'/>
        </g>
        <!-- Leaf triplets -->
        <g fill='#e8956c' opacity='0.55'>
          <ellipse cx='100' cy='230' rx='4' ry='10' transform='rotate(30 100 230)'/>
          <ellipse cx='108' cy='232' rx='4' ry='10' transform='rotate(-30 108 232)'/>
          <ellipse cx='104' cy='240' rx='3' ry='8' transform='rotate(0 104 240)'/>
        </g>
        <g fill='#f0d98a' opacity='0.5'>
          <ellipse cx='260' cy='80' rx='3' ry='8' transform='rotate(45 260 80)'/>
          <ellipse cx='266' cy='82' rx='3' ry='8' transform='rotate(-45 266 82)'/>
        </g>
      </g>
    </svg>
  `);

  return (
    <>
      {/* Paisley tapestry — clearly visible now */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${paisleySvg}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
          opacity: 0.22,
        }}
        aria-hidden="true"
      />

      {/* Left & right vertical Art Nouveau rules — frame every slide as a curtain */}
      <svg
        className="fixed left-0 top-0 h-full pointer-events-none z-0"
        width="48"
        viewBox="0 0 48 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bhm-rope-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="85%" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="24" y1="0" x2="24" y2="800" stroke="url(#bhm-rope-l)" strokeWidth="1" />
        {/* Decorative medallions down the side */}
        {[120, 280, 440, 600].map((y) => (
          <g key={y} transform={`translate(24, ${y})`} opacity="0.6">
            <circle r="6" stroke="rgba(212,175,55,0.7)" fill="none" strokeWidth="0.8" />
            <circle r="2" fill="rgba(212,175,55,0.85)" />
            <path
              d="M -12 0 L -6 0 M 6 0 L 12 0"
              stroke="rgba(212,175,55,0.5)"
              strokeWidth="0.6"
            />
          </g>
        ))}
      </svg>
      <svg
        className="fixed right-0 top-0 h-full pointer-events-none z-0"
        width="48"
        viewBox="0 0 48 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bhm-rope-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="85%" stopColor="rgba(212,175,55,0.55)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="24" y1="0" x2="24" y2="800" stroke="url(#bhm-rope-r)" strokeWidth="1" />
        {[120, 280, 440, 600].map((y) => (
          <g key={y} transform={`translate(24, ${y})`} opacity="0.6">
            <circle r="6" stroke="rgba(212,175,55,0.7)" fill="none" strokeWidth="0.8" />
            <circle r="2" fill="rgba(212,175,55,0.85)" />
            <path
              d="M -12 0 L -6 0 M 6 0 L 12 0"
              stroke="rgba(212,175,55,0.5)"
              strokeWidth="0.6"
            />
          </g>
        ))}
      </svg>

      {/* Stage vignette — keeps edges focused */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,2,2,0.55) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

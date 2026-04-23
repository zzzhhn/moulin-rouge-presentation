// Low-cost bohemian atmosphere layer:
// - paisley pattern encoded as a static data: URL background-image (browser
//   caches it once, no per-frame filter cost)
// - vignette via a single radial gradient
// No feTurbulence, no backdrop-filter, no mixBlendMode — those are the
// expensive bits that were burning frames.
export default function BohemianOverlay() {
  const paisleySvg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
      <g fill='none' stroke='#d4af37' stroke-width='1.2' opacity='0.8'>
        <path d='M200 60 C 250 60, 290 100, 290 150 C 290 195, 255 230, 215 230 C 185 230, 160 210, 155 185 C 175 200, 210 200, 235 180 C 260 160, 265 130, 245 105 C 225 82, 195 82, 180 95 C 195 70, 200 60, 200 60 Z'/>
        <circle cx='220' cy='140' r='4' fill='#d4af37'/>
        <circle cx='200' cy='170' r='2' fill='#d4af37'/>
        <path d='M 340 330 L 352 318 L 364 330 L 352 342 Z'/>
      </g>
      <g fill='#9e1b32' opacity='0.55'>
        <ellipse cx='80' cy='320' rx='3' ry='9'/>
        <ellipse cx='80' cy='320' rx='3' ry='9' transform='rotate(60 80 320)'/>
        <ellipse cx='80' cy='320' rx='3' ry='9' transform='rotate(120 80 320)'/>
        <circle cx='80' cy='320' r='3' fill='#d4af37'/>
      </g>
    </svg>
  `);

  return (
    <>
      {/* Paisley tapestry — static background-image, painted once */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${paisleySvg}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
          opacity: 0.04,
        }}
        aria-hidden="true"
      />
      {/* Stage vignette */}
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

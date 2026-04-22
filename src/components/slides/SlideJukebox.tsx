import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause, Disc3 } from "lucide-react";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

type Track = {
  id: string;
  title: string;
  artist: string;
  year: string;
  era: "2001" | "2019";
  labelColor: string;
  accent: string;
  src: string;
  // Structural beats only — NOT actual lyrics. Group members may edit.
  captions: string[];
};

// 5 tracks. Audio files go in public/audio/; replace src when ready.
const TRACKS: Track[] = [
  {
    id: "your-song",
    title: "Your Song",
    artist: "Elton John (1970)",
    year: "1970",
    era: "2001",
    labelColor: "#d4af37",
    accent: "#f4e4c1",
    src: "/audio/your-song-clip.mp3",
    captions: [
      "① Piano intro · solo",
      "② Opening verse · tender",
      "③ Chorus · the line everyone remembers",
      "④ Duet crescendo · film climax",
    ],
  },
  {
    id: "come-what-may",
    title: "Come What May",
    artist: "Ewan McGregor & Nicole Kidman (2001)",
    year: "2001",
    era: "2001",
    labelColor: "#9e1b32",
    accent: "#f4e4c1",
    src: "/audio/come-what-may-clip.mp3",
    captions: [
      "① Hushed confession",
      "② Rising string swell",
      "③ Oath — the vow that binds them",
      "④ Reprise · final scene",
    ],
  },
  {
    id: "cancan",
    title: "Cancan (Orpheus in the Underworld)",
    artist: "Jacques Offenbach (1858)",
    year: "1858",
    era: "2001",
    labelColor: "#7a1f2e",
    accent: "#d4af37",
    src: "/audio/cancan-clip.mp3",
    captions: [
      "① Legendary gallop · tempo rising",
      "② Syncopated brass",
      "③ The leg kicks begin",
      "④ Curtain flourish",
    ],
  },
  {
    id: "chandelier",
    title: "Chandelier",
    artist: "Sia (2014)",
    year: "2014",
    era: "2019",
    labelColor: "#1e3a5f",
    accent: "#d4af37",
    src: "/audio/chandelier-clip.mp3",
    captions: [
      "① Spare piano · intro",
      "② The hook — desperation as release",
      "③ Chorus · Satine's public face",
      "④ Vocal fall-off",
    ],
  },
  {
    id: "firework",
    title: "Firework",
    artist: "Katy Perry (2010)",
    year: "2010",
    era: "2019",
    labelColor: "#4a0e4e",
    accent: "#f4e4c1",
    src: "/audio/firework-clip.mp3",
    captions: [
      "① Synth swell · uplift",
      "② Pre-chorus build",
      "③ Signature hook",
      "④ Bohemian rallying cry",
    ],
  },
];

export default function SlideJukebox({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const turntableRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAnimated = useRef(false);
  const [selectedId, setSelectedId] = useState<string>(TRACKS[0].id);
  const [playing, setPlaying] = useState(false);
  const [captionIdx, setCaptionIdx] = useState(0);

  const selected = TRACKS.find((t) => t.id === selectedId) || TRACKS[0];

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".jb-heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".jb-gramophone", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".jb-vinyl-card", {
        y: 60,
        opacity: 0,
        rotate: -8,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(1.4)",
        delay: 0.7,
      });
      gsap.from(".jb-info > *", {
        opacity: 0,
        x: 30,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.9,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  // Stop audio when leaving slide
  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // Cycle caption lines while playing
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setCaptionIdx((i) => (i + 1) % selected.captions.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, [playing, selected.captions.length]);

  // Spin turntable while playing
  useEffect(() => {
    if (!turntableRef.current) return;
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    tl.to(turntableRef.current, {
      rotation: 360,
      duration: 3.2,
      ease: "none",
    });
    if (playing) tl.play();
    return () => {
      tl.kill();
      gsap.set(turntableRef.current, { rotation: 0 });
    };
  }, [playing, selectedId]);

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      togglePlay();
      return;
    }
    // swap track
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedId(id);
    setCaptionIdx(0);
    setPlaying(false);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <div
      ref={ref}
      className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-10 lg:px-16 py-12 items-center"
    >
      {/* Hidden audio element, src swaps with selection */}
      <audio
        ref={audioRef}
        src={selected.src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />

      {/* LEFT: Heading + gramophone turntable */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="jb-heading">
          <SectionHeading
            number="03"
            kicker="70 songs, one story"
            title="The Jukebox"
            titleZh="点唱机模式 · 古典与当代的拼贴"
          />
        </div>

        <div className="jb-gramophone flex items-center gap-6 relative">
          {/* Gramophone horn SVG */}
          <svg viewBox="0 0 260 260" className="w-48 h-48 md:w-56 md:h-56 shrink-0">
            <defs>
              <linearGradient id="hornGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8c872" />
                <stop offset="50%" stopColor="#c79a3c" />
                <stop offset="100%" stopColor="#6b4a18" />
              </linearGradient>
              <linearGradient id="hornInner" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2d0a0a" />
                <stop offset="100%" stopColor="#1a0505" />
              </linearGradient>
            </defs>
            {/* Horn bell */}
            <path
              d="M 230 40 Q 255 80 230 130 Q 195 165 145 160 L 140 200 L 100 200 L 105 160 Q 90 155 85 145 Q 105 150 125 148 Q 170 145 200 120 Q 215 100 210 75 Q 205 55 230 40 Z"
              fill="url(#hornGrad)"
              stroke="#4a2817"
              strokeWidth="1"
            />
            {/* Horn mouth interior */}
            <ellipse
              cx="222"
              cy="85"
              rx="18"
              ry="44"
              fill="url(#hornInner)"
              transform="rotate(-18 222 85)"
            />
            {/* Curved brass tube */}
            <path
              d="M 100 200 Q 70 210 60 190 Q 55 175 70 170"
              stroke="#c79a3c"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            {/* Wooden box base */}
            <rect
              x="40"
              y="165"
              width="60"
              height="45"
              rx="3"
              fill="#3d2614"
              stroke="#d4af37"
              strokeWidth="0.8"
            />
            <rect
              x="44"
              y="169"
              width="52"
              height="37"
              rx="2"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.6"
              opacity="0.7"
            />
            {/* Crank */}
            <line
              x1="100"
              y1="185"
              x2="118"
              y2="185"
              stroke="#c79a3c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="120" cy="185" r="3" fill="#d4af37" />
            {/* Feet */}
            <rect x="42" y="210" width="10" height="6" fill="#2d0a0a" />
            <rect x="88" y="210" width="10" height="6" fill="#2d0a0a" />
          </svg>

          {/* Turntable with currently-selected vinyl */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #2d0a0a 0%, #1a0505 70%, #0a0202 100%)",
                border: "2px solid rgba(212,175,55,0.35)",
                boxShadow:
                  "0 0 40px rgba(212,175,55,0.15), inset 0 0 20px rgba(0,0,0,0.8)",
              }}
            />
            <div
              ref={turntableRef}
              className="absolute inset-3 rounded-full"
              style={{
                background: `repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 3px)`,
                border: "1px solid #2d0a0a",
              }}
            >
              {/* Record label */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                style={{
                  width: "40%",
                  height: "40%",
                  background: selected.labelColor,
                  border: `2px solid ${selected.accent}`,
                }}
              >
                <div className="text-center px-2">
                  <div
                    className="font-display italic text-[10px] md:text-xs leading-tight"
                    style={{ color: selected.accent }}
                  >
                    {selected.title}
                  </div>
                  <div
                    className="font-calibri text-[7px] md:text-[8px] tracking-widest mt-1 opacity-80"
                    style={{ color: selected.accent }}
                  >
                    {selected.year}
                  </div>
                </div>
              </div>
              {/* Spindle dot */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: "#0a0202", boxShadow: "0 0 0 1px #d4af37" }}
              />
            </div>
            {/* Tonearm */}
            <div className="absolute -right-2 top-1 pointer-events-none">
              <svg width="60" height="90" viewBox="0 0 60 90">
                <circle cx="50" cy="15" r="7" fill="#c79a3c" stroke="#4a2817" strokeWidth="1" />
                <circle cx="50" cy="15" r="2.5" fill="#2d0a0a" />
                <line
                  x1="50"
                  y1="15"
                  x2={playing ? 20 : 28}
                  y2={playing ? 75 : 82}
                  stroke="#d4af37"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "50px 15px",
                    transition: "all 0.5s ease-in-out",
                  }}
                />
                <circle cx={playing ? 20 : 28} cy={playing ? 75 : 82} r="3" fill="#d4af37" />
              </svg>
            </div>
            {/* Play/pause overlay button */}
            <button
              onClick={togglePlay}
              className="absolute left-1/2 bottom-[-46px] -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full font-cinzel text-xs tracking-[0.3em] transition-all hover:scale-105"
              style={{
                background: "rgba(10,2,2,0.85)",
                border: "1px solid #d4af37",
                color: "#d4af37",
              }}
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
              {playing ? "PAUSE" : "PLAY"}
            </button>
          </div>
        </div>

        {/* Vinyl rack — 5 selectable records */}
        <div className="flex gap-3 md:gap-5 mt-10 overflow-x-auto pb-2">
          {TRACKS.map((t) => {
            const active = t.id === selectedId;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`jb-vinyl-card group flex flex-col items-center shrink-0 w-24 md:w-28 transition-all duration-300 ${
                  active ? "-translate-y-2" : "hover:-translate-y-1"
                }`}
              >
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-transform"
                  style={{
                    background:
                      "repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 2.5px)",
                    border: active
                      ? `2px solid ${t.labelColor}`
                      : "1px solid rgba(212,175,55,0.2)",
                    boxShadow: active
                      ? `0 0 20px ${t.labelColor}66, 0 8px 16px rgba(0,0,0,0.5)`
                      : "0 4px 10px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: "48%",
                      height: "48%",
                      background: t.labelColor,
                      border: `1.5px solid ${t.accent}`,
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: "#0a0202" }}
                  />
                  {active && playing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Disc3 className="animate-spin text-rouge-100/80" size={18} />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center leading-tight">
                  <div
                    className={`font-display italic text-xs md:text-sm ${
                      active ? "text-rouge-100" : "text-rouge-50/80 group-hover:text-rouge-50"
                    }`}
                  >
                    {t.title.length > 14 ? t.title.slice(0, 13) + "…" : t.title}
                  </div>
                  <div
                    className={`font-cinzel text-[9px] tracking-[0.25em] mt-0.5 ${
                      t.era === "2019" ? "text-rouge-200" : "text-rouge-50/50"
                    }`}
                  >
                    {t.era}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: track info + caption ticker */}
      <div className="jb-info lg:col-span-5 flex flex-col gap-5 lg:pl-4">
        <div>
          <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.5em] mb-2">
            NOW PLAYING
          </div>
          <h3 className="font-display italic text-4xl md:text-5xl text-rouge-50 leading-tight">
            {selected.title}
          </h3>
          <p className="font-baskerville text-rouge-50/70 text-base mt-1">
            {selected.artist}
          </p>
        </div>

        {/* Era pill */}
        <div className="flex items-center gap-3">
          <span
            className="font-cinzel text-xs tracking-[0.3em] px-3 py-1 rounded-full"
            style={{
              border: `1px solid ${selected.era === "2019" ? "#9e1b32" : "#d4af37"}`,
              color: selected.era === "2019" ? "#f4e4c1" : "#d4af37",
              background:
                selected.era === "2019"
                  ? "rgba(158,27,50,0.15)"
                  : "rgba(212,175,55,0.08)",
            }}
          >
            {selected.era === "2019"
              ? "Added in the 2019 stage version"
              : "Already in the 2001 film"}
          </span>
        </div>

        {/* Caption ticker */}
        <div
          className="rounded-lg p-5 min-h-[160px] relative"
          style={{
            background: "rgba(10,2,2,0.55)",
            border: "1px solid rgba(212,175,55,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.4em] mb-3">
            10-SECOND PREVIEW · SCENE MARKERS
          </div>
          <ul className="space-y-2.5 font-baskerville text-rouge-50/80">
            {selected.captions.map((line, i) => (
              <li
                key={i}
                className={`transition-all duration-500 ${
                  i === captionIdx && playing
                    ? "text-rouge-100 italic translate-x-2"
                    : "opacity-60"
                }`}
              >
                {line}
              </li>
            ))}
          </ul>
          <div className="font-calibri text-rouge-50/40 text-[10px] mt-4 italic">
            * Caption markers are structural cues. Replace with lyric excerpts in
            final build if licensed.
          </div>
        </div>
      </div>
    </div>
  );
}

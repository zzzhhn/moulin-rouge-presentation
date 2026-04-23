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
  captions: string[];
};

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
      "③ Oath · the vow that binds them",
      "④ Reprise · final scene",
    ],
  },
  {
    id: "cancan",
    title: "Cancan",
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
      "② The hook · desperation as release",
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
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".jb-gramophone", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Vinyl rack: explicit set + to so final state is deterministic even
      // if the browser drops frames mid-stagger.
      gsap.set(".jb-vinyl-card", { y: 40, opacity: 0, rotate: -6 });
      gsap.to(".jb-vinyl-card", {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        delay: 0.5,
        clearProps: "transform",
      });

      gsap.from(".jb-info > *", {
        opacity: 0,
        x: 24,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setCaptionIdx((i) => (i + 1) % selected.captions.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, [playing, selected.captions.length]);

  // Spin turntable via CSS animation toggle — cheaper than a running GSAP tween
  useEffect(() => {
    if (!turntableRef.current) return;
    turntableRef.current.style.animation = playing
      ? "turntable-spin 3.2s linear infinite"
      : "none";
  }, [playing, selectedId]);

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      togglePlay();
      return;
    }
    if (audioRef.current) audioRef.current.pause();
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
      className="h-full w-full flex flex-col px-10 lg:px-16 py-10 gap-6"
    >
      <audio
        ref={audioRef}
        src={selected.src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />

      {/* Top row: heading (left) + gramophone + turntable (center) + info (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 min-h-0">
        {/* LEFT: Heading */}
        <div className="lg:col-span-4 jb-heading">
          <SectionHeading
            number="03"
            kicker="70 songs, one story"
            title="The Jukebox"
          />
        </div>

        {/* CENTER: Gramophone + turntable */}
        <div className="lg:col-span-4 jb-gramophone flex items-center justify-center gap-4">
          <svg viewBox="0 0 260 260" className="w-36 h-36 md:w-44 md:h-44 shrink-0">
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
            <path
              d="M 230 40 Q 255 80 230 130 Q 195 165 145 160 L 140 200 L 100 200 L 105 160 Q 90 155 85 145 Q 105 150 125 148 Q 170 145 200 120 Q 215 100 210 75 Q 205 55 230 40 Z"
              fill="url(#hornGrad)"
              stroke="#4a2817"
              strokeWidth="1"
            />
            <ellipse
              cx="222"
              cy="85"
              rx="18"
              ry="44"
              fill="url(#hornInner)"
              transform="rotate(-18 222 85)"
            />
            <path
              d="M 100 200 Q 70 210 60 190 Q 55 175 70 170"
              stroke="#c79a3c"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="40" y="165" width="60" height="45" rx="3" fill="#3d2614" stroke="#d4af37" strokeWidth="0.8" />
            <rect x="44" y="169" width="52" height="37" rx="2" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.7" />
            <line x1="100" y1="185" x2="118" y2="185" stroke="#c79a3c" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="120" cy="185" r="3" fill="#d4af37" />
            <rect x="42" y="210" width="10" height="6" fill="#2d0a0a" />
            <rect x="88" y="210" width="10" height="6" fill="#2d0a0a" />
          </svg>

          <div className="relative w-44 h-44 md:w-52 md:h-52 shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #2d0a0a 0%, #1a0505 70%, #0a0202 100%)",
                border: "2px solid rgba(212,175,55,0.35)",
              }}
            />
            <div
              ref={turntableRef}
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 3px)",
                border: "1px solid #2d0a0a",
                willChange: "transform",
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                style={{
                  width: "42%",
                  height: "42%",
                  background: selected.labelColor,
                  border: `2px solid ${selected.accent}`,
                }}
              >
                <div className="text-center px-1">
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
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: "#0a0202", boxShadow: "0 0 0 1px #d4af37" }}
              />
            </div>
            <div className="absolute -right-2 top-1 pointer-events-none">
              <svg width="56" height="80" viewBox="0 0 60 90">
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
                  style={{ transition: "all 0.5s ease-in-out" }}
                />
                <circle cx={playing ? 20 : 28} cy={playing ? 75 : 82} r="3" fill="#d4af37" />
              </svg>
            </div>
            <button
              onClick={togglePlay}
              className="absolute left-1/2 bottom-[-42px] -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full font-cinzel text-xs tracking-[0.3em] transition-transform hover:scale-105"
              style={{
                background: "rgba(10,2,2,0.9)",
                border: "1px solid #d4af37",
                color: "#d4af37",
              }}
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
              {playing ? "PAUSE" : "PLAY"}
            </button>
          </div>
        </div>

        {/* RIGHT: Track info + caption ticker */}
        <div className="jb-info lg:col-span-4 flex flex-col gap-4 lg:pl-2">
          <div>
            <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.5em] mb-2">
              NOW PLAYING
            </div>
            <h3 className="font-display italic text-3xl md:text-4xl text-rouge-50 leading-tight">
              {selected.title}
            </h3>
            <p className="font-baskerville text-rouge-50/70 text-sm mt-1">
              {selected.artist}
            </p>
          </div>

          <div>
            <span
              className="inline-block font-cinzel text-[10px] tracking-[0.3em] px-3 py-1 rounded-full"
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

          <div
            className="rounded-lg p-4 min-h-[140px]"
            style={{
              background: "rgba(10,2,2,0.55)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <div className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.4em] mb-2">
              10-SEC PREVIEW · SCENE MARKERS
            </div>
            <ul className="space-y-2 font-baskerville text-rouge-50/80 text-sm">
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
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH ROW: vinyl rack — all 5 always visible, no overflow */}
      <div className="w-full flex items-center justify-center gap-4 md:gap-8 pt-6 border-t border-rouge-100/15">
        {TRACKS.map((t) => {
          const active = t.id === selectedId;
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`jb-vinyl-card group flex flex-col items-center shrink-0 transition-transform duration-300 ${
                active ? "-translate-y-2" : "hover:-translate-y-1"
              }`}
            >
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
                style={{
                  background:
                    "repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 2.5px)",
                  border: active
                    ? `2px solid ${t.labelColor}`
                    : "1px solid rgba(212,175,55,0.25)",
                  boxShadow: active
                    ? `0 0 18px ${t.labelColor}66`
                    : "0 4px 8px rgba(0,0,0,0.4)",
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
              <div className="mt-2 text-center leading-tight w-28">
                <div
                  className={`font-display italic text-sm ${
                    active ? "text-rouge-100" : "text-rouge-50/80 group-hover:text-rouge-50"
                  }`}
                >
                  {t.title}
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
  );
}

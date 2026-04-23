import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Phonograph from "../Phonograph";

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
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".jb-phonograph", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.set(".jb-shelf-item", { x: -30, opacity: 0 });
      gsap.to(".jb-shelf-item", {
        x: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.6,
        clearProps: "transform",
      });

      gsap.from(".jb-info > *", {
        opacity: 0,
        x: 24,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.5,
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
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col px-10 lg:px-16 py-8 gap-4"
    >
      <audio
        ref={audioRef}
        src={selected.src}
        onEnded={() => setPlaying(false)}
        preload="none"
      />

      {/* Top heading row */}
      <div className="jb-heading shrink-0">
        <SectionHeading
          number="03"
          kicker="70 songs, one story"
          title="The Jukebox"
        />
      </div>

      {/* Main 3-column row: shelf | phonograph | info */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 items-center">
        {/* LEFT: Record shelf — 5 vinyls as a vertical stack */}
        <div className="col-span-3 flex flex-col gap-2.5 self-stretch justify-center">
          <div className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.35em] mb-1">
            RECORD SHELF
          </div>
          {TRACKS.map((t) => {
            const active = t.id === selectedId;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`jb-shelf-item group flex items-center gap-3 p-2 pr-4 rounded-md transition-all ${
                  active
                    ? "bg-rouge-100/10 ring-1 ring-rouge-100/50"
                    : "hover:bg-rouge-100/5"
                }`}
              >
                {/* Small vinyl thumbnail */}
                <div
                  className="relative w-12 h-12 rounded-full shrink-0"
                  style={{
                    background:
                      "repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 2.5px)",
                    border: active
                      ? `1.5px solid ${t.labelColor}`
                      : "1px solid rgba(212,175,55,0.2)",
                    boxShadow: active
                      ? `0 0 12px ${t.labelColor}55`
                      : "0 2px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: "50%",
                      height: "50%",
                      background: t.labelColor,
                      border: `1px solid ${t.accent}`,
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#0a0202" }}
                  />
                </div>
                {/* Track label */}
                <div className="flex-1 text-left min-w-0">
                  <div
                    className={`font-display italic text-sm leading-tight truncate ${
                      active
                        ? "text-rouge-100"
                        : "text-rouge-50/80 group-hover:text-rouge-50"
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
                {/* Play indicator for selected */}
                {active && (
                  <span className="shrink-0">
                    {playing ? (
                      <Pause className="text-rouge-100" size={14} />
                    ) : (
                      <Play className="text-rouge-100" size={14} />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* CENTER: Unified phonograph cabinet */}
        <div className="col-span-5 jb-phonograph flex flex-col items-center justify-center gap-4">
          <Phonograph
            labelColor={selected.labelColor}
            accent={selected.accent}
            title={selected.title}
            year={selected.year}
            playing={playing}
          />
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-cinzel text-xs tracking-[0.3em] transition-transform hover:scale-105"
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

        {/* RIGHT: Now playing + captions */}
        <div className="jb-info col-span-4 flex flex-col gap-4">
          <div>
            <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.5em] mb-2">
              NOW PLAYING
            </div>
            <h3 className="font-display italic text-3xl lg:text-4xl text-rouge-50 leading-tight">
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
            className="rounded-lg p-4 flex-1"
            style={{
              background: "rgba(10,2,2,0.55)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <div className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.4em] mb-3">
              10-SEC PREVIEW · SCENE MARKERS
            </div>
            <ul className="space-y-2.5 font-baskerville text-rouge-50/80 text-sm">
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
    </div>
  );
}

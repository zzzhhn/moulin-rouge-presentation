import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Phonograph from "../Phonograph";

interface Props {
  isActive: boolean;
}

// LyricLine.text is intentionally a placeholder. Replace these strings
// LOCALLY before each presentation (see public-deployed code policy: do
// not commit / push / deploy real lyric strings). The displayMs values
// match the per-line timing the group worked out against each audio clip.
type LyricLine = {
  text: string;
  displayMs: number;
};

type Track = {
  id: string;
  title: string;
  artist: string;
  year: string;
  era: "2001" | "2019";
  labelColor: string;
  accent: string;
  src: string;
  lyrics: LyricLine[];
};

const TRACKS: Track[] = [
  {
    id: "your-song",
    title: "Your Song",
    artist: "Elton John · 1970",
    year: "1970",
    era: "2001",
    labelColor: "#d4af37",
    accent: "#f4e4c1",
    src: "/audio/your-song-clip.mp4",
    lyrics: [
      { text: "[Line 1 — replace locally]", displayMs: 4000 },
      { text: "[Line 2 — replace locally]", displayMs: 4000 },
      { text: "[Line 3 — replace locally]", displayMs: 5000 },
    ],
  },
  {
    id: "lady-marmalade",
    title: "Lady Marmalade",
    artist: "Patti LaBelle · 1974",
    year: "1974",
    era: "2001",
    labelColor: "#9e1b32",
    accent: "#f4e4c1",
    src: "/audio/lady-marmalade-clip.mp4",
    lyrics: [
      { text: "[Line 1 — replace locally]", displayMs: 4000 },
      { text: "[Line 2 — replace locally]", displayMs: 4000 },
      { text: "[Line 3 — replace locally]", displayMs: 4000 },
    ],
  },
  {
    id: "come-what-may",
    title: "Come What May",
    artist: "Written for the 2001 film",
    year: "2001",
    era: "2001",
    labelColor: "#7a1f2e",
    accent: "#d4af37",
    src: "/audio/come-what-may-clip.mp4",
    lyrics: [
      { text: "[Line 1 — replace locally]", displayMs: 6000 },
      { text: "[Line 2 — replace locally]", displayMs: 7000 },
    ],
  },
  {
    id: "chandelier",
    title: "Chandelier",
    artist: "Sia · 2014",
    year: "2014",
    era: "2019",
    labelColor: "#1e3a5f",
    accent: "#d4af37",
    src: "/audio/chandelier-clip.mp4",
    lyrics: [
      { text: "[Line 1 — replace locally]", displayMs: 1000 },
      { text: "[Line 2 — replace locally]", displayMs: 7000 },
      { text: "[Line 3 — replace locally]", displayMs: 4000 },
    ],
  },
  {
    id: "firework",
    title: "Firework",
    artist: "Katy Perry · 2010",
    year: "2010",
    era: "2019",
    labelColor: "#4a0e4e",
    accent: "#f4e4c1",
    src: "/audio/firework-clip.mp4",
    lyrics: [
      { text: "[Line 1 — replace locally]", displayMs: 4000 },
      { text: "[Line 2 — replace locally]", displayMs: 4000 },
      { text: "[Line 3 — replace locally]", displayMs: 3000 },
    ],
  },
];

export default function SlideJukebox({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // One persistent <audio> element per track so each can sit at HAVE_ENOUGH_DATA
  // independently. Switching tracks just flips which element we play() — no
  // src re-assignment, no decode reset, no rebuffer wait.
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const hasAnimated = useRef(false);
  const [selectedId, setSelectedId] = useState<string>(TRACKS[0].id);
  const [playing, setPlaying] = useState(false);
  const [lyricIdx, setLyricIdx] = useState(0);

  const selected = TRACKS.find((t) => t.id === selectedId) || TRACKS[0];

  // Map cumulative ms boundaries for the current track's lyric lines once
  // per track. e.g. lyrics[0] visible from 0..displayMs, lyrics[1] from
  // displayMs..displayMs+displayMs, etc.
  const lyricBoundaries = (() => {
    const arr: number[] = [];
    let cum = 0;
    for (const l of selected.lyrics) {
      cum += l.displayMs;
      arr.push(cum);
    }
    return arr;
  })();

  const pauseAll = () => {
    Object.values(audioRefs.current).forEach((a) => {
      if (a && !a.paused) {
        a.pause();
      }
    });
  };

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
    if (!isActive) {
      pauseAll();
      setPlaying(false);
    }
  }, [isActive]);

  // Drive the active lyric line off audio.currentTime via rAF — pause/resume
  // stays in sync, and the line flips at the exact moment the boundary is
  // crossed instead of every 2.5s like the old setInterval.
  useEffect(() => {
    if (!playing) return;
    const audio = audioRefs.current[selectedId];
    if (!audio) return;

    let raf = 0;
    const tick = () => {
      const tMs = audio.currentTime * 1000;
      let idx = lyricBoundaries.length - 1;
      for (let i = 0; i < lyricBoundaries.length; i++) {
        if (tMs < lyricBoundaries[i]) {
          idx = i;
          break;
        }
      }
      setLyricIdx(idx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, selectedId, lyricBoundaries]);

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      togglePlay();
      return;
    }
    pauseAll();
    setSelectedId(id);
    setLyricIdx(0);
    // Auto-play the newly selected track from the start. Each track has
    // its own warm <audio> element, so play() resolves instantly.
    const next = audioRefs.current[id];
    if (next) {
      next.currentTime = 0;
      next.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      setPlaying(false);
    }
  };

  const togglePlay = () => {
    const a = audioRefs.current[selectedId];
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
      {/* One persistent audio element per track. Each stays warm at
          HAVE_ENOUGH_DATA so any track can start playing instantly. */}
      {TRACKS.map((t) => (
        <audio
          key={t.id}
          ref={(el) => {
            audioRefs.current[t.id] = el;
          }}
          src={t.src}
          preload="auto"
          onEnded={() => {
            if (selectedId === t.id) setPlaying(false);
          }}
        />
      ))}

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
                className={`jb-shelf-item group flex items-center gap-4 p-3 pr-4 rounded-lg transition-all ${
                  active
                    ? "bg-rouge-100/10 ring-1 ring-rouge-100/50"
                    : "hover:bg-rouge-100/5"
                }`}
              >
                {/* Vinyl thumbnail */}
                <div
                  className="relative w-16 h-16 rounded-full shrink-0"
                  style={{
                    background:
                      "repeating-radial-gradient(circle, #111 0 1px, #1a1a1a 1px 2.5px)",
                    border: active
                      ? `2px solid ${t.labelColor}`
                      : "1px solid rgba(212,175,55,0.25)",
                    boxShadow: active
                      ? `0 0 18px ${t.labelColor}66, 0 4px 10px rgba(0,0,0,0.4)`
                      : "0 3px 6px rgba(0,0,0,0.45)",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: "50%",
                      height: "50%",
                      background: t.labelColor,
                      border: `1.5px solid ${t.accent}`,
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: "#0a0202" }}
                  />
                </div>
                {/* Track label */}
                <div className="flex-1 text-left min-w-0">
                  <div
                    className={`font-display italic text-base lg:text-lg leading-tight truncate ${
                      active
                        ? "text-rouge-100"
                        : "text-rouge-50/85 group-hover:text-rouge-50"
                    }`}
                  >
                    {t.title}
                  </div>
                  <div
                    className={`font-cinzel text-[10px] tracking-[0.3em] mt-1 ${
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
                      <Pause className="text-rouge-100" size={18} />
                    ) : (
                      <Play className="text-rouge-100" size={18} />
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
            className="rounded-lg p-5 lg:p-6 flex-1 flex flex-col"
            style={{
              background: "rgba(10,2,2,0.6)",
              border: "1px solid rgba(212,175,55,0.3)",
              minHeight: "230px",
            }}
          >
            <div className="font-cinzel text-rouge-100/75 text-[10px] tracking-[0.45em] mb-4 shrink-0">
              LYRICS
            </div>
            <ul className="flex-1 flex flex-col justify-center gap-3 font-baskerville">
              {selected.lyrics.map((line, i) => {
                const isActive = i === lyricIdx && playing;
                const isPast = i < lyricIdx && playing;
                return (
                  <li
                    key={i}
                    className="leading-snug"
                    style={{
                      color: isActive ? "#f4e4c1" : "#f4e4c180",
                      fontSize: isActive ? "1.35rem" : "1rem",
                      fontStyle: isActive ? "italic" : "normal",
                      opacity: isActive ? 1 : isPast ? 0.35 : 0.55,
                      transform: isActive
                        ? "translateX(8px) scale(1.02)"
                        : "translateX(0) scale(1)",
                      textShadow: isActive
                        ? "0 0 18px rgba(212,175,55,0.45)"
                        : "none",
                      transition:
                        "color 0.6s ease, font-size 0.5s cubic-bezier(0.32, 0.72, 0.4, 1), opacity 0.6s ease, transform 0.5s cubic-bezier(0.32, 0.72, 0.4, 1), text-shadow 0.6s ease",
                    }}
                  >
                    {line.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

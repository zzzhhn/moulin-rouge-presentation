import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import SplitTextReveal from "../SplitTextReveal";
import VinylRecord from "../VinylRecord";
import GlassmorphismPanel from "../GlassmorphismPanel";

const records = [
  { labelColor: "#1e3a5f", title: "007", artist: "1971" },
  { labelColor: "#d4af37", title: "GPB", artist: "1953" },
  { labelColor: "#9e1b32", title: "Madonna", artist: "1984" },
];

const lyrics = [
  "And it was called Yellow...",
  "So I wrote a song for you...",
  "How wonderful life is while you're in the world.",
];

interface SlideMusicProps {
  isActive: boolean;
}

export default function SlideMusic({ isActive }: SlideMusicProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const recs = sectionRef.current!.querySelectorAll(".vinyl-wrap");
      const lines = sectionRef.current!.querySelectorAll(".lyric-line");

      gsap.from(recs, {
        y: -200,
        rotate: -180,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "bounce.out",
        delay: 0.8,
      });

      gsap.from(lines, {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        stagger: 1.5,
        ease: "power3.out",
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (isActive && !audioPlaying) {
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(() => {});
        setAudioPlaying(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying(false);
    }
  }, [isActive]);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-12 h-full px-8 md:px-16 py-20 gap-8 relative">
      {/* Sound wave texture on right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="flex items-end justify-center h-full gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-2 bg-rouge-100 rounded-full"
              style={{
                height: `${30 + Math.sin(i * 0.5) * 30}%`,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col justify-center relative z-10">
        <SplitTextReveal
          text="The Jukebox on Steroids"
          type="words"
          delay={0.2}
          className="font-display text-4xl md:text-5xl text-rouge-100"
          trigger={isActive}
        />
        <p className="font-body text-xl text-rouge-100/80 mt-4 tracking-wide">
          70 songs. One story.
        </p>
        <p className="font-body text-base text-rouge-50/80 mt-6 leading-relaxed">
          Music director Justin Levine turned pop culture history itself into a narrative tool.
          This is not laziness—it is postmodern collage: using existing songs to discuss eternal
          questions.
        </p>

        <GlassmorphismPanel className="mt-8 p-4 flex items-center gap-3">
          <audio
            ref={audioRef}
            src="/audio/diamonds-mashup.mp3"
            onEnded={() => setAudioPlaying(false)}
          />
          <button
            onClick={() => {
              if (audioRef.current) {
                if (audioPlaying) {
                  audioRef.current.pause();
                  setAudioPlaying(false);
                } else {
                  audioRef.current.play().catch(() => {});
                  setAudioPlaying(true);
                }
              }
            }}
            className="w-10 h-10 rounded-full border border-rouge-100 flex items-center justify-center text-rouge-100 hover:bg-rouge-100/10 transition-colors"
          >
            {audioPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <span className="font-body text-sm text-rouge-50/60">
            {audioPlaying ? "Playing Diamonds Mashup..." : "Click to Play Preview"}
          </span>
        </GlassmorphismPanel>
      </div>

      <div className="md:col-span-7 flex flex-col justify-center items-center relative z-10">
        <div className="flex items-center justify-center gap-4">
          {records.map((rec, i) => (
            <div
              key={rec.title}
              className="vinyl-wrap"
              style={{
                transform:
                  i === 0
                    ? "rotate(-15deg) translateX(-20px)"
                    : i === 2
                    ? "rotate(15deg) translateX(20px)"
                    : "rotate(0deg)",
              }}
            >
              <VinylRecord {...rec} isPlaying={audioPlaying} />
            </div>
          ))}
        </div>

        <GlassmorphismPanel className="mt-8 p-6 w-full max-w-lg">
          <h3 className="font-display text-xl text-rouge-100 italic">Your Song</h3>
          <div className="mt-4 space-y-2">
            {lyrics.map((line) => (
              <p key={line} className="lyric-line font-body text-lg text-rouge-50/90">
                {line}
              </p>
            ))}
          </div>
          <p className="font-body text-xs text-rouge-50/60 mt-3">
            From solo to duet — Satine&apos;s psychological shift.
          </p>
        </GlassmorphismPanel>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause, Film } from "lucide-react";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const VIDEO_SRC = "/video/cancan-clip.mp4";

const pillars = [
  {
    era: "1830s",
    label: "Working-class Paris",
    body:
      "Emerging in the dancehalls of Montparnasse as an improvised, defiant solo — women lifting skirts high enough to shock a Second Empire police captain.",
  },
  {
    era: "1889",
    label: "Moulin Rouge opens",
    body:
      "La Goulue, Jane Avril, Mistinguett turn the dance into a chorus-line signature. The scandal becomes ticketed entertainment.",
  },
  {
    era: "2019",
    label: "Broadway reclamation",
    body:
      "Sonya Tayeh rewrites the can-can as collective female force — footwork as manifesto rather than titillation. The skirt is still up; the gaze has been inverted.",
  },
];

export default function SlideCanCan({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAnimated = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".cc-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".cc-video-frame", {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".pillar", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.6,
      });
      gsap.from(".pull-quote", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1.1,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-5 px-10 lg:px-16 py-8"
    >
      {/* TOP ROW: compact heading (left) + pull quote (right) */}
      <div className="flex items-end justify-between gap-8">
        <div className="cc-heading">
          <SectionHeading
            number="02"
            kicker="Dance as female power"
            title="The Can-Can"
          />
        </div>
        <blockquote className="pull-quote hidden lg:block font-display italic text-rouge-100/80 text-lg max-w-md text-right border-r-2 border-rouge-100 pr-4">
          "A kick line, yes. But whose gaze are we dancing for now?"
        </blockquote>
      </div>

      {/* MIDDLE: big video taking most of the viewport width */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div
          className="cc-video-frame relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.6), inset 0 0 0 7px rgba(10,2,2,0.9), inset 0 0 0 8px rgba(212,175,55,0.45)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(158,27,50,0.05) 0 14px, transparent 14px 28px)",
              mixBlendMode: "overlay",
            }}
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-full object-cover"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            onEnded={() => setPlaying(false)}
            preload="metadata"
          />

          {!videoReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-rouge-700/85 text-center px-6">
              <Film className="text-rouge-100/70" size={60} strokeWidth={1.2} />
              <div className="font-cinzel text-rouge-100 text-sm tracking-[0.4em]">
                VIDEO PLACEHOLDER
              </div>
              <div className="font-baskerville italic text-rouge-50/60 text-base max-w-md">
                Drop the Can-Can clip at{" "}
                <code className="font-mono text-rouge-100/80 text-sm">
                  public/video/cancan-clip.mp4
                </code>
              </div>
            </div>
          )}

          {videoReady && (
            <button
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              <span
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  playing
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-90 group-hover:opacity-100 group-hover:scale-110"
                }`}
                style={{
                  background: "rgba(10,2,2,0.65)",
                  border: "2px solid #d4af37",
                }}
              >
                {playing ? (
                  <Pause className="text-rouge-100" size={38} />
                ) : (
                  <Play className="text-rouge-100 ml-1" size={40} />
                )}
              </span>
            </button>
          )}

          {/* Attribution stripe along bottom of video frame */}
          <div className="absolute left-6 bottom-4 flex items-center gap-3 pointer-events-none">
            <span className="font-cinzel text-rouge-50/55 text-[10px] tracking-[0.35em]">
              CHOREOGRAPHY
            </span>
            <span className="h-px w-6 bg-rouge-100/50" />
            <span className="font-baskerville italic text-rouge-50/70 text-sm">
              Sonya Tayeh · 2019 Production
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: 3 era pillars side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {pillars.map((p) => (
          <div
            key={p.era}
            className="pillar relative rounded-lg p-4 pl-6"
            style={{
              background: "rgba(10,2,2,0.45)",
              borderLeft: "2px solid #d4af37",
            }}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-rouge-100 text-3xl">
                {p.era}
              </span>
              <span className="font-cinzel text-rouge-50/70 text-[10px] tracking-[0.28em] uppercase">
                {p.label}
              </span>
            </div>
            <p className="font-baskerville text-rouge-50/80 text-[13.5px] leading-snug">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause, Film } from "lucide-react";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

// Placeholder video path — replace with actual file once the group supplies it
const VIDEO_SRC = "/video/cancan-clip.mp4";

const pillars = [
  {
    era: "1830s",
    label: "Origin · Working-class Paris",
    body:
      "The can-can emerges in the dancehalls of Montparnasse as an improvised, defiant solo — women lifting skirts high enough to shock a Second Empire police captain.",
  },
  {
    era: "1860s",
    label: "Moulin Rouge · Commercial spectacle",
    body:
      "By 1889 the Moulin Rouge turns it into a chorus-line signature: La Goulue, Jane Avril, Mistinguett. The scandal becomes ticketed entertainment.",
  },
  {
    era: "2019",
    label: "Broadway · Reclamation",
    body:
      "Choreographer Sonya Tayeh rewrites the can-can as collective female force — footwork as manifesto rather than titillation. The skirt is still up; the gaze has been inverted.",
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
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".cc-video-frame", {
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".pillar", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.6,
      });
      gsap.from(".pull-quote", {
        opacity: 0,
        x: 20,
        duration: 0.9,
        delay: 1.1,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  // Pause when leaving slide
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
      className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-10 lg:px-20 py-16"
    >
      {/* LEFT: heading + pillars */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="cc-heading">
          <SectionHeading
            number="02"
            kicker="Dance as female power"
            title="The Can-Can"
            titleZh="康康舞 · 为女性赋权"
          />
        </div>

        <div className="flex flex-col gap-5 mt-2">
          {pillars.map((p) => (
            <div key={p.era} className="pillar flex gap-5">
              <div className="shrink-0 w-20 pt-1">
                <div className="font-display text-rouge-100 text-3xl">{p.era}</div>
                <div className="h-px w-12 bg-rouge-100/50 mt-1" />
              </div>
              <div className="flex-1 border-l border-rouge-100/15 pl-5">
                <div className="font-cinzel text-rouge-50/70 text-[11px] tracking-[0.28em] uppercase mb-1">
                  {p.label}
                </div>
                <p className="font-baskerville text-rouge-50/85 text-[15px] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="pull-quote font-display italic text-rouge-100/85 text-lg border-l-2 border-rouge-100 pl-4 mt-4">
          "A kick line, yes. But whose gaze are we dancing for now?"
        </blockquote>
      </div>

      {/* RIGHT: video frame */}
      <div className="lg:col-span-6 flex flex-col gap-3 items-center">
        <div
          className="cc-video-frame relative w-full max-w-xl aspect-video rounded-lg overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.55), inset 0 0 0 6px rgba(10,2,2,0.85), inset 0 0 0 7px rgba(212,175,55,0.4)",
          }}
        >
          {/* Theatre curtain stripe border — subtle */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(158,27,50,0.05) 0 12px, transparent 12px 24px)",
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

          {/* Overlay when no video yet */}
          {!videoReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-rouge-700/80 text-center px-6">
              <Film className="text-rouge-100/70" size={42} strokeWidth={1.2} />
              <div className="font-cinzel text-rouge-100 text-xs tracking-[0.4em]">
                VIDEO PLACEHOLDER
              </div>
              <div className="font-baskerville italic text-rouge-50/60 text-sm max-w-xs">
                Drop the Can-Can clip at{" "}
                <code className="font-mono text-rouge-100/80">
                  public/video/cancan-clip.mp4
                </code>
              </div>
            </div>
          )}

          {/* Play/Pause overlay button */}
          {videoReady && (
            <button
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              <span
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  playing
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-90 group-hover:opacity-100 group-hover:scale-110"
                }`}
                style={{
                  background: "rgba(10,2,2,0.65)",
                  border: "2px solid #d4af37",
                  backdropFilter: "blur(6px)",
                }}
              >
                {playing ? (
                  <Pause className="text-rouge-100" size={32} />
                ) : (
                  <Play className="text-rouge-100 ml-1" size={34} />
                )}
              </span>
            </button>
          )}
        </div>
        <div className="font-calibri text-rouge-50/50 text-xs tracking-[0.25em] uppercase">
          Sonya Tayeh · Choreography · 2019 Production
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const VIDEO_SRC = "/video/cancan-clip.mp4";

const adjectiveLadder = [
  "magnificent",
  "opulent",
  "tremendous",
  "stupendous",
  "gargantuan",
];

export default function SlideCanCan({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAnimated = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(true);

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
      gsap.from(".cc-lead", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.from(".cc-adj", {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.07,
        ease: "back.out(1.6)",
        delay: 0.5,
      });
      gsap.from(".cc-video-frame", {
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.6,
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
      className="h-full w-full flex flex-col gap-4 px-8 lg:px-12 py-6"
    >
      {/* COMPACT TOP STRIP: heading + commentary + horizontal adjective ladder */}
      <div className="grid grid-cols-12 gap-6 items-center shrink-0">
        <div className="col-span-12 lg:col-span-5 cc-heading">
          <SectionHeading
            number="02"
            kicker="The dance of dissipation"
            title="The can-can"
          />
        </div>
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-2">
          <p className="cc-lead font-baskerville text-rouge-50/85 text-base lg:text-lg leading-snug">
            Spectacle is the soul of a great musical. From the crimson-and-gold
            dance hall to the diamond-glittered skirt, every frame whispers{" "}
            <span className="text-rouge-100">luxury and decadence</span> — and
            no dance embodies that abandon like the can-can.
          </p>
          {/* Horizontal adjective ladder — Toulouse's "Spectacular Spectacular" build */}
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mt-1">
            <span className="font-cinzel text-rouge-100/70 text-[11px] tracking-[0.4em] mr-1">
              "It will be —"
            </span>
            {adjectiveLadder.map((adj, i) => (
              <span
                key={adj}
                className="cc-adj font-script text-rouge-100 leading-none"
                style={{
                  fontSize: `${1.6 + i * 0.25}rem`,
                  filter: "drop-shadow(0 0 14px rgba(212,175,55,0.25))",
                }}
              >
                {adj}
                {i < adjectiveLadder.length - 1 ? "," : "!"}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BIG VIDEO — fills the rest of the viewport. The video frame holds
          a 16:9 aspect ratio and stretches as wide as it can while staying
          within viewport height. */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div
          className="cc-video-frame relative h-full max-h-full rounded-lg overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            border: "1px solid rgba(212,175,55,0.45)",
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.65), inset 0 0 0 7px rgba(10,2,2,0.92), inset 0 0 0 8px rgba(212,175,55,0.5)",
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
            onError={() => setVideoReady(false)}
            onEnded={() => setPlaying(false)}
            preload="auto"
            playsInline
          />

          {!videoReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-rouge-700/85 text-center px-6">
              <div className="font-cinzel text-rouge-100 text-base tracking-[0.4em]">
                VIDEO UNAVAILABLE
              </div>
              <div className="font-baskerville italic text-rouge-50/60 text-base">
                The video failed to load. Try a hard refresh (Cmd+Shift+R).
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
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
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
                  <Pause className="text-rouge-100" size={44} />
                ) : (
                  <Play className="text-rouge-100 ml-1" size={48} />
                )}
              </span>
            </button>
          )}

          <div className="absolute left-6 bottom-4 flex items-center gap-3 pointer-events-none">
            <span className="font-cinzel text-rouge-50/65 text-[11px] tracking-[0.35em]">
              SPECTACULAR SPECTACULAR
            </span>
            <span className="h-px w-6 bg-rouge-100/50" />
            <span className="font-baskerville italic text-rouge-50/75 text-base">
              Moulin Rouge!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

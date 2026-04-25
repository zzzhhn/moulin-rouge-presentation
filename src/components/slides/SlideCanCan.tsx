import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause } from "lucide-react";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const VIDEO_SRC = "/video/cancan-clip.mp4";

// Adjective ladder used for visual emphasis — these are the words a presenter
// can build to before cueing the video. Treat each as a stylized poster
// element, not running prose.
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
  // Assume the video is fine on mount; only flip to false on a real <video>
  // error event. Earlier we gated this on `onCanPlay`, which never fires
  // reliably together with preload="metadata" — the placeholder then
  // sat on top of the video forever.
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
        y: 16,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.6)",
        delay: 0.5,
      });
      gsap.from(".cc-video-frame", {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.7,
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
      className="h-full w-full grid grid-cols-12 gap-6 px-10 lg:px-16 py-8"
    >
      {/* LEFT (5/12): heading + commentary + adjective ladder */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 justify-center">
        <div className="cc-heading">
          <SectionHeading
            number="02"
            kicker="The dance of dissipation"
            title="The Can-Can"
          />
        </div>

        <div className="cc-lead font-baskerville text-rouge-50/85 text-[15.5px] leading-relaxed space-y-3 max-w-md">
          <p>
            A great musical cannot exist without spectacle. From the
            crimson-and-gold dance hall to the heroine's diamond-glittered
            skirt, every frame whispers the same thing —{" "}
            <span className="text-rouge-100">luxury and decadence</span>.
          </p>
          <p>
            And what most embodies that abandon is one dance: the can-can. An
            erotic, violent, vibrant scene that captures the wild Bohemian
            spirit of the entire production.
          </p>
        </div>

        {/* Adjective ladder — Toulouse-Lautrec's "Spectacular Spectacular"
            cue, rendered as stacked typography that builds to the video */}
        <div className="flex flex-col gap-1 mt-2">
          <span className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.4em]">
            "It will be —"
          </span>
          {adjectiveLadder.map((adj, i) => (
            <span
              key={adj}
              className="cc-adj font-script text-rouge-100 leading-[0.95]"
              style={{
                fontSize: `${1.6 + i * 0.35}rem`,
                paddingLeft: `${i * 0.5}rem`,
                filter: "drop-shadow(0 0 18px rgba(212,175,55,0.25))",
              }}
            >
              {adj}
              {i < adjectiveLadder.length - 1 ? "," : "!"}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT (7/12): big video frame */}
      <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
        <div
          className="cc-video-frame relative w-full aspect-video rounded-lg overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.4)",
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.6), inset 0 0 0 6px rgba(10,2,2,0.9), inset 0 0 0 7px rgba(212,175,55,0.5)",
          }}
        >
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
              <div className="font-cinzel text-rouge-100 text-sm tracking-[0.4em]">
                VIDEO UNAVAILABLE
              </div>
              <div className="font-baskerville italic text-rouge-50/60 text-sm">
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

          {/* Attribution stripe */}
          <div className="absolute left-6 bottom-4 flex items-center gap-3 pointer-events-none">
            <span className="font-cinzel text-rouge-50/55 text-[10px] tracking-[0.35em]">
              SPECTACULAR SPECTACULAR
            </span>
            <span className="h-px w-6 bg-rouge-100/50" />
            <span className="font-baskerville italic text-rouge-50/70 text-sm">
              Moulin Rouge!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

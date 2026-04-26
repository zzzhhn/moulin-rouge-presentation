import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Windmill from "../Windmill";

interface SlideLandingProps {
  isActive: boolean;
}

const members = [
  { name: "Mai Sui", sid: "121090412" },
  { name: "Li Siqi", sid: "122090271" },
  { name: "Zhong Haonan", sid: "123090894" },
  { name: "Liu Yunjie", sid: "124020291" },
  { name: "Jiao Zihan", sid: "125090274" },
];

export default function SlideLanding({ isActive }: SlideLandingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      gsap.from(".windmill-wrap", {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.from(".ornament-left, .ornament-right", {
        scaleX: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.1,
      });
      gsap.from(".title-word", {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.0,
      });
      gsap.from(".members-list li", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 1.3,
      });
      gsap.from(".hint", {
        opacity: 0,
        duration: 0.8,
        delay: 1.9,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="h-full w-full grid grid-cols-1 lg:grid-cols-12 items-center relative px-8 lg:px-16"
    >
      {/* LEFT: Windmill */}
      <div className="lg:col-span-6 flex items-center justify-center relative">
        <div className="windmill-wrap w-[min(72vh,42vw)] aspect-[400/520]">
          <Windmill className="w-full h-full" />
        </div>
      </div>

      {/* RIGHT: Text stack — title → subtitle → members */}
      <div className="lg:col-span-6 flex flex-col justify-center gap-8 lg:pl-6 pb-8 lg:pb-0">
        {/* TITLE — script font */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-2 text-rouge-100/70">
            <span className="ornament-left h-px flex-1 bg-gradient-to-r from-transparent via-rouge-100/70 to-rouge-100/70 origin-right" />
            <span className="font-cinzel text-[10px] tracking-[0.4em]">
              GED2404 · SPRING 2026
            </span>
            <span className="ornament-right h-px flex-1 bg-gradient-to-l from-transparent via-rouge-100/70 to-rouge-100/70 origin-left" />
          </div>

          {/* Title block — `leading-[1.1]` + generous per-span padding so the
              Great Vibes script ascenders (M curl, R curl) and descenders
              (g tail) always have room inside the line-box. No overflow-hidden
              anywhere along the ancestor chain. */}
          <h1 className="font-script select-none" style={{ lineHeight: 1.1, overflow: "visible" }}>
            <span className="block" style={{ overflow: "visible" }}>
              <span
                className="title-word inline-block text-[clamp(4.5rem,10vw,10rem)]"
                style={{
                  background:
                    "linear-gradient(180deg, #f4e4c1 0%, #d4af37 45%, #8a6a18 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter:
                    "drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 25px rgba(212,175,55,0.35))",
                  paddingTop: "0.25em",
                  paddingLeft: "0.15em",
                  paddingRight: "0.1em",
                  paddingBottom: "0.08em",
                  lineHeight: 1.1,
                }}
              >
                Moulin
              </span>
            </span>
            <span className="block pl-10 lg:pl-16" style={{ overflow: "visible" }}>
              <span
                className="title-word inline-block text-[clamp(4.5rem,10vw,10rem)]"
                style={{
                  background:
                    "linear-gradient(180deg, #f4e4c1 0%, #d4af37 45%, #8a6a18 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter:
                    "drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 25px rgba(212,175,55,0.35))",
                  paddingTop: "0.18em",
                  paddingLeft: "0.15em",
                  paddingRight: "0.05em",
                  paddingBottom: "0.2em",
                  lineHeight: 1.1,
                }}
              >
                Rouge
              </span>
              <span
                className="title-word inline-block text-[clamp(4.5rem,10vw,10rem)] ml-2"
                style={{
                  background:
                    "linear-gradient(180deg, #f4e4c1 0%, #d4af37 45%, #8a6a18 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter:
                    "drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 25px rgba(212,175,55,0.4))",
                  lineHeight: 1.1,
                }}
              >
                !
              </span>
            </span>
          </h1>
        </div>

        {/* SUBTITLE — Libre Baskerville */}
        <p className="subtitle font-baskerville italic text-rouge-50/80 text-lg md:text-xl tracking-wide">
          The Musical <span className="mx-2 text-rouge-100">·</span> A Century of
          Dreams
        </p>

        {/* MEMBERS — name left, SID right, Times New Roman 16pt */}
        <ul
          className="members-list space-y-2 mt-2"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: "16pt",
          }}
        >
          {members.map((m) => (
            <li
              key={m.sid}
              className="flex items-baseline gap-4 text-rouge-50/88"
            >
              <span className="whitespace-nowrap">{m.name}</span>
              <span className="h-px flex-1 bg-rouge-100/25 translate-y-[-4px]" />
              <span className="text-rouge-100/85 tabular-nums whitespace-nowrap">
                {m.sid}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hint absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-rouge-50/40 tracking-[0.3em] uppercase">
        <span className="inline-block animate-bounce">↓</span>
        <span className="ml-2">Space or Scroll to Enter</span>
      </div>
    </div>
  );
}

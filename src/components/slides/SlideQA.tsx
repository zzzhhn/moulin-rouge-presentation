import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  isActive: boolean;
}

// Prompt questions the group may choose to seed the Q&A with, or simply
// display behind them as ambient intellectual invitation.
const prompts = [
  "Is Satine's death still necessary for love to feel eternal?",
  "Whose gaze does the Can-Can dance for in 2020?",
  "Does the jukebox format cheapen storytelling — or democratise it?",
  "If theatre can survive 18 months dark, what exactly is it made of?",
];

export default function SlideQA({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".qa-title-letter", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.06,
        duration: 1.2,
        ease: "power4.out",
      });
      gsap.from(".qa-ampersand", {
        scale: 0,
        rotation: -120,
        duration: 1,
        ease: "back.out(1.8)",
        delay: 0.5,
      });
      gsap.from(".qa-prompt", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.0,
      });
      gsap.from(".qa-thanks", {
        opacity: 0,
        duration: 1,
        delay: 1.9,
      });
      gsap.from(".qa-flourish", {
        scaleX: 0,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out",
        delay: 1.9,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col items-center justify-center px-10 lg:px-20 py-12 relative"
    >
      <div className="flex items-center justify-center gap-6 md:gap-10 relative">
        {["Q"].map((c) => (
          <span
            key={c}
            className="qa-title-letter font-script text-[clamp(9rem,20vw,18rem)] leading-none inline-block"
            style={{
              background:
                "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 30px rgba(212,175,55,0.35))",
            }}
          >
            {c}
          </span>
        ))}

        <span className="qa-ampersand font-script text-[clamp(5rem,10vw,9rem)] text-rouge-200 leading-none italic">
          &amp;
        </span>

        {["A"].map((c) => (
          <span
            key={c}
            className="qa-title-letter font-script text-[clamp(9rem,20vw,18rem)] leading-none inline-block"
            style={{
              background:
                "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 30px rgba(212,175,55,0.35))",
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="qa-flourish flex items-center gap-4 mt-2 mb-8 origin-center">
        <span className="h-px w-32 bg-gradient-to-r from-transparent to-rouge-100/70" />
        <svg width="28" height="14" className="text-rouge-100" viewBox="0 0 28 14">
          <circle cx="14" cy="7" r="2" fill="currentColor" />
          <circle cx="4" cy="7" r="1" fill="currentColor" />
          <circle cx="24" cy="7" r="1" fill="currentColor" />
        </svg>
        <span className="h-px w-32 bg-gradient-to-l from-transparent to-rouge-100/70" />
      </div>

      <div className="max-w-2xl w-full flex flex-col gap-3">
        {prompts.map((p, i) => (
          <div
            key={p}
            className="qa-prompt flex items-baseline gap-4 font-baskerville italic text-rouge-50/80 text-base md:text-lg"
          >
            <span className="font-cinzel text-rouge-100/60 text-xs tracking-[0.3em] w-6 shrink-0">
              0{i + 1}
            </span>
            <p className="leading-relaxed">{p}</p>
          </div>
        ))}
      </div>

      <div className="qa-thanks absolute bottom-10 flex flex-col items-center gap-1">
        <div className="font-script text-rouge-100 text-4xl md:text-5xl leading-none">
          Merci
        </div>
        <div className="font-cinzel text-rouge-50/50 text-[10px] tracking-[0.5em] mt-2">
          GROUP X · GED2404 · SPRING 2026
        </div>
      </div>
    </div>
  );
}

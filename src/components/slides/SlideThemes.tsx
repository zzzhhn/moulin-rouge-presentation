import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const creeds = [
  { word: "Freedom" },
  { word: "Beauty" },
  { word: "Truth" },
  { word: "Love" },
];

type ThemeIcon = "heart" | "mask" | "crown" | "muse" | "hourglass";

const themes: {
  roman: string;
  title: string;
  body: string;
  moment: string;
  icon: ThemeIcon;
}[] = [
  {
    roman: "I",
    title: "Love as the Only Truth",
    body:
      "True love transcends money, power, and class — and because it is genuine, the tragedy cuts deeper.",
    moment: "Come What May — the lovers' secret duet, sealed against the world.",
    icon: "heart",
  },
  {
    roman: "II",
    title: "Illusion vs. Reality",
    body:
      "Satine blazes onstage, dies offstage. In a world built on lies, what is real?",
    moment: "Spectacular Spectacular — the play-within-the-play mirrors their lives.",
    icon: "mask",
  },
  {
    roman: "III",
    title: "Class, Power, Gender",
    body:
      "The Duke buys Satine's body. A 19th-century power imbalance that hasn't gone away.",
    moment: "The diamond necklace — given as a leash, worn as a brand.",
    icon: "crown",
  },
  {
    roman: "IV",
    title: "Art as Resistance",
    body:
      "Music, dance, theatre — the Bohemians' weapons. Art itself becomes a declaration of freedom.",
    moment: "Bohemian Rhapsody — sung against a backdrop of contracts and cages.",
    icon: "muse",
  },
  {
    roman: "V",
    title: "Eternity Through Death",
    body:
      "Satine's death frees love from time. The tragedy is not defeat — it is love preserved through story.",
    moment: "The final curtain falls — the song outlives the singer.",
    icon: "hourglass",
  },
];

function ThemeIconSvg({ icon }: { icon: ThemeIcon }) {
  const common = {
    width: 44,
    height: 44,
    fill: "none",
    stroke: "#d4af37",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    opacity: 0.85,
    style: { filter: "drop-shadow(0 0 12px rgba(212,175,55,0.25))" },
  };
  switch (icon) {
    case "heart":
      return (
        <svg viewBox="0 0 44 44" {...common}>
          <path d="M22 36 C 6 25, 6 11, 14 9 C 18.5 8, 22 11, 22 14 C 22 11, 25.5 8, 30 9 C 38 11, 38 25, 22 36 Z" />
          <path d="M16 17 Q 19 15 22 17" strokeWidth="0.8" opacity="0.7" />
        </svg>
      );
    case "mask":
      return (
        <svg viewBox="0 0 44 44" {...common}>
          <path d="M8 14 Q 22 8 36 14 L 36 22 Q 36 32 22 36 Q 8 32 8 22 Z" />
          <ellipse cx="15" cy="20" rx="3" ry="2.5" fill="#d4af37" opacity="0.6" />
          <ellipse cx="29" cy="20" rx="3" ry="2.5" fill="#d4af37" opacity="0.6" />
          <path d="M 16 28 Q 22 31 28 28" strokeWidth="1" />
          <path d="M 22 8 L 22 14" strokeWidth="0.8" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 44 44" {...common}>
          <path d="M 8 30 L 8 18 L 14 22 L 22 12 L 30 22 L 36 18 L 36 30 Z" />
          <line x1="8" y1="34" x2="36" y2="34" />
          <circle cx="22" cy="12" r="1.6" fill="#d4af37" />
          <circle cx="14" cy="22" r="1.2" fill="#d4af37" />
          <circle cx="30" cy="22" r="1.2" fill="#d4af37" />
        </svg>
      );
    case "muse":
      return (
        <svg viewBox="0 0 44 44" {...common}>
          <circle cx="13" cy="30" r="4" />
          <circle cx="29" cy="26" r="4" />
          <line x1="17" y1="30" x2="33" y2="26" />
          <line x1="17" y1="30" x2="17" y2="14" />
          <line x1="33" y1="26" x2="33" y2="10" />
          <path d="M 17 14 Q 25 10 33 10" strokeWidth="1" />
        </svg>
      );
    case "hourglass":
      return (
        <svg viewBox="0 0 44 44" {...common}>
          <path d="M 12 8 L 32 8 L 32 12 L 22 22 L 32 32 L 32 36 L 12 36 L 12 32 L 22 22 L 12 12 Z" />
          <line x1="10" y1="8" x2="34" y2="8" strokeWidth="1.6" />
          <line x1="10" y1="36" x2="34" y2="36" strokeWidth="1.6" />
          <circle cx="22" cy="28" r="0.8" fill="#d4af37" />
          <circle cx="22" cy="31" r="0.6" fill="#d4af37" />
        </svg>
      );
  }
}

export default function SlideThemes({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".th-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".creed", {
        y: 30,
        opacity: 0,
        scale: 0.92,
        duration: 0.65,
        stagger: 0.1,
        ease: "back.out(1.6)",
        delay: 0.4,
      });
      gsap.from(".creed-divider", {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.6,
      });
      gsap.from(".theme-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.9,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-5 px-10 lg:px-16 py-8"
    >
      <div className="th-heading">
        <SectionHeading
          number="04"
          kicker="Four creeds, five tragic dimensions"
          title="Truth · Beauty · Freedom · Love"
        />
      </div>

      {/* The Four Cardinal Creeds — large script display */}
      <div className="flex items-center justify-center gap-3 md:gap-6">
        {creeds.map((c, i) => (
          <div key={c.word} className="flex items-center gap-3 md:gap-6">
            <div className="creed text-center">
              <div
                className="font-script text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.1]"
                style={{
                  background:
                    "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 18px rgba(212,175,55,0.3))",
                  paddingTop: "0.15em",
                  paddingBottom: "0.15em",
                }}
              >
                {c.word}
              </div>
            </div>
            {i < creeds.length - 1 && (
              <svg
                className="creed-divider text-rouge-100/45 shrink-0"
                width="36"
                height="14"
                viewBox="0 0 36 14"
                aria-hidden="true"
              >
                <path
                  d="M 0 7 Q 18 7 36 7"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  fill="none"
                />
                <circle cx="18" cy="7" r="2" fill="currentColor" />
                <circle cx="6" cy="7" r="1" fill="currentColor" />
                <circle cx="30" cy="7" r="1" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Five Thematic Dimensions — wider grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 flex-1 min-h-0">
        {themes.map((t) => (
          <article
            key={t.roman}
            className="theme-card relative rounded-lg p-5 flex flex-col gap-3"
            style={{
              background: "rgba(10,2,2,0.55)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-rouge-100 text-3xl md:text-4xl tracking-wider">
                {t.roman}
              </span>
              <span className="h-px flex-1 bg-rouge-100/30" />
            </div>
            <h3 className="font-display italic text-rouge-50 text-xl md:text-2xl leading-tight">
              {t.title}
            </h3>
            <p className="font-baskerville text-rouge-50/85 text-[15px] md:text-base leading-relaxed">
              {t.body}
            </p>

            {/* Spacer pushes the moment + icon to the bottom */}
            <div className="flex-1" />

            {/* Key moment from the film — italicized, golden, divider above */}
            <div className="pt-3 border-t border-rouge-100/15 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-rouge-100/70 text-[10px] tracking-[0.35em]">
                  IN THE FILM
                </span>
                <span className="h-px flex-1 bg-rouge-100/15" />
              </div>
              <p className="font-baskerville italic text-rouge-100/85 text-[14px] md:text-[15px] leading-snug">
                {t.moment}
              </p>
              <div className="self-end mt-1">
                <ThemeIconSvg icon={t.icon} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

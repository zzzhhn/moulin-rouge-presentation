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

const themes = [
  {
    roman: "I",
    title: "Love as the Only Truth",
    body:
      "True love transcends money, power, and class — and because it is genuine, the tragedy cuts deeper.",
  },
  {
    roman: "II",
    title: "Illusion vs. Reality",
    body:
      "Satine blazes onstage, dies offstage. In a world built on lies, what is real?",
  },
  {
    roman: "III",
    title: "Class, Power, Gender",
    body:
      "The Duke buys Satine's body. A 19th-century power imbalance that hasn't gone away.",
  },
  {
    roman: "IV",
    title: "Art as Resistance",
    body:
      "Music, dance, theatre — the Bohemians' weapons. Art itself becomes a declaration of freedom.",
  },
  {
    roman: "V",
    title: "Eternity Through Death",
    body:
      "Satine's death frees love from time. The tragedy is not defeat — it is love preserved through story.",
  },
];

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
          </article>
        ))}
      </div>
    </div>
  );
}

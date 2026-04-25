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
      "True love transcends money, power, and class. Christian wields his faith in love against every worldly obstacle — making love at once salvation and destruction. Precisely because it is genuine, the tragedy cuts all the deeper.",
  },
  {
    roman: "II",
    title: "Illusion vs. Reality",
    body:
      "The Moulin Rouge runs on illusion: performance, disguise, desire. Satine blazes onstage yet is consumed offstage by disease and fear. The film keeps asking — in a world sustained by lies, what is real?",
  },
  {
    roman: "III",
    title: "Class, Power, Female Destiny",
    body:
      "The Duke uses wealth to control Satine's body and future, symbolizing patriarchal society's appropriation of female agency. Her inability to freely choose love reflects gender power imbalances that persist from the late 19th century to today.",
  },
  {
    roman: "IV",
    title: "Art as Resistance",
    body:
      "Music, dance, and theatre are the weapons the Bohemians deploy against oppression. Songs like Bohemian Rhapsody and The Show Must Go On are not just spectacle — they offer a spiritual escape. Art itself becomes a declaration of freedom.",
  },
  {
    roman: "V",
    title: "Eternity Through Death",
    body:
      "Satine's death liberates love from the constraints of time, shielding it from decay. The tragic ending is not a defeat but a completion of meaning — he preserved her through story. Death becomes the ultimate proof of love.",
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
      gsap.from(".th-closer", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        delay: 1.6,
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
            className="theme-card relative rounded-lg p-4 flex flex-col gap-2"
            style={{
              background: "rgba(10,2,2,0.55)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-rouge-100 text-xl md:text-2xl tracking-wider">
                {t.roman}
              </span>
              <span className="h-px flex-1 bg-rouge-100/30" />
            </div>
            <h3 className="font-display italic text-rouge-50 text-lg leading-tight">
              {t.title}
            </h3>
            <p className="font-baskerville text-rouge-50/75 text-[12.5px] leading-snug">
              {t.body}
            </p>
          </article>
        ))}
      </div>

      <p className="th-closer font-display italic text-rouge-100/85 text-base md:text-lg text-center max-w-4xl mx-auto">
        The tension between the film's postmodern form and its classical tragic
        core is itself a theme: amid the noise and glamour, love and suffering
        are the only real things.
      </p>
    </div>
  );
}

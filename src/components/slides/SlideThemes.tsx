import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const virtues = [
  { word: "Truth", zh: "真" },
  { word: "Beauty", zh: "美" },
  { word: "Freedom", zh: "自由" },
  { word: "Love", zh: "爱" },
];

const rows = [
  {
    axis: "Heroine",
    traviata: "Violetta Valéry — Parisian courtesan, dying of consumption",
    moulin: "Satine — star of the Moulin Rouge, dying of consumption",
  },
  {
    axis: "Sacrifice",
    traviata: "Gives up Alfredo at his father's request",
    moulin: "Denies Christian to secure the Duke's patronage",
  },
  {
    axis: "Father-figure",
    traviata: "Germont — moral authority of bourgeois family",
    moulin: "Harold Zidler — commercial authority of the cabaret",
  },
  {
    axis: "Ending",
    traviata: "Dies in Alfredo's arms as dawn breaks",
    moulin: "Dies on stage, curtain falls, the show goes on",
  },
  {
    axis: "Music",
    traviata: "Verdi's original opera (1853)",
    moulin: "Pop catalogue re-arranged for cabaret (1970–2018)",
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
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".virtue", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".th-row", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.8,
      });
      gsap.from(".th-closer", { opacity: 0, y: 15, duration: 0.9, delay: 1.6 });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-6 px-10 lg:px-20 py-12"
    >
      <div className="th-heading">
        <SectionHeading
          number="04"
          kicker="Bohemian virtues · two centuries apart"
          title="Themes & La Traviata"
          titleZh="主题 · 与《茶花女》的对比"
        />
      </div>

      {/* Bohemian virtues row */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mt-2">
        {virtues.map((v, i) => (
          <div key={v.word} className="virtue flex items-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="font-script text-rouge-100 text-3xl md:text-4xl leading-none">
                {v.word}
              </div>
              <div className="font-display text-rouge-50/60 text-sm mt-1">
                {v.zh}
              </div>
            </div>
            {i < virtues.length - 1 && (
              <svg width="30" height="12" className="text-rouge-100/40 shrink-0">
                <path
                  d="M 0 6 Q 15 6 30 6"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  fill="none"
                />
                <circle cx="15" cy="6" r="1.5" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="mt-6 grid grid-cols-12 gap-3 md:gap-6 items-stretch">
        {/* Headers */}
        <div className="col-span-2 md:col-span-2" />
        <div className="col-span-5 text-center">
          <div className="font-cinzel text-rouge-100 text-xs md:text-sm tracking-[0.35em]">
            LA TRAVIATA
          </div>
          <div className="font-baskerville italic text-rouge-50/60 text-xs mt-1">
            Verdi · 1853 · Opera
          </div>
        </div>
        <div className="col-span-5 text-center">
          <div className="font-cinzel text-rouge-200 text-xs md:text-sm tracking-[0.35em]">
            MOULIN ROUGE!
          </div>
          <div className="font-baskerville italic text-rouge-50/60 text-xs mt-1">
            Broadway · 2019 · Jukebox musical
          </div>
        </div>

        {rows.map((r) => (
          <div key={r.axis} className="th-row col-span-12 grid grid-cols-12 gap-3 md:gap-6 py-3 border-t border-rouge-100/10 items-start">
            <div className="col-span-2 font-cinzel text-rouge-100/80 text-[11px] md:text-xs tracking-[0.25em] uppercase pt-1">
              {r.axis}
            </div>
            <div className="col-span-5 font-baskerville text-rouge-50/85 text-sm md:text-[15px] leading-snug">
              {r.traviata}
            </div>
            <div className="col-span-5 font-baskerville text-rouge-50/85 text-sm md:text-[15px] leading-snug">
              {r.moulin}
            </div>
          </div>
        ))}
      </div>

      <p className="th-closer font-display italic text-rouge-100/85 text-lg md:text-xl text-center max-w-3xl mx-auto mt-4">
        "Same tuberculosis, same curtain call. Between 1853 and 2019, what shifts
        is not the dying — it is who gets to narrate her death."
      </p>
    </div>
  );
}

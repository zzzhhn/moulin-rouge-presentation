import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

type Beat = {
  roman: string;
  label: string;
  headline: string;
  oneLiner: string;
  ornament: "feather" | "mask" | "cross" | "rose";
};

// 4 acts, each reduced to a single one-line beat. The visual weight comes
// from the typography (large script roman numerals, italic display titles,
// ornamental dividers + SVG flourishes), not from paragraphs of text.
const beats: Beat[] = [
  {
    roman: "I",
    label: "ACT I · The encounter",
    headline: "A poet enters the windmill",
    oneLiner:
      "Christian arrives in 1899 Paris. Satine mistakes him for the Duke. They fall in love.",
    ornament: "feather",
  },
  {
    roman: "II",
    label: "ACT II · The Duke",
    headline: "Love goes underground",
    oneLiner:
      "The Duke claims Satine. The lovers hide their affair behind rehearsals for a play.",
    ornament: "mask",
  },
  {
    roman: "III",
    label: "ACT III · The fever",
    headline: "Sickness and a forced farewell",
    oneLiner:
      "Satine is dying. To save Christian's life, she sends him away.",
    ornament: "cross",
  },
  {
    roman: "IV",
    label: "ACT IV · The premiere",
    headline: "The truth, in song",
    oneLiner:
      "Onstage, her voice tells him she still loves him — then the curtain falls, and so does she.",
    ornament: "rose",
  },
];

function Ornament({ kind }: { kind: Beat["ornament"] }) {
  const props = {
    width: 44,
    height: 44,
    fill: "none",
    stroke: "#d4af37",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    opacity: 0.85,
    style: { filter: "drop-shadow(0 0 12px rgba(212,175,55,0.25))" },
  };
  switch (kind) {
    case "feather":
      return (
        <svg viewBox="0 0 44 44" {...props}>
          <path d="M 12 36 Q 14 28 18 22 Q 24 12 32 8" />
          <path d="M 18 22 Q 22 22 26 24" />
          <path d="M 21 18 Q 24 18 28 19" />
          <path d="M 24 14 Q 27 14 30 14" />
          <path d="M 27 11 Q 30 11 32 8" />
          <line x1="12" y1="36" x2="9" y2="40" strokeWidth="1.6" />
        </svg>
      );
    case "mask":
      return (
        <svg viewBox="0 0 44 44" {...props}>
          <path d="M8 16 Q 22 10 36 16 L 36 22 Q 36 30 22 34 Q 8 30 8 22 Z" />
          <ellipse cx="15" cy="21" rx="3" ry="2.4" fill="#d4af37" opacity="0.6" />
          <ellipse cx="29" cy="21" rx="3" ry="2.4" fill="#d4af37" opacity="0.6" />
          <path d="M22 10 L 22 14" strokeWidth="0.8" />
          <path d="M 15 28 Q 22 31 29 28" strokeWidth="1" />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 44 44" {...props}>
          <circle cx="22" cy="22" r="14" />
          <line x1="22" y1="10" x2="22" y2="34" />
          <line x1="10" y1="22" x2="34" y2="22" />
          <circle cx="22" cy="22" r="2" fill="#d4af37" />
        </svg>
      );
    case "rose":
      return (
        <svg viewBox="0 0 44 44" {...props}>
          <circle cx="22" cy="20" r="6" />
          <path d="M 22 14 Q 16 16 16 22 Q 16 26 22 26" />
          <path d="M 22 14 Q 28 16 28 22 Q 28 26 22 26" />
          <path d="M 22 26 L 22 38" strokeWidth="1.2" />
          <path d="M 22 32 Q 18 30 16 26" />
          <path d="M 22 32 Q 26 30 28 26" />
        </svg>
      );
  }
}

function ActConnector() {
  return (
    <svg
      viewBox="0 0 60 14"
      width="60"
      height="14"
      className="text-rouge-100/55 shrink-0 hidden lg:block"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="7"
        x2="60"
        y2="7"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="2 4"
      />
      <path d="M 26 7 L 32 3 L 38 7 L 32 11 Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export default function SlideIntro({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".intro-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".intro-tagline", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.from(".act-card", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.55,
      });
      gsap.from(".act-connector", {
        scaleX: 0,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.75,
        transformOrigin: "left center",
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-6 px-10 lg:px-16 py-8"
    >
      <div className="intro-heading">
        <SectionHeading
          number="01"
          kicker="Paris · 1899 · A nightclub story"
          title="Moulin Rouge!"
        />
      </div>

      <p className="intro-tagline font-baskerville italic text-rouge-100/85 text-xl md:text-2xl max-w-4xl leading-snug">
        A poet, a courtesan, a duke, and a windmill that became the most
        photographed roof in Paris.
      </p>

      {/* 4-act horizontal timeline. Each act is a vertical card; gold
          dashed connectors with diamond markers sit between them on lg+. */}
      <div className="flex-1 min-h-0 flex items-stretch gap-3 lg:gap-2 mt-2">
        {beats.map((b, i) => (
          <div key={b.roman} className="flex items-center flex-1 min-w-0">
            <article
              className="act-card relative flex flex-col gap-3 lg:gap-4 px-5 py-5 rounded-lg flex-1 h-full"
              style={{
                background: "rgba(10,2,2,0.45)",
                borderLeft: "2px solid #d4af37",
              }}
            >
              {/* roman + label */}
              <header className="flex flex-col gap-1">
                <span className="font-cinzel text-rouge-100/75 text-[11px] tracking-[0.4em]">
                  {b.label}
                </span>
                <span
                  className="font-cinzel font-bold tracking-wider"
                  style={{
                    fontSize: "clamp(3rem, 4.8vw, 4.5rem)",
                    lineHeight: 1,
                    background:
                      "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 14px rgba(212,175,55,0.28))",
                  }}
                >
                  {b.roman}
                </span>
              </header>

              {/* headline (italic display) */}
              <h3 className="font-display italic text-rouge-50 text-2xl md:text-3xl leading-tight">
                {b.headline}
              </h3>

              {/* one-liner */}
              <p className="font-baskerville text-rouge-50/85 text-[15.5px] md:text-base leading-relaxed">
                {b.oneLiner}
              </p>

              {/* spacer + ornament anchored bottom-right */}
              <div className="flex-1" />
              <div className="self-end">
                <Ornament kind={b.ornament} />
              </div>
            </article>

            {i < beats.length - 1 && (
              <div className="act-connector mx-1">
                <ActConnector />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

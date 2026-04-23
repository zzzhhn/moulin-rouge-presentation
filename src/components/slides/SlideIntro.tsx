import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const facts = [
  { kv: "2001", label: "Film · Baz Luhrmann" },
  { kv: "2018", label: "World Premiere · Boston" },
  { kv: "2019", label: "Broadway · Al Hirschfeld Theatre" },
  { kv: "2020", label: "10 Tony Awards incl. Best Musical" },
  { kv: "70+", label: "Songs woven into one story" },
];

export default function SlideIntro({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".intro-heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".intro-body p", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".fact-row", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.7,
      });
      gsap.from(".poster-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-10 lg:px-20 py-16"
    >
      {/* LEFT col: heading + body */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div className="intro-heading">
          <SectionHeading
            number="01"
            kicker="A musical born of cinema"
            title="Moulin Rouge!"
          />
        </div>
        <div className="intro-body font-baskerville text-rouge-50/85 text-[17px] leading-[1.85] space-y-4 max-w-xl">
          <p>
            Born from Baz Luhrmann's 2001 <em>cinéma du look</em> film, the musical
            stage adaptation premiered in Boston in 2018 and opened at Broadway's
            Al Hirschfeld Theatre in July 2019 — where it still runs today.
          </p>
          <p>
            It is a story set in Montmartre at the turn of the 20th century: a
            poet, a cabaret star, a jealous Duke, and a nightclub owner whose
            windmill has become the most photographed roof in Paris.
          </p>
          <p className="text-rouge-100/80 italic">
            "A spectacle where Bohemia's four virtues — Truth, Beauty, Freedom,
            and above all things, Love — meet the new century's appetite for
            pop."
          </p>
        </div>
      </div>

      {/* RIGHT col: facts ladder */}
      <div className="lg:col-span-5 flex flex-col gap-4 relative">
        <div
          className="poster-card absolute -inset-6 rounded-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(212,175,55,0.08), transparent 70%)",
            border: "1px solid rgba(212,175,55,0.18)",
          }}
        />
        <span className="font-cinzel text-rouge-100 text-xs tracking-[0.4em] relative">
          TIMELINE · AT A GLANCE
        </span>
        <div className="flex flex-col divide-y divide-rouge-100/15 relative">
          {facts.map((f) => (
            <div key={f.kv} className="fact-row flex items-baseline gap-6 py-4">
              <span className="font-display text-rouge-100 text-4xl md:text-5xl tabular-nums w-24 md:w-28">
                {f.kv}
              </span>
              <span className="font-baskerville text-rouge-50/80 text-base md:text-lg flex-1">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

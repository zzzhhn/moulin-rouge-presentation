import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const rows: { dimension: string; mr: string; tcf: string }[] = [
  {
    dimension: "Narrative Style",
    mr: "Postmodern musical collage. Pop songs deconstruct tragedy; spectacle and anguish juxtaposed.",
    tcf: "19th-century realism — operatic and literary traditions, emotionally restrained.",
  },
  {
    dimension: "Female Agency",
    mr: "Satine is self-aware, contests fate. Her deception is a strategic act of protection.",
    tcf: "Marguerite treats self-sacrifice as virtue. Submissive renunciation — Victorian moral discipline.",
  },
  {
    dimension: "Logic of Separation",
    mr: "Feigned coldness to shield Christian. The lovers' bond never wavers.",
    tcf: "Yields to external pressure. Sacrifice itself is the moral centre of the story.",
  },
  {
    dimension: "Meaning of Death",
    mr: "Sublimes love into eternity. Tragedy becomes art's triumph; the story preserves her.",
    tcf: "The ultimate price of social injustice. Her death indicts an entire class system.",
  },
];

export default function SlideThemes2({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".th2-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".th2-col-head", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".th2-row", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.6,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-5 px-10 lg:px-16 py-8"
    >
      <div className="th2-heading">
        <SectionHeading
          number="04"
          kicker="A tragic legacy spanning 150 years"
          title="Comparative Analysis with La Dame aux Camélias"
        />
      </div>

      {/* Comparison table */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-x-5 gap-y-0">
        {/* Header row */}
        <div className="col-span-3 th2-col-head" />
        <div className="col-span-4 lg:col-span-4 th2-col-head text-center">
          <div className="font-cinzel text-rouge-100 text-base md:text-lg tracking-[0.35em]">
            MOULIN ROUGE!
          </div>
        </div>
        <div className="col-span-5 lg:col-span-5 th2-col-head text-center">
          <div className="font-cinzel text-rouge-50 text-base md:text-lg tracking-[0.35em]">
            LA DAME AUX CAMÉLIAS
          </div>
        </div>

        {/* Rows */}
        {rows.map((r) => (
          <div
            key={r.dimension}
            className="th2-row col-span-12 grid grid-cols-12 gap-x-5 py-5 border-t border-rouge-100/15 items-start"
          >
            <div className="col-span-3 flex flex-col gap-1 pt-1">
              <span className="font-cinzel text-rouge-100 text-[11px] md:text-xs tracking-[0.3em] uppercase">
                {r.dimension}
              </span>
              <span className="h-px w-10 bg-rouge-100/45" />
            </div>
            <p
              className="col-span-4 font-baskerville text-rouge-50/90 text-[15.5px] md:text-base leading-relaxed"
              style={{
                paddingLeft: "1rem",
                borderLeft: "2px solid rgba(212,175,55,0.55)",
              }}
            >
              {r.mr}
            </p>
            <p
              className="col-span-5 font-baskerville text-rouge-50/90 text-[15.5px] md:text-base leading-relaxed"
              style={{
                paddingLeft: "1rem",
                borderLeft: "2px solid rgba(244,228,193,0.4)",
              }}
            >
              {r.tcf}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

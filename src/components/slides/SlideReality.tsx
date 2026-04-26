import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const stats = [
  { figure: "$28M", label: "Production cost" },
  { figure: "78", label: "Pop hits in the score" },
  { figure: "10", label: "Tony Awards" },
];

export default function SlideReality({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".rl-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".rl-stat", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".rl-cover", {
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.7,
      });
      gsap.from(".rl-context > *", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.85,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-5 px-10 lg:px-16 py-8"
    >
      <div className="rl-heading">
        <SectionHeading
          number="05"
          kicker="On stage, a triumph. Off stage —"
          title="The Show vs. The Industry"
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rl-stat flex items-baseline gap-3 px-4 py-3 rounded-md"
            style={{
              background: "rgba(10,2,2,0.45)",
              borderLeft: "2px solid #d4af37",
            }}
          >
            <span className="font-display text-rouge-100 text-3xl md:text-4xl tabular-nums">
              {s.figure}
            </span>
            <span className="font-cinzel text-rouge-50/65 text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main: magazine cover (left) + critical commentary (right) */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-5 flex justify-center">
          <div
            className="rl-cover relative w-full max-w-sm rounded-md overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              border: "1px solid rgba(212,175,55,0.45)",
              boxShadow:
                "0 30px 60px rgba(0,0,0,0.65), inset 0 0 0 4px rgba(10,2,2,0.9), inset 0 0 0 5px rgba(212,175,55,0.5)",
            }}
          >
            <img
              src="/images/bully-cover.jpg"
              alt="The Hollywood Reporter, April 7 2021 — BULLY: Scott Rudin"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              className="absolute left-3 bottom-3 right-3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(10,2,2,0.9))",
                padding: "16px 12px 8px",
              }}
            >
              <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.4em]">
                THE HOLLYWOOD REPORTER
              </div>
              <div className="font-baskerville italic text-rouge-50/85 text-xs mt-1">
                April 7, 2021 · cover story
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 rl-context flex flex-col gap-5">
          <div>
            <span className="font-cinzel text-rouge-100/75 text-[11px] tracking-[0.4em]">
              THE COVER STORY
            </span>
            <h3 className="font-display italic text-rouge-50 text-3xl md:text-4xl leading-tight mt-2">
              "Everyone just knows he's an absolute monster."
            </h3>
          </div>
          <p className="font-baskerville text-rouge-50/85 text-base md:text-lg leading-relaxed">
            Behind the spectacle of Moulin Rouge! sits its lead producer{" "}
            <span className="text-rouge-100">Scott Rudin</span> — a man whose
            "volcanic behaviour" toward employees had been an open Broadway
            secret for decades. The Hollywood Reporter ran the cover above on
            April 7, 2021, and the silence finally broke.
          </p>
          <p className="font-baskerville text-rouge-50/80 text-[15px] md:text-base leading-relaxed">
            The musical that won 10 Tonys was bankrolled by a man former
            employees describe as "an absolute monster." For the cast and
            crew, every dazzling number on stage came with a question: at
            what cost?
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="h-px flex-1 bg-rouge-100/30" />
            <span className="font-display italic text-rouge-100/85 text-base">
              Continued — meet the woman who refused to stay silent.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

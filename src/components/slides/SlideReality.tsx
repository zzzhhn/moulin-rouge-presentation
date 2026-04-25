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

const mirror = [
  {
    side: "ON STAGE",
    role: "Satine",
    line: "A nightclub star, hailed as the Sparkling Diamond. To save her lover and the show, she sacrifices herself — and dies in his arms.",
    closing: "She dies for love.",
    tone: "gold",
  },
  {
    side: "BEHIND THE SCENES",
    role: "Karen Olivo",
    line:
      "Refused to return to the role. Refused to be a diamond merely admired and consumed. Refused to trade her principles for the silence of an industry.",
    closing: "She leaves — to live for justice.",
    tone: "red",
  },
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
      gsap.from(".rl-protest", {
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.from(".rl-mirror", {
        x: (i) => (i === 0 ? -40 : 40),
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 1.1,
      });
      gsap.from(".rl-question", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 1.7,
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
          kicker="A diamond who refused to shine"
          title="The Show vs. The Industry"
        />
      </div>

      {/* Top stat strip — the spectacle in numbers */}
      <div className="grid grid-cols-3 gap-4">
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
            <span className="font-cinzel text-rouge-50/65 text-[10px] tracking-[0.3em] uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* The protest — Karen Olivo */}
      <div
        className="rl-protest relative rounded-lg p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start"
        style={{
          background:
            "linear-gradient(135deg, rgba(122,31,46,0.25) 0%, rgba(10,2,2,0.55) 100%)",
          border: "1px solid rgba(158,27,50,0.5)",
        }}
      >
        <div className="shrink-0 flex flex-col gap-1">
          <div className="font-cinzel text-rouge-200 text-[10px] tracking-[0.4em]">
            APRIL 2021
          </div>
          <div className="font-display italic text-rouge-50 text-2xl md:text-3xl leading-tight">
            Karen Olivo
          </div>
          <div className="font-baskerville text-rouge-50/65 text-xs">
            Tony nominee · Satine in the original Broadway cast
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <blockquote className="font-display italic text-rouge-100 text-lg md:text-xl leading-snug border-l-2 border-rouge-100 pl-4">
            "Social justice is more important than being a shining diamond."
          </blockquote>
          <p className="font-baskerville text-rouge-50/80 text-[14px] leading-relaxed">
            On Instagram, she announced she would not return to the show — a
            protest against Broadway's collective silence on producer Scott
            Rudin's history of workplace abuse. The industry, she said, "puts
            profits above people."
          </p>
        </div>
      </div>

      {/* The mirror — stage vs reality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {mirror.map((m) => (
          <article
            key={m.side}
            className="rl-mirror relative rounded-lg p-5 flex flex-col gap-3"
            style={{
              background: "rgba(10,2,2,0.5)",
              border:
                m.tone === "red"
                  ? "1px solid rgba(158,27,50,0.45)"
                  : "1px solid rgba(212,175,55,0.35)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-cinzel text-[10px] tracking-[0.4em]"
                style={{ color: m.tone === "red" ? "#f4e4c1" : "#d4af37" }}
              >
                {m.side}
              </span>
              <span
                className="h-px flex-1"
                style={{
                  background:
                    m.tone === "red"
                      ? "rgba(158,27,50,0.5)"
                      : "rgba(212,175,55,0.4)",
                }}
              />
            </div>
            <h3
              className="font-display italic text-2xl md:text-3xl leading-tight"
              style={{ color: m.tone === "red" ? "#f4e4c1" : "#f4e4c1" }}
            >
              {m.role}
            </h3>
            <p className="font-baskerville text-rouge-50/85 text-[14px] leading-relaxed">
              {m.line}
            </p>
            <p
              className="font-display italic text-base mt-auto"
              style={{ color: m.tone === "red" ? "#9e1b32" : "#d4af37" }}
            >
              {m.closing}
            </p>
          </article>
        ))}
      </div>

      <p className="rl-question font-display italic text-rouge-50/90 text-base md:text-lg text-center max-w-4xl mx-auto leading-snug">
        If an industry's dream can only be built on the consumption of its
        practitioners' health and dignity —{" "}
        <span className="text-rouge-100">how long can that dream last?</span>
      </p>
    </div>
  );
}

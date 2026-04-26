import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

type MirrorRow = { kicker: string; value: string };

const mirror: {
  side: string;
  role: string;
  line: string;
  closing: string;
  tone: "gold" | "red";
  rows: MirrorRow[];
}[] = [
  {
    side: "ON STAGE",
    role: "Satine",
    line:
      "A nightclub star, hailed as the Sparkling Diamond. To save her lover and the show, she sacrifices herself — and dies in his arms.",
    closing: "She dies for love.",
    tone: "gold",
    rows: [
      { kicker: "Identity", value: "The Sparkling Diamond" },
      { kicker: "Stakes", value: "Her lover, her stage, her health" },
      { kicker: "Final scene", value: "Collapses on stage as the curtain falls" },
      { kicker: "Logic", value: "Sacrifice as proof of love" },
    ],
  },
  {
    side: "BEHIND THE SCENES",
    role: "Karen Olivo",
    line:
      "Refused to return to the role. Refused to be a diamond merely admired and consumed. Refused to trade her principles for the silence of an industry.",
    closing: "She leaves — to live for justice.",
    tone: "red",
    rows: [
      { kicker: "Identity", value: "Tony nominee, original Broadway Satine" },
      { kicker: "Stakes", value: "Career, income, an industry's silence" },
      { kicker: "Final act", value: "Walks away on Instagram, April 2021" },
      { kicker: "Logic", value: "Refusal as a form of voice" },
    ],
  },
];

export default function SlideRealityPart2({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".rl2-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".rl2-protest", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(".rl2-photo", {
        opacity: 0,
        x: 30,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.55,
      });
      gsap.from(".rl2-mirror", {
        x: (i) => (i === 0 ? -30 : 30),
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
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
      <div className="rl2-heading">
        <SectionHeading
          number="05"
          kicker="A diamond who refused to shine"
          title="Karen Olivo"
        />
      </div>

      {/* Top: protest card (left) + LA Times portrait (right) */}
      <div className="grid grid-cols-12 gap-5 items-stretch shrink-0">
        <div
          className="rl2-protest col-span-12 lg:col-span-7 relative rounded-lg p-5 md:p-6 flex flex-col gap-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(122,31,46,0.28) 0%, rgba(10,2,2,0.6) 100%)",
            border: "1px solid rgba(158,27,50,0.55)",
          }}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-cinzel text-rouge-100 text-[11px] tracking-[0.4em]">
              APRIL 2021
            </span>
            <span className="h-px w-10 bg-rouge-100/45" />
            <span className="font-baskerville text-rouge-50/65 text-xs italic">
              Tony nominee · Satine in the original Broadway cast
            </span>
          </div>
          <blockquote className="font-display italic text-rouge-100 text-2xl md:text-3xl leading-snug border-l-2 border-rouge-100 pl-4">
            "Social justice is more important than being a shining diamond."
          </blockquote>
          <p className="font-baskerville text-rouge-50/85 text-base md:text-lg leading-relaxed">
            On Instagram, she announced she would not return to the show — a
            protest against Broadway's collective silence on producer Scott
            Rudin's history of workplace abuse. The industry, she said,{" "}
            <span className="text-rouge-100 italic">"puts profits above people."</span>
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div
            className="rl2-photo relative w-full rounded-md overflow-hidden h-full min-h-[260px]"
            style={{
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow:
                "0 25px 55px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(10,2,2,0.9), inset 0 0 0 5px rgba(212,175,55,0.4)",
            }}
          >
            <img
              src="/images/olivo-latimes.jpg"
              alt="Karen Olivo, LA Times feature"
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(10,2,2,0.92))",
                padding: "32px 14px 12px",
              }}
            >
              <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.4em]">
                LOS ANGELES TIMES
              </div>
              <div className="font-baskerville italic text-rouge-50/85 text-sm mt-1 leading-snug">
                "Why am I making you money?" — Karen Olivo wants something
                better than Broadway.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mirror — stage Satine vs. real Olivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {mirror.map((m) => (
          <article
            key={m.side}
            className="rl2-mirror relative rounded-lg p-5 flex flex-col gap-3"
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
                className="font-cinzel text-[11px] tracking-[0.4em]"
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
            <h3 className="font-display italic text-3xl md:text-4xl leading-tight text-rouge-50">
              {m.role}
            </h3>
            <p className="font-baskerville text-rouge-50/85 text-[15px] md:text-base leading-relaxed">
              {m.line}
            </p>

            <ul className="flex flex-col divide-y divide-rouge-100/12 mt-1">
              {m.rows.map((r) => (
                <li key={r.kicker} className="flex items-baseline gap-4 py-2">
                  <span className="font-cinzel text-rouge-100/75 text-[10px] tracking-[0.3em] uppercase w-24 shrink-0">
                    {r.kicker}
                  </span>
                  <span className="font-baskerville text-rouge-50/90 text-[14.5px] leading-snug">
                    {r.value}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="font-display italic text-lg md:text-xl mt-auto pt-3 border-t border-rouge-100/15"
              style={{ color: m.tone === "red" ? "#f4e4c1" : "#d4af37" }}
            >
              {m.closing}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

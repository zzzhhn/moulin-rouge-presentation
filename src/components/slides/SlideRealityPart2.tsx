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
  body: string;
  pullQuote?: string;
  closing: string;
  tone: "gold" | "red";
  rows: MirrorRow[];
}[] = [
  {
    side: "ON STAGE",
    role: "Satine",
    body:
      "The Sparkling Diamond. To save her lover and the show, she sacrifices herself — and dies in his arms.",
    closing: "She dies for love.",
    tone: "gold",
    rows: [
      { kicker: "Stakes", value: "Her lover, her stage, her health" },
      { kicker: "Final scene", value: "Collapses on stage as the curtain falls" },
      { kicker: "Logic", value: "Sacrifice as proof of love" },
    ],
  },
  {
    side: "BEHIND THE SCENES",
    role: "Karen Olivo",
    pullQuote:
      "Social justice is more important than being a shining diamond.",
    body:
      "April 2021 — Tony nominee, original Broadway Satine. Walks away from the show in protest of producer Scott Rudin's documented abuse and the industry's silence.",
    closing: "She leaves — to live for justice.",
    tone: "red",
    rows: [
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
      gsap.from(".rl2-photo", {
        opacity: 0,
        x: -30,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".rl2-mirror", {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-4 px-10 lg:px-16 py-6"
    >
      <div className="rl2-heading shrink-0">
        <SectionHeading
          number="05"
          kicker="A diamond who refused to shine"
          title="Karen Olivo"
        />
      </div>

      {/* Main row: photo LEFT (full height) | 2 stacked mirror cards RIGHT */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-5">
        {/* LEFT — full-height photo */}
        <div className="col-span-12 lg:col-span-5 min-h-0">
          <div
            className="rl2-photo relative w-full h-full rounded-md overflow-hidden"
            style={{
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow:
                "0 25px 55px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(10,2,2,0.9), inset 0 0 0 5px rgba(212,175,55,0.4)",
            }}
          >
            <img
              src="/images/olivo-latimes.jpg"
              alt="Karen Olivo, LA Times feature"
              className="w-full h-full object-cover"
              style={{ objectPosition: "0% 30%" }}
              width={1300}
              height={1900}
              loading="eager"
              decoding="async"
              {...{ fetchpriority: "high" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(10,2,2,0.95))",
                padding: "40px 16px 14px",
              }}
            >
              <div className="font-cinzel text-rouge-100 text-[10px] tracking-[0.4em]">
                LOS ANGELES TIMES
              </div>
              <div className="font-baskerville italic text-rouge-50/85 text-sm md:text-base mt-1 leading-snug">
                "Why am I making you money?" — Karen Olivo wants something
                better than Broadway.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — 2 mirror cards stacked top/bottom */}
        <div className="col-span-12 lg:col-span-7 grid grid-rows-2 gap-4 min-h-0">
          {mirror.map((m) => (
            <article
              key={m.side}
              className="rl2-mirror relative rounded-lg p-5 flex flex-col gap-2 min-h-0"
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
              <h3 className="font-display italic text-2xl md:text-3xl leading-tight text-rouge-50">
                {m.role}
              </h3>

              {m.pullQuote && (
                <blockquote className="font-display italic text-rouge-100 text-base md:text-lg leading-snug border-l-2 border-rouge-100 pl-3">
                  "{m.pullQuote}"
                </blockquote>
              )}

              <p className="font-baskerville text-rouge-50/85 text-[14px] md:text-[15px] leading-snug">
                {m.body}
              </p>

              <ul className="flex flex-col divide-y divide-rouge-100/12 mt-1">
                {m.rows.map((r) => (
                  <li
                    key={r.kicker}
                    className="flex items-baseline gap-3 py-1.5"
                  >
                    <span className="font-cinzel text-rouge-100/75 text-[10px] tracking-[0.28em] uppercase w-24 shrink-0">
                      {r.kicker}
                    </span>
                    <span className="font-baskerville text-rouge-50/90 text-[13.5px] md:text-sm leading-snug">
                      {r.value}
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className="font-display italic text-base md:text-lg mt-auto pt-2 border-t border-rouge-100/15"
                style={{ color: m.tone === "red" ? "#f4e4c1" : "#d4af37" }}
              >
                {m.closing}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

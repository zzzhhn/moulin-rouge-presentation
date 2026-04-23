import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const timeline = [
  {
    date: "Jul 25, 2019",
    event: "Broadway Opening",
    body:
      "Moulin Rouge! opens at the Al Hirschfeld Theatre. Sold-out houses for the first eight months.",
    tone: "gold",
  },
  {
    date: "Mar 12, 2020",
    event: "Shutdown",
    body:
      "The Broadway League suspends all performances. Marquees go dark for the first time since 9/11.",
    tone: "red",
  },
  {
    date: "Sep 24, 2021",
    event: "Reopening",
    body:
      "After 561 dark days, the company returns. The windmill turns again for a masked, vaccinated audience.",
    tone: "gold",
  },
  {
    date: "2022 →",
    event: "Afterlife",
    body:
      "Touring productions launch in the US, UK, Japan, Australia. The show becomes one of the pandemic's most resilient survivors.",
    tone: "gold",
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
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".rl-intro", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
      });
      gsap.from(".rl-timeline .tl-row", {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.6,
      });
      gsap.from(".rl-line", {
        scaleY: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
        transformOrigin: "top center",
      });
      gsap.from(".rl-closer", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.4,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-10 lg:px-20 py-16"
    >
      {/* LEFT: heading + reflection */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="rl-heading">
          <SectionHeading
            number="05"
            kicker="Bohemia meets a pandemic"
            title="The Show Must Go On"
          />
        </div>

        <div className="rl-intro font-baskerville text-rouge-50/85 text-[17px] leading-relaxed space-y-4">
          <p>
            Moulin Rouge! opened on Broadway just <em>234 days</em> before the
            world's largest theatre district went dark. When the windmill
            stopped turning, so did the economies of Times Square, West End,
            Sydney, and the touring circuits that feed them.
          </p>
          <p>
            A musical about four Bohemians clinging to{" "}
            <span className="text-rouge-100">Truth, Beauty, Freedom, Love</span>{" "}
            inside a failing cabaret suddenly read less like nostalgia than
            prophecy.
          </p>
        </div>

        <blockquote
          className="rl-closer font-display italic text-rouge-50/85 text-xl md:text-2xl border-l-2 border-rouge-100 pl-4 mt-2"
        >
          "The show must go on" — once a cabaret cliché, then a 2020 slogan
          scrawled on shuttered theatre doors in a dozen languages.
        </blockquote>
      </div>

      {/* RIGHT: pandemic timeline */}
      <div className="lg:col-span-7 relative">
        <div className="rl-timeline relative pl-12 lg:pl-16">
          <div
            className="rl-line absolute left-4 lg:left-6 top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.6) 10%, rgba(158,27,50,0.6) 50%, rgba(212,175,55,0.6) 90%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          {timeline.map((t) => (
            <div key={t.date} className="tl-row relative mb-8 last:mb-0">
              <div
                className={`absolute -left-12 lg:-left-16 top-2 w-6 h-6 rounded-full flex items-center justify-center`}
                style={{
                  background: t.tone === "red" ? "#9e1b32" : "#d4af37",
                  boxShadow: `0 0 15px ${
                    t.tone === "red" ? "rgba(158,27,50,0.5)" : "rgba(212,175,55,0.5)"
                  }`,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-rouge-700" />
              </div>
              <div
                className="p-4 rounded-lg relative"
                style={{
                  background: "rgba(10,2,2,0.5)",
                  border: `1px solid ${
                    t.tone === "red"
                      ? "rgba(158,27,50,0.35)"
                      : "rgba(212,175,55,0.25)"
                  }`,
                }}
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-cinzel text-rouge-100 text-[11px] tracking-[0.3em]">
                    {t.date}
                  </span>
                  <span className="h-px w-6 bg-rouge-100/40" />
                  <span className="font-display italic text-rouge-50 text-lg">
                    {t.event}
                  </span>
                </div>
                <p className="font-baskerville text-rouge-50/75 text-[14.5px] leading-relaxed">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

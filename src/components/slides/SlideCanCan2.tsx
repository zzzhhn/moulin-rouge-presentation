import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

// Page 2 of Section 02: a "visual feast" zigzag layout. The Moulin Rouge
// stage shot anchors the upper-right; the dancing-Satine-in-the-crowd
// shot anchors the lower-left. Each image is paired with a phrase on its
// opposite diagonal so the eye traces an X across the page.
export default function SlideCanCan2({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".cc2-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".cc2-row", {
        opacity: 0,
        x: (i) => (i === 0 ? -40 : 40),
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(".cc2-img-frame", {
        scale: 0.94,
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
      className="h-full w-full flex flex-col gap-3 px-10 lg:px-16 py-5"
    >
      <div className="cc2-heading shrink-0">
        <SectionHeading
          number="02"
          kicker="A visual feast"
          title="Spectacle as Manifesto"
        />
      </div>

      {/* Two zigzag rows; image height capped by row height (object-cover
          handles aspect mismatch) so total never overflows the viewport. */}
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        {/* ROW 1: phrase LEFT, image RIGHT */}
        <div className="cc2-row flex-1 min-h-0 grid grid-cols-12 gap-5 items-center">
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-2">
            <span className="font-cinzel text-rouge-100/75 text-[11px] tracking-[0.4em]">
              I · THE STAGE
            </span>
            <h3 className="font-display italic text-rouge-50 text-2xl md:text-4xl leading-tight">
              The grand crimson-and-gold dance hall
            </h3>
            <p className="font-baskerville text-rouge-50/80 text-sm md:text-base leading-snug">
              Velvet drapes, ten thousand bulbs, a windmill on the left and
              an elephant on the right. Excess made architectural — a temple
              built for desire.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 h-full min-h-0">
            <div
              className="cc2-img-frame relative w-full h-full rounded-lg overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.4)",
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.55), inset 0 0 0 4px rgba(10,2,2,0.9), inset 0 0 0 5px rgba(212,175,55,0.4)",
              }}
            >
              <img
                src="/images/cancan-stage.jpg"
                alt="The Moulin Rouge stage with windmill and elephant"
                className="w-full h-full object-cover"
                width={2480}
                height={1370}
                loading="eager"
                decoding="async"
                {...{ fetchpriority: "high" }}
              />
            </div>
          </div>
        </div>

        {/* ROW 2: image LEFT, phrase RIGHT */}
        <div className="cc2-row flex-1 min-h-0 grid grid-cols-12 gap-5 items-center">
          <div className="col-span-12 lg:col-span-7 h-full min-h-0">
            <div
              className="cc2-img-frame relative w-full h-full rounded-lg overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.4)",
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.55), inset 0 0 0 4px rgba(10,2,2,0.9), inset 0 0 0 5px rgba(212,175,55,0.4)",
              }}
            >
              <img
                src="/images/cancan-satine-crowd.jpg"
                alt="Satine in glittery diamonds skirt above a roaring crowd"
                className="w-full h-full object-cover"
                width={2160}
                height={870}
                loading="eager"
                decoding="async"
                {...{ fetchpriority: "high" }}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-2">
            <span className="font-cinzel text-rouge-100/75 text-[11px] tracking-[0.4em]">
              II · THE STAR
            </span>
            <h3 className="font-display italic text-rouge-50 text-2xl md:text-4xl leading-tight">
              The heroine's glittering diamond skirt
            </h3>
            <p className="font-baskerville text-rouge-50/80 text-sm md:text-base leading-snug">
              Satine descends on a swing, mobbed by top-hatted men waving
              banknotes. The costume catches every spotlight — beauty as
              both lure and armour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

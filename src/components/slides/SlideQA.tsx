import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  isActive: boolean;
}

export default function SlideQA({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".qa-title-letter", {
        y: 30,
        opacity: 0,
        scale: 0.96,
        stagger: 0.1,
        duration: 1.0,
        ease: "power3.out",
      });
      gsap.from(".qa-ampersand", {
        scale: 0,
        rotation: -120,
        duration: 1,
        ease: "back.out(1.8)",
        delay: 0.4,
      });
      gsap.from(".qa-flourish", {
        scaleX: 0,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out",
        delay: 0.9,
      });
      gsap.from(".qa-question", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        delay: 1.1,
      });
      gsap.from(".qa-thanks", {
        opacity: 0,
        duration: 1,
        delay: 1.7,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col items-center justify-center px-10 lg:px-20 py-12 relative"
      style={{ overflow: "visible" }}
    >
      {/* Title row — leading + padding tuned so the script swashes never clip */}
      <div
        className="flex items-center justify-center gap-6 md:gap-10 relative"
        style={{ overflow: "visible" }}
      >
        <span
          className="qa-title-letter font-script inline-block"
          style={{
            fontSize: "clamp(9rem, 20vw, 18rem)",
            lineHeight: 1.18,
            paddingTop: "0.22em",
            paddingBottom: "0.1em",
            paddingLeft: "0.1em",
            paddingRight: "0.05em",
            background:
              "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))",
          }}
        >
          Q
        </span>

        <span
          className="qa-ampersand font-script inline-block italic"
          style={{
            fontSize: "clamp(5rem, 10vw, 9rem)",
            lineHeight: 1.18,
            paddingTop: "0.18em",
            background:
              "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 22px rgba(212,175,55,0.4))",
          }}
        >
          &amp;
        </span>

        <span
          className="qa-title-letter font-script inline-block"
          style={{
            fontSize: "clamp(9rem, 20vw, 18rem)",
            lineHeight: 1.18,
            paddingTop: "0.22em",
            paddingBottom: "0.1em",
            paddingLeft: "0.1em",
            paddingRight: "0.05em",
            background:
              "linear-gradient(180deg, #f4e4c1 0%, #d4af37 50%, #8a6a18 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))",
          }}
        >
          A
        </span>
      </div>

      <div className="qa-flourish flex items-center gap-4 mt-2 mb-12 origin-center">
        <span className="h-px w-40 bg-gradient-to-r from-transparent to-rouge-100/70" />
        <svg width="32" height="14" className="text-rouge-100" viewBox="0 0 32 14">
          <circle cx="16" cy="7" r="2.5" fill="currentColor" />
          <circle cx="5" cy="7" r="1.2" fill="currentColor" />
          <circle cx="27" cy="7" r="1.2" fill="currentColor" />
        </svg>
        <span className="h-px w-40 bg-gradient-to-l from-transparent to-rouge-100/70" />
      </div>

      {/* Single audience-friendly prompt — calls back to the Four Creeds */}
      <p className="qa-question font-display italic text-rouge-50 text-2xl md:text-3xl lg:text-4xl text-center max-w-4xl leading-snug">
        Of{" "}
        <span className="text-rouge-100">Truth</span>,{" "}
        <span className="text-rouge-100">Beauty</span>,{" "}
        <span className="text-rouge-100">Freedom</span>,{" "}
        and{" "}
        <span className="text-rouge-100">Love</span>{" "}
        — which speaks loudest to you tonight?
      </p>

      <div className="qa-thanks absolute bottom-10 flex flex-col items-center gap-1">
        <div className="font-script text-rouge-100 text-5xl md:text-6xl leading-none">
          Merci
        </div>
        <div className="font-cinzel text-rouge-50/55 text-[11px] tracking-[0.5em] mt-3">
          GROUP X · GED2404 · SPRING 2026
        </div>
      </div>
    </div>
  );
}

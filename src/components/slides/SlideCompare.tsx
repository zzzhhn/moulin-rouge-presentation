import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Film, Drama, X, Check } from "lucide-react";

const filmPoints = [
  "Satine as object of rescue",
  "Male fantasy framing",
  "MTV fast-cut aesthetic",
  "Pre-2000 song canon",
];

const musicalPoints = [
  "Strategic agency",
  "Post-#MeToo rewriting",
  "Immersive club staging",
  "Lady Gaga to Lorde",
];

interface SlideCompareProps {
  isActive: boolean;
}

export default function SlideCompare({ isActive }: SlideCompareProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const left = sectionRef.current!.querySelector(".left-col");
      const right = sectionRef.current!.querySelector(".right-col");
      const vs = sectionRef.current!.querySelector(".vs-badge");
      const conclusion = sectionRef.current!.querySelector(".conclusion");

      if (left) {
        gsap.from(left, { x: -100, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.3 });
      }
      if (right) {
        gsap.from(right, { x: 100, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.3 });
      }
      if (vs) {
        gsap.from(vs, {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.8,
        });
      }
      if (conclusion) {
        gsap.from(conclusion, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out", delay: 1.2 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 h-full relative">
      {/* VS Badge */}
      <div className="vs-badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full border-2 border-rouge-100 bg-rouge-200 flex items-center justify-center hidden md:flex">
        <span className="font-display text-2xl font-bold text-rouge-100">VS</span>
      </div>

      {/* Left: Film 2001 */}
      <div
        className="left-col flex flex-col justify-center px-8 md:px-16 py-12 transition-transform duration-500"
        style={{
          background: "#0f0505",
          transform:
            hoveredSide === "left"
              ? "scaleX(1.02)"
              : hoveredSide === "right"
              ? "scaleX(0.98)"
              : "scaleX(1)",
        }}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="flex items-center gap-3 mb-6">
          <Film className="w-8 h-8 text-rouge-50/60" />
          <h2 className="font-display text-4xl text-rouge-50/60">Film 2001</h2>
        </div>
        <ul className="space-y-4">
          {filmPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <X className="w-5 h-5 text-rouge-200 mt-0.5 shrink-0" />
              <span className="font-body text-lg text-rouge-50/80 leading-loose">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Musical 2019 */}
      <div
        className="right-col flex flex-col justify-center px-8 md:px-16 py-12 transition-transform duration-500"
        style={{
          background: "#1f0a0a",
          transform:
            hoveredSide === "right"
              ? "scaleX(1.02)"
              : hoveredSide === "left"
              ? "scaleX(0.98)"
              : "scaleX(1)",
        }}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="flex items-center gap-3 mb-6">
          <Drama className="w-8 h-8 text-rouge-100" />
          <h2 className="font-display text-4xl text-rouge-100">Musical 2019</h2>
        </div>
        <ul className="space-y-4">
          {musicalPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-rouge-100 mt-0.5 shrink-0" />
              <span className="font-body text-lg text-rouge-50 leading-loose">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom conclusion */}
      <div className="conclusion absolute bottom-12 left-0 right-0 text-center px-8 z-20 hidden md:block">
        <p className="font-body text-xl italic text-rouge-100">
          &ldquo;Adaptation is not translation. It is cultural re-negotiation.&rdquo;
        </p>
      </div>
    </div>
  );
}

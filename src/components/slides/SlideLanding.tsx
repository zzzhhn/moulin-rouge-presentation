import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitTextReveal from "../SplitTextReveal";
import Windmill from "../Windmill";

interface SlideLandingProps {
  isActive: boolean;
}

export default function SlideLanding({ isActive }: SlideLandingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const windmill = sectionRef.current!.querySelector(".windmill-wrap");
      const subtitle = sectionRef.current!.querySelector(".subtitle");
      const members = sectionRef.current!.querySelector(".members");
      const hint = sectionRef.current!.querySelector(".hint");

      gsap.from(windmill, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
      gsap.from(subtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });
      gsap.from(members, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.5,
      });
      gsap.from(hint, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
        delay: 1.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center h-full relative"
    >
      <div className="windmill-wrap">
        <Windmill />
      </div>
      <div className="perspective-800">
        <SplitTextReveal
          text="Moulin Rouge!"
          type="chars"
          delay={0.5}
          className="font-display text-7xl md:text-8xl font-bold text-gold-gradient drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          trigger={isActive}
        />
      </div>
      <div className="subtitle mt-4 font-body text-lg md:text-xl tracking-[0.3em] text-rouge-50/80">
        The Musical &middot; A Century of Dreams
      </div>
      <div className="members absolute bottom-12 text-sm text-rouge-50/50 tracking-wide">
        Group Presentation &middot; Spring 2026
      </div>
      <div className="hint absolute bottom-24 text-xs text-rouge-50/40 animate-bounce">
        Press Space to Enter
      </div>
    </div>
  );
}

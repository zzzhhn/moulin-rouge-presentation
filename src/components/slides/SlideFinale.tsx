import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitTextReveal from "../SplitTextReveal";
import GlassmorphismPanel from "../GlassmorphismPanel";

const creedWords = ["Truth", "Beauty", "Freedom", "Love"];

interface SlideFinaleProps {
  isActive: boolean;
}

export default function SlideFinale({ isActive }: SlideFinaleProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const words = sectionRef.current!.querySelectorAll(".creed-word");
      const qa = sectionRef.current!.querySelector(".qa-box");
      const thanks = sectionRef.current!.querySelector(".thanks");

      gsap.from(words, {
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        delay: 3.5,
        ease: "power2.out",
      });

      if (qa) {
        gsap.from(qa, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 5,
        });
      }

      if (thanks) {
        gsap.from(thanks, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="perspective-800 max-w-4xl">
        <SplitTextReveal
          text="The greatest thing you'll ever learn is just to love, and be loved in return."
          type="words"
          delay={0.5}
          stagger={0.08}
          className="font-display text-4xl md:text-6xl italic text-rouge-100 leading-tight"
          trigger={isActive}
        />
      </div>

      <div className="flex gap-8 justify-center mt-12">
        {creedWords.map((word) => (
          <span
            key={word}
            className="creed-word font-body text-lg tracking-[0.3em] text-rouge-100 uppercase animate-pulse-glow"
          >
            {word}
          </span>
        ))}
      </div>

      <div className="qa-box max-w-2xl mt-16">
        <GlassmorphismPanel glow={true} className="p-8">
          <h3 className="font-display text-xl text-rouge-100 mb-4">
            One Question for You
          </h3>
          <p className="font-body text-lg text-rouge-50 leading-relaxed">
            Is Satine&apos;s death necessary for this love to become eternal? If she survived,
            could their love survive poverty and class difference?
          </p>
        </GlassmorphismPanel>
      </div>

      <div className="thanks mt-12">
        <p className="font-body text-sm text-rouge-50/40 tracking-widest">
          Thank you for joining us tonight.
        </p>
      </div>
    </div>
  );
}

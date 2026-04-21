import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Eye, Sparkles, Feather, Heart } from "lucide-react";
import SplitTextReveal from "../SplitTextReveal";
import SpotlightCard from "../SpotlightCard";

const creeds = [
  { icon: Eye, title: "Truth", zh: "真理", desc: "In a world of illusion, truth is the most radical act." },
  { icon: Sparkles, title: "Beauty", zh: "美", desc: "Beauty is not luxury—it is survival for the starving artist." },
  { icon: Feather, title: "Freedom", zh: "自由", desc: "Freedom to love, to create, to exist beyond class cages." },
  { icon: Heart, title: "Love", zh: "爱", desc: "The only currency that matters in the红灯区 of Montmartre." },
];

interface SlideCreedProps {
  isActive: boolean;
}

export default function SlideCreed({ isActive }: SlideCreedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".creed-card");
      const quote = sectionRef.current!.querySelector(".bottom-quote");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.8,
      });

      if (quote) {
        gsap.from(quote, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="h-full px-8 md:px-16 py-20 relative"
      style={{
        background:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.02) 10px, rgba(212,175,55,0.02) 11px)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full max-w-7xl mx-auto">
        <div className="md:col-span-4 flex flex-col justify-center">
          <SplitTextReveal
            text="1899, Montmartre"
            type="words"
            delay={0.3}
            className="font-display text-5xl font-semibold text-rouge-100"
            trigger={isActive}
          />
          <p className="font-body text-lg leading-relaxed text-rouge-50/90 mt-6">
            In the Belle Époque red-light district, marginalized artists fought the bourgeois world
            with four words. Ironically, here—truth, beauty, freedom, and love were precisely the
            most scarce commodities.
          </p>
        </div>
        <div className="md:col-span-8 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-6">
            {creeds.map((creed) => {
              const Icon = creed.icon;
              return (
                <div key={creed.title} className="creed-card">
                  <SpotlightCard>
                    <Icon className="w-8 h-8 text-rouge-100 mb-4" />
                    <h3 className="font-display text-2xl text-rouge-100">{creed.title}</h3>
                    <p className="font-body text-sm text-rouge-50/70 mt-1">{creed.zh}</p>
                    <p className="font-body text-sm text-rouge-50/60 mt-3 leading-relaxed">
                      {creed.desc}
                    </p>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bottom-quote absolute bottom-12 left-0 right-0 text-center px-8">
        <p className="font-display text-xl italic text-rouge-100/80">
          &ldquo;The greatest thing you&apos;ll ever learn is just to love, and be loved in
          return.&rdquo;
        </p>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BookOpen, Wine, RefreshCw } from "lucide-react";
import SplitTextReveal from "../SplitTextReveal";
import SpotlightCard from "../SpotlightCard";

const theories = [
  {
    badge: "Week 4",
    icon: BookOpen,
    title: "Book Musical",
    content:
      "Just as Hammerstein used the 'Book' to carry narrative skeleton, Moulin Rouge!'s play-within-a-play Bohemian Rhapsody is its Book—a fictional plot wrapping real emotion.",
  },
  {
    badge: "Week 6",
    icon: Wine,
    title: "Cabaret Tradition",
    content:
      "From Brecht/Weill's Weimar Germany Cabaret to Broadway's commercial Spectacle, Moulin Rouge inherits the 'cabaret as social microcosm' tradition, but transforms critique into postmodern collage.",
  },
  {
    badge: "Week 13",
    icon: RefreshCw,
    title: "Adaptation Theory",
    content:
      "Just as Wizard of Oz evolved into Wicked, the musical updates Satine's subjectivity, letting a 20-year-old story respond to #MeToo-era gender discourse.",
  },
];

interface SlideTheoryProps {
  isActive: boolean;
}

export default function SlideTheory({ isActive }: SlideTheoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".theory-card");

      gsap.from(cards, {
        rotateY: -90,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center h-full px-8 md:px-12 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <SplitTextReveal
        text="Back to the Course"
        type="words"
        delay={0.2}
        className="font-display text-5xl text-rouge-100"
        trigger={isActive}
      />
      <p className="font-body text-sm text-rouge-50/60 tracking-widest mt-4 uppercase">
        Three theoretical anchors
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-12 perspective-1000">
        {theories.map((theory) => {
          const Icon = theory.icon;
          return (
            <div key={theory.title} className="theory-card">
              <SpotlightCard className="h-full">
                <div className="bg-rouge-700/50 backdrop-blur-xl border border-rouge-100/20 rounded-2xl p-8 h-full">
                  <span className="inline-block bg-rouge-100 text-rouge-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                    {theory.badge}
                  </span>
                  <Icon className="w-10 h-10 text-rouge-100 mt-4" />
                  <h3 className="font-display text-2xl text-rouge-100 mt-4">{theory.title}</h3>
                  <p className="font-body text-sm text-rouge-50/80 mt-3 leading-relaxed">
                    {theory.content}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

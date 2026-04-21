import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Drama, Clapperboard, HeartCrack } from "lucide-react";
import SplitTextReveal from "../SplitTextReveal";
import GlassmorphismPanel from "../GlassmorphismPanel";

const storyNodes = [
  {
    icon: Drama,
    title: "The Mistaken Identity",
    desc: "Christian, a penniless composer, is mistaken for the Duke and falls for Satine, the star courtesan.",
  },
  {
    icon: Clapperboard,
    title: "The Play Within",
    desc: "They stage 'Bohemian Rhapsody'—a play that mirrors their own forbidden love under the Duke's watch.",
  },
  {
    icon: HeartCrack,
    title: "The Sacrifice",
    desc: "Satine gives up everything to save the Moulin Rouge, choosing love over survival, art over commerce.",
  },
];

interface SlideStoryProps {
  isActive: boolean;
}

export default function SlideStory({ isActive }: SlideStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const line = sectionRef.current!.querySelector(".timeline-line");
      const nodes = sectionRef.current!.querySelectorAll(".story-node");
      const icons = sectionRef.current!.querySelectorAll(".icon-container");
      const insight = sectionRef.current!.querySelector(".insight-box");

      if (line) {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.5,
          delay: 0.5,
          ease: "power2.out",
        });
      }

      gsap.from(nodes, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.4,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(icons, {
        scale: 0,
        duration: 0.5,
        stagger: 0.4,
        ease: "back.out(1.7)",
        delay: 0.6,
      });

      if (insight) {
        gsap.from(insight, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.8,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center justify-center h-full px-8 md:px-12 relative">
      {/* Paris skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,120 L0,80 L40,80 L40,60 L60,60 L60,40 L80,40 L80,70 L100,70 L100,50 L120,50 L120,80 L140,80 L140,30 L160,30 L160,20 L180,20 L180,80 L200,80 L200,60 L220,60 L220,40 L240,40 L240,70 L260,70 L260,50 L280,50 L280,80 L300,80 L300,30 L320,30 L320,10 L340,10 L340,80 L360,80 L360,60 L380,60 L380,40 L400,40 L400,80 L420,80 L420,50 L440,50 L440,30 L460,30 L460,70 L480,70 L480,60 L500,60 L500,40 L520,40 L520,80 L540,80 L540,20 L560,20 L560,80 L580,80 L580,60 L600,60 L600,40 L620,40 L620,70 L640,70 L640,50 L660,50 L660,80 L680,80 L680,30 L700,30 L700,80 L720,80 L720,60 L740,60 L740,40 L760,40 L760,70 L780,70 L780,50 L800,50 L800,80 L820,80 L820,30 L840,30 L840,20 L860,20 L860,80 L880,80 L880,60 L900,60 L900,40 L920,40 L920,80 L940,80 L940,50 L960,50 L960,30 L980,30 L980,70 L1000,70 L1000,60 L1020,60 L1020,40 L1040,40 L1040,80 L1060,80 L1060,20 L1080,20 L1080,80 L1100,80 L1100,60 L1120,60 L1120,40 L1140,40 L1140,70 L1160,70 L1160,50 L1180,50 L1180,80 L1200,80 L1200,120 Z"
            fill="#f4e4c1"
          />
        </svg>
      </div>

      <SplitTextReveal
        text="Love, Lies, and a Play-within-a-Play"
        type="words"
        delay={0.2}
        className="font-display text-4xl md:text-5xl text-rouge-100 text-center"
        trigger={isActive}
      />

      <div className="relative mt-12 max-w-6xl w-full">
        <div className="timeline-line absolute top-6 left-0 right-0 h-[2px] bg-rouge-100/30" />
        <div className="flex items-start justify-center gap-6 relative">
          {storyNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div key={node.title} className="story-node flex-1 text-center px-4">
                <div className="icon-container w-12 h-12 rounded-full border-2 border-rouge-100 bg-rouge-600 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-rouge-100" />
                </div>
                <h3 className="font-body text-lg font-bold text-rouge-100 mt-4">
                  {node.title}
                </h3>
                <p className="font-body text-sm text-rouge-50/80 mt-2 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="insight-box max-w-3xl mt-16">
        <GlassmorphismPanel glow={true} className="p-6">
          <div className="border-l-4 border-rouge-100 pl-6">
            <p className="font-body text-base text-rouge-50/90 leading-relaxed">
              <span className="text-rouge-100 font-semibold">Key Structure:</span> The
              play-within-a-play <em>Bohemian Rhapsody</em> is a mirror of the real romance—a
              poor musician falls for a courtesan controlled by a tyrant, just like Christian and
              Satine. This is classic meta-theatrical technique.
            </p>
          </div>
        </GlassmorphismPanel>
      </div>
    </div>
  );
}

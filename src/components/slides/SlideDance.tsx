import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const bullets = [
  { text: "4 minutes. Zero dialogue.", delay: 2 },
  { text: "Tango = control & surrender", delay: 6 },
  { text: "Jealousy made physical", delay: 12 },
];

interface SlideDanceProps {
  isActive: boolean;
}

export default function SlideDance({ isActive }: SlideDanceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !sectionRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const video = sectionRef.current!.querySelector(".video-layer");
      const title = sectionRef.current!.querySelector(".title-group");
      const items = sectionRef.current!.querySelectorAll(".bullet-item");

      if (video) {
        gsap.from(video, {
          scale: 1.1,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }

      if (title) {
        gsap.from(title, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      gsap.from(items, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 4,
        ease: "power3.out",
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={sectionRef} className="relative h-full w-full overflow-hidden bg-black">
      {/* Video layer - full screen */}
      <div className="video-layer absolute inset-0">
        <video
          src="/video/roxanne-tango.mp4"
          autoPlay={isActive}
          muted
          playsInline
          loop
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />

      {/* Text overlay */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-md z-20">
        <div className="title-group">
          <h2 className="font-display text-6xl italic text-rouge-100 drop-shadow-lg">
            Roxanne
          </h2>
          <p className="font-body text-xl text-rouge-50/90 mt-2">
            Body as Narrative
          </p>
        </div>
        <div className="mt-8 space-y-4">
          {bullets.map((bullet) => (
            <div key={bullet.text} className="bullet-item flex items-center gap-3">
              <div className="w-[3px] h-8 bg-rouge-100" />
              <p className="font-body text-lg text-rouge-50">{bullet.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <p className="font-body text-sm text-rouge-50/50 tracking-widest">
          Sonya Tayeh &middot; Tony Award for Choreography
        </p>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../SectionHeading";

interface Props {
  isActive: boolean;
}

const beats = [
  {
    label: "ACT I",
    title: "An impoverished poet enters the Moulin Rouge",
    body:
      "1899 Paris. Christian, a talented but penniless playwright, walks into the night-club to seek investment for his new show. Satine — the club's star — is sent by Zidler, the owner, to seduce the wealthy Duke for the production's funding. By accident, she mistakes Christian for the Duke. That night his voice and his words win her heart, and they fall in love.",
  },
  {
    label: "ACT II",
    title: "The Duke arrives. Love must hide",
    body:
      "When the real Duke shows up, he claims Satine for himself or threatens to withdraw the funding. Christian and Satine can only meet in secret, hiding their love behind rehearsals for a play within the play — Spectacular Spectacular.",
  },
  {
    label: "ACT III",
    title: "Sickness, threat, and a forced farewell",
    body:
      "The strain of constant work pushes Satine to exhaustion; she contracts tuberculosis. The Duke discovers the affair and threatens to kill Christian. To save him, Satine breaks Christian's heart and chooses the Duke.",
  },
  {
    label: "ACT IV",
    title: "On stage. In song. The truth comes through",
    body:
      "On opening night Christian is dragged onstage and confronts her. As Satine sings, the pain and love in her voice tell him the truth: she still loves him. The Duke draws a pistol; Zidler stops him. The premiere is a triumph — and as the curtain falls, Satine collapses in Christian's arms.",
  },
];

export default function SlideIntro({ isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      gsap.from(".intro-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".intro-tagline", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".beat-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.6,
      });
    }, ref);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col gap-6 px-10 lg:px-16 py-10"
    >
      <div className="intro-heading">
        <SectionHeading
          number="01"
          kicker="Paris · 1899 · A nightclub story"
          title="Moulin Rouge!"
        />
      </div>

      <p className="intro-tagline font-baskerville italic text-rouge-100/85 text-lg max-w-3xl">
        A story of a poor poet, a dying courtesan, a ruthless duke and a
        nightclub whose windmill became the most photographed roof in Paris.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0 overflow-hidden">
        {beats.map((b) => (
          <article
            key={b.label}
            className="beat-card relative rounded-lg p-5 pl-6 flex flex-col gap-2"
            style={{
              background: "rgba(10,2,2,0.45)",
              borderLeft: "2px solid #d4af37",
            }}
          >
            <header className="flex items-baseline gap-3">
              <span className="font-cinzel text-rouge-100 text-[11px] tracking-[0.4em]">
                {b.label}
              </span>
              <span className="h-px flex-1 bg-rouge-100/25" />
            </header>
            <h3 className="font-display italic text-rouge-50 text-xl md:text-2xl leading-tight">
              {b.title}
            </h3>
            <p className="font-baskerville text-rouge-50/80 text-[14px] leading-relaxed">
              {b.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

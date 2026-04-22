import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import AuroraBackground from "./components/AuroraBackground";
import ParticleField from "./components/ParticleField";
import BohemianOverlay from "./components/BohemianOverlay";
import ClickSpark from "./components/ClickSpark";
import ProgressBar from "./components/ProgressBar";
import SpeakerNotes from "./components/SpeakerNotes";

// Slides
import SlideLanding from "./components/slides/SlideLanding";
import SlideIntro from "./components/slides/SlideIntro";
import SlideCanCan from "./components/slides/SlideCanCan";
import SlideJukebox from "./components/slides/SlideJukebox";
import SlideThemes from "./components/slides/SlideThemes";
import SlideReality from "./components/slides/SlideReality";
import SlideQA from "./components/slides/SlideQA";

const slides = [
  SlideLanding,
  SlideIntro,
  SlideCanCan,
  SlideJukebox,
  SlideThemes,
  SlideReality,
  SlideQA,
];

const slideNotes = [
  "【封面】Welcome, we are Group presenting Moulin Rouge! The Musical — A Century of Dreams.",
  "【Section 1 · 音乐剧介绍】Overview of Moulin Rouge! — origin as 2001 Baz Luhrmann film, Broadway adaptation premiered 2019, Tony Award winner 2020.",
  "【Section 2 · 康康舞】The Can-Can — from 19th century Parisian defiance to modern female empowerment. [Video clip here]",
  "【Section 3 · 点唱机模式】Jukebox musical format — 2019 production added contemporary songs (Firework, Chandelier) to the 2001 canon.",
  "【Section 4 · 主题 & 茶花女对比】Comparing Moulin Rouge with La Traviata / La Dame aux camélias — the courtesan-tragedy archetype across centuries.",
  "【Section 5 · 与现实结合】The 2019 production and the pandemic reality — theatre under shutdown, the meaning of 'show must go on' in 2020-2021.",
  "【Section 6 · Q&A】Thank you. Questions welcomed.",
];

const TRANSITION_DURATION = 0.85;
const TRANSITION_EASE = "power3.inOut";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notesVisible, setNotesVisible] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const currentSlideRef = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        y: i === 0 ? "0%" : "100%",
        opacity: i === 0 ? 1 : 0,
        visibility: i === 0 ? "visible" : "hidden",
      });
    });
  }, []);

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (
        isAnimating.current ||
        targetIndex === currentSlideRef.current ||
        targetIndex < 0 ||
        targetIndex >= slides.length
      )
        return;

      isAnimating.current = true;
      const prevIndex = currentSlideRef.current;
      const goingDown = targetIndex > prevIndex;

      const currentEl = slideRefs.current[prevIndex];
      const nextEl = slideRefs.current[targetIndex];
      if (!currentEl || !nextEl) {
        isAnimating.current = false;
        return;
      }

      gsap.set(nextEl, {
        y: goingDown ? "100%" : "-100%",
        opacity: 0,
        visibility: "visible",
      });

      // CRITICAL: fire isActive early (at ~25% of transition) so content
      // animations overlap with the slide slide-in. This eliminates the
      // "transition-then-animate" disjointed feel.
      const EARLY_ACTIVATE_FRACTION = 0.25;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentEl, { visibility: "hidden" });
          isAnimating.current = false;
        },
      });

      tl.to(
        currentEl,
        {
          y: goingDown ? "-25%" : "25%",
          opacity: 0,
          duration: TRANSITION_DURATION,
          ease: TRANSITION_EASE,
        },
        0
      );

      tl.to(
        nextEl,
        {
          y: "0%",
          opacity: 1,
          duration: TRANSITION_DURATION,
          ease: TRANSITION_EASE,
        },
        0
      );

      tl.call(
        () => setCurrentSlide(targetIndex),
        [],
        TRANSITION_DURATION * EARLY_ACTIVATE_FRACTION
      );
    },
    []
  );

  const goNext = useCallback(() => {
    goToSlide(currentSlideRef.current + 1);
  }, [goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentSlideRef.current - 1);
  }, [goToSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "s" || e.key === "S") {
        setNotesVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    let wheelAccumulated = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccumulated += e.deltaY;
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelAccumulated) > 30) {
          if (wheelAccumulated > 0) goNext();
          else goPrev();
        }
        wheelAccumulated = 0;
      }, 50);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AuroraBackground />
      <BohemianOverlay />
      <ParticleField
        active={currentSlide === 0 || currentSlide === slides.length - 1}
        boostSpeed={currentSlide === slides.length - 1}
      />
      <ClickSpark />

      <main className="relative z-10 w-full h-full">
        {slides.map((Slide, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0 w-full h-full"
            style={{ visibility: i === 0 ? "visible" : "hidden" }}
          >
            <Slide isActive={currentSlide === i} />
          </div>
        ))}
      </main>

      <ProgressBar
        current={currentSlide}
        total={slides.length}
        onNavigate={goToSlide}
      />
      <SpeakerNotes visible={notesVisible} note={slideNotes[currentSlide]} />
    </div>
  );
}

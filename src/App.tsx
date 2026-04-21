import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import AuroraBackground from "./components/AuroraBackground";
import ParticleField from "./components/ParticleField";
import SpotlightCursor from "./components/SpotlightCursor";
import ProgressBar from "./components/ProgressBar";
import SpeakerNotes from "./components/SpeakerNotes";

// Slides
import SlideLanding from "./components/slides/SlideLanding";
import SlideCreed from "./components/slides/SlideCreed";
import SlideStory from "./components/slides/SlideStory";
import SlideMusic from "./components/slides/SlideMusic";
import SlideDance from "./components/slides/SlideDance";
import SlideCompare from "./components/slides/SlideCompare";
import SlideTheory from "./components/slides/SlideTheory";
import SlideFinale from "./components/slides/SlideFinale";

const slides = [
  SlideLanding,
  SlideCreed,
  SlideStory,
  SlideMusic,
  SlideDance,
  SlideCompare,
  SlideTheory,
  SlideFinale,
];

const slideNotes = [
  "【Member 1】Hello everyone, we are Group X. Today we invite you into 1899 Paris, Moulin Rouge...",
  "【Member 1】Truth, Beauty, Freedom, Love — the Bohemian Creed. In the red-light district, they are precisely the most scarce...",
  "【Member 2】The story begins with a mistaken identity. Notice the play-within-a-play structure: the 'fake' on stage mirrors the 'real' off stage...",
  "【Member 3】This musical uses 70 pop songs, turning song history into narrative tool...",
  "【Member 3】Sonya Tayeh's Roxanne tango is the climax. In this clip you can see...",
  "【Member 4】In the film, Satine is an object waiting to be rescued. The musical gives her strategic subjectivity...",
  "【Member 5】Let's place this musical back into our course context. Week 4's Book Musical...",
  "【Member 5】Finally, one question to leave with you: Is Satine's death necessary for love to become eternal?",
];

const TRANSITION_DURATION = 0.8;
const TRANSITION_EASE = "power3.inOut";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notesVisible, setNotesVisible] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const currentSlideRef = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Initialize: hide all slides except first
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

      // Prepare next slide
      gsap.set(nextEl, {
        y: goingDown ? "100%" : "-100%",
        opacity: 0,
        visibility: "visible",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentEl, { visibility: "hidden" });
          isAnimating.current = false;
          setCurrentSlide(targetIndex);
        },
      });

      // Animate current slide out
      tl.to(
        currentEl,
        {
          y: goingDown ? "-30%" : "30%",
          opacity: 0,
          duration: TRANSITION_DURATION,
          ease: TRANSITION_EASE,
        },
        0
      );

      // Animate next slide in
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
    },
    []
  );

  const goNext = useCallback(() => {
    goToSlide(currentSlideRef.current + 1);
  }, [goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentSlideRef.current - 1);
  }, [goToSlide]);

  // Keyboard navigation
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

  // Wheel navigation with debounce
  useEffect(() => {
    let wheelAccumulated = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      wheelAccumulated += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelAccumulated) > 30) {
          if (wheelAccumulated > 0) {
            goNext();
          } else {
            goPrev();
          }
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

  // Touch navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Disable spotlight cursor on video slide (index 4)
  useEffect(() => {
    setCursorEnabled(currentSlide !== 4);
  }, [currentSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AuroraBackground />
      <ParticleField
        active={currentSlide === 0 || currentSlide === 7}
        boostSpeed={currentSlide === 7}
      />
      {cursorEnabled && <SpotlightCursor />}

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

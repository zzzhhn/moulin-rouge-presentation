import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import AuroraBackground from "./components/AuroraBackground";
import ParticleField from "./components/ParticleField";
import BohemianOverlay from "./components/BohemianOverlay";
import ClickSpark from "./components/ClickSpark";
import ProgressBar from "./components/ProgressBar";
import SpeakerNotes from "./components/SpeakerNotes";
import StageCurtain, { type CurtainState } from "./components/StageCurtain";
import AssetPreloader from "./components/AssetPreloader";

// Slides
import SlideLanding from "./components/slides/SlideLanding";
import SlideIntro from "./components/slides/SlideIntro";
import SlideCanCan from "./components/slides/SlideCanCan";
import SlideCanCan2 from "./components/slides/SlideCanCan2";
import SlideJukebox from "./components/slides/SlideJukebox";
import SlideThemes from "./components/slides/SlideThemes";
import SlideThemes2 from "./components/slides/SlideThemes2";
import SlideReality from "./components/slides/SlideReality";
import SlideRealityPart2 from "./components/slides/SlideRealityPart2";
import SlideQA from "./components/slides/SlideQA";

const slides = [
  SlideLanding,
  SlideIntro,
  SlideCanCan2,
  SlideCanCan,
  SlideJukebox,
  SlideThemes,
  SlideThemes2,
  SlideReality,
  SlideRealityPart2,
  SlideQA,
];

const slideNotes = [
  "[Cover] Welcome — Moulin Rouge! The Musical, A Century of Dreams.",
  "[01 · Story] 1899 Paris. Christian (poet) meets Satine (star). Their love is hunted by the Duke. Satine is dying. The premiere is a triumph; she dies in his arms.",
  "[02a · Visual feast] The grand crimson-and-gold dance hall and Satine's diamond skirt — beauty as both lure and armour.",
  "[02b · can-can] Spectacle as theme — luxury, decadence, the wild Bohemian spirit. Cue the can-can clip.",
  "[03 · Jukebox] Jukebox format = pop music as narrative. 2001: Your Song / Lady Marmalade / Come What May. 2019 Broadway adds Chandelier (Zidler) + Firework (Satine, post-#MeToo).",
  "[04a · Themes] Four creeds — Truth, Beauty, Freedom, Love. Five thematic dimensions.",
  "[04b · Comparative] La Dame aux Camélias (1848) and La Traviata (1853) share the tragic core, differ in narrative style, female agency, separation logic, meaning of death.",
  "[05a · The Show vs. The Industry] $28M, 78 hits, 10 Tonys. The Hollywood Reporter cover (April 7 2021) names Scott Rudin's documented abuse of cast and crew.",
  "[05b · Karen Olivo] Tony nominee, original Satine. Refused to return: 'Social justice is more important than being a shining diamond.' Stage Satine dies for love; real Olivo lives for justice.",
  "[Q & A] Thank you. Questions welcomed.",
];

const TRANSITION_DURATION = 0.85;
const TRANSITION_EASE = "power3.inOut";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notesVisible, setNotesVisible] = useState(false);
  const [curtainState, setCurtainState] = useState<CurtainState>("hidden");
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const currentSlideRef = useRef(0);
  const touchStartY = useRef(0);
  const curtainStateRef = useRef<CurtainState>("hidden");
  // Tracks whether the opening curtain reveal has played (first 0→1 navigation)
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    curtainStateRef.current = curtainState;
  }, [curtainState]);

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

      // ── Curtain reveal: first time leaving landing (0 → 1). Drop the
      // closed curtain INSTANTLY to cover the viewport, let the GSAP slide
      // transition run behind it, then part the curtain after the slide
      // has settled.
      if (
        prevIndex === 0 &&
        targetIndex === 1 &&
        !hasRevealedRef.current
      ) {
        hasRevealedRef.current = true;
        setCurtainState("closed"); // snap to closed (no transition)
        // After the slide transition completes (~1s), part the curtain
        setTimeout(() => setCurtainState("open"), 1100);
        // After the 2.2s reveal animation finishes, unmount the curtain
        setTimeout(() => setCurtainState("hidden"), 1100 + 2300);
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

  // Forward action: either advance to next slide, OR — if we're on the
  // Q&A slide and the curtain hasn't been rung down yet — drop the curtain
  // for the finale. Pressing forward again after "final" is a no-op.
  const handleForwardAction = useCallback(() => {
    if (
      currentSlideRef.current === slides.length - 1 &&
      curtainStateRef.current === "hidden"
    ) {
      // Two-step closing animation: first MOUNT the curtain in the "open"
      // (off-screen) state so it has a starting frame, then on the next
      // paint flip to "final" so the CSS transition has a from-value to
      // animate from. Without this double rAF the curtain just appears
      // already closed — no animation visible.
      setCurtainState("open");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setCurtainState("final"));
      });
      return;
    }
    // Block navigation while curtain is covering the viewport
    if (
      curtainStateRef.current === "closed" ||
      curtainStateRef.current === "final" ||
      curtainStateRef.current === "open"
    ) {
      return;
    }
    goToSlide(currentSlideRef.current + 1);
  }, [goToSlide]);

  const goPrev = useCallback(() => {
    if (curtainStateRef.current === "closed" || curtainStateRef.current === "final") return;
    goToSlide(currentSlideRef.current - 1);
  }, [goToSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleForwardAction();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "s" || e.key === "S") {
        setNotesVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleForwardAction, goPrev]);

  // Click anywhere on the viewport can also trigger the finale curtain.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on interactive elements so we don't steal their action
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, video, audio")) return;
      if (
        currentSlideRef.current === slides.length - 1 &&
        curtainStateRef.current === "hidden"
      ) {
        setCurtainState("final");
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    let wheelAccumulated = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccumulated += e.deltaY;
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelAccumulated) > 30) {
          if (wheelAccumulated > 0) handleForwardAction();
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
  }, [handleForwardAction, goPrev]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) handleForwardAction();
        else goPrev();
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleForwardAction, goPrev]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AuroraBackground />
      <BohemianOverlay />
      <ParticleField
        active={currentSlide === 0 || currentSlide === slides.length - 1}
        boostSpeed={currentSlide === slides.length - 1}
      />
      <ClickSpark />
      <AssetPreloader />

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

      {curtainState !== "final" && (
        <>
          <ProgressBar
            current={currentSlide}
            total={slides.length}
            onNavigate={goToSlide}
          />
          <SpeakerNotes visible={notesVisible} note={slideNotes[currentSlide]} />
        </>
      )}

      <StageCurtain state={curtainState} />
    </div>
  );
}

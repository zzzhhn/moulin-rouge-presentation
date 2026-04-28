export type CurtainState = "hidden" | "closed" | "open" | "final";

interface StageCurtainProps {
  state: CurtainState;
  onGoBack?: () => void;
}

// Two-panel theatre curtain.
// Transform rules per state:
//   hidden: fully off-screen (translateX ±100%), no transition — the curtain
//           is not mounted into the viewer's attention at all
//   closed: fully covering viewport (translateX 0). Reached by a SNAP on mount
//           so the user sees it dramatically appear the moment the trigger fires
//   open:   translateX ∓100% WITH a 2.2s transition — the show reveal
//   final:  translateX 0 WITH a 2.2s transition — the end-of-Q&A curtain call
export default function StageCurtain({ state, onGoBack }: StageCurtainProps) {
  if (state === "hidden") return null;

  // Transitions are ONLY applied for open/final. `closed` state renders with
  // transition: none so that mounting from hidden→closed happens instantly.
  const animated = state === "open" || state === "final";

  const leftTx =
    state === "open" ? "translateX(-100%)" : "translateX(0)";
  const rightTx =
    state === "open" ? "translateX(100%)" : "translateX(0)";

  // Rich velvet pattern — deep crimson with vertical folds
  const velvetBg = `
    linear-gradient(
      90deg,
      rgba(0,0,0,0.55) 0%,
      rgba(58,8,18,0.3) 8%,
      rgba(122,31,46,0.05) 18%,
      rgba(58,8,18,0.3) 28%,
      rgba(0,0,0,0.4) 38%,
      rgba(58,8,18,0.3) 48%,
      rgba(122,31,46,0.05) 58%,
      rgba(58,8,18,0.3) 68%,
      rgba(0,0,0,0.45) 78%,
      rgba(58,8,18,0.3) 88%,
      rgba(58,8,18,0.7) 100%
    ),
    radial-gradient(
      ellipse at 50% 0%,
      #9e1b32 0%,
      #5a1420 45%,
      #2d0a0a 100%
    )
  `;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[70] overflow-hidden"
      aria-hidden="true"
    >
      {/* Left half */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[51%]"
        style={{
          background: velvetBg,
          transform: leftTx,
          transition: animated
            ? "transform 2.2s cubic-bezier(0.32, 0.04, 0.36, 1)"
            : "none",
          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.55)",
        }}
      >
        {/* Gold tassel fringe on the right (center-meeting) edge */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[14px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.7))",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[10px] h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, #d4af37 0 2px, transparent 2px 10px)",
            opacity: 0.55,
          }}
        />
      </div>

      {/* Right half */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[51%]"
        style={{
          background: velvetBg,
          transform: rightTx,
          transition: animated
            ? "transform 2.2s cubic-bezier(0.32, 0.04, 0.36, 1)"
            : "none",
          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="absolute top-0 bottom-0 left-0 w-[14px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,175,55,0.7), transparent)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-[10px] h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, #d4af37 0 2px, transparent 2px 10px)",
            opacity: 0.55,
          }}
        />
      </div>

      {/* Top valance — decorative border visible when curtain is closed */}
      {(state === "closed" || state === "final") && (
        <div
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #2d0a0a 0%, #9e1b32 60%, transparent 100%)",
            borderBottom: "1.5px solid #d4af37",
          }}
        />
      )}

      {/* "FIN" flourish shown during the final closing */}
      {state === "final" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex flex-col items-center gap-4 opacity-0"
            style={{
              animation: "fin-appear 1.2s ease-out 2s forwards",
            }}
          >
            <div
              className="font-script"
              style={{
                fontSize: "clamp(7rem, 14vw, 12rem)",
                lineHeight: 1.2,
                paddingTop: "0.22em",
                paddingBottom: "0.18em",
                paddingLeft: "0.12em",
                paddingRight: "0.08em",
                background:
                  "linear-gradient(180deg, #f4e4c1 0%, #d4af37 45%, #8a6a18 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 30px rgba(212,175,55,0.45))",
              }}
            >
              Fin
            </div>
            <div className="font-cinzel text-rouge-100/75 text-sm tracking-[0.5em]">
              MERCI POUR VOTRE ATTENTION
            </div>
          </div>
        </div>
      )}

      {/* "Back to Q&A" rescue arrow — appears bottom-left when curtain is final.
          Lets the presenter recover if they advanced past Q&A by accident. */}
      {state === "final" && onGoBack && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onGoBack();
          }}
          aria-label="Back to Q&A"
          className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full opacity-0"
          style={{
            pointerEvents: "auto",
            background: "rgba(10,2,2,0.55)",
            border: "1px solid rgba(212,175,55,0.45)",
            color: "#f4e4c1",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            animation: "fin-appear 1s ease-out 2.5s forwards",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">
            Back
          </span>
        </button>
      )}
    </div>
  );
}

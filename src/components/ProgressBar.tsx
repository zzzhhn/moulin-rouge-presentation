import { useState } from "react";

const slideTitles = [
  "Moulin Rouge!",
  "01 · The Story",
  "02a · Visual Feast",
  "02b · The Can-Can",
  "03 · The Jukebox",
  "04a · Truth · Beauty · Freedom · Love",
  "04b · vs. La Dame aux Camélias",
  "05a · The Show vs. The Industry",
  "05b · Karen Olivo",
  "Q & A",
];

interface ProgressBarProps {
  current: number;
  total: number;
  onNavigate: (index: number) => void;
}

export default function ProgressBar({ current, total, onNavigate }: ProgressBarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {i > 0 && (
            <div
              className={`h-[1px] w-8 transition-colors duration-500 ${
                i <= current ? "bg-rouge-100/60" : "bg-rouge-100/20"
              }`}
            />
          )}
          <div className="relative">
            <button
              onClick={() => onNavigate(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "bg-rouge-100 shadow-[0_0_12px_rgba(212,175,55,0.8)] scale-125"
                  : i < current
                  ? "bg-rouge-100/40"
                  : "border border-rouge-100/30 bg-transparent"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
            {hoveredIndex === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg glass-panel whitespace-nowrap text-xs font-body text-rouge-50 animate-in fade-in duration-200">
                {slideTitles[i]}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

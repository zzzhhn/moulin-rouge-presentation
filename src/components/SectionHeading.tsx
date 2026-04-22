interface SectionHeadingProps {
  number: string;
  kicker: string;
  title: string;
  titleZh?: string;
  align?: "left" | "center";
}

// Shared section title block — gold Cinzel kicker, big Cormorant title,
// Art Nouveau flourish ornaments. Used across content slides for consistency.
export default function SectionHeading({
  number,
  kicker,
  title,
  titleZh,
  align = "left",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 ${alignCls}`}>
      <div className="flex items-center gap-3">
        <span className="font-cinzel text-rouge-100 text-[10px] tracking-[0.5em]">
          SECTION {number}
        </span>
        <span className="h-px w-10 bg-rouge-100/60" />
        <span className="font-calibri text-rouge-50/55 text-[10px] tracking-[0.3em] uppercase">
          {kicker}
        </span>
      </div>
      <h2 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-rouge-50 leading-[1.02]">
        {title}
      </h2>
      {titleZh && (
        <p className="font-display text-rouge-100/80 text-xl md:text-2xl mt-1 tracking-[0.12em]">
          {titleZh}
        </p>
      )}
      <svg
        viewBox="0 0 200 12"
        className={`h-3 mt-3 text-rouge-100 ${align === "center" ? "self-center" : ""}`}
        width="200"
        aria-hidden="true"
      >
        <path
          d="M0 6 Q 40 6 80 6 M120 6 Q 160 6 200 6 M90 6 L 110 6"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="100" cy="6" r="2.5" fill="currentColor" />
        <circle cx="85" cy="6" r="1" fill="currentColor" />
        <circle cx="115" cy="6" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}

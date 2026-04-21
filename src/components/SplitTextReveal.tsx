"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextRevealProps {
  text: string;
  type: "chars" | "words" | "lines";
  delay?: number;
  className?: string;
  stagger?: number;
  trigger?: boolean;
}

export default function SplitTextReveal({
  text,
  type,
  delay = 0,
  className = "",
  stagger = 0.03,
  trigger = true,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    let elements: Element[] = [];

    if (type === "chars") {
      const chars = text.split("");
      container.innerHTML = chars
        .map(
          (char) =>
            `<span class="inline-block overflow-hidden"><span class="char-inner inline-block">${
              char === " " ? "&nbsp;" : char
            }</span></span>`
        )
        .join("");
      elements = Array.from(container.querySelectorAll(".char-inner"));
    } else if (type === "words") {
      const words = text.split(" ");
      container.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="word-inner inline-block">${word}</span></span>`
        )
        .join("");
      elements = Array.from(container.querySelectorAll(".word-inner"));
    } else {
      const lines = text.split("\n");
      container.innerHTML = lines
        .map(
          (line) =>
            `<div class="overflow-hidden"><span class="line-inner inline-block">${line}</span></div>`
        )
        .join("");
      elements = Array.from(container.querySelectorAll(".line-inner"));
    }

    gsap.set(elements, { yPercent: 120, rotateX: -90, opacity: 0 });

    const tl = gsap.to(elements, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      ease: "power3.out",
      delay: delay,
    });

    return () => {
      tl.kill();
    };
  }, [text, type, delay, stagger, trigger]);

  return (
    <div ref={containerRef} className={`perspective-800 ${className}`}>
      {text}
    </div>
  );
}

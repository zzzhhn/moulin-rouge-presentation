import { useEffect, useRef } from "react";

// Click-triggered spark burst — low visual noise during presentation,
// but gives tactile feedback when the presenter clicks on anything.
// Inspired by reactbits.dev ClickSpark.
export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    type Spark = {
      x: number;
      y: number;
      angle: number;
      speed: number;
      life: number;
      maxLife: number;
      color: string;
    };
    const sparks: Spark[] = [];

    const palette = ["#d4af37", "#f4e4c1", "#e8c872", "#9e1b32"];

    const onClick = (e: MouseEvent) => {
      // Skip if clicking on interactive controls that manage their own feedback
      const target = e.target as HTMLElement;
      if (target.closest("audio, video, input, textarea")) return;

      const count = 14;
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / count + Math.random() * 0.3,
          speed: 2 + Math.random() * 3.5,
          life: 0,
          maxLife: 35 + Math.random() * 20,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    };
    window.addEventListener("click", onClick);

    let rafId = 0;
    let running = false;
    const render = () => {
      if (sparks.length === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
        return; // idle — stop requesting frames
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        const progress = s.life / s.maxLife;
        const decel = 1 - progress * 0.6;
        s.x += Math.cos(s.angle) * s.speed * decel;
        s.y += Math.sin(s.angle) * s.speed * decel + progress * 0.4; // slight gravity
        const alpha = 1 - progress;
        const len = 10 * (1 - progress * 0.5);
        ctx.save();
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * len,
          s.y - Math.sin(s.angle) * len
        );
        ctx.stroke();
        ctx.restore();
        if (s.life >= s.maxLife) sparks.splice(i, 1);
      }
      rafId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden="true"
    />
  );
}

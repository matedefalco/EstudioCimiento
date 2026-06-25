"use client";
import { useEffect, useRef } from "react";

export function ParticleField({ active, intensity, isDark = true }: { active: boolean; intensity: number; isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{ particles: { x: number; y: number; vx: number; vy: number; r: number }[]; raf: number }>({ particles: [], raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w: number, h: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    if (stateRef.current.particles.length === 0) {
      stateRef.current.particles = Array.from({ length: 42 }, () => ({
        x: Math.random() * 800, y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.3 + 0.4,
      }));
    }

    const loop = () => {
      const ps = stateRef.current.particles;
      ctx.clearRect(0, 0, w, h);
      const reach = active ? 120 + intensity * 16 : 80;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx * (active ? 1 : 0.4); p.y += p.vy * (active ? 1 : 0.4);
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const dotColor = isDark ? `rgba(216,145,73,${active ? 0.5 : 0.22})` : `rgba(28,30,34,${active ? 0.35 : 0.14})`;
        ctx.fillStyle = dotColor; ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]; const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < reach) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            const lineAlpha = (1 - dist / reach) * (active ? 0.14 : 0.05);
            ctx.strokeStyle = isDark ? `rgba(216,145,73,${lineAlpha})` : `rgba(28,30,34,${lineAlpha})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      stateRef.current.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(stateRef.current.raf); };
  }, [active, intensity, isDark]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let angle = 0;
    let running = true;

    const init = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.45 + 0.15,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.0018;

      // Move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      // Node connections
      const maxDist = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,94,14,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particle dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,94,14,${p.opacity * 0.55})`;
        ctx.fill();
      }

      // Rotating joint rings — right side, behind the arm
      const cx = canvas.width * 0.75;
      const cy = canvas.height * 0.5;
      const rings = [
        { r: 290, gapDeg: 95, speed: 0.9, lw: 0.7, alpha: 0.09 },
        { r: 210, gapDeg: 80, speed: -1.4, lw: 0.55, alpha: 0.13 },
        { r: 138, gapDeg: 65, speed: 1.9, lw: 0.45, alpha: 0.1 },
      ];

      for (const ring of rings) {
        const a = angle * ring.speed;
        const gapRad = (ring.gapDeg * Math.PI) / 180;
        const arcSpan = (2 * Math.PI) / 3;
        for (let i = 0; i < 3; i++) {
          const start = a + i * arcSpan + gapRad / 2;
          const end = a + (i + 1) * arcSpan - gapRad / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, start, end);
          ctx.strokeStyle = `rgba(255,94,14,${ring.alpha})`;
          ctx.lineWidth = ring.lw;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) draw();
      },
      { threshold: 0 }
    );

    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);

    resize();
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

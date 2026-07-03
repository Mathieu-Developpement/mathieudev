"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 170, 255, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 102, 204, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,102,204,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <span className="code-tag animate-pulse-slow" aria-hidden="true">// mathieudev.vercel.app</span>

        <div className="animate-float" style={{ animationDelay: "0s" }}>
          <Image
            src="/images/logo.png"
            alt="MathieuDev — Web, Logiciels, Applications"
            width={420}
            height={120}
            className="w-72 sm:w-96 md:w-[420px] h-auto object-contain"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Ton idée mérite
            <br />
            <span className="gradient-text">d&apos;exister pour vrai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#aaa] max-w-2xl mx-auto leading-relaxed">
            Je construis des <strong className="text-white">sites web</strong>,{" "}
            <strong className="text-white">logiciels</strong>,{" "}
            <strong className="text-white">applications</strong> et des{" "}
            <strong className="text-white">systèmes IA</strong> sur mesure —
            sans frais de développement.{" "}
            <span className="text-[#00aaff]">Tu paies seulement si t&apos;es satisfait.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href="#contact"
            className="btn-primary px-8 py-4 rounded-lg text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,170,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
            aria-label="Démarrer mon projet — aller à la section contact"
          >
            Démarrer mon projet →
          </a>
          <a
            href="#projets"
            className="px-8 py-4 rounded-lg text-base font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
            aria-label="Voir mes projets réalisés"
          >
            Voir mes projets
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-6 pt-6 border-t border-[rgba(0,170,255,0.1)] w-full">
          {[
            { value: "0$", label: "Frais de développement" },
            { value: "100%", label: "Satisfaction garantie" },
            { value: "IA", label: "Intégration intelligente" },
            { value: "∞", label: "Possibilités" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold gradient-text"
                style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                aria-label={`${stat.value} — ${stat.label}`}
              >
                {stat.value}
              </span>
              <span className="text-xs text-[#666] uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-xs text-[#444] uppercase tracking-widest">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00aaff] to-transparent" />
      </div>
    </section>
  );
}
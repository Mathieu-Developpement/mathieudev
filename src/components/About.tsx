"use client";

import Image from "next/image";

const badges = [
  { value: "10+ ans", label: "à coder, par passion" },
  { value: "Full-stack", label: "du design au déploiement" },
  { value: "100%", label: "autodidacte" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20">
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,102,204,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #00aaff, #003a8c, #00aaff)",
                  backgroundSize: "200% 200%",
                  animation: "borderRotate 4s linear infinite",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-2xl bg-[#0a0a0a]" />
              </div>
              <div className="absolute inset-[2px] rounded-2xl overflow-hidden glow-blue-sm">
                <Image
                  src="/images/profile.jpg"
                  alt="Mathieu — fondateur de MathieuDev"
                  fill
                  className="object-cover object-[center_12%]"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="code-tag block mb-3">// qui suis-je</span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "Syne, system-ui, sans-serif" }}
              >
                De l&apos;autodidacte au{" "}
                <span className="gradient-text">bâtisseur de solutions.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-[#999] text-base leading-relaxed">
              <p>
                Je n&apos;ai pas de diplôme en informatique, j&apos;ai appris
                en ligne, par moi-même, en construisant de vrais projets
                plutôt qu&apos;en suivant un programme. Tout a commencé il y a
                plus de 10 ans avec un petit jeu 2D, simplement pour
                comprendre comment ça fonctionnait.
              </p>
              <p>
                J&apos;ai repris avec deux boutiques
                Shopify (Tendance Express et Onyx), aujourd&apos;hui fermées,
                mais qui m&apos;ont appris l&apos;essentiel : optimisation
                SEO, structure d&apos;une boutique en ligne, commerce
                international et logistique. Chaque projet, même terminé,
                m&apos;a rendu meilleur pour le suivant.
              </p>
              <p>
                Ça m&apos;a mené à PattesQC, mon premier vrai SaaS, un projet
                personnel que j&apos;ai volontairement gardé hors des stores
                Android et Apple pour me concentrer sur une chose : lancer
                MathieuDev sérieusement.
              </p>
              <p className="text-white font-medium">
                Aujourd&apos;hui, je mets cette expérience à ton service : pas
                de jargon, pas de promesses vides. Juste quelqu&apos;un qui
                sait construire, parce qu&apos;il a appris en construisant.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-6 mt-2 pt-6 border-t border-[rgba(0,170,255,0.1)]">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold gradient-text"
                    style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                  >
                    {badge.value}
                  </span>
                  <span className="text-xs text-[#666] uppercase tracking-widest">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
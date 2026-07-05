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
                Une expertise{" "}
                <span className="gradient-text">bâtie sur l&apos;expérience</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-[#999] text-base leading-relaxed">
              <p>
                Depuis plus de dix ans, je conçois des projets numériques qui répondent à de véritables besoins.
                Chaque réalisation a été l&apos;occasion d&apos;approfondir mes compétences, d&apos;expérimenter
                de nouvelles approches et de développer une vision concrète du développement logiciel et du commerce numérique.
              </p>
              <p>
                Mon parcours a débuté avec la création d&apos;un jeu 2D, puis s&apos;est poursuivi avec le lancement
                de deux boutiques Shopify, Tendance Express et Onyx. Ces projets m&apos;ont permis d&apos;acquérir
                une solide expérience en développement web, en référencement (SEO), en expérience utilisateur,
                en commerce électronique, en logistique et en optimisation des performances.
              </p>
              <p>
                J&apos;ai ensuite développé PattesQC, une plateforme SaaS conçue pour répondre à un besoin précis.
                Ce projet m&apos;a permis d&apos;approfondir la conception d&apos;applications web modernes,
                la gestion des données, l&apos;automatisation des processus et le développement de solutions évolutives.
              </p>
              <p>
                Aujourd&apos;hui, à travers MathieuDev, je mets cette expertise au service des entreprises,
                des organismes et des entrepreneurs qui souhaitent transformer leurs idées en solutions numériques performantes.
              </p>
              <p className="text-white font-medium">
                Ma philosophie est simple : comprendre vos objectifs, concevoir des outils fiables et offrir
                un accompagnement transparent à chaque étape. Pas de solutions génériques ni de promesses irréalistes :
                seulement des réalisations réfléchies, conçues pour être durables, efficaces et adaptées à vos besoins.
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
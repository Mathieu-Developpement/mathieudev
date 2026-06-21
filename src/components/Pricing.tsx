"use client";

import { CheckCircle, Shield, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "On discute de ton projet",
    desc: "Tu m'expliques ton idée, tes besoins, tes objectifs. C'est gratuit, sans engagement.",
  },
  {
    num: "02",
    title: "Je construis pour toi",
    desc: "Je développe ton projet sans te charger un seul dollar. Tu vois le résultat avant de décider quoi que ce soit.",
  },
  {
    num: "03",
    title: "Tu l'essaies, t'en tombes en amour",
    desc: "Si ça te plaît, tu t'abonnes au service mensuel. Sinon, tu repars. Zéro risque, zéro pression.",
  },
  {
    num: "04",
    title: "On grandit ensemble",
    desc: "Ton abonnement couvre l'hébergement, les mises à jour, le support et l'évolution de ton produit.",
  },
];

const perks = [
  { icon: Shield, label: "Aucun frais de développement" },
  { icon: CheckCircle, label: "Satisfaction garantie" },
  { icon: Zap, label: "Déploiement rapide" },
  { icon: TrendingUp, label: "Évolution continue incluse" },
];

export default function Pricing() {
  return (
    <section id="tarification" className="relative py-16 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,58,140,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="code-tag block mb-3">// comment ça marche</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Zéro risque.{" "}
            <span className="gradient-text">Zéro frais de dev.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Mon modèle est simple : je construis d&apos;abord, tu paies ensuite seulement
            si le produit te convient. C&apos;est moi qui redouble d&apos;effort pour que tu
            restes — pas toi qui prends un risque.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,170,255,0.3), transparent)",
                    width: "calc(100% - 3rem)",
                    left: "calc(100% - 0.5rem)",
                  }}
                />
              )}
              <div className="glass-card rounded-xl p-6 h-full relative z-10 hover:border-[rgba(0,170,255,0.3)] transition-all duration-300">
                <span
                  className="text-4xl font-black gradient-text block mb-4"
                  style={{ fontFamily: "Syne, system-ui, sans-serif", opacity: 0.7 }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA card */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden border-glow"
          style={{
            background: "linear-gradient(135deg, #0d1a2e 0%, #0a0f1a 100%)",
          }}
        >
          {/* Glow bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,102,204,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "Syne, system-ui, sans-serif" }}
            >
              Ton budget : <span className="gradient-text">0 $</span>
            </h3>
            <p className="text-[#aaa] text-lg mb-8 max-w-xl mx-auto">
              Tu peux lancer ton projet sans investissement initial. L&apos;abonnement
              mensuel ne démarre que quand tu es prêt — et satisfait.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {perks.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#00aaff] border border-[rgba(0,170,255,0.25)] bg-[rgba(0,170,255,0.05)]"
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary inline-block px-10 py-4 rounded-lg text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,170,255,0.4)]"
              style={{
                background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)",
              }}
            >
              Je veux lancer mon projet — gratuitement →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

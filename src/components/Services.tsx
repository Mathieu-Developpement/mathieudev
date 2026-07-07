"use client";

import { Globe, Cpu, Smartphone, Layers, Bot, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Web",
    description:
      "Landing pages, sites vitrines, plateformes e-commerce et portails web, conçus pour convertir et performants sur tous les appareils.",
    tags: ["Next.js", "React", "Vercel"],
  },
  {
    icon: Cpu,
    title: "Logiciels sur mesure",
    description:
      "Des outils métier taillés exactement à vos besoins. Automatisations, tableaux de bord, systèmes de gestion internes.",
    tags: ["TypeScript", "Node.js", "Supabase"],
  },
  {
    icon: Smartphone,
    title: "Applications mobiles",
    description:
      "Apps iOS et Android avec une seule base de code. Expérience native, performances optimales, mises à jour simplifiées.",
    tags: ["React Native", "Expo", "Firebase"],
  },
  {
    icon: Layers,
    title: "Plateformes SaaS",
    description:
      "De l'idée au produit en production : architecture, authentification, paiements, gestion des abonnements et tableau de bord.",
    tags: ["Stripe", "Supabase", "Auth"],
  },
  {
    icon: Bot,
    title: "Intégration IA",
    description:
      "J'intègre l'intelligence artificielle dans vos systèmes existants : chatbots, assistants, analyse de données, génération de contenu.",
    tags: ["OpenAI", "Claude API", "LLM"],
  },
  {
    icon: Zap,
    title: "IA personnalisée",
    description:
      "Un agent IA entraîné sur votre entreprise, qui répond à tes clients 24/7, qualifie les leads et s'adapte à ta façon de parler.",
    tags: ["Fine-tuning", "RAG", "Agents"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative pt-28 pb-16 bg-grid">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="code-tag block mb-3">// ce que je construis</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Mes <span className="gradient-text">services</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Du simple site vitrine à la plateforme IA complexe, je m&apos;occupe de tout,
            de la conception au déploiement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="glass-card rounded-xl p-6 group hover:border-[rgba(0,170,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:glow-blue-sm cursor-default"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,102,204,0.3) 0%, rgba(0,170,255,0.15) 100%)",
                    border: "1px solid rgba(0,170,255,0.2)",
                  }}
                >
                  <Icon size={22} className="text-[#00aaff]" />
                </div>

                {/* Text */}
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-4">
                  {s.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded font-mono text-[#00aaff] bg-[rgba(0,170,255,0.08)] border border-[rgba(0,170,255,0.15)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0a0a0a, transparent)",
        }}
      />
    </section>
  );
}

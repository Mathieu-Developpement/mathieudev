"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Download, Globe, Lock, ChevronDown } from "lucide-react";

const projects = [
  {
    name: "Organix",
    logo: "/images/organix-logo.png",
    tagline: "Organise. Automatise. Gagne du temps.",
    description:
      "Une plateforme d'automatisation pour monteurs vidéo : récupère les dossiers Google Drive partagés, les synchronise localement, conserve la structure des fichiers et décompresse automatiquement les archives pour que les projets soient immédiatement prêts à travailler.",
    tech: ["Google Drive API", "Node.js", "Automatisation", "Vercel"],
    status: "En ligne",
    statusColor: "#00d4a0",
    cta: {
      label: "Visiter Organix",
      href: "https://organix-beryl.vercel.app/",
      icon: Globe,
    },
    webHref: null,
    maintenance: false,
    gradient: "from-[#001a2e] to-[#0a0a0a]",
    accentColor: "#00aaaa",
  },
  {
    name: "SoumiPro",
    logo: "/images/soumipro-logo.png",
    tagline: "Des soumissions professionnelles en secondes, propulsées par l'IA.",
    description:
      "SoumiPro est une plateforme SaaS conçue pour les entrepreneurs et travailleurs autonomes du Québec. Grâce à l'intelligence artificielle, elle génère automatiquement des soumissions professionnelles et personnalisées à partir de quelques informations saisies. Fini les heures perdues à rédiger des devis — SoumiPro analyse votre contexte, structure votre offre et produit un document prêt à envoyer en quelques secondes.",
    tech: ["Next.js", "Supabase", "Google Gemini", "Stripe", "IA générative"],
    status: "En ligne",
    statusColor: "#00d4a0",
    cta: {
      label: "Visiter SoumiPro",
      href: "https://soumipro.vercel.app/",
      icon: Globe,
    },
    webHref: null,
    maintenance: false,
    gradient: "from-[#001a2e] to-[#0a0a0a]",
    accentColor: "#0066cc",
  },
  {
    name: "PattesQC",
    logo: "/images/pattesqc-logo.png",
    tagline: "La gestion de vos animaux, réinventée.",
    description:
      "Un SaaS complet pour les propriétaires d'animaux : dossiers médicaux, partage en famille, alertes d'animaux perdus, notifications intelligentes et assistance vétérinaire propulsée par l'IA.",
    tech: ["React Native", "Supabase", "Stripe", "Firebase", "IA vétérinaire"],
    status: "Disponible en téléchargement",
    statusColor: "#00aaff",
    cta: {
      label: "Télécharger l'app",
      href: "https://drive.google.com/file/d/1LPf0GBHtHJtgevb1z0IyvgZ770rk90qt/view?usp=drive_link",
      icon: Download,
      note: "APK Android — installation directe",
    },
    webHref: "https://pattesqc.vercel.app/",
    maintenance: true,
    gradient: "from-[#001a3a] to-[#0a0a0a]",
    accentColor: "#0066cc",
  },
  ];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="projets" className="relative py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="code-tag block mb-3">// ce que j&apos;ai bâti</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Mes <span className="gradient-text">projets</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Des produits réels, fonctionnels, déployés. Pas des maquettes, des
            applications que des gens utilisent.
          </p>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-8">
          {projects.slice(0, 2).map((project, i) => {
            const CtaIcon = project.cta.icon;
            return (
              <div
                key={project.name}
                className={`glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                } hover:border-[rgba(0,170,255,0.25)] transition-all duration-500 group`}
              >
                {/* Logo panel */}
                <div
                  className={`flex-shrink-0 w-full md:w-64 lg:w-80 flex items-center justify-center p-10 bg-gradient-to-br ${project.gradient}`}
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid rgba(0,170,255,0.08)" : "none",
                    borderLeft: i % 2 === 1 ? "1px solid rgba(0,170,255,0.08)" : "none",
                  }}
                >
                  <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      fill
                      className={`object-contain ${project.name === "Organix" || project.name === "SoumiPro" ? "brightness-0 invert" : ""}`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                  <div>
                    {/* Status badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
                        style={{
                          color: project.statusColor,
                          background: `${project.statusColor}18`,
                          border: `1px solid ${project.statusColor}33`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: project.statusColor }}
                        />
                        {project.status}
                      </span>
                      {project.maintenance && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full text-orange-400 bg-orange-400/10 border border-orange-400/30">
                          🔧 En maintenance
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-1"
                      style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-sm font-medium mb-3"
                      style={{ color: project.accentColor }}
                    >
                      {project.tagline}
                    </p>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded font-mono text-[#aaa] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">

                      {/* Bouton principal */}
                      <div className="relative group/btn">
                        {project.maintenance ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white opacity-40 cursor-not-allowed grayscale"
                            style={{
                              background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)`,
                            }}
                          >
                            <Lock size={16} />
                            {project.cta.label}
                            <Lock size={13} className="opacity-70" />
                          </button>
                        ) : (
                          <a
                            href={project.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                            style={{
                              background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)`,
                            }}
                          >
                            <CtaIcon size={16} />
                            {project.cta.label}
                            <ExternalLink size={13} className="opacity-70" />
                          </a>
                        )}
                        {project.maintenance && (
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-orange-400 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity border border-orange-400/20 pointer-events-none">
                            Indisponible — en maintenance
                          </div>
                        )}
                      </div>

                      {/* Bouton version web */}
                      {project.webHref !== null && (
                        <div className="relative group/web">
                          {project.maintenance ? (
                            <button
                              disabled
                              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold opacity-40 cursor-not-allowed grayscale text-[#666] border border-[rgba(255,255,255,0.08)]"
                            >
                              <Lock size={14} />
                              Version web
                            </button>
                          ) : (
                            <a
                              href={project.webHref!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
                            >
                              <Globe size={14} />
                              Version web
                            </a>
                          )}
                          {project.maintenance && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-orange-400 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/web:opacity-100 transition-opacity border border-orange-400/20 pointer-events-none">
                              Indisponible — en maintenance
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                    <p className="text-xs text-[#888] ml-1 font-mono">
                      {project.cta.note}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voir plus */}
        {projects.length > 2 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 mx-auto px-8 py-4 rounded-lg text-sm font-bold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
              aria-label={showAll ? "Voir moins de projets" : `Voir tous les projets — ${projects.length} au total`}
            >
              <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} aria-hidden="true" />
              {showAll ? "Voir moins" : `Voir tous les projets (${projects.length})`}
            </button>
          </div>
        )}

        {/* Projets supplémentaires */}
        {showAll && (
          <div className="flex flex-col gap-8 mt-8">
            {projects.slice(2).map((project, i) => {
              const CtaIcon = project.cta.icon;
              const realIndex = i + 2;
              return (
                <div
                  key={`${project.name}-extra`}
                  className={`glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row ${
                    realIndex % 2 === 1 ? "md:flex-row-reverse" : ""
                  } hover:border-[rgba(0,170,255,0.25)] transition-all duration-500 group`}
                >
                  <div
                    className={`flex-shrink-0 w-full md:w-64 lg:w-80 flex items-center justify-center p-10 bg-gradient-to-br ${project.gradient}`}
                    style={{
                      borderRight: realIndex % 2 === 0 ? "1px solid rgba(0,170,255,0.08)" : "none",
                      borderLeft: realIndex % 2 === 1 ? "1px solid rgba(0,170,255,0.08)" : "none",
                    }}
                  >
                    <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={project.logo}
                        alt={project.name}
                        fill
                        className={`object-contain ${project.name === "Organix" || project.name === "SoumiPro" ? "brightness-0 invert" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
                          style={{
                            color: project.statusColor,
                            background: `${project.statusColor}18`,
                            border: `1px solid ${project.statusColor}33`,
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.statusColor }} />
                          {project.status}
                        </span>
                        {project.maintenance && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full text-orange-400 bg-orange-400/10 border border-orange-400/30">
                            🔧 En maintenance
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>{project.name}</h3>
                      <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>{project.tagline}</p>
                      <p className="text-[#888] text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded font-mono text-[#aaa] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group/btn">
                          {project.maintenance ? (
                            <button disabled className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white opacity-40 cursor-not-allowed grayscale" style={{ background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)` }}>
                              <Lock size={16} />{project.cta.label}<Lock size={13} className="opacity-70" />
                            </button>
                          ) : (
                            <a href={project.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105" style={{ background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)` }}>
                              <CtaIcon size={16} />{project.cta.label}<ExternalLink size={13} className="opacity-70" />
                            </a>
                          )}
                          {project.maintenance && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-orange-400 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity border border-orange-400/20 pointer-events-none">
                              Indisponible — en maintenance
                            </div>
                          )}
                        </div>
                        {project.webHref !== null && (
                          <div className="relative group/web">
                            {project.maintenance ? (
                              <button disabled className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold opacity-40 cursor-not-allowed grayscale text-[#666] border border-[rgba(255,255,255,0.08)]">
                                <Lock size={14} />Version web
                              </button>
                            ) : (
                              <a href={project.webHref!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300">
                                <Globe size={14} />Version web
                              </a>
                            )}
                            {project.maintenance && (
                              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-orange-400 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/web:opacity-100 transition-opacity border border-orange-400/20 pointer-events-none">
                                Indisponible — en maintenance
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#888] ml-1 font-mono">{project.cta.note}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
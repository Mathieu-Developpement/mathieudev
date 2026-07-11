"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Download, Globe, Lock, ChevronDown, X } from "lucide-react";

const projects = [
  {
    name: "Organix",
    logo: "/images/organix-logo.png",
    tagline: "Organise. Automatise. Gagne du temps.",
    description: "Une plateforme d'automatisation pour monteurs vidéo : récupère les dossiers Google Drive partagés, les synchronise localement, conserve la structure des fichiers et décompresse automatiquement les archives pour que les projets soient immédiatement prêts à travailler.",
    tech: ["Google Drive API", "Node.js", "Automatisation", "Vercel"],
    status: "En ligne",
    statusColor: "#00d4a0",
    cta: { label: "Visiter Organix", href: "https://organix-beryl.vercel.app/", icon: Globe},
    webHref: null,
    maintenance: false,
    gradient: "from-[#001a2e] to-[#0a0a0a]",
    accentColor: "#00aaaa",
  },
  {
    name: "SoumiPro",
    logo: "/images/soumipro-logo.png",
    tagline: "Soumissions professionnelles en quelques secondes, propulsées par l'IA.",
    description: "SoumiPro est une plateforme SaaS conçue pour les entrepreneurs et travailleurs autonomes du Québec. Grâce à l'intelligence artificielle, elle génère automatiquement des soumissions professionnelles et personnalisées à partir de quelques informations saisies. Fini les heures perdues à rédiger des devis. SoumiPro analyse votre contexte, structure votre offre et produit un document prêt à envoyer en quelques secondes.",
    tech: ["Next.js", "Supabase", "Google Gemini", "Stripe", "IA générative"],
    status: "En ligne",
    statusColor: "#00d4a0",
    cta: { label: "Visiter SoumiPro", href: "https://soumipro.vercel.app/", icon: Globe},
    webHref: null,
    maintenance: false,
    gradient: "from-[#001a2e] to-[#0a0a0a]",
    accentColor: "#0066cc",
  },
  {
    name: "PattesQC",
    logo: "/images/pattesqc-logo.png",
    tagline: "La gestion de vos animaux, réinventée.",
    description: "Un SaaS complet pour les propriétaires d'animaux : dossiers médicaux, partage en famille, alertes d'animaux perdus, notifications intelligentes et assistance vétérinaire propulsée par l'IA.",
    tech: ["React Native", "Supabase", "Stripe", "Firebase", "IA vétérinaire"],
    status: "En maintenance",
    statusColor: "#f97316",
    cta: { label: "Télécharger l'app", href: "https://drive.google.com/file/d/1LPf0GBHtHJtgevb1z0IyvgZ770rk90qt/view?usp=drive_link", icon: Download, note: "APK Android — installation directe" },
    webHref: "https://pattesqc.vercel.app/",
    maintenance: true,
    gradient: "from-[#001a3a] to-[#0a0a0a]",
    accentColor: "#0066cc",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const CtaIcon = project.cta.icon;
  const i = index;
  return (
    <div className={`glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""} hover:border-[rgba(0,170,255,0.25)] transition-all duration-500 group`}>
      <div className={`flex-shrink-0 w-full md:w-64 lg:w-80 flex items-center justify-center p-10 bg-gradient-to-br ${project.gradient}`}
        style={{
          borderRight: i % 2 === 0 ? "1px solid rgba(0,170,255,0.08)" : "none",
          borderLeft: i % 2 === 1 ? "1px solid rgba(0,170,255,0.08)" : "none",
        }}>
        <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-500">
          <Image src={project.logo} alt={project.name} fill
className={`object-contain ${project.name === "Organix" || project.name === "SoumiPro" ? "project-logo-invert" : ""}`} />
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
              style={{ color: project.statusColor, background: `${project.statusColor}18`, border: `1px solid ${project.statusColor}33` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.statusColor }} />
              {project.status}
            </span>
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
                <button disabled className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white opacity-40 cursor-not-allowed grayscale"
                  style={{ background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)` }}>
                  <Lock size={16} />{project.cta.label}<Lock size={13} className="opacity-70" />
                </button>
              ) : (
                <a href={project.cta.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${project.accentColor} 0%, #00aaff 100%)` }}>
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
                  <a href={project.webHref!} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300">
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
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <section id="projets" className="relative py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="code-tag block mb-3" aria-hidden="true">// ce que j&apos;ai bâti</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>
            Mes <span className="gradient-text">projets</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Des produits réels, fonctionnels, déployés. Pas des maquettes, des applications que des gens utilisent.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {projects.length > 2 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 mx-auto px-8 py-4 rounded-lg text-sm font-bold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
            >
              <ChevronDown size={16} aria-hidden="true" />
              Voir tous les projets ({projects.length})
            </button>
          </div>
        )}
      </div>

      {/* Modal — copie exacte du pattern Reviews */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Tous les projets"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal content — même structure que Reviews */}
          <div className="relative w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
            style={{ background: "#111", border: "1px solid rgba(0,170,255,0.15)" }}
          >
            {/* Header fixe */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,170,255,0.1)] flex-shrink-0"
              style={{ background: "#0d0d0d" }}
            >
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>
                Tous les projets <span className="text-[#555] font-normal text-sm ml-2">({projects.length})</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-all"
                aria-label="Fermer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable — même que Reviews */}
            <div className="overflow-y-auto p-6 flex-1">
              <div className="flex flex-col gap-6">
                {projects.map((project, i) => (
                  <ProjectCard key={project.name} project={project} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
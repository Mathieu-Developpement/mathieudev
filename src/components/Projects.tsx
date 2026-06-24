"use client";

import Image from "next/image";
import { ExternalLink, Download, Globe } from "lucide-react";

const projects = [
  {
    name: "PattesQC",
    logo: "/images/pattesqc-logo.png",
    tagline: "La gestion de tes animaux, réinventée.",
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
    gradient: "from-[#001a3a] to-[#0a0a0a]",
    accentColor: "#0066cc",
  },
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
      note: "organix-beryl.vercel.app",
    },
    webHref: null,
    gradient: "from-[#001a1a] to-[#0a0a0a]",
    accentColor: "#00aaaa",
  },
];

export default function Projects() {
  return (
    <section id="projets" className="relative py-28">
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
            Des produits réels, fonctionnels, déployés. Pas des maquettes — des
            applications que des gens utilisent.
          </p>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => {
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
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                  <div>
                    {/* Status badge */}
                    <div className="flex items-center gap-3 mb-3">
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
                      {project.webHref && (
                        <a
                          href={project.webHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
                        >
                          <Globe size={14} />
                          Version web
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-[#555] ml-1 font-mono">
                      {project.cta.note}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
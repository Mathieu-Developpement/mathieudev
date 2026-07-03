"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Tarification", href: "#tarification" },
  { label: "Projets", href: "#projets" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0aee] backdrop-blur-md border-b border-[rgba(0,170,255,0.1)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group" aria-label="MathieuDev — retour en haut">
          <Image
            src="/images/logo.png"
            alt="MathieuDev"
            width={180}
            height={50}
            className="h-10 w-auto object-contain transition-opacity group-hover:opacity-80"
            priority
          />
        </a>

        <nav role="navigation" aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium text-[#aaa] hover:text-white transition-colors duration-200"
              aria-label={`Aller à la section ${l.label}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary ml-2 px-5 py-2 rounded-md text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #0066cc 0%, #00aaff 100%)" }}
            aria-label="Démarrer un projet — aller au formulaire de contact"
          >
            Démarrer un projet
          </a>
        </nav>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu de navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Navigation mobile"
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#0d0d0d", borderTop: "1px solid rgba(0,170,255,0.1)" }}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#aaa] hover:text-white transition-colors"
              aria-label={`Aller à la section ${l.label}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-center py-2 rounded-md text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #0066cc 0%, #00aaff 100%)" }}
            aria-label="Démarrer un projet — aller au formulaire de contact"
          >
            Démarrer un projet
          </a>
        </nav>
      </div>
    </header>
  );
}
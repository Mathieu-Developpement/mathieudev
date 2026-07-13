import type { Metadata } from "next";
import Image from "next/image";
import ProjectForm from "@/components/ProjectForm";
import ManageCookiesLink from "@/components/ManageCookiesLink";

export const metadata: Metadata = {
  title: "Démarrer votre projet",
  description:
    "Décrivez votre projet en 3 minutes. Zéro frais de développement — vous ne payez que si vous êtes satisfait.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProjetPage() {
  return (
    <main className="relative min-h-screen bg-md-black text-md-text">
      {/* Glow bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,58,140,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Header minimal — juste le logo, aucun lien de sortie */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-4 flex justify-center md:justify-start">
        <Image src="/images/logo.png" alt="MathieuDev" width={160} height={44} priority />
      </header>

      <section className="relative z-10 px-6 pb-20 pt-6 md:pt-12">
        <ProjectForm sourcePage="/projet" />
      </section>

      {/* Footer minimal — confiance, sans liens de navigation */}
      <footer className="relative z-10 text-center pb-10 flex flex-col items-center gap-2">
        <p className="text-xs text-[#444]">
          Zéro frais de développement · Vous payez seulement si vous êtes satisfait
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/politique-de-confidentialite"
            className="text-xs text-[#555] hover:text-[#00aaff] transition-colors underline underline-offset-2"
          >
            Politique de confidentialité
          </a>
          <ManageCookiesLink className="text-xs text-[#555] hover:text-[#00aaff] transition-colors underline underline-offset-2" />
        </div>
      </footer>
    </main>
  );
}
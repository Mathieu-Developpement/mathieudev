import Image from "next/image";

const links = [
  { label: "Services", href: "#services" },
  { label: "Tarification", href: "#tarification" },
  { label: "Projets", href: "#projets" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,170,255,0.08)] py-12 bg-[#080808]" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#hero" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="MathieuDev — retour en haut de page">
            <Image
              src="/images/logo.png"
              alt="MathieuDev"
              width={160}
              height={45}
              className="h-9 w-auto object-contain"
            />
          </a>

          <nav aria-label="Navigation pied de page">
            <ul className="flex flex-wrap justify-center gap-6 list-none">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#888] hover:text-[#00aaff] transition-colors"
                    aria-label={`Aller à la section ${l.label}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="mailto:mathieu.dev@hotmail.com"
            className="text-sm text-[#888] hover:text-[#00aaff] transition-colors font-mono"
            aria-label="Envoyer un courriel à mathieu.dev@hotmail.com"
          >
            mathieu.dev@hotmail.com
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#777]">
            © {new Date().getFullYear()} MathieuDev. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
import Image from "next/image";
import { Facebook } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Tarification", href: "#tarification" },
  { label: "Projets", href: "#projets" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,170,255,0.08)] py-12 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#hero" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="MathieuDev"
              width={160}
              height={45}
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#555] hover:text-[#00aaff] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Email + Social */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:mathieu.dev@hotmail.com"
              className="text-sm text-[#555] hover:text-[#00aaff] transition-colors font-mono"
            >
              mathieu.dev@hotmail.com
            </a>
            <a
              href="https://www.facebook.com/share/192JfSa5sP/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Page Facebook MathieuDev"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(0,170,255,0.1)] border border-[rgba(0,170,255,0.25)] text-[#00aaff] hover:bg-[rgba(0,170,255,0.2)] hover:scale-110 transition-all duration-300"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-center">
          <p className="text-xs text-[#333]">
            © {new Date().getFullYear()} MathieuDev. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

const techStack = [
  { name: "VS Code", icon: "/images/tech/vscode.svg", label: "Éditeur" },
  { name: "React", icon: "/images/tech/react.svg", label: "UI" },
  { name: "Next.js", icon: "/images/tech/nextjs.svg", label: "Framework" },
  { name: "TypeScript", icon: "/images/tech/typescript.svg", label: "Langage" },
  { name: "Supabase", icon: "/images/tech/supabase.svg", label: "Base de données" },
  { name: "Firebase", icon: "/images/tech/firebase.svg", label: "Backend" },
  { name: "GitHub", icon: "/images/tech/github.svg", label: "Versioning", invert: true },
  { name: "Vercel", icon: "/images/tech/vercel.svg", label: "Déploiement", invert: true },
  { name: "Node.js", icon: "/images/tech/nodejs.svg", label: "Runtime" },
  { name: "Tailwind", icon: "/images/tech/tailwind.svg", label: "CSS" },
  { name: "Shopify", icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", label: "E-commerce" },
];

export default function TechStack() {
  return (
    <section className="relative py-10" aria-label="Technologies maîtrisées">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="code-tag block mb-3" aria-hidden="true">// mon arsenal</span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Technologies <span className="gradient-text">maîtrisées</span>
          </h2>
          <p className="text-[#888] max-w-lg mx-auto">
            Des outils modernes et éprouvés, assemblés pour livrer des produits
            fiables, rapides et scalables.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4" role="list" aria-label="Liste des technologies">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-card flex flex-col items-center gap-2 px-5 py-4 rounded-xl hover:border-[rgba(0,170,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-default group min-w-[90px]"
              role="listitem"
              aria-label={`${tech.name} — ${tech.label}`}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                width={32}
                height={32}
                className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                  tech.name === "Shopify" ? "w-16 h-8" : "w-8 h-8"
                } ${tech.name === "Shopify" ? "[filter:invert(52%)_sepia(98%)_saturate(400%)_hue-rotate(93deg)_brightness(95%)]" : tech.invert ? "brightness-0 invert opacity-80" : ""}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-xs font-semibold text-white">{tech.name}</span>
              <span className="text-[10px] text-[#888] font-mono">{tech.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
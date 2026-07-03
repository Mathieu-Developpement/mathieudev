"use client";

const techStack = [
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", label: "Éditeur" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "UI" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", label: "Framework" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "Langage" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", label: "Base de données" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", label: "Backend" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", label: "Versioning", invert: true },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", label: "Déploiement", invert: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Runtime" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "CSS" },
];

export default function TechStack() {
  return (
    <section className="relative py-20" aria-label="Technologies maîtrisées">
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
                className={`w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110 ${
                  tech.invert ? "brightness-0 invert opacity-80" : ""
                }`}
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
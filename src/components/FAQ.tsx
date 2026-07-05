"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionne le modèle sans frais de développement ?",
    answer:
      "Vous ne payez rien pour la conception ni le développement de votre projet. Seulement un abonnement mensuel une fois le produit livré et fonctionnel. Si ça ne répond pas à vos attentes, vous n'avez qu'à ne pas vous abonner, aucune facture, aucun engagement.",
  },
  {
    question: "Combien de temps ça prend pour avoir mon projet ?",
    answer:
      "Pour un projet simple (site vitrine, par exemple), comptez 1 à 2 semaines. Les projets plus complexes (SaaS, intégration IA, applications) prennent plus de temps selon les fonctionnalités demandées. On en discute ensemble dès le premier échange.",
  },
  {
    question: "Puis-je annuler mon abonnement en tout temps ?",
    answer:
      "Oui, sans pénalité ni préavis. Si le service ne vous convient plus, vous arrêtez simplement de payer, c'est aussi simple que ça.",
  },
  {
    question: "Quels types de projets acceptes-tu ?",
    answer:
      "Pratiquement tous : sites web, logiciels, applications, SaaS, intégrations IA, peu importe la taille ou le budget de départ. La seule exception, ce sont les très gros projets gouvernementaux ou d'institutions majeures, qui demandent une structure différente de la mienne.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base md:text-lg font-semibold text-white">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-[#00aaff] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-5 text-[#999] text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,102,204,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="code-tag block mb-3">// questions fréquentes</span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Vous vous posez des <span className="gradient-text">questions ?</span>
          </h2>
          <p className="text-[#888] max-w-lg mx-auto">
            Voici les réponses aux questions qu&apos;on me pose le plus
            souvent avant de se lancer.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
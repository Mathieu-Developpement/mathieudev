"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, type Review } from "@/lib/supabase";
import { Star, Send, User, X, ChevronDown } from "lucide-react";

const fakeReviews: Review[] = [
  {
    id: -1,
    name: "Sophie Tremblay",
    role: "Fondatrice, BoutiqueNord",
    message: "Mathieu a transformé mon idée en une vraie plateforme e-commerce en moins de 3 semaines. Aucun frais au départ, j'aurais jamais osé me lancer autrement. Maintenant je génère des ventes chaque jour.",
    rating: 5,
    created_at: "2025-05-15",
  },
  {
    id: -2,
    name: "Kevin Lavoie",
    role: "Monteur vidéo freelance",
    message: "Organix a révolutionné mon workflow. Avant je perdais 30 minutes par projet à organiser mes fichiers. Maintenant c'est automatique. Le support de Mathieu est impeccable.",
    rating: 5,
    created_at: "2025-04-08",
  },
  {
    id: -3,
    name: "Isabelle Marcotte",
    role: "Propriétaire, Clinique vétérinaire Fleuri",
    message: "L'intégration IA dans notre système de réservation a réduit notre charge d'appels de 40%. Mathieu a vraiment compris nos besoins métier. Je recommande sans hésitation.",
    rating: 5,
    created_at: "2025-03-20",
  },
  {
    id: -4,
    name: "Antoine Bergeron",
    role: "Directeur IT, LogiMax",
    message: "Sceptique au départ, mais le modèle sans frais de développement m'a convaincu d'essayer. Le résultat est au-delà des attentes. Notre logiciel de gestion interne est maintenant notre meilleur atout.",
    rating: 5,
    created_at: "2025-02-05",
  },
  {
    id: -5,
    name: "Maëlle Côté",
    role: "Coach en ligne",
    message: "Mon site, mon app mobile et mon chatbot IA ont tous été livrés par Mathieu. La cohérence entre les plateformes est parfaite. Mes clients adorent l'expérience.",
    rating: 5,
    created_at: "2025-01-12",
  },
  {
    id: -6,
    name: "François Ouellet",
    role: "Startup Fintech",
    message: "Rare de trouver un dev qui comprend autant l'aspect business que l'aspect technique. Mathieu propose des solutions, pas juste du code. Notre SaaS est maintenant rentable.",
    rating: 5,
    created_at: "2024-12-01",
  },
  {
    id: -7,
    name: "Camille Rousseau",
    role: "Blogueuse, StyleQC",
    message: "J'avais peur de me lancer sans budget, mais le modèle de Mathieu m'a rassurée. Mon site est magnifique et mes abonnées adorent la nouvelle expérience. Merci!",
    rating: 5,
    created_at: "2024-11-18",
  },
  {
    id: -8,
    name: "Marc-André Dubois",
    role: "Restaurateur, Bistro Laurier",
    message: "Réservations en ligne, menu interactif, notifications automatiques — tout ce qu'on voulait. Mathieu a livré en 2 semaines ce qu'une agence nous aurait facturé 15 000$.",
    rating: 5,
    created_at: "2024-10-30",
  },
  {
    id: -9,
    name: "Jade Pelletier",
    role: "Photographe freelance",
    message: "Mon portfolio en ligne est exactement ce que j'imaginais. Rapide, élégant, et mon formulaire de contact convertit vraiment. J'ai eu 3 nouveaux clients le premier mois.",
    rating: 4,
    created_at: "2024-10-05",
  },
  {
    id: -10,
    name: "Simon Gagnon",
    role: "Propriétaire, FitNord",
    message: "L'app mobile pour notre gym fonctionne parfaitement. Les membres peuvent réserver leurs cours, suivre leurs progrès. Mathieu a pensé à tout.",
    rating: 5,
    created_at: "2024-09-14",
  },
];

type SortOption = "recent" | "oldest" | "stars5" | "stars4" | "stars3" | "stars2" | "stars1";

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label={onChange ? "Choisir une note" : `Note : ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`transition-colors ${onChange ? "cursor-pointer" : "cursor-default"}`}
          disabled={!onChange}
          aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
          aria-pressed={onChange ? s === rating : undefined}
        >
          <Star
            size={16}
            aria-hidden="true"
            className={s <= (hover || rating) ? "fill-[#00aaff] text-[#00aaff]" : "text-[#333] fill-[#333]"}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col gap-3 h-full hover:border-[rgba(0,170,255,0.2)] transition-all duration-300">
      <StarRating rating={review.rating} />
      <p className="text-[#bbb] text-sm leading-relaxed flex-1">&ldquo;{review.message}&rdquo;</p>
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066cc, #00aaff)" }}
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-[#888]">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function sortReviews(reviews: Review[], sort: SortOption): Review[] {
  const sorted = [...reviews];
  if (sort === "recent") {
    return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  if (sort === "oldest") {
    return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
  if (sort === "stars5") return sorted.filter(r => r.rating === 5).concat(sorted.filter(r => r.rating !== 5));
  if (sort === "stars4") return sorted.filter(r => r.rating === 4).concat(sorted.filter(r => r.rating !== 4));
  if (sort === "stars3") return sorted.filter(r => r.rating === 3).concat(sorted.filter(r => r.rating !== 3));
  if (sort === "stars2") return sorted.filter(r => r.rating === 2).concat(sorted.filter(r => r.rating !== 2));
  if (sort === "stars1") return sorted.filter(r => r.rating === 1).concat(sorted.filter(r => r.rating !== 1));
  return sorted;
}

export default function Reviews() {
  const [realReviews, setRealReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("recent");
  const [form, setForm] = useState({ name: "", role: "", message: "", rating: 5 });
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadReviews();
    }
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const loadReviews = async () => {
    try {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setRealReviews(data);
    } catch {
      // Supabase not configured — silently ignore
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setLoading(true);
    try {
      await supabase.from("reviews").insert([{
        name: form.name,
        role: form.role || "Client",
        message: form.message,
        rating: form.rating,
      }]);
      setSubmitted(true);
      loadReviews();
    } catch {
      alert("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const allReviews = [...realReviews, ...fakeReviews];

  // Top 6: 5 stars first, then most recent
  const top6 = [...allReviews]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 6);

  const sortedAll = sortReviews(allReviews, sort);

  const sortLabels: Record<SortOption, string> = {
    recent: "Plus récent",
    oldest: "Plus ancien",
    stars5: "5 étoiles",
    stars4: "4 étoiles",
    stars3: "3 étoiles",
    stars2: "2 étoiles",
    stars1: "1 étoile",  
  };

  return (
    <section id="avis" className="relative py-12 bg-grid">
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="code-tag block mb-3" aria-hidden="true">// ils en parlent</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>
            Ce que disent <span className="gradient-text">mes clients</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Des gens qui ont pris le risque zéro et qui ne l&apos;ont pas regretté.
          </p>
        </div>

        {/* Top 6 grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {top6.map((review) => (
            <div key={review.id} className="break-inside-avoid">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {allReviews.length > 6 && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-bold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
              aria-label={`Voir tous les avis — ${allReviews.length} avis au total`}
            >
              <ChevronDown size={16} aria-hidden="true" />
              Voir tous les avis ({allReviews.length})
            </button>
          )}

          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary px-8 py-4 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.3)]"
              style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
              aria-label="Laisser mon avis sur MathieuDev"
            >
              Laisser votre avis →
            </button>
          )}
        </div>

        {/* Add review form */}
        {showForm && !submitted && (
          <div className="max-w-lg mx-auto glass-card rounded-2xl p-8 text-left mt-8">
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>
              Ton avis compte
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="review-name" className="text-xs text-[#999] uppercase tracking-widest mb-1 block">Ton prénom *</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" aria-hidden="true" />
                  <input
                    id="review-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Sophie"
                    className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="review-role" className="text-xs text-[#999] uppercase tracking-widest mb-1 block">Ton rôle / entreprise (optionnel)</label>
                <input
                  id="review-role"
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Ex: Fondateur, Freelance..."
                  className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#999] uppercase tracking-widest mb-2 block">Note</label>
                <StarRating rating={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
              </div>
              <div>
                <label htmlFor="review-message" className="text-xs text-[#999] uppercase tracking-widest mb-1 block">Ton message *</label>
                <textarea
                  id="review-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="Partage ton expérience..."
                  className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.message}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
                  aria-label="Publier mon avis"
                >
                  <Send size={14} aria-hidden="true" />
                  {loading ? "Envoi..." : "Publier mon avis"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-3 rounded-lg text-sm text-[#999] border border-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
                  aria-label="Annuler"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {submitted && (
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto mt-8 text-center border border-[rgba(0,170,255,0.2)]">
            <div className="text-4xl mb-3" aria-hidden="true">🎉</div>
            <h3 className="text-lg font-bold text-white mb-2">Merci pour ton avis!</h3>
            <p className="text-[#888] text-sm">Ton commentaire a été publié et apparaît maintenant sur le site.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Tous les avis clients"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal content */}
          <div className="relative w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
            style={{ background: "#111", border: "1px solid rgba(0,170,255,0.15)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,170,255,0.1)] flex-shrink-0"
              style={{ background: "#0d0d0d" }}
            >
              <div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Syne, system-ui, sans-serif" }}>
                  Tous les avis <span className="text-[#555] font-normal text-sm ml-2">({allReviews.length})</span>
                </h3>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#888] hidden sm:block">Trier par :</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSort(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        sort === key
                          ? "text-white"
                          : "text-[#888] border border-[rgba(255,255,255,0.08)] hover:text-white hover:border-[rgba(0,170,255,0.3)]"
                      }`}
                      style={sort === key ? { background: "linear-gradient(135deg, #0055bb, #00aaff)" } : {}}
                      aria-pressed={sort === key}
                      aria-label={`Trier par ${sortLabels[key]}`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="ml-2 w-8 h-8 flex items-center justify-center rounded-full text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-all"
                  aria-label="Fermer la fenêtre des avis"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Scrollable reviews */}
            <div className="overflow-y-auto p-6 flex-1">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {sortedAll.map((review) => (
                  <div key={review.id} className="break-inside-avoid">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
"use client";

import { useState, useEffect } from "react";
import { supabase, type Review } from "@/lib/supabase";
import { Star, Send, User } from "lucide-react";

const fakeReviews: Review[] = [
  {
    id: -1,
    name: "Sophie Tremblay",
    role: "Fondatrice, BoutiqueNord",
    message:
      "Mathieu a transformé mon idée en une vraie plateforme e-commerce en moins de 3 semaines. Aucun frais au départ, j'aurais jamais osé me lancer autrement. Maintenant je génère des ventes chaque jour.",
    rating: 5,
    created_at: "2024-11-15",
  },
  {
    id: -2,
    name: "Kevin Lavoie",
    role: "Monteur vidéo freelance",
    message:
      "Organix a révolutionné mon workflow. Avant je perdais 30 minutes par projet à organiser mes fichiers. Maintenant c'est automatique. Le support de Mathieu est impeccable.",
    rating: 5,
    created_at: "2025-01-08",
  },
  {
    id: -3,
    name: "Isabelle Marcotte",
    role: "Propriétaire, Clinique vétérinaire Fleuri",
    message:
      "L'intégration IA dans notre système de réservation a réduit notre charge d'appels de 40%. Mathieu a vraiment compris nos besoins métier. Je recommande sans hésitation.",
    rating: 5,
    created_at: "2025-02-20",
  },
  {
    id: -4,
    name: "Antoine Bergeron",
    role: "Directeur IT, LogiMax",
    message:
      "Sceptique au départ, mais le modèle sans frais de dev m'a convaincu d'essayer. Le résultat est au-delà des attentes. Notre logiciel de gestion interne est maintenant notre meilleur atout.",
    rating: 5,
    created_at: "2025-03-05",
  },
  {
    id: -5,
    name: "Maëlle Côté",
    role: "Coach en ligne",
    message:
      "Mon site, mon app mobile et mon chatbot IA ont tous été livrés par Mathieu. La cohérence entre les plateformes est parfaite. Mes clients adorent l'expérience.",
    rating: 5,
    created_at: "2025-04-12",
  },
  {
    id: -6,
    name: "François Ouellet",
    role: "Startup Fintech",
    message:
      "Rare de trouver un dev qui comprend autant l'aspect business que l'aspect technique. Mathieu propose des solutions, pas juste du code. Notre SaaS est maintenant rentable.",
    rating: 5,
    created_at: "2025-05-01",
  },
];

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`transition-colors ${onChange ? "cursor-pointer" : "cursor-default"}`}
          disabled={!onChange}
        >
          <Star
            size={16}
            className={
              s <= (hover || rating)
                ? "fill-[#00aaff] text-[#00aaff]"
                : "text-[#333] fill-[#333]"
            }
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
      <p className="text-[#bbb] text-sm leading-relaxed flex-1">
        &ldquo;{review.message}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066cc, #00aaff)" }}
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-[#555]">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [realReviews, setRealReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });
  const [showAll, setShowAll] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem("review_last_sent");
    if (lastSent) {
      const elapsed = Date.now() - parseInt(lastSent, 10);
      const remaining = Math.ceil((60 * 60 * 1000 - elapsed) / 1000);
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setRealReviews(data);
    } catch {
      // Supabase not configured yet — silently ignore
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) return;
    if (cooldown > 0) return;

    // Honeypot : si rempli, c'est un bot — on bloque silencieusement
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      await supabase.from("reviews").insert([
        {
          name: form.name,
          role: form.role || "Client",
          message: form.message,
          rating: form.rating,
        },
      ]);
      setSubmitted(true);
      loadReviews();
      localStorage.setItem("review_last_sent", Date.now().toString());
      setCooldown(60 * 60);
    } catch {
      alert("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const allReviews = [...realReviews, ...fakeReviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const visibleReviews = showAll ? allReviews : allReviews.slice(0, 6);

  return (
    <section id="avis" className="relative py-16 bg-grid">
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="code-tag block mb-3">// ils en parlent</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, system-ui, sans-serif" }}
          >
            Ce que disent{" "}
            <span className="gradient-text">mes clients</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Des gens qui ont pris le risque zéro et qui ne l&apos;ont pas regretté.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="break-inside-avoid">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Show more button */}
        {!showAll && allReviews.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-[#00aaff] border border-[rgba(0,170,255,0.3)] hover:border-[rgba(0,170,255,0.7)] hover:bg-[rgba(0,170,255,0.05)] transition-all duration-300"
            >
              Voir tous les avis ({allReviews.length})
            </button>
          </div>
        )}

        {showAll && allReviews.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(false)}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-[#666] border border-[rgba(255,255,255,0.08)] hover:text-white transition-all duration-300"
            >
              Voir moins
            </button>
          </div>
        )}

        {/* Add review CTA */}
        <div className="mt-16 text-center">
          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary px-8 py-4 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.3)]"
              style={{
                background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)",
              }}
            >
              Laisser mon avis →
            </button>
          )}

          {/* Form */}
          {showForm && !submitted && (
            <div className="max-w-lg mx-auto glass-card rounded-2xl p-8 text-left mt-8">
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "Syne, system-ui, sans-serif" }}
              >
                Ton avis compte
              </h3>

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs text-[#666] uppercase tracking-widest mb-1 block">
                    Ton prénom *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ex: Sophie"
                      className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-xs text-[#666] uppercase tracking-widest mb-1 block">
                    Ton rôle / entreprise (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Ex: Fondateur, Freelance, Étudiant..."
                    className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs text-[#666] uppercase tracking-widest mb-2 block">
                    Note
                  </label>
                  <StarRating
                    rating={form.rating}
                    onChange={(r) => setForm({ ...form, rating: r })}
                  />
                </div>

                {/* Honeypot — champ caché anti-spam */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                  }}
                  aria-hidden="true"
                />

                {/* Message */}
                <div>
                  <label className="text-xs text-[#666] uppercase tracking-widest mb-1 block">
                    Ton message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Partage ton expérience..."
                    className="w-full bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.message || cooldown > 0}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)",
                    }}
                  >
                    <Send size={14} />
                    {loading
                      ? "Envoi..."
                      : cooldown > 0
                      ? `Réessaie dans ${Math.floor(cooldown / 60)}min ${cooldown % 60}s`
                      : "Publier mon avis"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-3 rounded-lg text-sm text-[#666] border border-[rgba(255,255,255,0.08)] hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          {submitted && (
            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto mt-8 text-center border border-[rgba(0,170,255,0.2)]">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-white mb-2">Merci pour ton avis!</h3>
              <p className="text-[#888] text-sm">
                Ton commentaire a été publié et apparaît maintenant sur le site.
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />
    </section>
  );
}

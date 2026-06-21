"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem("contact_last_sent");
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

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    if (cooldown > 0) return;

    // Honeypot : si ce champ caché est rempli, c'est un bot — on bloque silencieusement
    if (honeypot) {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      return;
    }

    setStatus("sending");

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || "Nouveau message via MathieuDev.ca",
        message: form.message,
        to_email: "mathieu.dev@hotmail.com",
      };

      // Email à toi (notification)
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Email au client (confirmation)
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });

      // Cooldown de 60 minutes, persistant même après un refresh
      localStorage.setItem("contact_last_sent", Date.now().toString());
      setCooldown(60 * 60);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-16">
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,58,140,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — pitch */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="code-tag block mb-3">// parlons-en</span>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "Syne, system-ui, sans-serif" }}
              >
                Ton projet mérite{" "}
                <span className="gradient-text">d&apos;exister.</span>
              </h2>
              <p className="text-[#888] text-lg leading-relaxed">
                Tu as une idée? Un problème à résoudre? Un business à lancer? Écris-moi,
                c&apos;est gratuit, sans engagement, et la première conversation change
                souvent tout.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:mathieu.dev@hotmail.com"
                className="flex items-center gap-3 text-[#aaa] hover:text-[#00aaff] transition-colors text-sm group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(0,170,255,0.1)] border border-[rgba(0,170,255,0.2)] group-hover:bg-[rgba(0,170,255,0.15)] transition-colors">
                  <Mail size={14} className="text-[#00aaff]" />
                </div>
                mathieu.dev@hotmail.com
              </a>
            </div>

            {/* Promise */}
            <div className="glass-card rounded-xl p-5 border-l-2 border-[#00aaff]">
              <p className="text-sm text-[#aaa] leading-relaxed">
                <span className="text-white font-semibold">Mon engagement :</span> je
                réponds à chaque message dans les 24 heures. Ton projet sera pris au
                sérieux dès le premier échange.
              </p>
            </div>

            {/* What to include */}
            <div>
              <p className="text-xs text-[#555] uppercase tracking-widest mb-3">
                Dans ton message, tu peux inclure
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Une description de ton idée ou ton projet",
                  "Le type de solution souhaitée (web, app, logiciel, IA...)",
                  "Ton délai approximatif si tu en as un",
                  "Ton budget mensuel cible (même si c'est zéro pour l'instant)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#777]">
                    <span className="text-[#00aaff] mt-0.5 flex-shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card rounded-2xl p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle size={48} className="text-[#00aaff]" />
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                >
                  Message envoyé!
                </h3>
                <p className="text-[#888] text-sm">
                  Je te reviens dans les 24 heures. Garde un œil sur ta boîte mail.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-[#00aaff] hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h3
                  className="text-lg font-bold text-white mb-1"
                  style={{ fontFamily: "Syne, system-ui, sans-serif" }}
                >
                  Envoie-moi un message
                </h3>

                {/* Honeypot — champ caché anti-spam, invisible pour un humain */}
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

                {/* Name */}
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                    Ton nom *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Prénom Nom"
                      className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                    Ton courriel *
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="toi@exemple.com"
                      className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                    Sujet (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Ex: Je veux créer une app mobile"
                    className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                    Ton message *
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={14}
                      className="absolute left-3 top-3.5 text-[#444]"
                    />
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      placeholder="Décris ton projet ou ton idée..."
                      className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors resize-none"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400">
                    Une erreur est survenue. Écris-moi directement à mathieu.dev@hotmail.com
                  </p>
                )}

                <button
                  onClick={handleSend}
                  disabled={status === "sending" || !form.name || !form.email || !form.message || cooldown > 0}
                  className="flex items-center justify-center gap-2 py-4 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,170,255,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)",
                  }}
                >
                  <Send size={15} />
                  {status === "sending"
                    ? "Envoi en cours..."
                    : cooldown > 0
                    ? `Réessaie dans ${Math.floor(cooldown / 60)}min ${cooldown % 60}s`
                    : "Envoyer mon message"}
                </button>

                <p className="text-center text-xs text-[#444]">
                  Réponse garantie sous 24h · Aucun engagement
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

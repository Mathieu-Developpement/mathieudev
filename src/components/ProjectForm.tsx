"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  ShoppingCart,
  Monitor,
  Smartphone,
  Bot,
  Brain,
  Link2,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Check,
  MessageCircle,
} from "lucide-react";

interface ProjectFormProps {
  sourcePage?: string;
  heading?: string;
  subheading?: string;
}

const TYPE_PROJET_OPTIONS = [
  { id: "Site web", icon: Globe },
  { id: "Boutique en ligne", icon: ShoppingCart },
  { id: "Application web", icon: Monitor },
  { id: "Application mobile", icon: Smartphone },
  { id: "Automatisation", icon: Bot },
  { id: "Intelligence artificielle", icon: Brain },
  { id: "Intégration entre logiciels", icon: Link2 },
  { id: "Autre", icon: Settings },
];

const PROBLEME_OPTIONS = [
  "Je perds beaucoup de temps à faire une tâche manuellement.",
  "Je veux offrir un service en ligne.",
  "J'utilise plusieurs logiciels qui ne communiquent pas entre eux.",
  "Je veux moderniser mon entreprise.",
  "Autre",
];

const DEJA_OPTIONS = [
  "Rien, je pars de zéro.",
  "J'ai un site web.",
  "J'ai une application.",
  "J'ai une maquette.",
  "J'ai un document expliquant mon idée.",
];

const FONCTIONNALITES_OPTIONS = [
  "Connexion des utilisateurs",
  "Paiement en ligne",
  "Tableau de bord",
  "Gestion de clients",
  "Gestion d'inventaire",
  "Calendrier",
  "Réservation",
  "Notifications",
  "Intelligence artificielle",
  "Génération de PDF",
  "Tableau de statistiques",
  "API",
  "Application mobile",
  "Je ne sais pas encore",
];

const ECHEANCIER_OPTIONS = [
  "1 à 2 semaines",
  "3 à 4 semaines",
  "Dans les 3 mois",
  "Cette année",
  "Aucune date précise",
];

const BUDGET_TYPE_OPTIONS = ["Abonnement mensuel", "Paiement unique"];

const BUDGET_MENSUEL_OPTIONS = [
  "Moins de 25 $/mois",
  "25 $ à 100 $/mois",
  "100 $ à 300 $/mois",
  "300 $ à 1 000 $/mois",
  "Plus de 1 000 $/mois",
  "Je ne sais pas",
];

const BUDGET_UNIQUE_OPTIONS = [
  "Moins de 1 000 $",
  "1 000 à 3 000 $",
  "3 000 à 5 000 $",
  "5 000 à 10 000 $",
  "Plus de 10 000 $",
  "Je ne sais pas",
];

const CONTACT_OPTIONS = [
  { id: "Courriel", icon: Mail },
  { id: "Téléphone", icon: Phone },
  { id: "Messenger", icon: MessageCircle },
];

type FormData = {
  nom: string;
  entreprise: string;
  courriel: string;
  telephone: string;
  type_projet: string[];
  description: string;
  probleme: string;
  probleme_autre: string;
  deja_quelque_chose: string[];
  fonctionnalites: string[];
  echeancier: string;
  budget_type: string;
  budget: string;
  contact_prefere: string;
  messenger_contact: string;
  info_supplementaire: string;
};

const INITIAL_DATA: FormData = {
  nom: "",
  entreprise: "",
  courriel: "",
  telephone: "",
  type_projet: [],
  description: "",
  probleme: "",
  probleme_autre: "",
  deja_quelque_chose: [],
  fonctionnalites: [],
  echeancier: "",
  budget_type: "",
  budget: "",
  contact_prefere: "",
  messenger_contact: "",
  info_supplementaire: "",
};

const TOTAL_STEPS = 10;

export default function ProjectForm({
  sourcePage = "/projet",
  heading = "Parlons de votre projet.",
  subheading = "Trois minutes suffisent. Ensuite, je vous recontacte avec un plan clair.",
}: ProjectFormProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Capture des abandons : id du lead partiel une fois créé, et file d'attente
  // pour garantir que les sauvegardes se font dans l'ordre (pas en parallèle).
  const leadIdRef = useRef<string | null>(null);
  const saveChainRef = useRef<Promise<void>>(Promise.resolve());

  // Autofocus du premier champ de chaque étape.
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Pour ne déclencher l'événement Meta Pixel "début de formulaire" qu'une seule fois.
  const pixelStartFiredRef = useRef(false);

  const toggleArrayValue = (field: "type_projet" | "deja_quelque_chose" | "fonctionnalites", value: string) => {
    setData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return data.nom.trim().length > 1 && isEmailValid(data.courriel);
      case 2:
        return data.type_projet.length > 0;
      case 3:
        return true; // optionnel
      case 4:
        return data.probleme !== "" && (data.probleme !== "Autre" || data.probleme_autre.trim().length > 0);
      case 5:
        return data.deja_quelque_chose.length > 0;
      case 6:
        return data.fonctionnalites.length > 0;
      case 7:
        return data.echeancier !== "";
      case 8:
        return data.budget_type !== "" && data.budget !== "";
      case 9:
        return (
          data.contact_prefere !== "" &&
          (data.contact_prefere !== "Téléphone" || data.telephone.trim().length > 3) &&
          (data.contact_prefere !== "Messenger" || data.messenger_contact.trim().length > 0)
        );
      case 10:
        return true; // optionnel, dernière étape
      default:
        return false;
    }
  };

  const getProblemeFinal = () => (data.probleme === "Autre" ? data.probleme_autre : data.probleme);

  // Génère l'identifiant du lead côté navigateur, une seule fois, dès qu'on
  // en a besoin. Comme l'id est déjà connu, plus besoin de relire la réponse
  // de Supabase après l'insertion (donc plus besoin de policy SELECT).
  const ensureLeadId = () => {
    if (!leadIdRef.current) {
      leadIdRef.current = crypto.randomUUID();
    }
    return leadIdRef.current;
  };

  const buildPayload = (leadStatus: string) => ({
    id: ensureLeadId(),
    nom: data.nom,
    entreprise: data.entreprise || null,
    courriel: data.courriel,
    telephone: data.telephone || null,
    type_projet: data.type_projet,
    description: data.description || null,
    probleme: getProblemeFinal() || null,
    deja_quelque_chose: data.deja_quelque_chose,
    fonctionnalites: data.fonctionnalites,
    echeancier: data.echeancier || null,
    budget_type: data.budget_type || null,
    budget: data.budget || null,
    contact_prefere: data.contact_prefere || null,
    messenger_contact: data.messenger_contact || null,
    info_supplementaire: data.info_supplementaire || null,
    source_page: sourcePage,
    status: leadStatus,
  });

  // Sauvegarde silencieuse du lead partiel à chaque étape franchie, via la
  // route API serveur (qui utilise la clé service_role côté serveur).
  // N'affecte jamais l'UI : les erreurs sont avalées, l'utilisateur ne voit rien.
  const queueSaveProgress = (payload: ReturnType<typeof buildPayload>) => {
    saveChainRef.current = saveChainRef.current.then(async () => {
      try {
        await fetch("/api/project-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // silencieux
      }
    });
  };

  const goNext = () => {
    if (!isStepValid()) return;
    queueSaveProgress(buildPayload("partiel"));

    // Signal Meta Pixel dès que le visiteur a réellement commencé à répondre
    // (étape 1 validée) — permet de créer une audience de retargeting pour
    // les gens qui démarrent le formulaire sans le terminer.
    if (!pixelStartFiredRef.current) {
      pixelStartFiredRef.current = true;
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("trackCustom", "ProjectFormStarted", {
          content_category: sourcePage,
        });
      }
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    setStatus("sending");

    const problemeFinal = getProblemeFinal();

    try {
      // 1. Attendre que les sauvegardes partielles en attente soient terminées,
      // puis finaliser le lead (upsert = insert si nouveau, update si déjà créé).
      await saveChainRef.current.catch(() => {});

      const payload = buildPayload("nouveau");
      const res = await fetch("/api/project-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erreur lors de l'enregistrement");
      }

      // 2. Construire un résumé lisible pour le courriel de notification
      const resume = `
NOUVELLE DEMANDE DE PROJET (${sourcePage})

--- Coordonnées ---
Nom : ${data.nom}
Entreprise : ${data.entreprise || "—"}
Courriel : ${data.courriel}
Téléphone : ${data.telephone || "—"}

--- Projet ---
Type de projet : ${data.type_projet.join(", ")}
Description : ${data.description || "—"}
Problème à résoudre : ${problemeFinal}

--- Contexte ---
Déjà en place : ${data.deja_quelque_chose.join(", ")}
Fonctionnalités souhaitées : ${data.fonctionnalites.join(", ")}

--- Logistique ---
Échéancier : ${data.echeancier}
Budget (${data.budget_type}) : ${data.budget}
Mode de contact préféré : ${data.contact_prefere}${
        data.contact_prefere === "Messenger" ? ` (${data.messenger_contact})` : ""
      }${data.contact_prefere === "Téléphone" ? ` (${data.telephone})` : ""}

--- Infos supplémentaires ---
${data.info_supplementaire || "—"}
      `.trim();

      // 3. Envoyer la notification par courriel (réutilise le template existant)
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.nom,
          from_email: data.courriel,
          subject: `Nouveau lead — ${sourcePage}`,
          message: resume,
          to_email: "mathieu.dev@hotmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // 4. Meta Pixel — événement Lead
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Formulaire projet",
          content_category: sourcePage,
        });
      }

      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  // Autofocus : place le curseur dans le premier champ texte de l'étape,
  // à chaque changement d'étape (léger délai pour laisser l'animation démarrer).
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = stepContentRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        "input, textarea"
      );
      el?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);

  // Si Entrée est pressée mais que l'étape n'est pas encore valide, on avance
  // le focus au champ suivant (comme Tab) plutôt que de ne rien faire.
  const focusNextField = () => {
    const container = stepContentRef.current;
    if (!container) return;
    const fields = Array.from(
      container.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
    );
    const currentIndex = fields.indexOf(document.activeElement as HTMLInputElement | HTMLTextAreaElement);
    if (currentIndex >= 0 && currentIndex < fields.length - 1) {
      fields[currentIndex + 1].focus();
    }
  };

  // Navigation au clavier : Entrée dans un champ texte avance à l'étape suivante
  // si elle est valide (ou soumet si c'est la dernière étape), sinon avance au
  // champ suivant de la même étape. N'intercepte jamais les textarea, pour
  // laisser Entrée créer un retour à la ligne, ni les boutons.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag !== "INPUT") return;

      e.preventDefault();

      if (!isStepValid()) {
        focusNextField();
        return;
      }

      if (step < TOTAL_STEPS) {
        goNext();
      } else if (status === "idle" || status === "error") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [step, data, status]);

  if (status === "sent") {
    return (
      <div className="glass-card rounded-2xl p-10 flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
        <CheckCircle size={48} className="text-[#00aaff]" />
        <h3
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "Syne, system-ui, sans-serif" }}
        >
          Merci, {data.nom.split(" ")[0]}!
        </h3>
        <p className="text-[#888] text-sm leading-relaxed">
          Votre demande a bien été reçue. Je l&apos;examine et je vous recontacte par{" "}
          {data.contact_prefere.toLowerCase()} dans les 24 heures avec un premier plan concret.
        </p>
      </div>
    );
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="code-tag block mb-3">// nouveau projet</span>
        <h1
          className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
          style={{ fontFamily: "Syne, system-ui, sans-serif" }}
        >
          {heading}
        </h1>
        <p className="text-[#888] text-sm md:text-base">{subheading}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#555] uppercase tracking-widest">
            Étape {step} / {TOTAL_STEPS}
          </span>
          <span className="text-xs text-[#00aaff]">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#161616] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #0066cc, #00aaff)" }}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8 min-h-[380px] flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              ref={stepContentRef}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === 1 && (
                <StepCoordonnees data={data} setData={setData} />
              )}
              {step === 2 && (
                <StepMultiIcon
                  title="Quel type de projet souhaitez-vous réaliser?"
                  hint="Sélectionnez une ou plusieurs options."
                  options={TYPE_PROJET_OPTIONS}
                  selected={data.type_projet}
                  onToggle={(v) => toggleArrayValue("type_projet", v)}
                />
              )}
              {step === 3 && (
                <div className="flex flex-col gap-3">
                  <StepTitle title="Décrivez votre projet" hint="Pas besoin de termes techniques — expliquez simplement ce que vous aimeriez obtenir." />
                  <textarea
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    rows={7}
                    placeholder="Ex : Je voudrais un site pour présenter mes services et permettre aux clients de prendre rendez-vous en ligne..."
                    className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors resize-none"
                  />
                </div>
              )}
              {step === 4 && (
                <div className="flex flex-col gap-3">
                  <StepTitle title="Quel problème souhaitez-vous résoudre?" />
                  <div className="flex flex-col gap-2">
                    {PROBLEME_OPTIONS.map((opt) => (
                      <SelectCard
                        key={opt}
                        label={opt}
                        selected={data.probleme === opt}
                        onClick={() => setData({ ...data, probleme: opt })}
                      />
                    ))}
                  </div>
                  {data.probleme === "Autre" && (
                    <input
                      type="text"
                      value={data.probleme_autre}
                      onChange={(e) => setData({ ...data, probleme_autre: e.target.value })}
                      placeholder="Précisez..."
                      className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors mt-1"
                    />
                  )}
                </div>
              )}
              {step === 5 && (
                <StepMultiCheck
                  title="Avez-vous déjà quelque chose?"
                  options={DEJA_OPTIONS}
                  selected={data.deja_quelque_chose}
                  onToggle={(v) => toggleArrayValue("deja_quelque_chose", v)}
                />
              )}
              {step === 6 && (
                <StepMultiCheck
                  title="Souhaitez-vous certaines fonctionnalités?"
                  hint="Sélectionnez tout ce qui s'applique."
                  options={FONCTIONNALITES_OPTIONS}
                  selected={data.fonctionnalites}
                  onToggle={(v) => toggleArrayValue("fonctionnalites", v)}
                  columns={2}
                />
              )}
              {step === 7 && (
                <div className="flex flex-col gap-3">
                  <StepTitle title="Avez-vous un échéancier?" />
                  <div className="flex flex-col gap-2">
                    {ECHEANCIER_OPTIONS.map((opt) => (
                      <SelectCard
                        key={opt}
                        label={opt}
                        selected={data.echeancier === opt}
                        onClick={() => setData({ ...data, echeancier: opt })}
                      />
                    ))}
                  </div>
                </div>
              )}
              {step === 8 && (
                <div className="flex flex-col gap-4">
                  <StepTitle
                    title="Quel est votre budget?"
                    hint="Notre modèle principal est l'abonnement mensuel, mais le paiement unique est aussi possible."
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGET_TYPE_OPTIONS.map((opt) => (
                      <SelectCard
                        key={opt}
                        label={opt}
                        selected={data.budget_type === opt}
                        onClick={() => setData({ ...data, budget_type: opt, budget: "" })}
                      />
                    ))}
                  </div>

                  {data.budget_type !== "" && (
                    <div className="flex flex-col gap-2 pt-1">
                      <p className="text-xs text-[#666]">
                        {data.budget_type === "Abonnement mensuel"
                          ? "Montant approximatif par mois :"
                          : "Montant approximatif total :"}
                      </p>
                      {(data.budget_type === "Abonnement mensuel"
                        ? BUDGET_MENSUEL_OPTIONS
                        : BUDGET_UNIQUE_OPTIONS
                      ).map((opt) => (
                        <SelectCard
                          key={opt}
                          label={opt}
                          selected={data.budget === opt}
                          onClick={() => setData({ ...data, budget: opt })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {step === 9 && (
                <div className="flex flex-col gap-3">
                  <StepMultiIcon
                    title="Préférez-vous être contacté par?"
                    options={CONTACT_OPTIONS}
                    selected={data.contact_prefere ? [data.contact_prefere] : []}
                    onToggle={(v) => setData({ ...data, contact_prefere: v })}
                    single
                    wideIds={["Messenger"]}
                  />

                  {data.contact_prefere === "Téléphone" && data.telephone.trim() === "" && (
                    <div className="mt-1">
                      <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                        Numéro de téléphone *
                      </label>
                      <input
                        type="tel"
                        value={data.telephone}
                        onChange={(e) => setData({ ...data, telephone: e.target.value })}
                        placeholder="514 555-1234"
                        className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                      />
                    </div>
                  )}

                  {data.contact_prefere === "Messenger" && (
                    <div className="mt-1">
                      <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
                        Nom d&apos;utilisateur ou lien de profil Messenger *
                      </label>
                      <input
                        type="text"
                        value={data.messenger_contact}
                        onChange={(e) => setData({ ...data, messenger_contact: e.target.value })}
                        placeholder="ex : m.me/votrenom"
                        className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
                      />
                    </div>
                  )}
                </div>
              )}
              {step === 10 && (
                <div className="flex flex-col gap-3">
                  <StepTitle title="Informations supplémentaires" hint="Optionnel — tout ce qui pourrait m'aider à mieux comprendre votre projet." />
                  <textarea
                    value={data.info_supplementaire}
                    onChange={(e) => setData({ ...data, info_supplementaire: e.target.value })}
                    rows={6}
                    placeholder="Ajoutez tout détail pertinent..."
                    className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors resize-none"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {status === "error" && (
          <p className="text-xs text-red-400 mt-4">
            Une erreur est survenue. Réessayez, ou écrivez-moi directement à mathieu.dev@hotmail.com
          </p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center gap-1.5 text-sm text-[#888] disabled:opacity-0 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Retour
          </button>

          {step < TOTAL_STEPS ? (
            <button
              onClick={goNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,170,255,0.3)]"
              style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
            >
              Suivant
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white disabled:opacity-60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,170,255,0.3)]"
              style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
            >
              {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-[#444] mt-4">
        Aucun engagement · Réponse garantie sous 24h
      </p>
    </div>
  );
}

/* ---------- Sous-composants ---------- */

function StepTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-1">
      <h2
        className="text-lg md:text-xl font-bold text-white mb-1"
        style={{ fontFamily: "Syne, system-ui, sans-serif" }}
      >
        {title}
      </h2>
      {hint && <p className="text-xs text-[#666]">{hint}</p>}
    </div>
  );
}

function SelectCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 flex items-center justify-between gap-3 ${
        selected
          ? "border-[#00aaff] bg-[rgba(0,170,255,0.1)] text-white"
          : "border-[rgba(255,255,255,0.07)] bg-[#0d0d0d] text-[#aaa] hover:border-[rgba(0,170,255,0.3)]"
      }`}
    >
      {label}
      {selected && <Check size={16} className="text-[#00aaff] flex-shrink-0" />}
    </button>
  );
}

function StepMultiCheck({
  title,
  hint,
  options,
  selected,
  onToggle,
  columns = 1,
}: {
  title: string;
  hint?: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className="flex flex-col gap-3">
      <StepTitle title={title} hint={hint} />
      <div className={columns === 2 ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-col gap-2"}>
        {options.map((opt) => (
          <SelectCard key={opt} label={opt} selected={selected.includes(opt)} onClick={() => onToggle(opt)} />
        ))}
      </div>
    </div>
  );
}

function StepMultiIcon({
  title,
  hint,
  options,
  selected,
  onToggle,
  single = false,
  wideIds = [],
}: {
  title: string;
  hint?: string;
  options: { id: string; icon: any }[];
  selected: string[];
  onToggle: (value: string) => void;
  single?: boolean;
  wideIds?: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <StepTitle title={title} hint={hint} />
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(({ id, icon: Icon }) => {
          const isSelected = selected.includes(id);
          const isWide = wideIds.includes(id);
          return (
            <button
              key={id}
              onClick={() => onToggle(id)}
              className={`flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-lg border text-xs text-center transition-all duration-200 ${
                isWide ? "col-span-2" : ""
              } ${
                isSelected
                  ? "border-[#00aaff] bg-[rgba(0,170,255,0.1)] text-white"
                  : "border-[rgba(255,255,255,0.07)] bg-[#0d0d0d] text-[#aaa] hover:border-[rgba(0,170,255,0.3)]"
              }`}
            >
              <Icon size={20} className={isSelected ? "text-[#00aaff]" : "text-[#666]"} />
              {id}
            </button>
          );
        })}
      </div>
      {!single && <p className="text-[10px] text-[#555]">Sélectionnez une ou plusieurs options.</p>}
    </div>
  );
}

function StepCoordonnees({
  data,
  setData,
}: {
  data: FormData;
  setData: (d: FormData) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <StepTitle title="Vos coordonnées" hint="Pour que je puisse vous recontacter." />

      <div>
        <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">Nom *</label>
        <div className="relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            value={data.nom}
            onChange={(e) => setData({ ...data, nom: e.target.value })}
            placeholder="Prénom Nom"
            className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
          Nom de l&apos;entreprise (optionnel)
        </label>
        <div className="relative">
          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            value={data.entreprise}
            onChange={(e) => setData({ ...data, entreprise: e.target.value })}
            placeholder="Nom de votre entreprise"
            className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">Courriel *</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="email"
            value={data.courriel}
            onChange={(e) => setData({ ...data, courriel: e.target.value })}
            placeholder="vous@exemple.com"
            className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[#555] uppercase tracking-widest mb-1.5 block">
          Téléphone (optionnel)
        </label>
        <div className="relative">
          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="tel"
            value={data.telephone}
            onChange={(e) => setData({ ...data, telephone: e.target.value })}
            placeholder="514 555-1234"
            className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.07)] rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[rgba(0,170,255,0.4)] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
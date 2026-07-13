"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

export const CONSENT_STORAGE_KEY = "mathieudev_cookie_consent";
export const CONSENT_EVENT = "cookieConsentChange";

type ConsentValue = "accepted" | "refused";

function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "refused" ? value : null;
}

function setStoredConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // On n'affiche la bannière que si aucun choix n'a encore été fait.
    if (getStoredConsent() === null) {
      setVisible(true);
    }

    // Permet de rouvrir la bannière depuis le petit bouton "Gérer les cookies".
    const handleReopen = () => setVisible(true);
    window.addEventListener("reopenCookieConsent", handleReopen);
    return () => window.removeEventListener("reopenCookieConsent", handleReopen);
  }, []);

  const decide = (value: ConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center">
      <div className="glass-card rounded-2xl p-5 md:p-6 max-w-2xl w-full flex flex-col md:flex-row items-start md:items-center gap-4">
        <Cookie size={24} className="text-[#00aaff] flex-shrink-0 hidden sm:block" />
        <p className="text-xs md:text-sm text-[#aaa] leading-relaxed flex-1">
          Ce site utilise des témoins (cookies) pour mesurer l&apos;efficacité de nos
          publicités, notamment via le Meta Pixel. Ces témoins ne sont activés qu&apos;avec
          votre consentement. Consultez notre{" "}
          <a href="/politique-de-confidentialite" className="text-[#00aaff] hover:underline">
            politique de confidentialité
          </a>{" "}
          ou changez d&apos;avis en tout temps via le lien &quot;Gérer les cookies&quot; au bas
          du site.
        </p>
        <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
          <button
            onClick={() => decide("refused")}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold border border-[rgba(255,255,255,0.12)] text-[#ccc] hover:border-[rgba(255,255,255,0.3)] transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={() => decide("accepted")}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #0055bb 0%, #00aaff 100%)" }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
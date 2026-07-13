"use client";

export default function ManageCookiesLink({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("reopenCookieConsent"))}
      className={
        className ??
        "text-xs text-[#777] hover:text-[#00aaff] transition-colors underline underline-offset-2"
      }
    >
      Gérer les cookies
    </button>
  );
}
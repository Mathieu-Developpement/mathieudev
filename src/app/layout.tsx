import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mathieudev.vercel.app"),
  title: "MathieuDev — Web · Logiciels · Applications",
  description:
    "Développement web, logiciels, applications et intégration IA sur mesure. Aucun frais de développement — seulement un abonnement mensuel. Satisfaction garantie.",
  keywords: "développement web, logiciels, applications, SaaS, IA, Québec, MathieuDev",
  openGraph: {
    title: "MathieuDev — Web · Logiciels · Applications",
    description: "Développement sur mesure. Zéro risque. Abonnement mensuel seulement.",
    url: "https://mathieudev.vercel.app",
    siteName: "MathieuDev",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MathieuDev — Web · Logiciels · Applications · SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MathieuDev — Web · Logiciels · Applications",
    description: "Développement sur mesure. Zéro risque. Abonnement mensuel seulement.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-md-black text-md-text antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

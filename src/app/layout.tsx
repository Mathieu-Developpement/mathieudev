import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mathieudev.com"),
  title: {
    default: "MathieuDev — Développement Web, Logiciels & Applications",
    template: "%s | MathieuDev",
  },
  description:
    "Développeur freelance spécialisé en sites web, logiciels, applications mobiles, SaaS et intégration IA. Aucun frais de développement — abonnement mensuel seulement. Satisfaction garantie.",
  keywords: [
    "développeur web Québec",
    "développeur freelance",
    "création application mobile",
    "SaaS sur mesure",
    "intégration IA",
    "Next.js",
    "React",
    "Supabase",
    "développement logiciel",
    "MathieuDev",
    "Fiverr developer",
    "web developer Canada",
    "chatbot IA personnalisé",
    "développeur React Native",
    "agence web Québec",
    "logiciel sur mesure PME",
    "freelance web developer",
    "application iOS Android",
    "développement application mobile Québec",
    "création site web professionnel",
    "automatisation IA entreprise",
    "développeur full stack Québec",
    "plateforme SaaS Québec",
    "intelligence artificielle sur mesure",
    "web developer freelance Montreal",
    "custom software development",
    "mobile app developer Canada",
    "AI integration developer",
    "Next.js developer",
    "React developer freelance",
  ],
  authors: [{ name: "MathieuDev" }],
  creator: "MathieuDev",
  openGraph: {
    title: "MathieuDev — Développement Web, Logiciels & Applications",
    description:
      "Développement sur mesure. Zéro frais de dev. Abonnement mensuel seulement. Satisfaction garantie.",
    url: "https://www.mathieudev.com",
    siteName: "MathieuDev",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MathieuDev — Web · Logiciels · Applications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MathieuDev — Développement Web, Logiciels & Applications",
    description: "Développement sur mesure. Zéro frais de dev. Satisfaction garantie.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://www.mathieudev.com",
  },
  verification: {
    google: ["BzJXKCeDO6M0u2Fw7dlwzcX0R57Mkj2KKYdYUAYeu5I", "PSJ5w403UHrT5PTgRmWP4vSedOeVWO1SdY0EKrm2qyU"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MathieuDev",
  description:
    "Développeur freelance spécialisé en sites web, logiciels, applications mobiles, SaaS et intégration IA. Aucun frais de développement — abonnement mensuel seulement.",
  url: "https://www.mathieudev.com",
  email: "mathieu.dev@hotmail.com",
  areaServed: ["CA", "Worldwide"],
  availableLanguage: ["French", "English"],
  priceRange: "$$",
  serviceType: [
    "Développement web",
    "Développement logiciel",
    "Application mobile",
    "Plateforme SaaS",
    "Intégration IA",
    "Intelligence artificielle personnalisée",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Supabase",
    "Firebase",
    "Vercel",
    "Tailwind CSS",
    "Node.js",
    "OpenAI",
  ],
  sameAs: [
    "https://www.fiverr.com",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-md-black text-md-text antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}

        {/* Meta Pixel — ne se charge que si le visiteur a donné son consentement */}
        <MetaPixel />

        {/* Bannière de consentement aux cookies (Loi 25) */}
        <CookieConsent />
      </body>
    </html>
  );
}
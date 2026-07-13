import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ManageCookiesLink from "@/components/ManageCookiesLink";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de MathieuDev — collecte, utilisation et protection de vos renseignements personnels.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl md:text-2xl font-bold text-white mb-3"
        style={{ fontFamily: "Syne, system-ui, sans-serif" }}
      >
        {title}
      </h2>
      <div className="text-sm text-[#aaa] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="relative min-h-screen bg-md-black text-md-text">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,58,140,0.12) 0%, transparent 70%)",
        }}
      />

      <header className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-4">
        <Link href="/" aria-label="Retour à l'accueil">
          <Image src="/images/logo.png" alt="MathieuDev" width={150} height={41} priority />
        </Link>
      </header>

      <article className="relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-24">
        <span className="code-tag block mb-3">// politique de confidentialité</span>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
          style={{ fontFamily: "Syne, system-ui, sans-serif" }}
        >
          Politique de <span className="gradient-text">confidentialité</span>
        </h1>
        <p className="text-xs text-[#666] mb-12">Dernière mise à jour : 13 juillet 2026</p>

        <Section title="1. Qui sommes-nous">
          <p>
            MathieuDev est une entreprise individuelle basée au Québec, offrant des services de
            développement web, d&apos;applications et de solutions technologiques sur mesure. La
            présente politique explique quels renseignements personnels sont recueillis sur le
            site mathieudev.com, pourquoi, comment ils sont protégés, et quels sont vos droits.
          </p>
          <p>
            Pour toute question relative à cette politique ou à vos renseignements personnels,
            vous pouvez nous joindre à{" "}
            <a href="mailto:mathieu.dev@hotmail.com" className="text-[#00aaff] hover:underline">
              mathieu.dev@hotmail.com
            </a>.
          </p>
        </Section>

        <Section title="2. Renseignements que nous collectons">
          <p className="text-white font-semibold">Formulaire de contact</p>
          <p>
            Lorsque vous utilisez le formulaire de contact du site, nous recueillons votre nom,
            votre adresse courriel et le contenu de votre message.
          </p>

          <p className="text-white font-semibold mt-4">Formulaire de qualification de projet</p>
          <p>
            Sur les pages dédiées à nos campagnes publicitaires (par exemple mathieudev.com/projet
            et ses variantes), nous recueillons les renseignements que vous nous fournissez pour
            évaluer votre projet : nom, nom d&apos;entreprise, courriel, téléphone, type de
            projet, description, budget, échéancier et mode de contact préféré. Si vous
            interrompez le formulaire avant de le terminer, les réponses déjà fournies (par
            exemple votre nom et courriel) peuvent être enregistrées afin que nous puissions vous
            recontacter, même si vous ne soumettez pas le formulaire au complet.
          </p>

          <p className="text-white font-semibold mt-4">Témoins (cookies) et Meta Pixel</p>
          <p>
            Notre site utilise le Meta Pixel (Facebook) afin de mesurer l&apos;efficacité de nos
            campagnes publicitaires. Ce témoin n&apos;est activé qu&apos;après avoir obtenu votre
            consentement explicite via la bannière affichée lors de votre première visite. Vous
            pouvez retirer ce consentement en tout temps via le lien{" "}
            <ManageCookiesLink className="text-[#00aaff] hover:underline" /> au bas du site.
          </p>
        </Section>

        <Section title="3. Pourquoi nous recueillons ces renseignements">
          <p>Nous utilisons vos renseignements personnels uniquement pour :</p>
          <ul className="list-disc list-inside space-y-1.5 ml-1">
            <li>Répondre à vos demandes et communiquer avec vous;</li>
            <li>Évaluer et préparer une proposition pour votre projet;</li>
            <li>Vous recontacter si vous avez interrompu un formulaire avant de le terminer;</li>
            <li>Mesurer la performance de nos campagnes publicitaires (avec votre consentement).</li>
          </ul>
          <p>
            Nous ne vendons jamais vos renseignements personnels et ne les utilisons pas à des
            fins autres que celles décrites ci-dessus.
          </p>
        </Section>

        <Section title="4. Partage avec des tiers">
          <p>
            Certains renseignements sont traités par des fournisseurs de services tiers, dans le
            seul but de faire fonctionner le site et nos communications :
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-1">
            <li>
              <span className="text-white">Supabase</span> — hébergement de la base de données où
              sont stockées vos réponses aux formulaires;
            </li>
            <li>
              <span className="text-white">EmailJS</span> — envoi des courriels de notification
              lorsque vous soumettez un formulaire;
            </li>
            <li>
              <span className="text-white">Meta (Facebook)</span> — mesure de la performance
              publicitaire, uniquement avec votre consentement;
            </li>
            <li>
              <span className="text-white">Vercel</span> — hébergement technique du site.
            </li>
          </ul>
          <p>
            Ces fournisseurs peuvent traiter ou stocker des données sur des serveurs situés à
            l&apos;extérieur du Québec, notamment aux États-Unis. Nous ne retenons que des
            fournisseurs offrant un niveau de protection jugé équivalent à celui exigé par la loi
            québécoise.
          </p>
        </Section>

        <Section title="5. Conservation des renseignements">
          <p>
            Nous conservons vos renseignements personnels seulement le temps nécessaire aux fins
            décrites dans cette politique, ou selon nos obligations légales. Vous pouvez
            demander la suppression de vos renseignements en tout temps (voir section 7).
          </p>
        </Section>

        <Section title="6. Sécurité">
          <p>
            Nous mettons en place des mesures raisonnables pour protéger vos renseignements
            personnels contre la perte, le vol et l&apos;accès non autorisé, notamment via des
            connexions chiffrées et un accès restreint à nos bases de données.
          </p>
        </Section>

        <Section title="7. Vos droits">
          <p>Conformément à la Loi 25, vous avez le droit de :</p>
          <ul className="list-disc list-inside space-y-1.5 ml-1">
            <li>Accéder aux renseignements personnels que nous détenons à votre sujet;</li>
            <li>Faire corriger des renseignements inexacts, incomplets ou ambigus;</li>
            <li>Retirer votre consentement à la collecte de témoins en tout temps;</li>
            <li>Demander la suppression de vos renseignements personnels.</li>
          </ul>
          <p>
            Pour exercer l&apos;un de ces droits, écrivez à{" "}
            <a href="mailto:mathieu.dev@hotmail.com" className="text-[#00aaff] hover:underline">
              mathieu.dev@hotmail.com
            </a>. Si vous estimez que vos droits n&apos;ont pas été respectés, vous pouvez
            déposer une plainte auprès de la{" "}
            <a
              href="https://www.cai.gouv.qc.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00aaff] hover:underline"
            >
              Commission d&apos;accès à l&apos;information du Québec
            </a>.
          </p>
        </Section>

        <Section title="8. Modifications à cette politique">
          <p>
            Cette politique peut être mise à jour occasionnellement. La date de la dernière
            révision est indiquée en haut de cette page. Nous vous encourageons à la consulter
            périodiquement.
          </p>
        </Section>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link href="/" className="text-sm text-[#00aaff] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </article>
    </main>
  );
}
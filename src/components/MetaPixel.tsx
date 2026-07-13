"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "./CookieConsent";

export default function MetaPixel() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted");
    };
    check();

    // Se met à jour immédiatement si le visiteur clique "Accepter" dans la
    // bannière, sans avoir besoin de recharger la page.
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  if (!consented) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '658392104543386');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
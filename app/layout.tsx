import type { Metadata } from "next";
import { SITE_URL, OG_LOCALE, ALTERNATES } from "@/lib/site";
import { withBase } from "@/lib/withBase";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}`),
  title: {
    default: "Cargo Flow Africa — Transport Brokerage & Logistics Coordination",
    template: "%s | Cargo Flow Africa",
  },
  description:
    "Cargo Flow Africa Transport Group connects businesses, commodity traders, and manufacturers with verified transport operators across 12 SADC nations. Cross-border transport brokerage, bulk cargo coordination, and logistics solutions in Southern Africa.",
  keywords: [
    "transport brokerage Africa",
    "cross-border transport SADC",
    "cargo logistics Botswana",
    "bulk cargo coordination",
    "African freight brokerage",
    "truck sourcing Africa",
    "mining minerals transport",
    "agricultural cargo transport",
    "cross-border logistics Southern Africa",
    "Cargo Flow Africa",
  ],
  authors: [{ name: "Cargo Flow Africa Transport Group" }],
  creator: "Cargo Flow Africa Transport Group",
  publisher: "Cargo Flow Africa Transport Group",
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
  openGraph: {
    type: "website",
    locale: OG_LOCALE,
    url: `${SITE_URL}/`,
    siteName: "Cargo Flow Africa Transport Group",
    title: "Cargo Flow Africa — Transport Brokerage & Logistics Coordination",
    description:
      "Connecting businesses and commodity traders with verified transport operators across 12 African nations. Bulk cargo, cross-border logistics, and truck sourcing in the SADC region.",
    images: [
      {
        url: withBase("/images/logo-desktop.avif"),
        width: 1200,
        height: 630,
        alt: "Cargo Flow Africa Transport Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargo Flow Africa — Transport Brokerage & Logistics Coordination",
    description:
      "Connecting cargo across 12 African nations. Transport brokerage, bulk cargo coordination, and cross-border logistics in Southern Africa.",
    images: [withBase("/images/logo-desktop.avif")],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  icons: {
    icon: [
      { url: withBase("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: withBase("/android-chrome-192x192.png"), sizes: "192x192", type: "image/png" },
      { url: withBase("/android-chrome-512x512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: { url: withBase("/android-chrome-512x512.png"), sizes: "512x512" },
  },
  manifest: withBase("/site.webmanifest"),
  other: {
    "theme-color": "#0f172a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {Object.entries(ALTERNATES).map(([lang, href]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={href} />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400;1,9..40,500&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Cargo Flow Africa Transport Group",
                  url: `${SITE_URL}/`,
                  logo: `${SITE_URL}/images/logo-desktop.avif`,
                  email: "info@cargoflowafrica.co.za",
                  telephone: "+2673110098",
                  description:
                    "African transport brokerage and logistics coordination company connecting businesses with verified transport operators across 12 SADC nations.",
                  areaServed: [
                    "Botswana",
                    "South Africa",
                    "Zimbabwe",
                    "Zambia",
                    "Namibia",
                    "Mozambique",
                    "Eswatini",
                    "Lesotho",
                    "Malawi",
                    "Tanzania",
                    "DR Congo",
                    "Angola",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Office Suite Eh Nol, Eland House, Gaborone West Industrial",
                    addressLocality: "Gaborone",
                    addressCountry: "BW",
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+2673110098",
                      contactType: "customer service",
                      areaServed: "BW",
                      availableLanguage: "English",
                    },
                    {
                      "@type": "ContactPoint",
                      telephone: "+27817584591",
                      contactType: "customer service",
                      areaServed: "ZA",
                      availableLanguage: "English",
                    },
                  ],
                  sameAs: [
                    "https://wa.me/26773732442",
                    "https://wa.me/27817584591",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${SITE_URL}/#localbusiness`,
                  name: "Cargo Flow Africa Transport Group",
                  image: `${SITE_URL}/images/logo-desktop.avif`,
                  url: `${SITE_URL}/`,
                  telephone: "+2673110098",
                  email: "info@cargoflowafrica.co.za",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Office Suite Eh Nol, Eland House, Gaborone West Industrial",
                    addressLocality: "Gaborone",
                    addressCountry: "BW",
                  },
                  priceRange: "$$",
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    opens: "08:00",
                    closes: "17:00",
                  },
                },
                {
                  "@type": "Service",
                  "@id": `${SITE_URL}/#service`,
                  name: "Transport Brokerage & Logistics Coordination",
                  provider: {
                    "@id": `${SITE_URL}/#organization`,
                  },
                  description:
                    "Transport brokerage, bulk cargo coordination, cross-border logistics, load & capacity matching, and transport documentation support across Southern Africa.",
                  areaServed: "Southern Africa",
                  serviceType: "Freight Brokerage",
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

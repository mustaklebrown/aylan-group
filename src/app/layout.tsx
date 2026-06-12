import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://aylan-group.vercel.app"),
  title: "Aylan Group | Votre Passerelle vers le Shopping Mondial",
  description: "Connectant parfaitement les acheteurs comoriens aux supermarchés mondiaux. Solutions d'approvisionnement, logistique et livraison.",
  keywords: [
    "Aylan Group",
    "e-commerce Comores",
    "livraison Comores",
    "fret Comores",
    "import Comores",
    "achat en ligne Moroni",
    "logistique internationale",
    "formation e-commerce Comores"
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Aylan Group | Shopping & Logistique",
    description: "Connectant les acheteurs comoriens aux supermarchés mondiaux.",
    url: "https://aylan-group.vercel.app", // Provisional Vercel URL
    siteName: "Aylan Group",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Aylan Group Hero Image",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aylan Group",
    description: "Votre Passerelle vers le Shopping Mondial.",
    images: ["/hero-bg.png"],
  },
};

import AppLayoutWrapper from "@/components/AppLayoutWrapper";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aylan Group",
  "url": "https://aylan-group.vercel.app",
  "logo": "https://aylan-group.vercel.app/logo.png",
  "description": "Connectant parfaitement les acheteurs comoriens aux supermarchés mondiaux. Solutions d'approvisionnement, logistique et livraison.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+269 334 00 00",
    "contactType": "customer service",
    "areaServed": "KM",
    "availableLanguage": ["French", "Arabic"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-bg-dark text-white antialiased">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}

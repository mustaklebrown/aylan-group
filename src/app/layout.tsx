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
  title: "Aylan Group | Votre Passerelle vers le Shopping Mondial",
  description: "Connectant parfaitement les acheteurs comoriens aux supermarchés mondiaux. Solutions d'approvisionnement, logistique et livraison.",
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg-dark text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import React from 'react';
import PageHeader from '@/components/PageHeader';
import { LIVRAISON_STEPS } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Service de Livraison & Logistique Internationale vers les Comores | Aylan Group",
  description: "Profitez d'un service de livraison et logistique fiable de la France, de la Chine et de la Turquie vers les Comores. Transport sécurisé de vos marchandises et colis.",
  keywords: ["livraison Comores", "logistique Comores", "fret aérien Comores", "fret maritime Comores", "transport colis Moroni"],
  alternates: {
    canonical: "/livraison",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service de Livraison & Logistique Internationale",
  "provider": {
    "@type": "Organization",
    "name": "Aylan Group"
  },
  "description": "Une logistique simplifiée de l'international jusqu'à votre porte aux Comores.",
  "areaServed": "KM"
};

export default function LivraisonPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHeader 
        title="Service de" 
        gradientTitle="Livraison"
        subtitle="Une logistique simplifiée de l'international jusqu'à votre porte aux Comores."
      />
      
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {LIVRAISON_STEPS.map((step, index) => (
              <div key={index} className="relative group">
                <div className="glass-panel p-8 rounded-3xl h-full border border-white/5 group-hover:border-primary/30 transition-all duration-300">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
                {index < LIVRAISON_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 text-white/10">
                    <div className="w-6 h-0.5 bg-white/20"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

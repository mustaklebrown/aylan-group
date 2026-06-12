import React from 'react';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { Phone, ShoppingCart } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ESPACE_CLIENT_DEFAULTS } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Espace Client & Produits Disponibles aux Comores | Aylan Group",
  description: "Consultez notre catalogue de produits importés et disponibles immédiatement à Moroni, Comores. Commandez en direct par téléphone.",
  keywords: ["produits Comores", "acheter téléphone Moroni", "importation directe Comores", "boutique Aylan Group", "catalogue Aylan Group"],
  alternates: {
    canonical: "/espace-client",
  },
};

export const dynamic = "force-dynamic";

export default async function EspaceClientPage() {
  // Fetch Products
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Fetch Page Settings
  const settingsRaw = await prisma.pageSettings.findUnique({
    where: { key: 'espace_client_settings' },
  });

  const settings = settingsRaw ? JSON.parse(settingsRaw.value) : ESPACE_CLIENT_DEFAULTS;

  // Générer les données structurées dynamiques pour le catalogue
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Catalogue de Produits Disponibles - Aylan Group",
    "description": "Consultez et achetez nos produits importés disponibles immédiatement à Moroni, Comores.",
    "url": "https://aylan-group.vercel.app/espace-client",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product: any, idx: number) => {
        const priceClean = parseFloat(product.price.replace(/[^0-9]/g, '')) || 0;
        return {
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "offers": {
              "@type": "Offer",
              "price": priceClean > 0 ? priceClean : undefined,
              "priceCurrency": "KMF",
              "availability": "https://schema.org/InStock"
            }
          }
        };
      })
    }
  };

  return (
    <main className="bg-bg-dark min-h-screen font-outfit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <PageHeader 

        title={settings.heroTitle} 
        gradientTitle={settings.heroGradientTitle}
        subtitle={settings.heroSubtitle}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-[2.5rem] border border-white/10 max-w-4xl mx-auto">
              <p className="text-text-muted text-lg">Aucun produit en stock actuellement. Revenez bientôt !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product: any) => (
                <a 
                  key={product.id}
                  href={`tel:${settings.phoneNumber}`}
                  className="group glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                      {product.category}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-primary">
                        <ShoppingCart size={20} />
                      </div>
                    </div>
                    
                    <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <span className="text-xl font-black text-gradient-gold">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:bg-primary transition-all">
                        <Phone size={16} /> Appeler
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Contact Info Footer */}
          <div className="mt-24 text-center glass-panel p-10 rounded-[3rem] border border-white/10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{settings.ctaTitle}</h2>
            <p className="text-text-muted mb-8 text-sm">
              {settings.ctaDescription}
            </p>
            <a 
              href={`tel:${settings.phoneNumber}`}
              className="btn btn-primary px-8 py-3 inline-flex items-center gap-2"
            >
              <Phone size={20} /> {settings.phoneLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

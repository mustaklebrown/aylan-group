import React from 'react';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { Phone, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "1 250 000 KMF",
    description: "Le summum de la technologie mobile. Performance exceptionnelle et design en titane.",
    image: "/product-phone.png",
    category: "Électronique"
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: "850 000 KMF",
    description: "Ultra-fin, ultra-rapide. Le partenaire idéal pour votre productivité au quotidien.",
    image: "/product-laptop.png",
    category: "Informatique"
  },
  {
    id: 3,
    name: "Nike Air Max Premium",
    price: "95 000 KMF",
    description: "Style et confort absolu. L'édition limitée disponible exclusivement chez Aylan Group.",
    image: "/product-shoes.png",
    category: "Mode"
  }
];

export default function EspaceClientPage() {
  const phoneNumber = "+2693340000"; // Numéro de téléphone de l'entreprise

  return (
    <main className="bg-bg-dark min-h-screen">
      <PageHeader 
        title="Nos Articles" 
        gradientTitle="Aylan Group"
        subtitle="Découvrez notre sélection de produits premium disponibles en stock. Cliquez sur un article pour commander directement par téléphone."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <a 
                key={product.id}
                href={`tel:${phoneNumber}`}
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

          {/* Contact Info Footer */}
          <div className="mt-24 text-center glass-panel p-10 rounded-[3rem] border border-white/10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Besoin d'aide pour votre commande ?</h2>
            <p className="text-text-muted mb-8 text-sm">
              Nos conseillers sont disponibles du lundi au samedi pour vous accompagner dans vos achats.
            </p>
            <a 
              href={`tel:${phoneNumber}`}
              className="btn btn-primary px-8 py-3 inline-flex items-center gap-2"
            >
              <Phone size={20} /> +269 334 00 00
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

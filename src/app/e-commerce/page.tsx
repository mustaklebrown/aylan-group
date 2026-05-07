import React from 'react';
import PageHeader from '@/components/PageHeader';
import { ShoppingCart, Globe, Zap, CheckCircle2 } from 'lucide-react';

export default function EcommercePage() {
  const features = [
    {
      title: "Multi-Plateforme",
      description: "Achetez sur Amazon, Shein, Temu et AliExpress depuis une interface unique.",
      icon: <Globe className="text-primary" />
    },
    {
      title: "Paiement Local",
      description: "Payez vos achats internationaux avec vos moyens de paiement habituels aux Comores.",
      icon: <CheckCircle2 className="text-accent" />
    },
    {
      title: "Suivi en Temps Réel",
      description: "Suivez votre commande de l'entrepôt jusqu'à la livraison finale.",
      icon: <Zap className="text-primary" />
    }
  ];

  return (
    <main>
      <PageHeader 
        title="Solutions" 
        gradientTitle="E-commerce"
        subtitle="Accédez aux plus grands supermarchés du monde sans quitter les Comores."
      />
      
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShoppingCart size={120} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Comment ça marche ?</h2>
              <ul className="space-y-6">
                {[
                  "Choisissez vos produits sur n'importe quel site mondial.",
                  "Envoyez-nous les liens ou utilisez notre plateforme.",
                  "Nous validons le prix total incluant la livraison.",
                  "Vous payez localement, nous nous occupons du reste."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-text-muted">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-1">
                      {i + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-6 border border-white/5 hover:border-accent/30 transition-colors">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

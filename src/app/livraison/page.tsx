import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Ship, Plane, Truck, ShieldCheck } from 'lucide-react';

export default function LivraisonPage() {
  const steps = [
    {
      title: "Réception Colis",
      description: "Nous recevons vos achats dans nos entrepôts en France, Chine et Turquie.",
      icon: <ShieldCheck className="text-primary" />
    },
    {
      title: "Transport International",
      description: "Expédition sécurisée par voie aérienne ou maritime selon vos besoins.",
      icon: <Plane className="text-accent" />
    },
    {
      title: "Dédouanement",
      description: "Nous gérons toutes les formalités administratives et douanières.",
      icon: <Ship className="text-primary" />
    },
    {
      title: "Livraison Finale",
      description: "Remise de votre colis à domicile ou en point relais aux Comores.",
      icon: <Truck className="text-accent" />
    }
  ];

  return (
    <main>
      <PageHeader 
        title="Service de" 
        gradientTitle="Livraison"
        subtitle="Une logistique simplifiée de l'international jusqu'à votre porte aux Comores."
      />
      
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="glass-panel p-8 rounded-3xl h-full border border-white/5 group-hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
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

import React from 'react';
import PageHeader from '@/components/PageHeader';
import { 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { INVESTMENT_SERVICES, INVESTMENT_ADVANTAGES, INVESTMENT_STEPS } from '@/constants';

export default function InvestissementPage() {

  return (
    <main className="bg-bg-dark min-h-screen text-white overflow-hidden">
      {/* Introduction Section */}
      <PageHeader 
        title="Investissez avec nous et" 
        gradientTitle="développez votre commerce"
        subtitle="Nous accompagnons les investisseurs et commerçants dans toutes les étapes de leur activité, de l'achat des produits jusqu'à leur vente. Notre objectif est de simplifier le commerce et de maximiser les opportunités de croissance."
      />

      {/* Services Section */}
      <section className="py-20 bg-bg-dark relative">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Services d'Accompagnement</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Une solution clé en main couvrant l'ensemble de la chaîne de valeur commerciale.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {INVESTMENT_SERVICES.map((service, index) => (
              <div key={index} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                {/* Glow effect on hover */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all"></div>
                
                <div>
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-text-muted mb-4 leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-sm text-[#93C5FD]/80">
                  {service.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-[#012046]/40 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pourquoi Choisir Aylan Group ?</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Nous réduisons les barrières et sécurisons vos investissements commerciaux à chaque étape.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INVESTMENT_ADVANTAGES.map((adv, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 text-primary">
                  {adv.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{adv.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Process Section */}
      <section className="py-20 bg-bg-dark relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Processus de Collaboration</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Un parcours structuré et transparent pour garantir le succès de vos importations et ventes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {INVESTMENT_STEPS.map((step, index) => (
              <div key={index} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all duration-300 relative group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#3A94F5]/30 to-transparent group-hover:from-[#3A94F5] transition-all duration-500">
                      {step.number}
                    </span>
                    <CheckCircle2 className="text-[#3A94F5]/20 group-hover:text-primary transition-colors" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-dark relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Prêt à lancer votre <span className="text-gradient-gold">prochain investissement ?</span>
              </h2>
              <p className="text-lg text-text-muted mb-10 leading-relaxed">
                Contactez notre équipe dès aujourd'hui pour une consultation personnalisée et étudions ensemble les meilleures opportunités pour votre projet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/contact?subject=investissement" 
                  className="btn btn-primary px-8 py-4 text-base w-full sm:w-auto shadow-lg hover:shadow-primary/50 group"
                >
                  Commencer un investissement
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="btn btn-outline px-8 py-4 text-base w-full sm:w-auto"
                >
                  Demander une consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

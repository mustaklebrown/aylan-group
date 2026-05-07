import React from 'react';
import PageHeader from '@/components/PageHeader';

export default function BlogPage() {
  return (
    <main className="bg-bg-dark min-h-screen">
      <PageHeader 
        title="Notre" 
        gradientTitle="Blog"
        subtitle="Retrouvez toutes nos actualités, conseils en e-commerce et nouveautés sur le marché comorien."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="glass-panel p-16 rounded-[3rem] border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">À venir très prochainement...</h2>
            <p className="text-lg text-text-muted">
              Nous préparons des articles passionnants pour vous accompagner dans vos projets. Restez connectés !
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

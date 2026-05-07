import React from 'react';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "Comment commander sur Amazon depuis les Comores ?",
    excerpt: "Découvrez notre guide complet pour faire vos achats sur Amazon et vous faire livrer en toute sécurité à Moroni, Anjouan ou Mohéli.",
    date: "15 Mai 2024",
    author: "Équipe Aylan",
    category: "Guide",
    image: "/blog-amazon.png"
  },
  {
    id: 2,
    title: "Les avantages du fret aérien pour vos colis inter-îles",
    excerpt: "Pourquoi choisir l'avion pour vos marchandises ? Rapidité, sécurité et fiabilité : on vous explique tout sur notre service de fret.",
    date: "12 Mai 2024",
    author: "Service Logistique",
    category: "Logistique",
    image: "/blog-freight.png"
  },
  {
    id: 3,
    title: "L'avenir du e-commerce aux Comores",
    excerpt: "Comment la technologie transforme le commerce local et ouvre de nouvelles opportunités pour les entrepreneurs comoriens.",
    date: "10 Mai 2024",
    author: "Direction Innovation",
    category: "Business",
    image: "/blog-future.png"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-bg-dark min-h-screen">
      <PageHeader 
        title="Actualités &" 
        gradientTitle="Conseils"
        subtitle="Restez informé des dernières tendances du e-commerce et de la logistique aux Comores."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 group hover:border-primary/50 transition-all duration-500 flex flex-col h-full"
              >
                {/* Post Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-text-muted text-xs mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-primary" />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-6 border-t border-white/5">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary font-bold group/link"
                    >
                      Lire la suite 
                      <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-24 glass-panel p-12 md:p-20 rounded-[4rem] border border-white/10 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ne manquez aucun article</h2>
              <p className="text-text-muted text-lg mb-10">
                Inscrivez-vous à notre newsletter pour recevoir nos derniers conseils et actualités directement dans votre boîte mail.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all"
                />
                <button className="btn btn-primary px-10 py-4 whitespace-nowrap">
                  S'abonner
                </button>
              </form>
            </div>
            {/* Decorative background glow */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/20 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

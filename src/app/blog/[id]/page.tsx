import React from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPosts = [
  {
    id: 1,
    title: "Comment commander sur Amazon depuis les Comores ?",
    content: `
      <p>Commander sur Amazon depuis les Comores peut sembler complexe en raison des défis logistiques, mais avec Aylan Group, le processus devient simple et transparent. Voici notre guide étape par étape.</p>
      
      <h3>1. Choisissez vos produits</h3>
      <p>Parcourez Amazon (USA, France ou Émirats) et sélectionnez les articles que vous souhaitez acquérir. Assurez-vous de vérifier les avis et les spécifications techniques.</p>
      
      <h3>2. Envoyez-nous vos liens</h3>
      <p>Une fois votre sélection faite, envoyez-nous simplement les liens des produits via notre formulaire de contact ou directement par WhatsApp. Notre équipe calculera pour vous le coût total incluant l'achat, les taxes et le transport.</p>
      
      <h3>3. Validation et Paiement</h3>
      <p>Après réception de notre devis détaillé, vous pouvez valider la commande en effectuant le paiement localement aux Comores. Plus besoin de carte bancaire internationale !</p>
      
      <h3>4. Suivi et Livraison</h3>
      <p>Nous gérons toute la logistique. Vos colis sont réceptionnés dans nos entrepôts internationaux, regroupés si nécessaire, puis expédiés vers Moroni. Vous recevez des mises à jour régulières jusqu'à la remise en main propre.</p>
    `,
    date: "15 Mai 2024",
    author: "Équipe Aylan",
    category: "Guide",
    image: "/blog-amazon.png"
  },
  {
    id: 2,
    title: "Les avantages du fret aérien pour vos colis inter-îles",
    content: `
      <p>Dans un archipel comme les Comores, la rapidité de mouvement des marchandises est cruciale pour le dynamisme économique. Le fret aérien s'impose comme la solution premium.</p>
      
      <h3>Rapidité Inégalée</h3>
      <p>Contrairement au transport maritime qui peut prendre plusieurs jours selon les rotations, le fret aérien permet une livraison en quelques heures entre Moroni, Mutsamudu et Fomboni.</p>
      
      <h3>Sécurité Maximale</h3>
      <p>La manipulation des marchandises dans le transport aérien est soumise à des protocoles très stricts, réduisant considérablement les risques de casse ou de perte.</p>
      
      <h3>Fiabilité des Horaires</h3>
      <p>Les vols réguliers assurent une prévisibilité indispensable pour les entreprises qui gèrent des stocks critiques ou des produits périssables.</p>
    `,
    date: "12 Mai 2024",
    author: "Service Logistique",
    category: "Logistique",
    image: "/blog-freight.png"
  },
  {
    id: 3,
    title: "L'avenir du e-commerce aux Comores",
    content: `
      <p>Le paysage commercial des Comores est en pleine mutation. Le numérique n'est plus une option, mais un moteur de croissance incontournable.</p>
      
      <h3>La Révolution Mobile</h3>
      <p>Avec l'augmentation de la pénétration internet et de l'usage des smartphones, les habitudes d'achat changent. Les Comoriens sont de plus en plus connectés et demandeurs de solutions d'achat en ligne.</p>
      
      <h3>Opportunités pour les PME</h3>
      <p>Le e-commerce permet aux petites entreprises locales de toucher une clientèle bien au-delà de leur zone géographique immédiate, réduisant les coûts fixes liés aux boutiques physiques.</p>
      
      <h3>Défis et Solutions</h3>
      <p>Si les défis restent présents (paiement, dernier kilomètre), des acteurs comme Aylan Group apportent des solutions concrètes pour fluidifier l'écosystème et rassurer les consommateurs.</p>
    `,
    date: "10 Mai 2024",
    author: "Direction Innovation",
    category: "Business",
    image: "/blog-future.png"
  }
];

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-bg-dark min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-10 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour au blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="glass-panel rounded-[3rem] overflow-hidden border border-white/10">
              {/* Featured Image */}
              <div className="relative aspect-[21/9] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-primary px-5 py-2 rounded-full text-sm font-bold text-white uppercase tracking-wider shadow-xl">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm mb-8 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    {post.author}
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-10 leading-tight">
                  {post.title}
                </h1>

                <div 
                  className="prose prose-invert prose-lg max-w-none 
                  prose-headings:text-white prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6
                  prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-li:text-text-muted"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Social Share */}
                <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="text-white font-bold flex items-center gap-2">
                    <Share2 size={20} className="text-primary" /> Partager cet article
                  </p>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10">
                      <Facebook size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10">
                      <Twitter size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10">
                      <LinkIcon size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* About Author */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white font-black text-2xl border-4 border-white/10">
                A
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Aylan Group</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Votre partenaire de confiance pour le commerce et la logistique internationale aux Comores.
              </p>
              <Link href="/contact" className="btn btn-primary w-full py-3 text-sm">
                Nous contacter
              </Link>
            </div>

            {/* Related Posts Placeholder */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <h4 className="text-xl font-bold text-white mb-6">Articles Récents</h4>
              <div className="space-y-6">
                {blogPosts.filter(p => p.id !== post.id).map(p => (
                  <Link key={p.id} href={`/blog/${p.id}`} className="flex gap-4 group">
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/10">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {p.title}
                      </h5>
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-2 block">
                        {p.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

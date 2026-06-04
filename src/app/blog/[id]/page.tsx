import React from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Share2, Globe, Send, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let blogId: number;
  try {
    blogId = parseInt(id);
  } catch (e) {
    notFound();
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: blogId },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      id: {
        not: blogId,
      },
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="bg-bg-dark min-h-screen pt-32 pb-20 font-outfit">
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
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10" type="button">
                      <Globe size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10" type="button">
                      <Send size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10" type="button">
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

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6">Articles Récents</h4>
                <div className="space-y-6">
                  {relatedPosts.map(p => (
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
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

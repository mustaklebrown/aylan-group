import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      <PageHeader 
        title="Contactez" 
        gradientTitle="Aylan Group"
        subtitle="Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets."
      />
      
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase font-bold tracking-widest">Téléphone</p>
                    <p className="text-lg font-bold text-white">+269 334 00 00</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase font-bold tracking-widest">Email</p>
                    <p className="text-lg font-bold text-white">contact@aylan-group.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase font-bold tracking-widest">Adresse</p>
                    <p className="text-lg font-bold text-white">Moroni, Grande Comore</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="glass-panel p-10 rounded-[2.5rem] border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-2">Nom complet</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-2">Objet</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-2">Message</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors h-40 resize-none"
                    placeholder="Votre message ici..."
                  ></textarea>
                </div>
                
                <button className="btn btn-primary w-full py-4 text-lg group">
                  Envoyer le message <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

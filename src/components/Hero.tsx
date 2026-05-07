import Image from 'next/image';
import { ChevronRight, ShoppingBag, Globe, Package } from 'lucide-react';

export default function Hero({ imageSrc }: { imageSrc: string }) {
  return (
    <section className="pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col justify-center bg-bg-dark relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Text Content */}
          <div className="animate-[fadeIn_1s_ease-out] max-w-[600px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-glass border border-primary text-primary rounded-full text-[10px] md:text-xs font-semibold mb-4 md:mb-6 uppercase tracking-widest">
              <Globe size={14} /> Le Shopping Nouvelle Génération
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-5 tracking-tight leading-[1.1]">
              Votre Passerelle vers les <span className="text-gradient-gold block lg:inline">Marques Mondiales</span> <br className="hidden lg:block"/> & la Livraison Locale
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-text-muted mb-6 md:mb-8 leading-relaxed">
              Connectant parfaitement les acheteurs comoriens aux supermarchés mondiaux. 
              Nous gérons l'approvisionnement, la logistique et la livraison jusqu'à 
              votre porte, partout aux Comores.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
              <button className="btn btn-primary w-full sm:w-auto px-6 py-3 text-sm md:text-base">
                Commencer <ChevronRight size={18} className="ml-2 hidden sm:inline" />
              </button>
              <button className="btn btn-outline w-full sm:w-auto px-6 py-3 text-sm md:text-base">Comment ça marche</button>
            </div>
            
            {/* Logos / Brands Area */}
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">Achetez directement sur les meilleures plateformes :</p>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-lg md:text-xl font-bold text-white tracking-tighter">amazon</span>
                <span className="text-lg md:text-xl font-bold text-white lowercase tracking-widest">SHEIN</span>
                <span className="text-lg md:text-xl font-black text-white italic">TEMU</span>
                <span className="text-lg md:text-xl font-semibold text-white tracking-tight">AliExpress</span>
              </div>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full animate-[fadeIn_1.2s_ease-out]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] transform rotate-2"></div>
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-xl bg-bg-card transform -rotate-1 transition-transform hover:rotate-0 duration-500">
               <Image 
                 src={imageSrc} 
                 alt="Shopping en ligne mondial" 
                 fill
                 className="object-cover opacity-90"
                 priority
               />
               
               {/* Floating Badges */}
               <div className="absolute top-6 left-4 md:left-6 bg-white/10 backdrop-blur-md p-2 md:p-3 rounded-xl border border-white/20 flex items-center gap-2 md:gap-3 shadow-lg">
                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white"><ShoppingBag size={16} /></div>
                 <div>
                   <p className="text-[8px] md:text-[9px] text-white/70 uppercase font-bold tracking-wider">En Transit</p>
                   <p className="text-[10px] md:text-xs font-bold text-white">+ de 2 000 Articles</p>
                 </div>
               </div>
               
               <div className="absolute bottom-6 right-4 md:right-6 bg-white/10 backdrop-blur-md p-2 md:p-3 rounded-xl border border-white/20 flex items-center gap-2 md:gap-3 shadow-lg">
                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"><Package size={16} /></div>
                 <div>
                   <p className="text-[8px] md:text-[9px] text-white/70 uppercase font-bold tracking-wider">Livraison Réussie</p>
                   <p className="text-[10px] md:text-xs font-bold text-white">Aux Comores</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

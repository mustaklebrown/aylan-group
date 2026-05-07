import { CheckCircle2 } from 'lucide-react';

export default function Trust() {
  const benefits = [
    { title: 'Logistique Fiable', desc: 'Livraison sécurisée et ponctuelle à travers les îles des Comores.' },
    { title: 'Partenaires Mondiaux', desc: 'Collaboration avec les plus grands marchés mondiaux.' },
    { title: 'Processus Transparent', desc: 'Suivi en temps réel et communication claire garantie.' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-bg-dark mb-4 md:mb-6">Un Héritage de Confiance</h2>
            <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              L'effort et le dévouement sont nos piliers. Avec des années d'expérience, nous veillons à ce que chaque client reçoive le meilleur service aux prix les plus compétitifs.
            </p>
            
            <div className="flex flex-col gap-6 md:gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 md:gap-5 items-start">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 text-bg-dark">{b.title}</h4>
                    <p className="text-sm md:text-base text-text-muted">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6">
            <div className="bg-bg-light p-6 md:p-10 rounded-2xl md:rounded-[2rem] text-center border border-gray-100">
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">10k+</div>
              <div className="font-bold text-text-muted uppercase tracking-wider text-[10px] md:text-xs">Clients Satisfaits</div>
            </div>
            <div className="bg-bg-dark text-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] text-center shadow-lg relative overflow-hidden flex flex-col justify-center">
               <div className="absolute inset-0 bg-primary/20 blur-[40px] md:blur-[60px]"></div>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 relative z-10">2</div>
              <div className="font-bold text-white/80 uppercase tracking-wider text-[10px] md:text-xs relative z-10">Années de Service</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

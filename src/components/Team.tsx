import Image from 'next/image';
import { Globe, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "Abdallah",
    role: "Fondateur & PDG",
    image: "/abdallah-pro.png",
    description: "Visionnaire et leader, Abdallah pilote la stratégie de croissance d'Aylan Group avec une passion pour l'innovation aux Comores."
  },
  {
    name: "Amina",
    role: "Directrice des Opérations",
    image: "/team-1.png",
    description: "Experte en logistique internationale, Amina s'assure que chaque colis arrive à destination en toute sécurité et dans les délais impartis."
  },
  {
    name: "Karim",
    role: "Responsable E-commerce",
    image: "/team-2.png",
    description: "Spécialiste des marchés mondiaux, Karim gère nos partenariats internationaux et source les meilleurs produits pour nos clients."
  }
];

export default function Team() {
  return (
    <section className="py-24 bg-bg-dark" id="equipe">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            L'Équipe <span className="text-gradient-gold">Aylan Group</span>
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez les professionnels passionnés qui travaillent chaque jour pour vous offrir les meilleurs services d'approvisionnement et de logistique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-panel p-8 md:p-10 rounded-[3rem] border border-white/10 group hover:-translate-y-3 transition-all duration-500 hover:border-primary/50 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>

              <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl group-hover:border-primary/30 transition-colors z-10">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 z-10">{member.name}</h3>
              <p className="text-primary font-bold text-xs md:text-sm tracking-widest uppercase mb-6 z-10">{member.role}</p>
              
              <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow z-10">
                {member.description}
              </p>
              
              <div className="flex gap-4 mt-auto z-10">
                <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all shadow-lg">
                  <Globe size={20} />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all shadow-lg">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import PageHeader from '@/components/PageHeader';
import { 
  BookOpen, 
  Award, 
  Users, 
  Target, 
  Cpu, 
  Globe2, 
  BarChart3, 
  Briefcase,
  ChevronRight
} from 'lucide-react';

export default function FormationPage() {
  const courseCategories = [
    {
      category: "Management & Business",
      courses: [
        {
          title: "Gestion Stratégique",
          description: "Maîtrisez les outils de pilotage pour diriger efficacement votre entreprise ou département.",
          icon: <Briefcase className="text-primary" />,
          duration: "40 heures"
        },
        {
          title: "Entrepreneuriat",
          description: "De l'idée au business plan : transformez votre vision en une réalité rentable aux Comores.",
          icon: <Target className="text-accent" />,
          duration: "30 heures"
        }
      ]
    },
    {
      category: "Technologie & Digital",
      courses: [
        {
          title: "Informatique de Gestion",
          description: "Maîtrisez les logiciels essentiels pour automatiser et sécuriser vos opérations quotidiennes.",
          icon: <Cpu className="text-primary" />,
          duration: "45 heures"
        },
        {
          title: "Marketing Digital",
          description: "Exploitez la puissance des réseaux sociaux et du web pour booster votre visibilité locale.",
          icon: <Globe2 className="text-accent" />,
          duration: "25 heures"
        }
      ]
    },
    {
      category: "Logistique & Commerce",
      courses: [
        {
          title: "Commerce International",
          description: "Tout savoir sur l'import-export, les incoterms et les spécificités du marché régional.",
          icon: <BarChart3 className="text-primary" />,
          duration: "50 heures"
        },
        {
          title: "Logistique & Transit",
          description: "Optimisez vos flux de marchandises et maîtrisez les procédures de dédouanement.",
          icon: <Users className="text-accent" />,
          duration: "35 heures"
        }
      ]
    }
  ];

  return (
    <main className="bg-bg-dark min-h-screen">
      <PageHeader 
        title="Centre de" 
        gradientTitle="Formation Professionnelle"
        subtitle="Des programmes d'excellence conçus pour propulser votre carrière et renforcer les capacités de votre entreprise."
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-24">
            {courseCategories.map((cat, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{cat.category}</h2>
                  <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cat.courses.map((course, index) => (
                    <div key={index} className="glass-panel p-8 rounded-3xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                      {/* Background Glow Effect */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all"></div>
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                          {course.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                        <p className="text-text-muted mb-8 leading-relaxed flex-grow">{course.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                          <div className="flex items-center text-sm font-semibold text-accent">
                            <Award size={18} className="mr-2" /> {course.duration}
                          </div>
                          <button className="flex items-center text-sm font-bold text-white hover:text-primary transition-colors group/btn">
                            S'inscrire <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Training CTA */}
          <div className="mt-32 glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Besoin d'une formation sur mesure ?</h2>
              <p className="text-lg text-text-muted mb-10">
                Nous accompagnons les entreprises dans le renforcement des capacités de leurs équipes avec des programmes personnalisés adaptés à leurs besoins spécifiques.
              </p>
              <button className="btn btn-primary px-10 py-4 text-lg">
                Nous contacter pour un devis
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import PageHeader from '@/components/PageHeader';
import * as Icons from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

function CourseIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.BookOpen;
  return <IconComponent className={className} size={24} />;
}

export default async function FormationPage() {
  // Fetch Course Categories with courses
  const courseCategories = await prisma.courseCategory.findMany({
    include: {
      courses: {
        orderBy: {
          title: 'asc',
        },
      },
    },
    orderBy: {
      category: 'asc',
    },
  });

  // Fetch Page Settings
  const settingsRaw = await prisma.pageSettings.findUnique({
    where: { key: 'formation_settings' },
  });

  const settings = settingsRaw ? JSON.parse(settingsRaw.value) : {
    heroTitle: "Centre de",
    heroGradientTitle: "Formation Professionnelle",
    heroSubtitle: "Des programmes d'excellence conçus pour propulser votre carrière et renforcer les capacités de votre entreprise.",
    ctaTitle: "Besoin d'une formation sur mesure ?",
    ctaDescription: "Nous accompagnons les entreprises dans le renforcement des capacités de leurs équipes avec des programmes personnalisés adaptés à leurs besoins spécifiques.",
    ctaButtonText: "Nous contacter pour un devis",
  };

  return (
    <main className="bg-bg-dark min-h-screen font-outfit">
      <PageHeader 
        title={settings.heroTitle} 
        gradientTitle={settings.heroGradientTitle}
        subtitle={settings.heroSubtitle}
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-24">
            {courseCategories.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-[2.5rem] border border-white/10">
                <p className="text-text-muted text-lg">Aucun programme de formation n'est programmé actuellement.</p>
              </div>
            ) : (
              courseCategories.map((cat: any) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{cat.category}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>
                  
                  {cat.courses.length === 0 ? (
                    <p className="text-text-muted italic text-sm">Aucun cours disponible dans cette catégorie pour le moment.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {cat.courses.map((course: any) => (
                        <div key={course.id} className="glass-panel p-8 rounded-3xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                          {/* Background Glow Effect */}
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all"></div>
                          
                          <div className="flex flex-col h-full relative z-10">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500 text-primary">
                              <CourseIcon name={course.iconName} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                            <p className="text-text-muted mb-8 leading-relaxed flex-grow">{course.description}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                              <div className="flex items-center text-sm font-semibold text-accent">
                                <Icons.Award size={18} className="mr-2" /> {course.duration}
                              </div>
                              <button className="flex items-center text-sm font-bold text-white hover:text-primary transition-colors group/btn" type="button">
                                S'inscrire <Icons.ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Custom Training CTA */}
          <div className="mt-32 glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{settings.ctaTitle}</h2>
              <p className="text-lg text-text-muted mb-10">
                {settings.ctaDescription}
              </p>
              <button className="btn btn-primary px-10 py-4 text-lg" type="button">
                {settings.ctaButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

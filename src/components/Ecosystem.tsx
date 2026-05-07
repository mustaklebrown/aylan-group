import Image from 'next/image';
import { ShoppingBag, Truck, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'e-commerce',
    icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Shopping en Ligne',
    description: 'Accédez facilement aux marchés mondiaux. Nous sourçcons des produits de haute qualité et gérons tout le processus d\'achat pour vous depuis les États-Unis, la Chine ou l\'Europe jusqu\'aux Comores.',
    image: '/service-shopping.png',
    reverse: false
  },
  {
    id: 'livraison',
    icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Livraison Sécurisée Inter-Îles',
    description: 'Logistique porte-à-porte fiable. Notre système de fret garantit que vos produits sont en sécurité et livrés à temps, à chaque fois, que vous soyez à Grande Comore, Anjouan ou Mohéli.',
    image: '/service-delivery.png',
    reverse: true
  },
  {
    id: 'formation',
    icon: <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Centre de Formation',
    description: 'Renforcez vos capacités professionnelles. Nous proposons des programmes d\'excellence en management, technologie et logistique, adaptés aux réalités économiques locales pour booster votre carrière.',
    image: '/service-courses.png',
    reverse: false
  }
];

export default function Ecosystem() {
  return (
    <section className="py-16 md:py-32 bg-bg-light" id="ecommerce">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 md:mb-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bg-dark mb-4 md:mb-6 leading-tight">Nos Solutions aux Comores</h2>
          <p className="text-text-muted text-base md:text-xl">
            Des services sur mesure conçus pour offrir aux consommateurs et entrepreneurs comoriens un accès direct à l'international.
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {services.map((service, index) => (
            <div key={index} className={`relative group flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 md:gap-20 p-4 md:p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-white/50`}>

              {/* Image Container */}
              <div className="flex-1 w-full relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                <div className={`absolute -z-10 w-full h-full bg-primary/20 blur-2xl rounded-full top-4 ${service.reverse ? 'left-4' : '-left-4'}`}></div>
              </div>

              {/* Content Container */}
              <div className="flex-1 w-full flex flex-col justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-xl text-primary flex items-center justify-center rounded-2xl mb-6 md:mb-8 border border-gray-100">
                  {service.icon}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-bg-dark group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8 md:mb-10">
                  {service.description}
                </p>
                
                <div>
                  <Link 
                    href={`/${service.id}`} 
                    className="text-sm md:text-base font-bold text-primary transition-all duration-300 inline-flex items-center gap-2 group/btn border-b-2 border-primary/30 hover:border-primary pb-1 after:absolute after:inset-0 after:z-10"
                  >
                    En Savoir Plus <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

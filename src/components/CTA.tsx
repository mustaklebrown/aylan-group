import Image from 'next/image';

export default function CTA({ imageSrc }: { imageSrc: string }) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-bg-dark rounded-[2rem] flex flex-col lg:flex-row overflow-hidden border border-white/5 shadow-2xl">
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight">Développez votre entreprise avec Aylan Group</h2>
            <p className="text-text-muted text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0">
              Associez-vous à nous pour atteindre votre plein potentiel à l'échelle mondiale. 
              Nous nous occupons de toute la logistique, du stockage et de la livraison 
              pour que vous puissiez vous concentrer sur votre croissance aux Comores.
            </p>
            <div>
               <button className="btn btn-primary w-full sm:w-auto">Devenir Partenaire</button>
            </div>
          </div>
          <div className="flex-1 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full order-1 lg:order-2">
            <Image 
              src={imageSrc} 
              alt="Partenariat Commercial" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

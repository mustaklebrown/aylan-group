import Image from 'next/image';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Connect({ mapSrc }: { mapSrc: string }) {
  return (
    <section className="py-16 md:py-24 bg-bg-light/50" id="connect">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-bg-dark mb-3 md:mb-4">Contactez-nous</h2>
          <p className="text-text-muted text-base md:text-lg">Nous sommes là pour vous aider à élargir vos horizons.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold text-bg-dark mb-8 md:mb-10 text-center lg:text-left">Coordonnées</h3>
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-light rounded-lg md:rounded-xl flex items-center justify-center text-primary flex-shrink-0"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest font-bold mb-0.5 md:mb-1">Téléphone</p>
                  <p className="text-base md:text-lg font-bold text-bg-dark">+269 334 00 00</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-light rounded-lg md:rounded-xl flex items-center justify-center text-primary flex-shrink-0"><MapPin size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest font-bold mb-0.5 md:mb-1">Adresse</p>
                  <p className="text-base md:text-lg font-bold text-bg-dark">Moroni, Grande Comore</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-light rounded-lg md:rounded-xl flex items-center justify-center text-primary flex-shrink-0"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest font-bold mb-0.5 md:mb-1">Email</p>
                  <p className="text-base md:text-lg font-bold text-bg-dark">contact@aylan-group.com</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-10 md:mt-12 bg-bg-dark hover:bg-bg-dark/90 shadow-none hover:shadow-xl hover:shadow-bg-dark/20 text-sm md:text-base">Envoyez un Message</button>
          </div>
          
          <div className="lg:col-span-3 relative rounded-2xl md:rounded-[2rem] overflow-hidden min-h-[300px] md:min-h-[400px] bg-gray-100 border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31065.34441052601!2d43.2500!3d-11.7100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18903bc398703a11%3A0x6336186a51d38260!2sMoroni%2C%20Comores!5e0!3m2!1sfr!2s!4v1715070000000!5m2!1sfr!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

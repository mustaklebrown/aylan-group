import React from 'react';
import { ShoppingBag, Truck, GraduationCap, TrendingUp } from 'lucide-react';

export const ECOSYSTEM_SERVICES = [
  {
    id: 'e-commerce',
    icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Shopping en Ligne',
    description: 'Accédez facilement aux marchés mondiaux. Nous sourçons des produits de haute qualité et gérons tout le processus d\'achat pour vous depuis les États-Unis, la Chine ou l\'Europe jusqu\'aux Comores.',
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
  },
  {
    id: 'investissement',
    icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Opportunité d\'Investissement',
    description: 'Développez votre activité commerciale grâce à nos solutions d\'accompagnement complètes. De la négociation et l\'achat en Chine, jusqu\'au stockage sécurisé et à la vente par nos télévendeurs dédiés.',
    image: '/service-investment.png',
    reverse: true
  }
];

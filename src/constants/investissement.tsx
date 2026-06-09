import React from 'react';
import { Globe, Warehouse, Headphones, Clock, Shield, Briefcase, TrendingUp } from 'lucide-react';

export const INVESTMENT_SERVICES = [
  {
    title: "Achat en Chine",
    description: "Nous aidons les investisseurs à trouver et acheter des produits auprès de fournisseurs fiables en Chine.",
    details: "Assistance dans la négociation, le contrôle qualité et l'expédition.",
    icon: <Globe className="text-primary w-8 h-8" />,
  },
  {
    title: "Stockage de marchandises",
    description: "Nous proposons un service de stockage sécurisé pour les marchandises importées.",
    details: "Gestion des stocks et préparation des commandes.",
    icon: <Warehouse className="text-accent w-8 h-8" />,
  },
  {
    title: "Télévendeurs dédiés",
    description: "Nous mettons à disposition des télévendeurs expérimentés pour promouvoir et vendre les produits des investisseurs.",
    details: "Gestion des appels, suivi des prospects et augmentation des ventes.",
    icon: <Headphones className="text-primary w-8 h-8" />,
  }
];

export const INVESTMENT_ADVANTAGES = [
  {
    title: "Gain de temps",
    description: "Nous gérons toute la logistique complexe pour vous permettre de vous concentrer sur la croissance.",
    icon: <Clock className="text-primary" />
  },
  {
    title: "Réduction des risques",
    description: "Sourcing sécurisé auprès de fournisseurs vérifiés et contrôle de qualité rigoureux sur place.",
    icon: <Shield className="text-accent" />
  },
  {
    title: "Accompagnement complet",
    description: "De la négociation de départ en Chine jusqu'à la livraison finale de vos clients aux Comores.",
    icon: <Briefcase className="text-primary" />
  },
  {
    title: "Augmentation des ventes",
    description: "Force de vente active avec nos télévendeurs expérimentés pour convertir un maximum de prospects.",
    icon: <TrendingUp className="text-accent" />
  }
];

export const INVESTMENT_STEPS = [
  {
    number: "01",
    title: "Choix des produits",
    description: "Sélection des produits porteurs à forte demande à importer."
  },
  {
    number: "02",
    title: "Achat & Négociation",
    description: "Achat sécurisé auprès des meilleurs fournisseurs en Chine."
  },
  {
    number: "03",
    title: "Transport & Logistique",
    description: "Expédition, transit et réception sécurisée des marchandises."
  },
  {
    number: "04",
    title: "Stockage sécurisé",
    description: "Réception et entreposage optimal dans nos locaux sécurisés."
  },
  {
    number: "05",
    title: "Promotion & Télévente",
    description: "Vente et marketing actif par notre équipe commerciale dédiée."
  },
  {
    number: "06",
    title: "Livraison & Suivi",
    description: "Livraison rapide aux clients finaux et rapports de performance."
  }
];

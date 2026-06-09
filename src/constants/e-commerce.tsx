import React from 'react';
import { Globe, CheckCircle2, Zap } from 'lucide-react';

export const ECOMMERCE_FEATURES = [
  {
    title: "Multi-Plateforme",
    description: "Achetez sur Amazon, Shein, Temu et AliExpress depuis une interface unique.",
    icon: <Globe className="text-primary" />
  },
  {
    title: "Paiement Local",
    description: "Payez vos achats internationaux avec vos moyens de paiement habituels aux Comores.",
    icon: <CheckCircle2 className="text-accent" />
  },
  {
    title: "Suivi en Temps Réel",
    description: "Suivez votre commande de l'entrepôt jusqu'à la livraison finale.",
    icon: <Zap className="text-primary" />
  }
];

export const ECOMMERCE_STEPS = [
  "Choisissez vos produits sur n'importe quel site mondial.",
  "Envoyez-nous les liens ou utilisez notre plateforme.",
  "Nous validons le prix total incluant la livraison.",
  "Vous payez localement, nous nous occupons du reste."
];

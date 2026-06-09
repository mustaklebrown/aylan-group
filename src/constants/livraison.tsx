import React from 'react';
import { ShieldCheck, Plane, Ship, Truck } from 'lucide-react';

export const LIVRAISON_STEPS = [
  {
    title: "Réception Colis",
    description: "Nous recevons vos achats dans nos entrepôts en France, Chine et Turquie.",
    icon: <ShieldCheck className="text-primary" />
  },
  {
    title: "Transport International",
    description: "Expédition sécurisée par voie aérienne ou maritime selon vos besoins.",
    icon: <Plane className="text-accent" />
  },
  {
    title: "Dédouanement",
    description: "Nous gérons toutes les formalités administratives et douanières.",
    icon: <Ship className="text-primary" />
  },
  {
    title: "Livraison Finale",
    description: "Remise de votre colis à domicile ou en point relais aux Comores.",
    icon: <Truck className="text-accent" />
  }
];

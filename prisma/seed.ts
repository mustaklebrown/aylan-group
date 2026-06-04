import { prisma } from '../src/lib/prisma';
import { auth } from '../src/lib/auth';

const initialBlogs = [
  {
    title: "Comment commander sur Amazon depuis les Comores ?",
    excerpt: "Découvrez notre guide complet pour faire vos achats sur Amazon et vous faire livrer en toute sécurité à Moroni, Anjouan ou Mohéli.",
    content: `
      <p>Commander sur Amazon depuis les Comores peut sembler complexe en raison des défis logistiques, mais avec Aylan Group, le processus devient simple et transparent. Voici notre guide étape par étape.</p>
      
      <h3>1. Choisissez vos produits</h3>
      <p>Parcourez Amazon (USA, France ou Émirats) et sélectionnez les articles que vous souhaitez acquérir. Assurez-vous de vérifier les avis et les spécifications techniques.</p>
      
      <h3>2. Envoyez-nous vos liens</h3>
      <p>Une fois votre sélection faite, envoyez-nous simplement les liens des produits via notre formulaire de contact ou directement par WhatsApp. Notre équipe calculera pour vous le coût total incluant l'achat, les taxes et le transport.</p>
      
      <h3>3. Validation et Paiement</h3>
      <p>Après réception de notre devis détaillé, vous pouvez valider la commande en effectuant le paiement localement aux Comores. Plus besoin de carte bancaire internationale !</p>
      
      <h3>4. Suivi et Livraison</h3>
      <p>Nous gérons toute la logistique. Vos colis sont réceptionnés dans nos entrepôts internationaux, regroupés si nécessaire, puis expédiés vers Moroni. Vous recevez des mises à jour régulières jusqu'à la remise en main propre.</p>
    `,
    date: "15 Mai 2024",
    author: "Équipe Aylan",
    category: "Guide",
    image: "/blog-amazon.png"
  },
  {
    title: "Les avantages du fret aérien pour vos colis inter-îles",
    excerpt: "Pourquoi choisir l'avion pour vos marchandises ? Rapidité, sécurité et fiabilité : on vous explique tout sur notre service de fret.",
    content: `
      <p>Dans un archipel comme les Comores, la rapidité de mouvement des marchandises est cruciale pour le dynamisme économique. Le fret aérien s'impose comme la solution premium.</p>
      
      <h3>Rapidité Inégalée</h3>
      <p>Contrairement au transport maritime qui peut prendre plusieurs jours selon les rotations, le fret aérien permet une livraison en quelques heures entre Moroni, Mutsamudu et Fomboni.</p>
      
      <h3>Sécurité Maximale</h3>
      <p>La manipulation des marchandises dans le transport aérien est soumise à des protocoles très stricts, réduisant considérablement les risques de casse ou de perte.</p>
      
      <h3>Fiabilité des Horaires</h3>
      <p>Les vols réguliers assurent une prévisibilité indispensable pour les entreprises qui gèrent des stocks critiques ou des produits périssables.</p>
    `,
    date: "12 Mai 2024",
    author: "Service Logistique",
    category: "Logistique",
    image: "/blog-freight.png"
  },
  {
    title: "L'avenir du e-commerce aux Comores",
    excerpt: "Comment la technologie transforme le commerce local et ouvre de nouvelles opportunités pour les entrepreneurs comoriens.",
    content: `
      <p>Le paysage commercial des Comores est en pleine mutation. Le numérique n'est plus une option, mais un moteur de croissance incontournable.</p>
      
      <h3>La Révolution Mobile</h3>
      <p>Avec l'augmentation de la pénétration internet et de l'usage des smartphones, les habitudes d'achat changent. Les Comoriens sont de plus en plus connectés et demandeurs de solutions d'achat en ligne.</p>
      
      <h3>Opportunités pour les PME</h3>
      <p>Le e-commerce permet aux petites entreprises locales de toucher une clientèle bien au-delà de leur zone géographique immédiate, réduisant les coûts fixes liés aux boutiques physiques.</p>
      
      <h3>Défis et Solutions</h3>
      <p>Si les défis restent présents (paiement, dernier kilomètre), des acteurs comme Aylan Group apportent des solutions concrètes pour fluidifier l'écosystème et rassurer les consommateurs.</p>
    `,
    date: "10 Mai 2024",
    author: "Direction Innovation",
    category: "Business",
    image: "/blog-future.png"
  }
];

const initialCoursesData = {
  heroTitle: "Centre de",
  heroGradientTitle: "Formation Professionnelle",
  heroSubtitle: "Des programmes d'excellence conçus pour propulser votre carrière et renforcer les capacités de votre entreprise.",
  ctaTitle: "Besoin d'une formation sur mesure ?",
  ctaDescription: "Nous accompagnons les entreprises dans le renforcement des capacités de leurs équipes avec des programmes personnalisés adaptés à leurs besoins spécifiques.",
  ctaButtonText: "Nous contacter pour un devis",
  categories: [
    {
      category: "Management & Business",
      courses: [
        {
          title: "Gestion Stratégique",
          description: "Maîtrisez les outils de pilotage pour diriger efficacement votre entreprise ou département.",
          iconName: "Briefcase",
          duration: "40 heures"
        },
        {
          title: "Entrepreneuriat",
          description: "De l'idée au business plan : transformez votre vision en une réalité rentable aux Comores.",
          iconName: "Target",
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
          iconName: "Cpu",
          duration: "45 heures"
        },
        {
          title: "Marketing Digital",
          description: "Exploitez la puissance des réseaux sociaux et du web pour booster votre visibilité locale.",
          iconName: "Globe2",
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
          iconName: "BarChart3",
          duration: "50 heures"
        },
        {
          title: "Logistique & Transit",
          description: "Optimisez vos flux de marchandises et maîtrisez les procédures de dédouanement.",
          iconName: "Users",
          duration: "35 heures"
        }
      ]
    }
  ]
};

const initialProductsData = {
  heroTitle: "Nos Articles",
  heroGradientTitle: "Aylan Group",
  heroSubtitle: "Découvrez notre sélection de produits premium disponibles en stock. Cliquez sur un article pour commander directement par téléphone.",
  phoneNumber: "+2693340000",
  phoneLabel: "+269 334 00 00",
  ctaTitle: "Besoin d'aide pour votre commande ?",
  ctaDescription: "Nos conseillers sont disponibles du lundi au samedi pour vous accompagner dans vos achats.",
  products: [
    {
      name: "iPhone 15 Pro Max",
      price: "1 250 000 KMF",
      description: "Le summum de la technologie mobile. Performance exceptionnelle et design en titane.",
      image: "/product-phone.png",
      category: "Électronique"
    },
    {
      name: "MacBook Air M3",
      price: "850 000 KMF",
      description: "Ultra-fin, ultra-rapide. Le partenaire idéal pour votre productivité au quotidien.",
      image: "/product-laptop.png",
      category: "Informatique"
    },
    {
      name: "Nike Air Max Premium",
      price: "95 000 KMF",
      description: "Style et confort absolu. L'édition limitée disponible exclusivement chez Aylan Group.",
      image: "/product-shoes.png",
      category: "Mode"
    }
  ]
};

async function main() {
  console.log('Starting seeding...');

  // 1. Seed Admin User
  const adminEmail = "admin@aylan-group.com";
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    console.log('Seeding admin user...');
    await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || "admin123",
        name: "Admin User",
      },
      headers: new Headers()
    });
    console.log(`Admin user created with email: ${adminEmail}`);
  } else {
    console.log('Users table not empty. Skipping admin user seed.');
  }

  // 2. Seed Blogs
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    console.log('Seeding blog posts...');
    for (const blog of initialBlogs) {
      await prisma.blogPost.create({
        data: blog,
      });
    }
    console.log('Blog posts seeded.');
  } else {
    console.log('Blog posts table not empty. Skipping.');
  }

  // 3. Seed Page Settings
  const settingCount = await prisma.pageSettings.count();
  if (settingCount === 0) {
    console.log('Seeding page settings...');
    // Formation settings
    const formationSettings = {
      heroTitle: initialCoursesData.heroTitle,
      heroGradientTitle: initialCoursesData.heroGradientTitle,
      heroSubtitle: initialCoursesData.heroSubtitle,
      ctaTitle: initialCoursesData.ctaTitle,
      ctaDescription: initialCoursesData.ctaDescription,
      ctaButtonText: initialCoursesData.ctaButtonText,
    };
    await prisma.pageSettings.create({
      data: {
        key: 'formation_settings',
        value: JSON.stringify(formationSettings),
      },
    });

    // Espace Client settings
    const espaceClientSettings = {
      heroTitle: initialProductsData.heroTitle,
      heroGradientTitle: initialProductsData.heroGradientTitle,
      heroSubtitle: initialProductsData.heroSubtitle,
      phoneNumber: initialProductsData.phoneNumber,
      phoneLabel: initialProductsData.phoneLabel,
      ctaTitle: initialProductsData.ctaTitle,
      ctaDescription: initialProductsData.ctaDescription,
    };
    await prisma.pageSettings.create({
      data: {
        key: 'espace_client_settings',
        value: JSON.stringify(espaceClientSettings),
      },
    });
    console.log('Page settings seeded.');
  } else {
    console.log('Page settings table not empty. Skipping.');
  }

  // 4. Seed Course Categories and Courses
  const categoryCount = await prisma.courseCategory.count();
  if (categoryCount === 0) {
    console.log('Seeding courses...');
    for (const cat of initialCoursesData.categories) {
      await prisma.courseCategory.create({
        data: {
          category: cat.category,
          courses: {
            create: cat.courses,
          },
        },
      });
    }
    console.log('Courses seeded.');
  } else {
    console.log('Courses table not empty. Skipping.');
  }

  // 5. Seed Products
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    console.log('Seeding products...');
    for (const prod of initialProductsData.products) {
      await prisma.product.create({
        data: prod,
      });
    }
    console.log('Products seeded.');
  } else {
    console.log('Products table not empty. Skipping.');
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

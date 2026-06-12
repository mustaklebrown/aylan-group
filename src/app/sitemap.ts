import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aylan-group.vercel.app';

  // Récupérer les articles de blog depuis la base de données
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blogPost.findMany({
      select: { 
        id: true, 
        updatedAt: true 
      }
    });

    blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap pour les articles de blog:', error);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/e-commerce`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/livraison`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investissement`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/espace-client`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...blogUrls];
}

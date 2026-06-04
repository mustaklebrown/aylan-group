import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.courseCategory.findMany({
    include: { courses: true },
    orderBy: { category: "asc" },
  });

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const settingsRaw = await prisma.pageSettings.findMany();
  const settings = settingsRaw.reduce((acc: any, curr: any) => {
    try {
      acc[curr.key] = JSON.parse(curr.value);
    } catch (e) {
      acc[curr.key] = {};
    }
    return acc;
  }, {});

  return (
    <AdminDashboardClient
      initialBlogs={blogs}
      initialCategories={categories}
      initialProducts={products}
      initialSettings={settings}
    />
  );
}

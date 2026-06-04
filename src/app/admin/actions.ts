"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

// Helper to verify that the admin is logged in
async function verifyAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Non autorisé. Session expirée ou invalide.");
  }
  return session;
}

// Helper to handle image uploads to /public/uploads/
async function handleImageUpload(file: File | null, existingUrl?: string): Promise<string> {
  if (!file || file.size === 0) {
    return existingUrl || "";
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Clean filename to prevent path traversal or special char issues
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${Date.now()}_${cleanName}`;
  const filePath = join(uploadDir, fileName);

  await writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

/* ==========================================
   BLOG POST ACTIONS
   ========================================== */

export async function createBlogPostAction(formData: FormData) {
  await verifyAdminSession();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const dateStr = formData.get("date") as string; // Display date
  
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlInput = formData.get("imageUrl") as string;

  // Process image
  let image = imageUrlInput || "/blog-amazon.png"; // fallback
  if (imageFile && imageFile.size > 0) {
    image = await handleImageUpload(imageFile);
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      excerpt,
      content,
      category,
      author,
      date: dateStr || new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      image,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.id}`);
  return { success: true, post };
}

export async function updateBlogPostAction(id: number, formData: FormData) {
  await verifyAdminSession();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const dateStr = formData.get("date") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlInput = formData.get("imageUrl") as string;
  const existingImageUrl = formData.get("existingImageUrl") as string;

  // Process image
  let image = existingImageUrl;
  if (imageUrlInput) {
    image = imageUrlInput;
  }
  if (imageFile && imageFile.size > 0) {
    image = await handleImageUpload(imageFile);
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      excerpt,
      content,
      category,
      author,
      date: dateStr,
      image,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true, post };
}

export async function deleteBlogPostAction(id: number) {
  await verifyAdminSession();

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/blog");
  return { success: true };
}


/* ==========================================
   FORMATION (COURSES & CATEGORIES) ACTIONS
   ========================================== */

export async function createCourseCategoryAction(categoryName: string) {
  await verifyAdminSession();

  const category = await prisma.courseCategory.create({
    data: {
      category: categoryName,
    },
  });

  revalidatePath("/formation");
  return { success: true, category };
}

export async function updateCourseCategoryAction(id: number, categoryName: string) {
  await verifyAdminSession();

  const category = await prisma.courseCategory.update({
    where: { id },
    data: {
      category: categoryName,
    },
  });

  revalidatePath("/formation");
  return { success: true, category };
}

export async function deleteCourseCategoryAction(id: number) {
  await verifyAdminSession();

  await prisma.courseCategory.delete({
    where: { id },
  });

  revalidatePath("/formation");
  return { success: true };
}

export async function createCourseAction(categoryId: number, data: {
  title: string;
  description: string;
  iconName: string;
  duration: string;
}) {
  await verifyAdminSession();

  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      iconName: data.iconName || "BookOpen",
      duration: data.duration,
      categoryId,
    },
  });

  revalidatePath("/formation");
  return { success: true, course };
}

export async function updateCourseAction(id: number, data: {
  title: string;
  description: string;
  iconName: string;
  duration: string;
  categoryId: number;
}) {
  await verifyAdminSession();

  const course = await prisma.course.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      iconName: data.iconName,
      duration: data.duration,
      categoryId: data.categoryId,
    },
  });

  revalidatePath("/formation");
  return { success: true, course };
}

export async function deleteCourseAction(id: number) {
  await verifyAdminSession();

  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/formation");
  return { success: true };
}


/* ==========================================
   ESPACE CLIENT (PRODUCTS) ACTIONS
   ========================================== */

export async function createProductAction(formData: FormData) {
  await verifyAdminSession();

  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlInput = formData.get("imageUrl") as string;

  // Process image
  let image = imageUrlInput || "/product-phone.png";
  if (imageFile && imageFile.size > 0) {
    image = await handleImageUpload(imageFile);
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      category,
      image,
    },
  });

  revalidatePath("/espace-client");
  return { success: true, product };
}

export async function updateProductAction(id: number, formData: FormData) {
  await verifyAdminSession();

  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlInput = formData.get("imageUrl") as string;
  const existingImageUrl = formData.get("existingImageUrl") as string;

  // Process image
  let image = existingImageUrl;
  if (imageUrlInput) {
    image = imageUrlInput;
  }
  if (imageFile && imageFile.size > 0) {
    image = await handleImageUpload(imageFile);
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      category,
      image,
    },
  });

  revalidatePath("/espace-client");
  return { success: true, product };
}

export async function deleteProductAction(id: number) {
  await verifyAdminSession();

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/espace-client");
  return { success: true };
}


/* ==========================================
   PAGE SETTINGS ACTIONS
   ========================================== */

export async function updatePageSettingsAction(key: string, settingsObj: any) {
  await verifyAdminSession();

  const settingsStr = JSON.stringify(settingsObj);

  const setting = await prisma.pageSettings.upsert({
    where: { key },
    create: {
      key,
      value: settingsStr,
    },
    update: {
      value: settingsStr,
    },
  });

  if (key === "formation_settings") {
    revalidatePath("/formation");
  } else if (key === "espace_client_settings") {
    revalidatePath("/espace-client");
  }

  return { success: true, setting };
}

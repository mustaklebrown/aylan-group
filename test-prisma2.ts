import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function run() {
  try {
     const blogs = await prisma.blogPost.findMany();
     console.log("Blogs count:", blogs.length);
  } catch (e) {
     console.error(e);
  }
}
run();

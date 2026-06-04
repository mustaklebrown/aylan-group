import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function run() {
  try {
     const users = await prisma.user.findMany();
     console.log("Users:", users.length);
     
     console.log("Fetching blogs...");
     const blogs = await prisma.blogPost.findMany();
     console.log("Blogs:", blogs.length);
  } catch (e) {
     console.error(e);
  }
}
run();

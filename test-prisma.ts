import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function run() {
  try {
     const res = await prisma.user.findFirst({ where: { email: "test@example.com" } });
     console.log(res);
  } catch (e) {
     console.error(e);
  }
}
run();

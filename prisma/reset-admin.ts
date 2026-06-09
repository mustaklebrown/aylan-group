import { prisma } from '../src/lib/prisma';
import { auth } from '../src/lib/auth';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@aylan-group.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  console.log(`Resetting admin credentials for email: ${adminEmail}`);

  // Find user by email
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingUser) {
    console.log(`User ${adminEmail} found. Deleting...`);
    await prisma.user.delete({
      where: { id: existingUser.id }
    });
    console.log('User deleted successfully.');
  }

  // Create new user using better-auth
  console.log('Creating new admin user...');
  await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: "Admin User",
    },
    headers: new Headers()
  });

  console.log(`\nAdmin credentials reset successfully!`);
  console.log(`----------------------------------------`);
  console.log(`Email:    ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log(`----------------------------------------\n`);
}

main()
  .catch((e) => {
    console.error('Error resetting admin credentials:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

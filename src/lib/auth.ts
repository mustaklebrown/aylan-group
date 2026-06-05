import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://aylan-group.vercel.app'
      : 'http://localhost:3000'),
  trustedOrigins: ['https://aylan-group.vercel.app'],
});
export type Auth = typeof auth;

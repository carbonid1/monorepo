import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'prisma';

export default NextAuth({
  theme: 'light',
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  jwt: {
    // https://next-auth.js.org/warnings#jwt_auto_generated_signing_key
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    }),
  ],
});

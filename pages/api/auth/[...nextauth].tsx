import NextAuth, { Profile } from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma';

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
    Providers.GitHub({
      clientId: process.env.GITHUB_AUTH_ID,
      clientSecret: process.env.GITHUB_AUTH_SECRET,
      profile: (profile: Profile & { id: number; login?: string; avatar_url?: string }) => {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_AUTH_ID,
      clientSecret: process.env.TWITTER_AUTH_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_AUTH_ID,
      clientSecret: process.env.FACEBOOK_AUTH_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
});

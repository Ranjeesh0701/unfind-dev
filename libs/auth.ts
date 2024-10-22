import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import db from "./db";
import { getUserById } from "@/data/user";

export const { auth, handlers } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }

      if (!token.sub) {
        return session;
      }

      const dbUser = await getUserById(token.sub);

      if (!dbUser) {
        return session;
      }

      session.user.profile = dbUser.profile;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const dbUser = await getUserById(token.sub);

      if (!dbUser) {
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        profile: dbUser.profile,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  ...authConfig,
});

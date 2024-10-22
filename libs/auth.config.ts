import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials.email ||
          !credentials.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials.");
        }

        const user = await getUserByEmail(credentials.email);

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials.");
        }

        if (await bcryptjs.compare(credentials.password, user.hashedPassword)) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import db from "./db";
import { getUserById } from "@/data/user";

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(db),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "password", type: "text" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user?.hashedPassword) {
//           throw new Error("Invalid credentials");
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/",
//   },
//   debug: process.env.NODE_ENV === "development",
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ token, session }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;

//         const dbUser = await db.user.findFirst({
//           where: {
//             id: token.id,
//           },
//           include: {
//             profile: true,
//           },
//         });

//         console.log("here 1");
//         console.log(dbUser);

//         if (dbUser && dbUser.profile) {
//           session.user.profile = dbUser.profile;
//         }
//       }

//       return session;
//     },
//     async jwt({ token, user }) {
//       const dbUser = await db.user.findFirst({
//         where: {
//           email: token.email,
//         },
//         include: {
//           profile: true,
//         },
//       });

//       if (!dbUser) {
//         token.id = user!.id;
//         return token;
//       }

//       console.log("here 1");
//       console.log(dbUser);

//       return {
//         id: dbUser.id,
//         name: dbUser.name,
//         email: dbUser.email,
//         picture: dbUser.image,
//         profile: dbUser.profile,
//       };
//     },
//     redirect: () => {
//       return "/feed";
//     },
//   },
// };

export const { auth, handlers } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      const dbUser = await getUserById(token.id);

      if (!dbUser) {
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  ...authConfig,
});

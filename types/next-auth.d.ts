import { Profile } from "@prisma/client";
import "next-auth/jwt";
import type { User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    profile?: Profile | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      profile?: Profile | null;
    };
  }
}

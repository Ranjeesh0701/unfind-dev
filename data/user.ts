"use server";

import db from "@/libs/db";

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
};

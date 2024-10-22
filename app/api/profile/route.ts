import * as z from "zod";

import { auth } from "@/libs/auth";
import db from "@/libs/db";
import { OnboardingValidator } from "@/libs/validators/onboarding";

export const POST = async (req: Request) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (user.profile) {
      return new Response("User profile already exists", { status: 409 });
    }

    const body = await req.json();

    const { username, location } = OnboardingValidator.parse(body);

    const profile = await db.profile.create({
      data: {
        username,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(profile));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Unable to onboard you, please try again later.", {
      status: 500,
    });
  }
};

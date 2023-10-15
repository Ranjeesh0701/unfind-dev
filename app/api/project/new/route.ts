import { getAuthSession } from "@/libs/auth";
import prisma from "@/libs/db";
import { Project } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Project;
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        title: body.title,
        description: body.description,
        pricingScheme: body.pricingScheme || "FIXED",
        price: parseInt(body.price as unknown as string),
        deadline:
          new Date(body.deadline as Date).toISOString() ||
          new Date().toISOString(),
        duration: body.duration,
      },
    });

    if (project) {
      return new Response("OK", { status: 200 });
    }

    return new Response("Project creation failed", { status: 400 });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}

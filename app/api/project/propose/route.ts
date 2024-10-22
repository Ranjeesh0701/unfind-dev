import * as z from "zod";

import { auth } from "@/libs/auth";
import db from "@/libs/db";
import { ProposalValidator } from "@/libs/validators/proposal";

export const POST = async (req: Request) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { projectId, text } = ProposalValidator.parse(body);

    if (!projectId) {
      return new Response("ID invalid", { status: 402 });
    }

    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    const proposal = await db.proposal.create({
      data: {
        text,
        projectId,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(proposal));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Unable to send your proposal, please try again later.",
      { status: 500 }
    );
  }
};

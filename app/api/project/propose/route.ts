import * as z from "zod";

import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import { ProposalValidator } from "@/libs/validators/proposal";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();

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

    let conversation = await db.conversation.findFirst({
      where: {
        OR: [
          { initiatedById: session.user.id, receivedById: project.userId },
          { receivedById: session.user.id, initiatedById: project.userId },
        ],
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          initiatedById: session.user.id,
          receivedById: project.userId,
        },
      });
    }

    if (conversation) {
      await db.message.create({
        data: {
          conversationId: conversation.id,
          text,
          sendById: session.user.id,
        },
      });
    }

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

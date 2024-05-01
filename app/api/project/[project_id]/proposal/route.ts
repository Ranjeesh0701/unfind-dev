import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import { ProposalRequest, ProposalValidator } from "@/libs/validators/proposal";
import { z } from "zod";

interface IParams {
  project_id?: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!params.project_id) {
      return new Response("ID invalid", { status: 402 });
    }

    const body = await req.json();
    const { text, status, userId } = ProposalValidator.partial().parse(body);

    if (!userId) {
      return new Response("Proposed user not found.", { status: 402 });
    }

    const data = {} as {
      [property: string]: any;
    };

    if (text) {
      data.text = text;
    }

    if (status) {
      data.status = status;
    }

    const project = await db.project.findFirst({
      where: {
        id: params.project_id,
      },
    });

    if (!project) {
      return new Response("Project not found.", { status: 402 });
    }

    if (project.userId !== session.user.id) {
      return new Response("No permission to reject proposal.", { status: 403 });
    }

    const proposal = await db.proposal.update({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: params.project_id,
        },
      },
      data: data,
    });

    if (data.status === "ACCEPTED") {
      let conversation = await db.conversation.findFirst({
        where: {
          OR: [
            { initiatedById: session.user.id, receivedById: proposal.userId },
            { receivedById: session.user.id, initiatedById: proposal.userId },
          ],
        },
      });

      if (!conversation) {
        conversation = await db.conversation.create({
          data: {
            initiatedById: proposal.userId,
            receivedById: session.user.id,
          },
        });
      }

      if (conversation) {
        const message = await db.message.create({
          data: {
            conversationId: conversation.id,
            text: proposal.text,
            sendById: proposal.userId,
            proposalProjectId: project.id,
          },
        });
      }
    }

    if (!proposal) {
      return new Response("Proposal not found.", { status: 404 });
    }

    return new Response(JSON.stringify(proposal));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed.", { status: 422 });
    }

    return new Response(
      "Unable to send your proposal, please try again later.",
      { status: 500 }
    );
  }
};

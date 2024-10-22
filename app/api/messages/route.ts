import { auth } from "@/libs/auth";
import db from "@/libs/db";
import { Message } from "@prisma/client";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new Response("Conversation ID Missing.", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId,
        },
        include: {
          sendBy: true,
          proposal: {
            include: {
              project: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId,
        },
        include: {
          sendBy: true,
          proposal: {
            include: {
              project: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return new Response(
      JSON.stringify({
        items: messages,
        nextCursor,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

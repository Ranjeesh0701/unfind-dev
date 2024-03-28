import { authOptions } from "@/libs/auth";
import db from "@/libs/db";
import { MessageValidator } from "@/libs/validators/message";
import { NextApiResponseServerIo } from "@/types/socket";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = MessageValidator.parse(req.body);

    const { conversationId } = req.query;

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ message: "Conversation ID missing" });
    }

    const message = await db.message.create({
      data: {
        text,
        sendById: session.user.id,
        conversationId: conversationId as string,
      },
      include: {
        sendBy: true,
      },
    });

    if (message) {
      res?.socket?.server?.io?.emit(`chat:${conversationId}:messages`, message);

      return res.status(200).json(message);
    }

    return res.status(400).json({ message: "Unable to send message" });
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

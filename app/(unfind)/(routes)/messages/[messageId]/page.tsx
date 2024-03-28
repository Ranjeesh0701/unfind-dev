import ChatContainer from "@/components/chat/chat-container";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { getAuthSession } from "@/libs/auth";
import db from "@/libs/db";
import { Lock, MessageSquareDashed } from "lucide-react";

interface PageProps {
  params: {
    messageId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const session = await getAuthSession();
  const { messageId } = params;

  const conversation = await db.conversation.findFirst({
    where: {
      id: messageId,
    },
    include: {
      messages: {
        include: {
          sendBy: true,
        },
      },
      initiatedBy: true,
      receivedBy: true,
    },
  });

  if (!conversation) {
    return (
      <div className="h-full w-full relative flex flex-col items-center justify-center">
        <MessageSquareDashed
          className="w-24 h-24 text-gray-500"
          strokeWidth="1.2px"
        />
        <p className="font-semibold text-lg pt-4 text-gray-400">
          Conversation not found
        </p>
        <p className="max-w-[200px] sm:max-w-[300px] text-center text-sm pt-4 text-gray-400">
          The requested conversation could not be located or has not occurred
        </p>
        <div className="flex absolute bottom-6 px-4 py-2 rounded text-sm">
          <Lock className="w-4 h-4" />{" "}
          <p className="pl-3">
            Your chat messages are{" "}
            <span className="text-blue-500">end-to-end encrypted</span>
          </p>
        </div>
      </div>
    );
  }

  const chatWith =
    conversation.initiatedById === session?.user.id
      ? conversation.receivedBy
      : conversation.initiatedBy;

  return (
    <div className="relative h-full flex flex-col">
      <ChatHeader chatWith={chatWith} />
      <ChatContainer conversation={conversation} user={session?.user} />

      {session ? (
        <ChatInput conversation={conversation} user={session.user} />
      ) : null}
    </div>
  );
};

export default Page;

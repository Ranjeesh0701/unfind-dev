"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Search from "@/components/ui/search";
import { ConversationWithMessageAndUser } from "@/types/chat";
import { User } from "next-auth";
import Link from "next/link";
import ChatOverview from "./chat-overview";
import { useParams } from "next/navigation";
import { cn } from "@/libs/utils";

interface ChatListProps {
  conversations: ConversationWithMessageAndUser[];
  user?: User;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, user }) => {
  const params = useParams();

  const conversationId = params?.messageId;

  return (
    <div className="h-full w-[16rem] flex flex-col border-r">
      <div className="px-4 pt-4 pb-6">
        <Search />
      </div>
      <ScrollArea className="h-full w-full">
        <div className="px-2 flex flex-col gap-4">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className={cn("hover:bg-gray-100 transition py-2 rounded", {
                "bg-gray-200": conversation.id === conversationId,
              })}
            >
              <ChatOverview conversation={conversation} user={user} />
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatList;

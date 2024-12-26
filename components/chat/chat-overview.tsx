"use client";

import { ConversationWithMessageAndUser } from "@/types/chat";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";

interface ChatOverviewProps {
  conversation: ConversationWithMessageAndUser;
  user?: User;
}

const ChatOverview: React.FC<ChatOverviewProps> = ({ conversation, user }) => {
  const chattingWith =
    conversation.initiatedById === user?.id
      ? conversation.receivedBy
      : conversation.initiatedBy;

  return (
    <div className="flex items-center gap-4 px-4">
      <div>
        <Avatar className="size-10">
          <AvatarImage src={chattingWith.image as string | undefined} />
          <AvatarFallback>
            {chattingWith.name?.slice(0, 2) || "CN"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="flex gap-2 justify-between items-center">
          <p className="w-full font-semibold line-clamp-1">
            {chattingWith.name}
          </p>
          <p className="text-xs w-fit whitespace-nowrap text-gray-500">
            {moment(conversation.messages[0].createdAt).format("HH:mm")}
          </p>
        </div>
        <div>
          <div>
            <p className="text-sm line-clamp-1">
              {conversation.messages[0].text}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverview;

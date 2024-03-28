"use client";

import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { MdMoreHoriz, MdPhone } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Icon from "../ui/icon";
import { ICONSIZE } from "@/shared/size";
import { User } from "@prisma/client";

interface ChatHeaderProps {
  chatWith: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatWith }) => {
  return (
    <div className="border-b w-full px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chatWith.image as string | undefined} />
          <AvatarFallback>{chatWith.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-sm">{chatWith.name}</p>
          <p className="text-xs text-gray-500">Last seen 3 hours ago</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Icon icon={IoCallOutline} pointer size={ICONSIZE.md} />
        <Icon icon={IoVideocamOutline} pointer size={ICONSIZE.md} />
        <Icon icon={MdMoreHoriz} pointer size={ICONSIZE.lg} />
      </div>
    </div>
  );
};

export default ChatHeader;

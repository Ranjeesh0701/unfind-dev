import { cn } from "@/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message, User } from "@prisma/client";

interface ChatMessageProps {
  isCurrentUser: boolean;
  message: Message;
  sendBy: User;
  isNextMessageSamePerson: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  isCurrentUser,
  message,
  sendBy,
  isNextMessageSamePerson,
}) => {
  return (
    <div
      className={cn("flex items-end gap-2 my-2", {
        "flex-row-reverse": isCurrentUser,
      })}
    >
      <Avatar className="rounded">
        <AvatarImage src={sendBy?.image as string | undefined} />
        <AvatarFallback>
          <p className="text-xs">{sendBy.name?.slice(0, 2)}</p>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "bg-gray-200 flex items-center px-4 py-1 rounded-t-full rounded-br-full max-w-[200px] sm:max-w-[500px]",
            { "rounded-t-full rounded-bl-full rounded-br-none": isCurrentUser }
          )}
        >
          <p className="text-sm py-2 px-4 text-justify">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

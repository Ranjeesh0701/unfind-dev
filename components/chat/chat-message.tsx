import { cn } from "@/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message, Project, Proposal, User } from "@prisma/client";
import { Button } from "../ui/button";

interface ChatMessageProps {
  isCurrentUser: boolean;
  message: Message;
  sendBy: User;
  isNextMessageSamePerson: boolean;
  proposal?: Proposal & {
    project: Project;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  isCurrentUser,
  message,
  sendBy,
  proposal,
  isNextMessageSamePerson,
}) => {
  console.log("proposal", proposal);
  console.log("sendBy", sendBy);
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
            "bg-gray-200 flex flex-col px-4 py-1 rounded-t-full rounded-br-full max-w-[200px] sm:max-w-[500px]",
            { "rounded-t-full rounded-bl-full rounded-br-none": isCurrentUser },
            { "pb-2": !isCurrentUser && proposal }
          )}
        >
          <p className="text-sm py-2 px-4 text-justify">{message.text}</p>
          {!isCurrentUser && proposal && (
            <Button
              variant="link"
              size="sm"
              className="rounded-full text-green-700 underline"
            >
              Create contract
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import {
  ConversationWithMessageAndUser,
  MessageWithSender,
} from "@/types/chat";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import { ElementRef, Fragment, useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ChatMessage from "./chat-message";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatSocket } from "@/hooks/use-chat-socket";

interface ChatContainerProps {
  conversation: ConversationWithMessageAndUser;
  user?: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  conversation,
  user,
}) => {
  const queryKey = `chat:${conversation.id}`;
  const addKey = `chat:${conversation.id}:messages`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl: "/api/messages",
      paramValue: conversation.id,
      queryKey,
    });

  useChatSocket({
    addKey,
    queryKey,
  });

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="animate-spin h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 px-4 overflow-y-auto"
    >
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 my-4 animate-spin" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithSender) => (
              <ChatMessage
                key={message.id}
                sendBy={message.sendBy}
                message={message}
                isCurrentUser={message.sendById === user?.id}
                isNextMessageSamePerson={false}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatContainer;

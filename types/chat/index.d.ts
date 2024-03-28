import { Conversation, Message, User } from "@prisma/client";

export type ConversationWithMessageAndUser = ConversationWithMessageSender & {
  initiatedBy: User;
  receivedBy: User;
};

export type ConversationWithMessageSender = Conversation & {
  messages: MessageWithSender[];
};

export type ConversationWithMessage = Conversation & {
  messages: Message[];
};

export type MessageWithSender = Message & {
  sendBy: User;
};

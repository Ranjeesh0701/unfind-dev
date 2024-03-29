"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import qs from "query-string";

import { MessageRequest, MessageValidator } from "@/libs/validators/message";
import { ICONSIZE } from "@/shared/size";
import { ConversationWithMessageAndUser } from "@/types/chat";
import { Paperclip } from "lucide-react";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { Button } from "../ui/button";
import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

interface ChatInputProps {
  conversation: ConversationWithMessageAndUser;
  user: User;
}

const ChatInput: React.FC<ChatInputProps> = ({ conversation, user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MessageRequest>({
    resolver: zodResolver(MessageValidator),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: MessageRequest) => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: "/api/socket/messages",
        query: {
          conversationId: conversation.id,
        },
      });

      await axios.post(url, values);
      form.reset();
    } catch (error) {
      toast.dismiss("Unable to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 bg-white w-full py-4 bottom-0 border-t">
      <Form {...form}>
        <form
          className="flex items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full bg-gray-100 rounded-full h-14 flex items-center px-4">
            <Icon icon={Paperclip} pointer size={ICONSIZE.sm} color="gray" />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="py-6 bg-transparent border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      placeholder="Type a message here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="rounded-full w-12 h-12"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Icon icon={AiOutlineSend} color="white" size={ICONSIZE.sm} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;

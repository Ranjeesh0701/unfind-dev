import * as z from "zod";

export const MessageValidator = z.object({
  text: z.string().min(1, {
    message: "Message is required.",
  }),
});

export type MessageRequest = z.infer<typeof MessageValidator>;

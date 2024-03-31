import * as z from "zod";

export const ProposalValidator = z.object({
  text: z.string().min(1, {
    message: "Proposal is required.",
  }),
  projectId: z.string(),
  userId: z.string().optional(),
  status: z.enum(["OPEN", "ACCEPTED", "REJECTED"]).default("OPEN"),
});

export type ProposalRequest = z.infer<typeof ProposalValidator>;

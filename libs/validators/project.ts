import * as z from "zod";

export const ProjectValidator = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  pricingScheme: z.enum(["HOURLY", "FIXED"]),
  price: z.any(),
  deadline: z.date().min(new Date(), {
    message: "Deadline should be greater than current time.",
  }),
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "EXPERT"]),
});

export type ProjectRequest = z.infer<typeof ProjectValidator>;

import * as z from "zod";

export const OnboardingValidator = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
});

export type OnboardingRequest = z.infer<typeof OnboardingValidator>;

import { z } from "zod";

export const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  currency: z.enum(["MWK", "USD"], {
    message: "Please select a valid currency.",
  }),
  amount: z.coerce.number().int().positive({
    message: "Please enter a valid amount.",
  }),
  callbackUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  returnUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

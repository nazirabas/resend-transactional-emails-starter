import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please provide a bit more detail"),
});

export type ContactInput = z.infer<typeof contactSchema>;

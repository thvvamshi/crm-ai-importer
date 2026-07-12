import { z } from "zod";

export const normalizedLeadSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  leadOwner: z.string().nullable(),
  remarks: z.string().nullable(),
});

export const aiResponseSchema = z.array(normalizedLeadSchema);

export type NormalizedLead = z.infer<typeof normalizedLeadSchema>;
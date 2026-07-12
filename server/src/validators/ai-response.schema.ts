import { z } from "zod";

export const AiLeadSchema = z.object({
  createdAt: z.string().nullable(),

  name: z.string().nullable(),

  email: z.string().email().nullable(),

  countryCode: z.string().nullable(),

  mobileWithoutCountryCode: z.string().nullable(),

  company: z.string().nullable(),

  city: z.string().nullable(),

  state: z.string().nullable(),

  country: z.string().nullable(),

  leadOwner: z.string().nullable(),

  crmStatus: z
    .enum([
      "GOOD_LEAD_FOLLOW_UP",
      "DID_NOT_CONNECT",
      "BAD_LEAD",
      "SALE_DONE",
    ])
    .nullable(),

  crmNote: z.string().nullable(),

  dataSource: z
    .enum([
      "leads_on_demand",
      "meridian_tower",
      "eden_park",
      "varah_swamy",
      "sarjapur_plots",
    ])
    .nullable(),

  possessionTime: z.string().nullable(),

  description: z.string().nullable(),

  skip: z.boolean(),
});

export const AiResponseSchema = z.array(AiLeadSchema);

export type AiLead = z.infer<typeof AiLeadSchema>;
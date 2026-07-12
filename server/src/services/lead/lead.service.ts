import { Types } from "mongoose";

import { LeadModel } from "../../models/Lead.js";
import type { AiLead } from "../../validators/ai-response.schema.js";

class LeadService {
  async createMany(importId: string, leads: AiLead[]) {
    if (leads.length === 0) {
      return [];
    }

    const documents = leads.map(({ skip, ...lead }) => ({
      importId: new Types.ObjectId(importId),

      createdAt: lead.createdAt ? new Date(lead.createdAt) : null,

      name: lead.name,
      email: lead.email,

      countryCode: lead.countryCode,
      mobileWithoutCountryCode: lead.mobileWithoutCountryCode,

      company: lead.company,
      city: lead.city,
      state: lead.state,
      country: lead.country,

      leadOwner: lead.leadOwner,

      crmStatus: lead.crmStatus,
      crmNote: lead.crmNote,

      dataSource: lead.dataSource,
      possessionTime: lead.possessionTime,
      description: lead.description,
    }));

    return LeadModel.insertMany(documents, {
      ordered: false,
    });
  }
}

export const leadService = new LeadService();

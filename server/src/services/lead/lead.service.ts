import { Types } from "mongoose";

import { LeadModel } from "../../models/Lead.js";
import { NormalizedLead } from "../../validators/ai-response.schema.js";

class LeadService {
  async createMany(
    importId: string,
    leads: NormalizedLead[]
  ) {
    if (leads.length === 0) {
      return [];
    }

    const documents = leads.map((lead) => ({
      importId: new Types.ObjectId(importId),
      ...lead,
    }));

    return LeadModel.insertMany(documents, {
      ordered: false,
    });
  }
}

export const leadService = new LeadService();
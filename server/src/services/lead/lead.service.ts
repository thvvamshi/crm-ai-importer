import { Types } from "mongoose";

import { LeadModel } from "../../models/Lead.js";
import type { AiLead } from "../../validators/ai-response.schema.js";

class LeadService {
  async createMany(importId: string, leads: AiLead[]) {
    if (leads.length === 0) {
      return [];
    }

    const objectId = new Types.ObjectId(importId);

    const operations = leads.map(({ skip, ...lead }) => {
      const document = {
        importId: objectId,

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
      };

      /**
       * Primary deduplication:
       * importId + email
       */
      if (lead.email) {
        return {
          updateOne: {
            filter: {
              importId: objectId,
              email: lead.email,
            },
            update: {
              $set: document,
            },
            upsert: true,
          },
        };
      }

      /**
       * Fallback deduplication:
       * importId + mobile number
       */
      if (lead.mobileWithoutCountryCode) {
        return {
          updateOne: {
            filter: {
              importId: objectId,
              mobileWithoutCountryCode: lead.mobileWithoutCountryCode,
            },
            update: {
              $set: document,
            },
            upsert: true,
          },
        };
      }

      /**
       * No unique identifier available.
       * Insert as a new document.
       */
      return {
        insertOne: {
          document,
        },
      };
    });

    return LeadModel.bulkWrite(operations, {
      ordered: false,
    });
  }
}

export const leadService = new LeadService();

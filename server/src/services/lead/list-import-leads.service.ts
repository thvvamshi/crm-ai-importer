import { Types } from "mongoose";

import { ImportModel } from "../../models/Import.js";
import { LeadModel } from "../../models/Lead.js";

interface ListImportLeadsOptions {
  importId: string;
  page: number;
  limit: number;
}

class ListImportLeadsService {
  async execute({
    importId,
    page,
    limit,
  }: ListImportLeadsOptions) {
    const importRecord = await ImportModel.findById(importId);

    if (!importRecord) {
      throw new Error("Import not found.");
    }

    const skip = (page - 1) * limit;

    const objectId = new Types.ObjectId(importId);

    const [leads, total] = await Promise.all([
      LeadModel.find({
        importId: objectId,
      })
        .sort({
          createdAt: 1,
          _id: 1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      LeadModel.countDocuments({
        importId: objectId,
      }),
    ]);

    return {
      leads: leads.map((lead) => ({
        id: lead._id.toString(),

        name: lead.name,
        email: lead.email,

        phone:
          lead.countryCode && lead.mobileWithoutCountryCode
            ? `${lead.countryCode} ${lead.mobileWithoutCountryCode}`
            : lead.mobileWithoutCountryCode,

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

        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      })),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const listImportLeadsService = new ListImportLeadsService();
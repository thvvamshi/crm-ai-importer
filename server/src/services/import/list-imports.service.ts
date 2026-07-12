import { ImportModel } from "../../models/Import.js";

interface ListImportsOptions {
  page: number;
  limit: number;
}

class ListImportsService {
  async execute({ page, limit }: ListImportsOptions) {
    const skip = (page - 1) * limit;

    const [imports, total] = await Promise.all([
      ImportModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      ImportModel.countDocuments(),
    ]);

    return {
      imports: imports.map((item) => ({
        id: item._id.toString(),
        originalFilename: item.originalFilename,
        status: item.status,
        progress: item.progress,
        totalRows: item.totalRows,
        processedRows: item.processedRows,
        skippedRows: item.skippedRows,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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

export const listImportsService = new ListImportsService();

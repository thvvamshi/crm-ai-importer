import { Request, Response } from "express";

import { importService } from "../services/import/import.service.js";
import { processImportService } from "../services/import/process-import.service.js";
import { getImportService } from "../services/import/get-import.service.js";
import { listImportsService } from "../services/import/list-imports.service.js";
import { listImportLeadsService } from "../services/lead/list-import-leads.service.js";

export async function createImport(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "CSV file is required.",
    });
  }

  const result = await importService.createImport({
    originalFilename: req.file.originalname,
    storedFilename: req.file.filename,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
  });

  res.status(201).json({
    success: true,
    message: "CSV uploaded successfully.",
    data: result,
  });
}

export async function processImport(req: Request, res: Response) {
  const { id } = req.params;

  const result = await processImportService.execute(id);

  res.status(202).json({
    success: true,
    message: "Import has been queued for processing.",
    data: result,
  });
}

export async function getImport(req: Request, res: Response) {
  const { id } = req.params;

  const result = await getImportService.execute(id);

  res.status(200).json({
    success: true,
    data: result,
  });
}

export async function listImports(req: Request, res: Response) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);

  const result = await listImportsService.execute({
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
}

export async function listImportLeads(
  req: Request,
  res: Response,
) {
  const { id } = req.params;

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);

  const result = await listImportLeadsService.execute({
    importId: id,
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
}

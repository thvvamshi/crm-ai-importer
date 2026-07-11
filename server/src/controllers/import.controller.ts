import { Request, Response } from "express";

import { importService } from "../services/import/import.service.js";

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

import { Request, Response } from "express";

export const healthController = (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "CRM AI Importer API is running",
    timestamp: new Date().toISOString(),
  });
};
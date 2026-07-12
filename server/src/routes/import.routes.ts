import { Router } from "express";

import { upload } from "../config/multer.js";
import { asyncHandler } from "../utils/async-handler.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  importIdParamsSchema,
  listImportsQuerySchema,
  listImportLeadsParamsSchema,
  listImportLeadsQuerySchema,
} from "../validators/import-request.schema.js";

import {
  createImport,
  processImport,
  getImport,
  listImports,
  listImportLeads,
} from "../controllers/import.controller.js";

const router = Router();

// POST /imports
router.post("/", upload.single("file"), asyncHandler(createImport));

// GET /imports?page=1&limit=10
router.get(
  "/",
  validate(listImportsQuerySchema, "query"),
  asyncHandler(listImports),
);

//  GET /imports/:id
router.get(
  "/:id",
  validate(importIdParamsSchema, "params"),
  asyncHandler(getImport),
);

// GET /imports/:id/leads?page=1&limit=10
router.get(
  "/:id/leads",
  validate(listImportLeadsParamsSchema, "params"),
  validate(listImportLeadsQuerySchema, "query"),
  asyncHandler(listImportLeads),
);

// POST /imports/:id/process
router.post(
  "/:id/process",
  validate(importIdParamsSchema, "params"),
  asyncHandler(processImport),
);

export default router;

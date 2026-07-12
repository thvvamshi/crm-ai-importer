import { Router } from "express";

import { upload } from "../config/multer.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createImport,
  processImport,
  getImport,
  listImports,
  listImportLeads,
} from "../controllers/import.controller.js";

const router = Router();

router.post("/", upload.single("file"), asyncHandler(createImport));

router.get("/", asyncHandler(listImports));

router.get("/:id", asyncHandler(getImport));

router.get("/:id/leads", asyncHandler(listImportLeads));

router.post("/:id/process", asyncHandler(processImport));

export default router;

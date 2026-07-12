import { Router } from "express";

import { upload } from "../config/multer.js";
import { asyncHandler } from "../utils/async-handler.js";
import { createImport, processImport, getImport } from "../controllers/import.controller.js";

const router = Router();

router.post("/", upload.single("file"), asyncHandler(createImport));

router.post("/:id/process", asyncHandler(processImport));

router.get("/:id", asyncHandler(getImport));

export default router;

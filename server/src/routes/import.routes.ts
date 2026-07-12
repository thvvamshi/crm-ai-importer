import { Router } from "express";

import { upload } from "../config/multer.js";
import { createImport } from "../controllers/import.controller.js";
import { asyncHandler } from "../utils/async-handler.js";
import { processImport } from "../controllers/import.controller.js";

const router = Router();

router.post("/", upload.single("file"), asyncHandler(createImport));

router.post("/:id/process", asyncHandler(processImport));

export default router;

import { Router } from "express";

import healthRoutes from "./health.routes.js";
import importRoutes from "./import.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/imports", importRoutes);

export default router;
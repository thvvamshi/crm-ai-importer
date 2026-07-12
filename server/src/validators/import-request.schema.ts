import { z } from "zod";

import {
  objectIdSchema,
  paginationSchema,
} from "./common.schema.js";

export const importIdParamsSchema = z.object({
  id: objectIdSchema,
});

export const listImportsQuerySchema = paginationSchema;

export const listImportLeadsQuerySchema = paginationSchema;

export const listImportLeadsParamsSchema = z.object({
  id: objectIdSchema,
});
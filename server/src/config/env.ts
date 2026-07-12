import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),

  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),

  // Read model from .env
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),

  AI_PROVIDER: z.enum(["openrouter", "gemini"]).default("openrouter"),

  OPENROUTER_API_KEY: z.string().optional(),

  OPENROUTER_MODEL: z.string().default("google/gemma-3-27b-it:free"),

  UPLOAD_DIR: z.string().default("uploads"),
  MAX_FILE_SIZE: z.coerce.number().default(10 * 1024 * 1024),
});

export const env = envSchema.parse(process.env);

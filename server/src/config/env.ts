import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV ?? "development",

  MONGODB_URI: process.env.MONGODB_URI ?? "",

  REDIS_HOST: process.env.REDIS_HOST ?? "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",

  UPLOAD_DIR: process.env.UPLOAD_DIR ?? "uploads",
  MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,
};
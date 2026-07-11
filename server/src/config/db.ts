import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info("✅ MongoDB connected");
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();

  logger.info("Mongo disconnected");
}
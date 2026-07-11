import http from "node:http";

import app from "./app.js";

import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { redis } from "./config/redis.js";

// Import worker so BullMQ starts listening
import "./workers/import.worker.js";

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB();

    server.listen(env.PORT, () => {
      logger.info(
        `🚀 Server running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

startServer();

async function shutdown(signal: string) {
  logger.info(`${signal} received. Shutting down...`);

  server.close(async () => {
    try {
      await disconnectDB();
      await redis.quit();

      logger.info("✅ Server stopped gracefully");

      process.exit(0);
    } catch (error) {
      logger.error(error);

      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
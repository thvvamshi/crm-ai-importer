import { Request, Response } from "express";
import mongoose from "mongoose";

import { redis } from "../config/redis.js";

export const healthController = async (
  req: Request,
  res: Response,
) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  let redisConnected = false;

  try {
    await redis.ping();
    redisConnected = true;
  } catch {
    redisConnected = false;
  }

  const healthy = mongoConnected && redisConnected;

  res.status(healthy ? 200 : 503).json({
    success: healthy,
    status: healthy ? "healthy" : "unhealthy",

    services: {
      api: "up",
      mongodb: mongoConnected ? "connected" : "disconnected",
      redis: redisConnected ? "connected" : "disconnected",
    },

    uptime: Math.floor(process.uptime()),

    timestamp: new Date().toISOString(),
  });
};
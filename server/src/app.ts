import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import pinoHttp from "pino-http";

import routes from "./routes/index.js";
import { logger } from "./config/logger.js";
import { swaggerMiddleware } from "./docs/swagger.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

// Compression
app.use(compression());

// HTTP Logger
app.use(
  pinoHttp({
    logger,
  }),
);

// Body Parsers
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Swagger
app.use("/api/docs", ...swaggerMiddleware);

// API Routes
app.use("/api/v1", routes);

// 404
app.use(notFoundMiddleware);

// Error Handler
app.use(errorMiddleware);

export default app;
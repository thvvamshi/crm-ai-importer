import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./openapi.js";

export const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, {
    explorer: true,
    swaggerOptions: {
      displayRequestDuration: true,
      docExpansion: "list",
      defaultModelsExpandDepth: -1,
    },
  }),
];
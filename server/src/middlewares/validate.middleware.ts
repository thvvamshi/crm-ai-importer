import { z, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate<T>(
  schema: ZodType<T>,
  target: "body" | "params" | "query" = "body",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);

      if (target === "query") {
        Object.assign(req.query, parsed);
      } else if (target === "params") {
        Object.assign(req.params, parsed);
      } else {
        req.body = parsed;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
}

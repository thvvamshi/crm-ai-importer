import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(
  schema: AnyZodObject,
  target: "body" | "params" | "query" = "body",
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req[target] = schema.parse(req[target]);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
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
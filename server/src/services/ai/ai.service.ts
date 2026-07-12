import { env } from "../../config/env.js";
import { CsvRow } from "../csv/csv-parser.service.js";
import { extractJson } from "../../utils/json.js";
import {
  AiResponseSchema,
  type AiLead,
} from "../../validators/ai-response.schema.js";
import { promptService } from "./prompt.service.js";
import { GeminiService } from "./gemini.service.js";
import { OpenRouterService } from "./openrouter.service.js";
import type { AIProvider } from "./provider.js";

class AIService {
  private readonly provider: AIProvider;

  constructor() {
    console.log("Using AI Provider:", env.AI_PROVIDER);

    this.provider =
      env.AI_PROVIDER === "gemini"
        ? new GeminiService()
        : new OpenRouterService();
  }

  async normalize(rows: CsvRow[]): Promise<AiLead[]>  {
    const prompt = promptService.build(rows);

    const response = await this.provider.generate(prompt);

    const json = extractJson(response);

    let parsed: unknown;

    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }

    const validation = AiResponseSchema.safeParse(parsed);

    if (!validation.success) {
      throw new Error(
        `AI returned an invalid response.\n${validation.error.message}`,
      );
    }

    return validation.data;
  }
}

export const aiService = new AIService();

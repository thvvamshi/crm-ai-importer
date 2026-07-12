import { CsvRow } from "../csv/csv-parser.service.js";
import { extractJson } from "../../utils/json.js";
import {
  aiResponseSchema,
  NormalizedLead,
} from "../../validators/ai-response.schema.js";
import { promptService } from "./prompt.service.js";
import { GeminiService } from "./gemini.service.js";
import { OpenRouterService } from "./openrouter.service.js";
import { env } from "../../config/env.js";
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

  async normalize(rows: CsvRow[]): Promise<NormalizedLead[]> {
    const prompt = promptService.build(rows);

    const response = await this.provider.generate(prompt);

    const json = extractJson(response);

    let parsed: unknown;

    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }

    return aiResponseSchema.parse(parsed);
  }
}

export const aiService = new AIService();

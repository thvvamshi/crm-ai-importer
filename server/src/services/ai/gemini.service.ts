import { GoogleGenAI } from "@google/genai";

import { env } from "../../config/env.js";
import { AIProvider } from "./provider.js";

export class GeminiService implements AIProvider {
  private readonly client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("Gemini returned an empty response.");
      }

      return response.text.trim();
    } catch (error) {
      console.error("Gemini API Error:", error);

      throw new Error("Failed to generate AI response.");
    }
  }
}
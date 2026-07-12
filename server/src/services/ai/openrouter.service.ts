import axios from "axios";

import { env } from "../../config/env.js";
import { AIProvider } from "./provider.js";

export class OpenRouterService implements AIProvider {
  private readonly client = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    timeout: 60_000,
  });

  async generate(prompt: string): Promise<string> {
    try {
      const { data } = await this.client.post("/chat/completions", {
        model: env.OPENROUTER_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0,
      });

      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("OpenRouter returned an empty response.");
      }

      return content.trim();
    } catch (error: any) {
      console.error("OpenRouter API Error:", error.response?.data ?? error);

      throw new Error("Failed to generate AI response.");
    }
  }
}
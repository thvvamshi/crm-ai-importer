export interface AIProvider {
  generate(prompt: string): Promise<string>;
}

export type AIProviderType = "openrouter" | "gemini";
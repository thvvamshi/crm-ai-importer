import { GoogleGenAI } from "@google/genai";
import { env } from "./config/env.js";

async function main() {
  const client = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  const models = await client.models.list();

  for await (const model of models) {
    console.log(model.name);
  }
}

main();
import { CsvRow } from "../csv/csv-parser.service.js";
import { CRM_PROMPT } from "../../prompts/crm.prompt.js";

class PromptService {
  build(rows: CsvRow[]): string {
    return `${CRM_PROMPT}

Input CSV Rows:

${JSON.stringify(rows, null, 2)}

Return ONLY valid JSON.
`;
  }
}

export const promptService = new PromptService();
import { CsvRow } from "../csv/csv-parser.service.js";
import { CRM_PROMPT } from "../../prompts/crm.prompt.js";

class PromptService {
  build(rows: CsvRow[]) {
    return `
${CRM_PROMPT}

Normalize the following CSV records.

${JSON.stringify(rows, null, 2)}
`;
  }
}

export const promptService = new PromptService();

import { aiService } from "./services/ai/ai.service.js";

async function main() {
  try {
    const result = await aiService.normalize([
      {
        Name: "John Doe",
        Email: "john@example.com",
        Phone: "9876543210",
        Company: "GrowEasy",
        City: "Hyderabad",
        State: "Telangana",
        Country: "India",
        "Lead Owner": "Amit Sharma",
        Remarks: "Interested in CRM demo",
      },
    ]);

    console.log("✅ AI Response");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error(error);
  }
}

main();
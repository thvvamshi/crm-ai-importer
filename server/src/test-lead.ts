import { connectDB } from "./config/db.js";
import { leadService } from "./services/lead/lead.service.js";

async function main() {
  await connectDB();

  const leads = await leadService.createMany(
    "686000000000000000000001",
    [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        company: "GrowEasy",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        leadOwner: "Amit Sharma",
        remarks: "Interested in CRM",
      },
    ]
  );

  console.log(leads);
}

main();
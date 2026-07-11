import { config } from "dotenv";
config({ path: ".env.local" });

import { auth } from "../src/lib/auth";

const demoUsers = [
  { name: "Demo Attendee", email: "demo@venuo.app", password: "Demo1234!", role: "attendee" },
  { name: "Demo Organizer", email: "organizer@venuo.app", password: "Organizer1234!", role: "organizer" },
];

async function seed() {
  for (const user of demoUsers) {
    try {
      await auth.api.signUpEmail({ body: user });
      console.log(`Created: ${user.email}`);
    } catch (err) {
      console.log(`Skipped (likely already exists): ${user.email}`);
      console.error(err);
    }
  }
  process.exit(0);
}

seed();
import { config } from "dotenv";
config({ path: ".env" });

const demoUsers = [
  { name: "Demo Attendee", email: "demo@venuo.app", password: "Demo1234!", role: "attendee" },
  { name: "Demo Organizer", email: "organizer@venuo.app", password: "Organizer1234!", role: "organizer" },
  { name: "Venuo Admin", email: "admin@venuo.app", password: "Admin1234!", role: "admin" },
];

async function seed() {
  const { auth } = await import("../src/lib/auth");

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
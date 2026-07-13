import { config } from "dotenv";
config({ path: ".env" });

const demoUsers = [
  { name: "Demo Attendee", email: "demo@venuo.app", password: "Demo1234!", role: "attendee" },
  { name: "Demo Organizer", email: "organizer@venuo.app", password: "Organizer1234!", role: "organizer" },
];

async function seed() {
  // Dynamic import ensures this only loads (and constructs MongoClient)
  // AFTER dotenv's config() above has already populated process.env —
  // static imports get hoisted and would run too early otherwise.
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
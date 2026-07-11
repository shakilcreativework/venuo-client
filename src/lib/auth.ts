import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// NOTE: better-auth v1.6.19 is recent enough that field names below should
// be double-checked against the installed version's docs if anything here
// throws a type error you can't immediately resolve.

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("venuoDB");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Extra field so every user has a role (attendee | organizer) from day one
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "attendee",
        input: true,
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
});

export type Session = typeof auth.$Infer.Session;
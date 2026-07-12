import { Paddle, Environment } from "@paddle/paddle-node-sdk";

// NOTE: Paddle's Node SDK is an area worth double-checking against current
// docs (developer.paddle.com) if anything here errors — method/property
// names on this SDK have shifted between versions in the past, similar to
// how Stripe's apiVersion string just did.
export const paddle = new Paddle(process.env.PADDLE_API_KEY as string, {
  environment:
    process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? Environment.production : Environment.sandbox,
});
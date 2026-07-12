"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import Container from "@/components/shared/Container";
import Loading from "@/components/ui/Loading";

interface CheckoutClientProps {
  eventId: string;
}

export default function CheckoutClient({ eventId }: CheckoutClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? "production" : "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
    }).then(setPaddle);
  }, []);

  useEffect(() => {
    if (!paddle) return;

    const quantity = Number(searchParams.get("quantity")) || 1;

    const startCheckout = async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ eventId, quantity }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Could not start checkout.");
          return;
        }

        if (data.free) {
          router.push("/dashboard/bookings?success=true");
          return;
        }

        if (data.transactionId) {
          paddle.Checkout.open({
            transactionId: data.transactionId,
            settings: {
              successUrl: `${window.location.origin}/dashboard/bookings?success=true`,
            },
          });
        }
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Something went wrong starting checkout.");
      }
    };

    startCheckout();
  }, [paddle, eventId, searchParams, router]);

  if (error) {
    return (
      <Container className="py-20 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </Container>
    );
  }

  return <Loading text="Opening secure checkout..." fullScreen />;
}
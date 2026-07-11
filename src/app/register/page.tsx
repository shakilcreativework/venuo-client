"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import BaseButton from "@/components/ui/BaseButton";
import { cn } from "@/lib/utils";

type Role = "attendee" | "organizer";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("attendee");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    if (!agreedToTerms) next.terms = "You must agree to the Terms of Service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      role,
    });
    setLoading(false);

    if (error) {
      setErrors({ form: error.message ?? "Could not create your account." });
      return;
    }

    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background py-16">
      <Container className="max-w-100">
        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="mb-1 text-2xl font-semibold text-foreground">Create your account</h1>
          <p className="mb-6 text-sm text-muted">Join Venuo to discover events or start hosting your own.</p>

          {errors.form && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              label="Full name"
              name="name"
              value={name}
              error={errors.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <FormField
              label="Email"
              type="email"
              name="email"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            <FormField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              error={errors.confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />

            <div>
              <span className="mb-1.5 block text-sm font-medium text-foreground">I want to</span>
              <div className="grid grid-cols-2 gap-3">
                {(["attendee", "organizer"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition-colors",
                      role === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted hover:border-border-hover",
                    )}
                  >
                    {option === "attendee" ? "Attend events" : "Host events"}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5"
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>
            {errors.terms && <span className="text-xs text-red-500">{errors.terms}</span>}

            <BaseButton type="submit" text="Create account" loading={loading} className="mt-2 w-full justify-center" />
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
              Log in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
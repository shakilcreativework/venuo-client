"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import BaseButton from "@/components/ui/BaseButton";

const DEMO_EMAIL = "demo@venuo.app";
const DEMO_PASSWORD = "Demo1234!";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    setLoading(true);
    setErrors({});

    const { error } = await signIn.email({
      email: loginEmail,
      password: loginPassword,
    });

    setLoading(false);

    if (error) {
      setErrors({ form: error.message ?? "Invalid email or password." });
      return;
    }

    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await handleLogin(email, password);
  };

  const handleDemoLogin = async () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    await handleLogin(DEMO_EMAIL, DEMO_PASSWORD);
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background py-16">
      <Container className="max-w-100">
        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="mb-1 text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="mb-6 text-sm text-muted">Log in to book events or manage the ones you&apos;ve created.</p>

          {errors.form && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="********"
              autoComplete="current-password"
            />

            <BaseButton type="submit" text="Log in" loading={loading} className="mt-2 w-full justify-center" />
          </form>

          <BaseButton
            text="Try the demo account"
            variant="outline"
            onClick={handleDemoLogin}
            loading={loading}
            className="mt-3 w-full justify-center"
          />

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <BaseButton
            text="Continue with Google"
            variant="ghost"
            className="w-full justify-center border border-border"
            onClick={handleGoogleLogin}
          />

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:text-primary-hover">
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
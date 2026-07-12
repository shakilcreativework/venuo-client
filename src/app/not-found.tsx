import Container from "@/components/shared/Container";
import BaseButton from "@/components/ui/BaseButton";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background">
      <Container className="text-center">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <BaseButton as="link" href="/" text="Back to Home" />
          <BaseButton as="link" href="/events" text="Explore Events" variant="outline" />
        </div>
      </Container>
    </main>
  );
}
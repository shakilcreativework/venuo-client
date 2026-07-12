import Container from "@/components/shared/Container";
import StatsBand from "@/components/home/StatsBand";
import BaseButton from "@/components/ui/BaseButton";

const team = [
  {
    name: "Shakil Ahmed",
    role: "Founder & Lead Developer",
    image: "https://picsum.photos/seed/venuo-team-1/300/300",
  },
  {
    name: "Farhana Rahman",
    role: "Product Design",
    image: "https://picsum.photos/seed/venuo-team-2/300/300",
  },
  {
    name: "Tanvir Hasan",
    role: "Community & Partnerships",
    image: "https://picsum.photos/seed/venuo-team-3/300/300",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="py-20">
        <Container className="max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            About Venuo
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
            Connecting people to experiences that matter
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Venuo started with a simple idea: discovering something worth doing in your own city
            shouldn&apos;t be harder than scrolling through a dozen disconnected group chats and
            social posts. We built a single place where organizers can list real events —
            workshops, concerts, meetups, markets — and where anyone can find something worth
            showing up for, book a spot in seconds, and actually go.
          </p>
        </Container>
      </section>

      <StatsBand />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-primary">
              Our Team
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
              The people behind Venuo
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{member.name}</h3>
                <p className="mt-1 text-xs text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-40">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-linear-to-r from-primary/10 to-secondary/10 p-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ready to find your next experience?
              </h2>
              <p className="mt-1 text-sm text-muted">Browse what&apos;s happening near you right now.</p>
            </div>
            <BaseButton as="link" href="/events" text="Explore Events" />
          </div>
        </Container>
      </section>
    </main>
  );
}

import { FiUser } from "react-icons/fi";
import Container from "../shared/Container";

const testimonials = [
  {
    quote:
      "Venuo made it effortless to find events I'd never have discovered on my own.",
    name: "Farhana R.",
    role: "Marketing Lead",
  },
  {
    quote:
      "As an organizer, Venuo helped us sell out our workshop in under a week.",
    name: "Tanvir H.",
    role: "Event Organizer",
  },
  {
    quote:
      "Booking took less than a minute — and the event itself was even better.",
    name: "Priya M.",
    role: "Attendee",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            What People Say
          </span>
          <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            Trusted by thousands of experience seekers
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <FiUser className="text-sm" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
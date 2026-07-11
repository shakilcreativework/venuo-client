
import { FiSearch, FiTag, FiSmile } from "react-icons/fi";
import Container from "../shared/Container";

const steps = [
  {
    icon: FiSearch,
    title: "Discover",
    description: "Browse events that match your interests and location.",
  },
  {
    icon: FiTag,
    title: "Book",
    description: "Secure your spot in minutes with a seamless checkout.",
  },
  {
    icon: FiSmile,
    title: "Attend",
    description: "Show up, connect, and create memories that last.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            How It Works
          </span>
          <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            Three simple steps to your next experience
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="text-2xl" />
                </div>
                <span className="mt-4 text-xs font-semibold text-muted">STEP {index + 1}</span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
import Container from "../shared/Container";


const stats = [
  { value: "500+", label: "Events hosted" },
  { value: "50K+", label: "Happy attendees" },
  { value: "12+", label: "Cities covered" },
  { value: "98%", label: "Satisfaction rate" },
];

export default function StatsBand() {
  return (
    <section className="border-y border-border bg-surface py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
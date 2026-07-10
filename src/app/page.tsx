import Container from "@/components/shared/Container";
import BaseButton from "@/components/ui/BaseButton";

export default function Home() {
  return (
    <main>
      <Container>
        <h1>Welcome</h1>
        <BaseButton text={'Click Here'} />
      </Container>
    </main>
  );
}

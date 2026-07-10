import Container from "@/components/shared/Container";
import BaseButton from "@/components/ui/BaseButton";
import { GrLogin } from "react-icons/gr";

export default function Home() {
  return (
    <main>
      <Container>
        <h1>Welcome</h1>
        <BaseButton animated animatedSpanOne="animate-spin" text={'Login'} rightIcon={<GrLogin />} />
      </Container>
    </main>
  );
}

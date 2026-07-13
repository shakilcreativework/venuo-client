
import ExploreCategories from "@/components/home/ExploreCategories";
import FAQ from "@/components/home/FAQ";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import OrganizerCTA from "@/components/home/OrganizerCTA";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      {/* home page */}
      <Hero />
      <FeaturedEvents />
      <HowItWorks />
      <ExploreCategories />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <OrganizerCTA />
    </main>
  );
}

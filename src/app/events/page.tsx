import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import ExploreContent from "./ExploreContent";

export default function ExplorePage() {
  return (
    <Suspense fallback={<Loading text="Loading events..." fullScreen />}>
      <ExploreContent />
    </Suspense>
  );
}
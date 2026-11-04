import { Suspense } from "react";
import StudiosExplorer from "@/components/studios-explorer";
import { StudiosGridSkeleton } from "@/components/skeletons";

export const metadata = {
  title: "Explore Studios | StudioSpace",
};

export default function StudiosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Explore</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Find Your Creative Workspace</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
        Search, filter and compare studios from photo lofts to recording suites.
      </p>

      <Suspense fallback={<StudiosGridSkeleton />}>
        <StudiosExplorer />
      </Suspense>
    </section>
  );
}
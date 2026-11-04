import { StudiosGridSkeleton } from "@/components/skeletons";

export default function StudiosLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="h-24" />
      <StudiosGridSkeleton />
    </section>
  );
}
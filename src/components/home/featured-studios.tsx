import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StudioCard from "@/components/studio-card";
import { studios } from "@/data/studios";

export default function FeaturedStudios() {
  const featured = studios.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Top Rated and Newest</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Featured Creative Workspaces</h2>
        </div>
        <Link href="/studios" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View All Studios <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </section>
  );
}
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import StudioCard from "@/components/studio-card";
import { Button } from "@/components/ui/button";
import { getStudios } from "@/lib/api";

export default async function FeaturedStudios() {
  const featured = await getStudios("?limit=6&sort=newest");

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

      {featured.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">No studios listed yet</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">Be the first host to list a creative space.</p>
          <Button className="mt-6" asChild>
            <Link href="/add-studio">Host Your Space</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
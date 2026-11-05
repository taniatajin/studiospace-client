import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import WishlistButton from "@/components/wishlist-button";
import { categories } from "@/data/categories";
import type { Studio } from "@/data/studios";

export default function StudioCard({ studio }: { studio: Studio }) {
  const category = categories.find((c) => c.value === studio.category);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio.image}
          alt={studio.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${
            category?.color ?? "bg-primary/10 text-primary"
          } bg-background/80`}
        >
          {studio.category}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          {studio.rating.toFixed(1)}
        </span>
        <WishlistButton studioId={studio._id} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p>
            <span className="text-xl font-bold text-primary">${studio.hourlyRate}</span>
            <span className="text-sm text-muted-foreground"> / hr</span>
          </p>
          <Button size="sm" asChild>
            <Link href={`/studios/${studio._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
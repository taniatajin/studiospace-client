"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import StudioCard from "@/components/studio-card";
import { StudiosGridSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/wishlist-provider";
import type { Studio } from "@/data/studios";

export default function SavedStudiosPage() {
  const { ids, ready } = useWishlist();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/server/studios")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setStudios(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const saved = studios.filter((s) => ids.includes(s._id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Wishlist</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Saved Studios</h1>

      <div className="mt-8">
        {loading || !ready ? (
          <StudiosGridSkeleton count={3} />
        ) : saved.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-xl font-semibold">No saved studios yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any studio to keep it here for later.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/studios">Explore Studios</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
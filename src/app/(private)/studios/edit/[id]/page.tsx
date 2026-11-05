"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import StudioForm from "@/components/studio-form";
import { Skeleton } from "@/components/ui/skeleton";
import type { Studio } from "@/data/studios";
import { useSession } from "@/lib/auth-client";

export default function EditStudioPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/server/studios/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) setStudio(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (loading) return;
    if (!studio) {
      toast.error("Studio not found.");
      router.replace("/my-listings");
    } else if (session && studio.ownerEmail !== session.user.email) {
      toast.error("You can only edit your own studios.");
      router.replace("/my-listings");
    }
  }, [loading, studio, session, router]);

  const allowed = studio && session && studio.ownerEmail === session.user.email;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Host</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Update Studio</h1>
      <p className="mt-3 mb-8 text-muted-foreground">Keep your listing details accurate and up to date.</p>

      {allowed ? <StudioForm studio={studio} /> : <Skeleton className="h-[640px] w-full rounded-2xl" />}
    </section>
  );
}
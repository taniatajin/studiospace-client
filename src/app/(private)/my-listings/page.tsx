"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Studio } from "@/data/studios";
import { apiFetch } from "@/lib/api-client";

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    apiFetch("/studios/my")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setStudios(data);
      })
      .catch(() => toast.error("Could not load your listings."))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const confirmDelete = async () => {
    if (!target) return;
    setDeleting(true);
    const res = await apiFetch(`/studios/${target._id}`, { method: "DELETE" });
    setDeleting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.message ?? "Could not delete the studio.");
      return;
    }

    setStudios((prev) => prev.filter((s) => s._id !== target._id));
    toast.success(`"${target.title}" was deleted.`);
    setTarget(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Host</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">My Studio Listings</h1>
        </div>
        <Button asChild>
          <Link href="/add-studio">Add New Studio</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">You have not listed any studios yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            List your first space and start earning from your idle hours.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/add-studio">Add Your First Studio</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Studio</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Rate</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studios.map((s) => (
                <tr key={s._id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <Link href={`/studios/${s._id}`} className="flex items-center gap-3 hover:text-primary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={s.title} className="h-12 w-16 rounded-lg object-cover" />
                      <span className="font-medium">{s.title}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{s.category}</td>
                  <td className="px-5 py-3 font-semibold text-primary">${s.hourlyRate} / hr</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.location}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/studios/edit/${s._id}`}>
                          <Pencil className="mr-1.5 h-3.5 w-3.5" /> Update
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setTarget(s)} className="text-red-500 hover:text-red-500">
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this studio?</DialogTitle>
            <DialogDescription>
              {target ? `"${target.title}" will be removed permanently.` : ""} This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTarget(null)} disabled={deleting}>
              Keep it
            </Button>
            <Button onClick={confirmDelete} disabled={deleting} className="bg-red-600 text-white hover:bg-red-700">
              {deleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
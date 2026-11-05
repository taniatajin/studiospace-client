"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StatusBadge from "@/components/status-badge";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";
import { formatDate, formatHour } from "@/lib/format";
import type { Booking, BookingStatus } from "@/lib/types";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    apiFetch("/bookings/host")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setRequests(data);
      })
      .catch(() => toast.error("Could not load booking requests."))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    const res = await apiFetch(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBusyId(null);

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error(data.message ?? "Could not update this booking.");
      return;
    }

    setRequests((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    toast.success(data.message ?? "Booking updated.");
  };

  const pending = requests.filter((r) => r.status === "Pending").length;
  const confirmed = requests.filter((r) => r.status === "Confirmed").length;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Hello, {session?.user.name}</h1>
      <p className="mt-3 text-muted-foreground">Manage booking requests for the studios you host.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total requests", value: requests.length },
          { label: "Waiting for you", value: pending },
          { label: "Confirmed", value: confirmed },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-heading text-3xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold">Booking requests</h2>

      {loading ? (
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Inbox className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">No booking requests yet</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Requests for your studios will show up here as soon as creators book them.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/add-studio">List a Studio</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {requests.map((b) => (
            <div key={b._id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold">{b.studioTitle}</p>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {b.userName} ({b.userEmail})
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(b.date)}, {formatHour(b.startHour)} to {formatHour(b.endHour)} · ${b.totalPrice}
                </p>
                {b.note && <p className="mt-1 text-xs italic text-muted-foreground">&quot;{b.note}&quot;</p>}
              </div>

              <div className="flex gap-2">
                {b.status === "Pending" && (
                  <>
                    <Button size="sm" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "Confirmed")}>
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === b._id}
                      onClick={() => updateStatus(b._id, "Cancelled")}
                    >
                      Decline
                    </Button>
                  </>
                )}
                {b.status === "Confirmed" && (
                  <>
                    <Button size="sm" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "Completed")}>
                      Mark Completed
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === b._id}
                      onClick={() => updateStatus(b._id, "Cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
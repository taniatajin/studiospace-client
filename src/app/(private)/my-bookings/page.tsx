"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarX2, Clock, Download } from "lucide-react";
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
import StatusBadge from "@/components/status-badge";
import { apiFetch } from "@/lib/api-client";
import { formatDate, formatHour } from "@/lib/format";
import { downloadInvoice } from "@/lib/invoice";
import type { Booking } from "@/lib/types";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let active = true;
    apiFetch("/bookings/my")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setBookings(data);
      })
      .catch(() => toast.error("Could not load your bookings."))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleInvoice = async (booking: Booking) => {
    try {
      await downloadInvoice(booking);
      toast.success("Invoice downloaded.");
    } catch {
      toast.error("Could not generate the invoice. Please try again.");
    }
  };

  const confirmCancel = async () => {
    if (!target) return;
    setCancelling(true);
    const res = await apiFetch(`/bookings/${target._id}/cancel`, { method: "PATCH" });
    setCancelling(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.message ?? "Could not cancel this booking.");
      return;
    }

    setBookings((prev) => prev.map((b) => (b._id === target._id ? { ...b, status: "Cancelled" } : b)));
    toast.success("Booking cancelled.");
    setTarget(null);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Creator</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">My Bookings</h1>

      {loading ? (
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarX2 className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">No bookings yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Find a studio that fits your next project and reserve your first slot.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/studios">Explore Studios</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.studioImage} alt={b.studioTitle} className="h-28 w-full rounded-xl object-cover sm:w-40" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/studios/${b.studioId}`} className="text-lg font-semibold hover:text-primary">
                    {b.studioTitle}
                  </Link>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {formatDate(b.date)}, {formatHour(b.startHour)} to {formatHour(b.endHour)} ({b.hours}{" "}
                  {b.hours === 1 ? "hour" : "hours"})
                </p>
                <p className="mt-1 text-sm">
                  Total: <span className="font-semibold text-primary">${b.totalPrice}</span>
                </p>
              </div>

              {b.status === "Pending" && (
                <Button variant="outline" onClick={() => setTarget(b)} className="text-red-500 hover:text-red-500">
                  Cancel Booking
                </Button>
              )}
              {(b.status === "Confirmed" || b.status === "Completed") && (
                <Button variant="outline" onClick={() => handleInvoice(b)}>
                  <Download className="mr-1.5 h-4 w-4" /> Invoice
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel this booking?</DialogTitle>
            <DialogDescription>
              {target ? `Your pending request for "${target.studioTitle}" will be cancelled.` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTarget(null)} disabled={cancelling}>
              Keep booking
            </Button>
            <Button onClick={confirmCancel} disabled={cancelling} className="bg-red-600 text-white hover:bg-red-700">
              {cancelling ? "Cancelling..." : "Yes, cancel"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
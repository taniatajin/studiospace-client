"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Studio } from "@/data/studios";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";
import { formatHour } from "@/lib/format";

const fieldClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

type Slot = { startHour: number; endHour: number };

export default function BookingModal({ studio }: { studio: Studio }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [start, setStart] = useState(10);
  const [end, setEnd] = useState(12);
  const [note, setNote] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const hours = Math.max(end - start, 0);
  const rentTotal = hours * studio.hourlyRate;
  const total = rentTotal + studio.securityDeposit;
  const clash = slots.find((s) => s.startHour < end && s.endHour > start);

  // Oi din e kon slot already Confirmed seta dekhai
  useEffect(() => {
    if (!open || !date) return;
    let active = true;
    fetch(`/server/bookings/availability?studioId=${studio._id}&date=${date}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setSlots(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [open, date, studio._id]);

  const handleOpen = () => {
    if (!session) {
      toast.error("Please log in to book a workspace.");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${studio._id}`)}`);
      return;
    }
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) return toast.error("Please choose a booking date.");
    if (date < todayString()) return toast.error("You cannot book a date in the past.");
    if (end <= start) return toast.error("End time must be after the start time.");
    if (clash) {
      return toast.error(
        `That time overlaps a confirmed booking (${formatHour(clash.startHour)} to ${formatHour(clash.endHour)}).`
      );
    }

    setSubmitting(true);
    const res = await apiFetch("/bookings", {
      method: "POST",
      body: JSON.stringify({ studioId: studio._id, date, startHour: start, endHour: end, note }),
    });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.message ?? "Could not send your booking request.");
      return;
    }

    toast.success("Booking request sent. Status: Pending.");
    setOpen(false);
    setNote("");
    router.push("/my-bookings");
  };

  return (
    <>
      <Button size="lg" className="w-full" onClick={handleOpen}>
        Book Workspace Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reserve {studio.title}</DialogTitle>
            <DialogDescription>Choose your date and hours. The host will confirm your request.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                min={todayString()}
                onChange={(e) => setDate(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Start time</label>
                <select value={start} onChange={(e) => setStart(Number(e.target.value))} className={fieldClass}>
                  {Array.from({ length: 24 }, (_, h) => (
                    <option key={h} value={h}>{formatHour(h)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">End time</label>
                <select value={end} onChange={(e) => setEnd(Number(e.target.value))} className={fieldClass}>
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>{formatHour(h)}</option>
                  ))}
                </select>
              </div>
            </div>

            {slots.length > 0 && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
                Already confirmed on this date:{" "}
                {slots.map((s) => `${formatHour(s.startHour)} to ${formatHour(s.endHour)}`).join(", ")}
              </div>
            )}

            {clash && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                Your selected time overlaps a confirmed booking. Please choose another time.
              </p>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium">Note for the host (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Tell the host about your shoot or any gear you need"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5 rounded-xl bg-muted p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  ${studio.hourlyRate} x {hours} {hours === 1 ? "hour" : "hours"}
                </span>
                <span>${rentTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Security deposit</span>
                <span>${studio.securityDeposit}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span>Total</span>
                <span className="text-primary">${total}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? "Sending request..." : "Confirm Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
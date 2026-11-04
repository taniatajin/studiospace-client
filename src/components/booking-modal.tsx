"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Studio } from "@/data/studios";

const fieldClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const formatHour = (h: number) => {
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${suffix}`;
};

const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function BookingModal({ studio }: { studio: Studio }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [start, setStart] = useState(10);
  const [end, setEnd] = useState(12);
  const [note, setNote] = useState("");

  const hours = Math.max(end - start, 0);
  const rentTotal = hours * studio.hourlyRate;
  const total = rentTotal + studio.securityDeposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) return toast.error("Please choose a booking date.");
    if (date < todayString()) return toast.error("You cannot book a date in the past.");
    if (end <= start) return toast.error("End time must be after the start time.");

    // TEMPORARY: pore ekhane server e POST /bookings jabe
    toast.success(`Booking request sent for ${studio.title}. Status: Pending.`);
    setOpen(false);
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Book Workspace Now
        </Button>
      </DialogTrigger>
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
              suppressHydrationWarning
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Start time</label>
              <select value={start} onChange={(e) => setStart(Number(e.target.value))} className={fieldClass}>
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={h}>
                    {formatHour(h)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">End time</label>
              <select value={end} onChange={(e) => setEnd(Number(e.target.value))} className={fieldClass}>
                {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>
                    {formatHour(h)}
                  </option>
                ))}
              </select>
            </div>
          </div>

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

          <Button type="submit" className="w-full" size="lg">
            Confirm Booking Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
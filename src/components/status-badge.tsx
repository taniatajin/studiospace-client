import type { BookingStatus } from "@/lib/types";

const styles: Record<BookingStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-500",
  Confirmed: "bg-emerald-500/15 text-emerald-500",
  Completed: "bg-sky-500/15 text-sky-500",
  Cancelled: "bg-red-500/15 text-red-500",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
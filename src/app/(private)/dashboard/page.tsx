"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold">Hello, {session?.user.name}</h1>
      <p className="mt-3 text-muted-foreground">Your bookings and listings summary will appear here.</p>
    </section>
  );
}
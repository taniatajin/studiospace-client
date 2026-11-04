import Link from "next/link";
import { Handshake, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | StudioSpace",
};

const stats = [
  { value: "84+", label: "Creative spaces" },
  { value: "12k+", label: "Hours booked" },
  { value: "3.2k", label: "Active creators" },
  { value: "4.8", label: "Average rating" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Creators first",
    text: "Every feature starts with one question: does this make it easier to make something great?",
  },
  {
    icon: Handshake,
    title: "Trust by design",
    text: "Clear pricing, verified hosts and honest reviews keep every booking safe and simple.",
  },
  {
    icon: Users,
    title: "Community powered",
    text: "Hosts and creators grow together, and every great studio is someone's passion project.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">About StudioSpace</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">
          The right room for <span className="text-primary">every creator</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          StudioSpace is a peer-to-peer marketplace where filmmakers, photographers, podcasters and musicians find
          production spaces, and where studio owners turn idle hours into income.
        </p>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">What we believe in</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="h-full rounded-2xl border border-border bg-card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button size="lg" asChild>
            <Link href="/studios">Explore Studios</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
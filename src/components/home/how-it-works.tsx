import { CalendarClock, Clapperboard, Search, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Spaces",
    text: "Search by category, city or price and find the room that matches your project.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    text: "Pick your date and hours, with live availability and clear hourly pricing.",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    text: "Send your reservation in seconds and track its status from your bookings page.",
  },
  {
    icon: Clapperboard,
    title: "Create and Produce",
    text: "Show up, set up and shoot. The space is ready and waiting for you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Simple Workflow</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">How Booking Works</h2>
          <p className="mt-3 text-muted-foreground">From first search to final take, in four easy steps.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative h-full rounded-2xl border border-border bg-card p-6">
              <span className="absolute right-5 top-4 font-heading text-5xl font-bold text-primary/10">
                0{i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
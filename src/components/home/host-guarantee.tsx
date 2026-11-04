import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    text: "Every confirmed booking is covered, so hosts and creators can work with confidence.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    text: "Hosts and creators build trusted profiles with reviews from real productions.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    text: "Listings state their gear and safety setup clearly, with deposits that protect equipment.",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    text: "Our support team is available around the clock for any booking or access issue.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Host Guarantee</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Creator Support You Can Count On</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Whether you are hosting a space or booking one, StudioSpace is built to keep every session safe, clear
            and stress free.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
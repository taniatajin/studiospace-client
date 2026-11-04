import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Curated Production Categories</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Browse by Creative Discipline</h2>
        </div>
        <Link href="/studios" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Explore All Workspaces <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.value}
            href={`/studios?category=${encodeURIComponent(c.value)}`}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{c.label}</h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span>{c.count}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
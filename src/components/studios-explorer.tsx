"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudioCard from "@/components/studio-card";
import { categories } from "@/data/categories";
import { studios } from "@/data/studios";

const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function StudiosExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const [search, setSearch] = useState("");

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = studios.filter((s) => {
      const matchCategory = !category || s.category === category;
      const matchSearch = !q || s.title.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.hourlyRate - b.hourlyRate);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.hourlyRate - a.hourlyRate);
    return list;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by studio name or city"
            className="h-11 pl-9"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          aria-label="Sort studios"
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:w-56"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setParam("category", "")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setParam("category", c.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === c.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "studio" : "studios"}
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-border px-4 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SearchX className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">No studios match your search</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Try a different keyword or category, or host your own space and be the first in this category.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button variant="outline" asChild>
              <Link href="/add-studio">Host Your Space</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
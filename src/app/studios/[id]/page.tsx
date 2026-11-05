import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import StudioGallery from "@/components/studio-gallery";
import BookingModal from "@/components/booking-modal";
import { getStudio } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) notFound();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/studios"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all studios
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Left column */}
        <div>
          <StudioGallery images={studio.gallery} title={studio.title} />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {studio.category}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {studio.rating.toFixed(1)}
              <span className="font-normal text-muted-foreground">({studio.reviews.length} reviews)</span>
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{studio.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {studio.location}
          </p>

          <h2 className="mt-10 text-xl font-semibold">Overview</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{studio.overview}</p>

          <h2 className="mt-10 text-xl font-semibold">Amenities</h2>
          {studio.amenities.length > 0 ? (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {studio.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">The host has not listed any amenities yet.</p>
          )}

          <h2 className="mt-10 text-xl font-semibold">Reviews</h2>
          {studio.reviews.length > 0 ? (
            <div className="mt-4 space-y-4">
              {studio.reviews.map((r) => (
                <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {r.name[0]}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No reviews yet. Be the first to book and review.</p>
          )}
        </div>

        {/* Right column: booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p>
              <span className="text-3xl font-bold text-primary">${studio.hourlyRate}</span>
              <span className="text-muted-foreground"> / hr</span>
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Security deposit</dt>
                <dd className="font-medium">${studio.securityDeposit}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Max capacity</dt>
                <dd className="flex items-center gap-1.5 font-medium">
                  <Users className="h-4 w-4" /> {studio.maxCapacity} people
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <BookingModal studio={studio} />
            </div>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Protected by the StudioSpace Host Guarantee
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                {studio.ownerName[0]}
              </span>
              <div>
                <p className="text-sm font-semibold">Hosted by {studio.ownerName}</p>
                <p className="text-xs text-muted-foreground">{studio.ownerEmail}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
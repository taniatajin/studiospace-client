import StudioForm from "@/components/studio-form";

export const metadata = {
  title: "Add New Studio | StudioSpace",
};

export default function AddStudioPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Host</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">List a New Studio</h1>
      <p className="mt-3 mb-8 text-muted-foreground">
        Share your space with creators. Add the details, set your rate and start receiving bookings.
      </p>
      <StudioForm />
    </section>
  );
}
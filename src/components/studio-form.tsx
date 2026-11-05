"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import type { Studio } from "@/data/studios";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";

const presetAmenities = [
  "Free Wi-Fi",
  "Natural daylight",
  "Sound treated walls",
  "Green screen",
  "Cyclorama wall",
  "Professional lighting",
  "Makeup station",
  "Dressing room",
  "Parking",
  "Coffee bar",
  "Air conditioning",
  "Equipment storage",
];

const fieldClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function StudioForm({ studio }: { studio?: Studio }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEdit = Boolean(studio);

  const [image, setImage] = useState(studio?.image ?? "");
  const [amenities, setAmenities] = useState<string[]>(studio?.amenities ?? []);
  const [custom, setCustom] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const options = Array.from(new Set([...presetAmenities, ...amenities]));
  const hostName = studio?.ownerName ?? session?.user.name ?? "";
  const hostEmail = studio?.ownerEmail ?? session?.user.email ?? "";

  const toggleAmenity = (name: string) =>
    setAmenities((prev) => (prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]));

  const addCustom = () => {
    const value = custom.trim();
    if (!value) return;
    if (!amenities.includes(value)) setAmenities((prev) => [...prev, value]);
    setCustom("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) {
      toast.error("Image upload key is missing. Paste an image URL instead.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
      const json = await res.json();
      if (!res.ok || !json?.data?.url) throw new Error("Upload failed");
      setImage(json.data.url);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Image upload failed. Please try again or paste an image URL.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const hourlyRate = Number(form.get("hourlyRate"));
    const maxCapacity = Number(form.get("maxCapacity"));

    if (!image) return toast.error("Please add a studio image.");
    if (!(hourlyRate > 0)) return toast.error("Hourly rate must be greater than zero.");
    if (!(maxCapacity >= 1)) return toast.error("Max capacity must be at least 1.");

    const body = {
      title: String(form.get("title")).trim(),
      category: String(form.get("category")),
      hourlyRate,
      securityDeposit: Number(form.get("securityDeposit") || 0),
      maxCapacity,
      location: String(form.get("location")).trim(),
      image,
      gallery: studio && studio.gallery.length > 1 ? studio.gallery : [image],
      amenities,
      overview: String(form.get("overview")).trim(),
    };

    setSaving(true);
    const res = await apiFetch(isEdit ? `/studios/${studio!._id}` : "/studios", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(body),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.message ?? "Could not save the studio. Please try again.");
      return;
    }

    toast.success(isEdit ? "Studio updated successfully." : "Studio listed successfully.");
    router.push("/my-listings");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium">Studio title</label>
          <Input id="title" name="title" required defaultValue={studio?.title} placeholder="Halo Cyclorama Photo Loft" />
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium">Category</label>
          <select id="category" name="category" required defaultValue={studio?.category ?? ""} className={fieldClass}>
            <option value="" disabled>Select a category</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.value}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium">Location / address</label>
          <Input id="location" name="location" required defaultValue={studio?.location} placeholder="Brooklyn, New York" />
        </div>

        <div>
          <label htmlFor="hourlyRate" className="mb-1.5 block text-sm font-medium">Hourly rate ($)</label>
          <Input id="hourlyRate" name="hourlyRate" type="number" min="1" required defaultValue={studio?.hourlyRate} placeholder="45" />
        </div>

        <div>
          <label htmlFor="securityDeposit" className="mb-1.5 block text-sm font-medium">Security deposit ($)</label>
          <Input id="securityDeposit" name="securityDeposit" type="number" min="0" required defaultValue={studio?.securityDeposit} placeholder="100" />
        </div>

        <div>
          <label htmlFor="maxCapacity" className="mb-1.5 block text-sm font-medium">Max capacity (people)</label>
          <Input id="maxCapacity" name="maxCapacity" type="number" min="1" required defaultValue={studio?.maxCapacity} placeholder="12" />
        </div>

        <div>
          <label htmlFor="imageUrl" className="mb-1.5 block text-sm font-medium">Image URL</label>
          <div className="flex gap-2">
            <Input id="imageUrl" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
            <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-input px-3 text-sm font-medium hover:bg-accent">
              <ImagePlus className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="Studio preview" className="h-44 w-full max-w-sm rounded-xl border border-border object-cover" />
      )}

      <div>
        <p className="mb-2 text-sm font-medium">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {options.map((name) => {
            const active = amenities.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleAmenity(name)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex max-w-sm gap-2">
          <Input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
            placeholder="Add your own amenity"
          />
          <Button type="button" variant="outline" onClick={addCustom}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {amenities.length > 0 && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            {amenities.length} selected
            <button type="button" onClick={() => setAmenities([])} className="ml-1 inline-flex items-center text-primary hover:underline">
              <X className="mr-0.5 h-3 w-3" /> clear
            </button>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="overview" className="mb-1.5 block text-sm font-medium">Detailed overview</label>
        <textarea
          id="overview"
          name="overview"
          required
          rows={5}
          defaultValue={studio?.overview}
          placeholder="Describe the space, the gear and what creators can shoot or record here."
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Host name</label>
          <Input value={hostName} readOnly className="bg-muted" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Host email</label>
          <Input value={hostEmail} readOnly className="bg-muted" />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/my-listings")}>
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={saving || uploading}>
          {saving ? "Saving..." : isEdit ? "Update Studio" : "Add Studio"}
        </Button>
      </div>
    </form>
  );
}
"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/components/wishlist-provider";

export default function WishlistButton({ studioId }: { studioId: string }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(studioId);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved studios" : "Save this studio"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(studioId);
      }}
      className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-black/90"
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
    </button>
  );
}
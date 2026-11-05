"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";

type WishlistValue = {
  ids: string[];
  ready: boolean;
  isSaved: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistValue>({
  ids: [],
  ready: false,
  isSaved: () => false,
  toggle: async () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [saved, setSaved] = useState<string[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    apiFetch("/wishlist")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!active) return;
        setSaved(data);
        setLoadedFor(userId);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [userId]);

  const ready = Boolean(userId) && loadedFor === userId;
  const ids = useMemo(() => (ready ? saved : []), [ready, saved]);

  const toggle = useCallback(
    async (studioId: string) => {
      if (!userId) {
        toast.error("Please log in to save studios.");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      const res = await apiFetch(`/wishlist/${studioId}`, { method: "POST" });
      if (!res.ok) {
        toast.error("Could not update your saved studios.");
        return;
      }
      const data = await res.json();
      setSaved((prev) =>
        data.saved ? Array.from(new Set([...prev, studioId])) : prev.filter((i) => i !== studioId)
      );
      toast.success(data.saved ? "Added to saved studios." : "Removed from saved studios.");
    },
    [userId, router, pathname]
  );

  const value = useMemo(
    () => ({ ids, ready, isSaved: (id: string) => ids.includes(id), toggle }),
    [ids, ready, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
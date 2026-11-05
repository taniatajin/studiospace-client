"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Aperture } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Session load hoye jawar por-i login e pathai. Reload e logged-in user kokhono login e jay na
    if (!isPending && !session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Aperture className="h-7 w-7 animate-spin" />
        </span>
        <p className="text-sm text-muted-foreground">Checking your session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function AuthSync() {
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;
    fetch("/api/jwt", { method: userId ? "POST" : "DELETE" }).catch(() => {});
  }, [userId, isPending]);

  return null;
}
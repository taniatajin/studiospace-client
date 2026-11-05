"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await signIn.social({ provider: "google", callbackURL });
    if (error) {
      toast.error(error.message ?? "Google sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleClick} disabled={loading}>
      <FcGoogle className="mr-2 h-5 w-5" />
      {loading ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
}
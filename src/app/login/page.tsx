import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login | StudioSpace",
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-12">
      <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-2xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
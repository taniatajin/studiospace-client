"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
];

const socials = [
  { label: "X", icon: FaXTwitter, href: "https://x.com" },
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { label: "YouTube", icon: FaYoutube, href: "https://youtube.com" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
];

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    toast.success(`Thanks! ${email} is now subscribed.`);
    form.reset();
  };

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Aperture className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-bold">
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Our mission is to put every creator in the right room: a peer-to-peer marketplace for photo studios,
            sound stages, podcast lounges and music suites.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Popular Categories</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/studios?category=${encodeURIComponent(c.value)}`}
                  className="transition-colors hover:text-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
          <p className="mb-3 text-sm text-muted-foreground">New studios and creator tips, once a week.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input type="email" name="email" required placeholder="you@email.com" />
            <Button type="submit">Join</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>By using StudioSpace you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </footer>
  );
}
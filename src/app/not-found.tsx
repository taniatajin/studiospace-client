import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <svg viewBox="0 0 320 220" className="w-72 max-w-full" role="img" aria-label="Studio light shining on an empty stage">
        <ellipse cx="160" cy="205" rx="130" ry="9" className="fill-muted" />
        <polygon points="205,62 60,200 215,200" className="fill-primary/15" />
        <g transform="rotate(-35 215 55)">
          <rect x="200" y="40" width="46" height="30" rx="6" className="fill-primary" />
          <rect x="190" y="46" width="12" height="18" rx="3" className="fill-foreground/70" />
        </g>
        <line x1="225" y1="75" x2="225" y2="190" className="stroke-foreground/60" strokeWidth="5" strokeLinecap="round" />
        <line x1="225" y1="150" x2="200" y2="200" className="stroke-foreground/60" strokeWidth="5" strokeLinecap="round" />
        <line x1="225" y1="150" x2="250" y2="200" className="stroke-foreground/60" strokeWidth="5" strokeLinecap="round" />
        <text x="95" y="182" className="fill-foreground" fontSize="40" fontWeight="700">
          404
        </text>
      </svg>

      <h1 className="mt-8 text-3xl font-bold md:text-4xl">This set is empty</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for has wrapped up and left the studio. Let us take you back to the main stage.
      </p>
      <Button size="lg" className="mt-8" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" /> Return to Home
        </Link>
      </Button>
    </section>
  );
}
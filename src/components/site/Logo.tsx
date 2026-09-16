import Link from "next/link";
import { FalconMark } from "@/components/ui/icons";

/** Brand lockup: falcon glyph + wordmark. Purely typographic (no image asset). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
      // Accessible name must contain the visible text ("GreyFalcon") — WCAG 2.5.3.
      aria-label="GreyFalcon — home"
    >
      <FalconMark className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
      <span className="font-display text-lg font-bold tracking-tight text-white">
        Grey<span className="text-gradient">Falcon</span>
      </span>
    </Link>
  );
}

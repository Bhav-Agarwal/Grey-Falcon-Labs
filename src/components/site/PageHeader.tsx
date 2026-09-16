import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Consistent hero band for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-14 md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-[-20%] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      </div>
      <div className="container-x">
        <Reveal className="flex flex-col items-start gap-4">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="text-gradient">{accent}</span>
              </>
            ) : null}
          </h1>
          {lead ? <p className="max-w-2xl text-base text-neutral-400 md:text-lg">{lead}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

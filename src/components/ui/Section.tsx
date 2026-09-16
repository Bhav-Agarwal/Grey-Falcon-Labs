import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Vertical section wrapper with consistent rhythm and an optional id anchor. */
export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className={cn("container-x", containerClassName)}>{children}</div>
    </section>
  );
}

/** Standard section heading: eyebrow pill + two-line display title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  icon,
}: {
  eyebrow?: string;
  title: string;
  /** Rendered on a second line with the brand gradient. */
  accent?: string;
  lead?: string;
  align?: "center" | "left";
  icon?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow ? (
        <span className="eyebrow">
          {icon}
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="text-gradient">{accent}</span>
          </>
        ) : null}
      </h2>
      {lead ? (
        <p className={cn("max-w-2xl text-base text-neutral-400 md:text-lg", align === "left" && "mx-0")}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

import { ButtonLink } from "@/components/ui/Button";
import { FalconMark } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <FalconMark className="h-14 w-14" />
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-gold-400">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
        This page flew off course
      </h1>
      <p className="mt-4 max-w-md text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/" size="md">
          Back home
        </ButtonLink>
        <ButtonLink href="/backtesting" variant="secondary" size="md">
          View backtests
        </ButtonLink>
      </div>
    </section>
  );
}

import { PLANS, type Plan } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Grid of pricing plans. Reused on the home preview and the /pricing page. */
export function PricingCards() {
  return (
    <RevealGroup className="grid gap-5 md:grid-cols-3">
      {PLANS.map((plan) => (
        <RevealItem key={plan.id}>
          <PlanCard plan={plan} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-6",
        plan.featured
          ? "border-gold-500/40 bg-gradient-to-b from-gold-500/[0.08] to-transparent shadow-glow"
          : "border-white/10 bg-white/[0.03]",
      )}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-gold-400 to-ember-500 px-3 py-1 text-xs font-semibold text-ink-950">
          {plan.badge}
        </span>
      ) : null}

      <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
      <p className="mt-1 text-sm text-neutral-400">{plan.blurb}</p>

      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-4xl font-bold text-white">${plan.price}</span>
        <span className="mb-1 text-sm text-neutral-400">{plan.cadence}</span>
      </div>
      <p className="mt-1 text-xs text-neutral-500">Auto-renews · cancel anytime</p>

      <ButtonLink
        href="/contact"
        variant={plan.featured ? "primary" : "secondary"}
        size="md"
        className="mt-6 w-full"
      >
        {plan.cta}
      </ButtonLink>

      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

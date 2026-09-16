import { Hero } from "@/components/home/Hero";
import {
  WhatYouGet,
  HowItWorks,
  WhyUs,
  Testimonials,
  FeaturesBento,
  FaqSection,
  CtaBand,
} from "@/components/home/HomeSections";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { Founder } from "@/components/home/Founder";
import { Performance } from "@/components/home/Performance";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCards } from "@/components/marketing/PricingCards";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { PLAN_INCLUSIONS } from "@/lib/content";

/** Landing page — the full marketing narrative, single scroll. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatYouGet />
      <HowItWorks />
      <DashboardPreview />
      <WhyUs />
      <Founder />
      <Performance />
      <Testimonials />
      <FeaturesBento />

      {/* Pricing preview */}
      <Section id="pricing" className="border-y border-white/5 bg-white/[0.015]">
        <SectionHeading
          eyebrow="Simple, transparent pricing"
          title="Choose your"
          accent="plan"
          lead="Built so the math always works in your favour. Cancel anytime."
        />
        <div className="mt-14">
          <PricingCards />
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="glass p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Included with every plan
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {PLAN_INCLUSIONS.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="mt-8 flex justify-center">
          <ButtonLink href="/pricing" variant="secondary" size="md">
            Compare all plans
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}

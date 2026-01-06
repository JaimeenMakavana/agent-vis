"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { ScrollingLogos } from "@/components/scrolling-logos";
import { VisibilityGap } from "@/components/visibility-gap";
import { OptimizationCalculator } from "@/components/optimization-calculator";
import { Methodology } from "@/components/methodology";
import { PerformanceStats } from "@/components/performance-stats";
import { DocsLeadMagnet } from "@/components/docs-lead-magnet";
import { Integrations } from "@/components/integrations";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  // Calculator state
  const [monthlyTokens, setMonthlyTokens] = useState(50);
  const [hallucinationRate, setHallucinationRate] = useState(15);
  const [wastedSpend, setWastedSpend] = useState(0);
  const [agentVisSavings, setAgentVisSavings] = useState(0);

  // Lead magnet + contact form state
  const [leadMagnetStatus, setLeadMagnetStatus] = useState<string | null>(null);
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  useEffect(() => {
    const TOKEN_PRICE_PER_M = 30; // Avg blended price per million tokens
    const totalCost = monthlyTokens * TOKEN_PRICE_PER_M;
    const wasted = Math.floor(totalCost * (hallucinationRate / 100));
    const savings = Math.floor(wasted * 0.85);
    setWastedSpend(wasted);
    setAgentVisSavings(savings);
  }, [monthlyTokens, hallucinationRate]);

  const formatCurrency = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleLeadMagnetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadMagnetStatus("Generating...");
    setTimeout(() => {
      setLeadMagnetStatus("✓ Keys sent to email");
      setTimeout(() => setLeadMagnetStatus(null), 2500);
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus(
      "You are in the queue. Check your email for verification."
    );
  };

  return (
    <>
      <Hero />
      <ScrollingLogos />
      <VisibilityGap />
      <OptimizationCalculator
        monthlyTokens={monthlyTokens}
        hallucinationRate={hallucinationRate}
        wastedSpend={wastedSpend}
        agentVisSavings={agentVisSavings}
        onMonthlyTokensChange={setMonthlyTokens}
        onHallucinationRateChange={setHallucinationRate}
        formatCurrency={formatCurrency}
      />
      <Methodology />
      <PerformanceStats />
      <DocsLeadMagnet
        status={leadMagnetStatus}
        onSubmit={handleLeadMagnetSubmit}
      />
      <Integrations />
      <ContactSection status={contactStatus} onSubmit={handleContactSubmit} />
    </>
  );
}

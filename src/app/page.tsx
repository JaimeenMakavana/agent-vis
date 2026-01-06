import { Hero } from "@/components/home/hero";
import { ScrollingLogos } from "@/components/home/scrolling-logos";
import { OptimizationCalculator } from "@/components/home/optimization-calculator";
import { Methodology } from "@/components/home/methodology";
import { PerformanceStats } from "@/components/home/performance-stats";
import { DocsLeadMagnet } from "@/components/home/docs-lead-magnet";
import { Integrations } from "@/components/home/integrations";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollingLogos />
      <OptimizationCalculator />
      <Methodology />
      <PerformanceStats />
      <DocsLeadMagnet />
      <Integrations />
    </>
  );
}

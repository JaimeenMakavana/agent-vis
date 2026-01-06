import { useEffect, useState } from "react";

type UseOptimizationCalculatorReturn = {
  monthlyTokens: number;
  hallucinationRate: number;
  wastedSpend: number;
  agentVisSavings: number;
  setMonthlyTokens: (value: number) => void;
  setHallucinationRate: (value: number) => void;
  formatCurrency: (num: number) => string;
};

export function useOptimizationCalculator(): UseOptimizationCalculatorReturn {
  const [monthlyTokens, setMonthlyTokens] = useState(50);
  const [hallucinationRate, setHallucinationRate] = useState(15);
  const [wastedSpend, setWastedSpend] = useState(0);
  const [agentVisSavings, setAgentVisSavings] = useState(0);

  useEffect(() => {
    const TOKEN_PRICE_PER_M = 30;
    const totalCost = monthlyTokens * TOKEN_PRICE_PER_M;
    const wasted = Math.floor(totalCost * (hallucinationRate / 100));
    const savings = Math.floor(wasted * 0.85);
    setWastedSpend(wasted);
    setAgentVisSavings(savings);
  }, [monthlyTokens, hallucinationRate]);

  const formatCurrency = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return {
    monthlyTokens,
    hallucinationRate,
    wastedSpend,
    agentVisSavings,
    setMonthlyTokens,
    setHallucinationRate,
    formatCurrency,
  };
}



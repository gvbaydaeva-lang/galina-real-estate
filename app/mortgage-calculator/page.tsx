import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = { title: "Ипотечный калькулятор", description: "Предварительный расчёт ежемесячного платежа по ипотеке." };

export default function MortgageCalculatorPage() {
  return <main id="content"><MortgageCalculator /></main>;
}

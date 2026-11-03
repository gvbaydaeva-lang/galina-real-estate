import Link from "next/link";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export default function MortgageCalculatorPage() {
  return <main><header className="inner-header"><Link className="brand" href="/"><span className="brand-mark">Г</span><span>Галина Санджиева</span></Link><Link className="header-cta" href="/">На главную</Link></header><MortgageCalculator /></main>;
}

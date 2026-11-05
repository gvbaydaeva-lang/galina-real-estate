export type MortgageInput = {
  propertyPrice: number;
  downPayment: number;
  annualRate: number;
  years: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  overpayment: number;
};

export function downPaymentFromPercent(propertyPrice: number, percent: number): number {
  return Math.round(propertyPrice * percent / 100);
}

export function downPaymentToPercent(propertyPrice: number, downPayment: number): number {
  return propertyPrice === 0 ? 0 : Number((downPayment / propertyPrice * 100).toFixed(2));
}

export function calculateMortgageShares(propertyPrice: number, downPayment: number, result: MortgageResult): { downPaymentPercent: number; overpaymentPercent: number } {
  return {
    downPaymentPercent: Math.round(downPayment / propertyPrice * 100),
    overpaymentPercent: result.loanAmount === 0 ? 0 : Math.max(0, Math.round(result.overpayment / result.loanAmount * 100)),
  };
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { propertyPrice, downPayment, annualRate, years } = input;

  if (![propertyPrice, downPayment, annualRate, years].every(Number.isFinite) || propertyPrice <= 0 || years <= 0 || annualRate < 0 || downPayment < 0) {
    throw new Error("Введите корректные параметры расчёта");
  }
  if (!Number.isInteger(years)) {
    throw new Error("Срок ипотеки укажите целым числом лет");
  }
  if (downPayment > propertyPrice) {
    throw new Error("Первоначальный взнос не может быть больше стоимости недвижимости");
  }

  const loanAmount = propertyPrice - downPayment;
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const rawMonthlyPayment = monthlyRate === 0
    ? loanAmount / months
    : loanAmount * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  const monthlyPayment = Math.round(rawMonthlyPayment);
  const totalPayment = monthlyRate === 0 ? loanAmount : monthlyPayment * months;

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    overpayment: monthlyRate === 0 ? 0 : totalPayment - loanAmount,
  };
}

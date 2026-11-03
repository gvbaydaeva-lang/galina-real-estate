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

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { propertyPrice, downPayment, annualRate, years } = input;

  if (propertyPrice <= 0 || years <= 0 || annualRate < 0 || downPayment < 0) {
    throw new Error("Введите корректные параметры расчёта");
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
  const totalPayment = monthlyPayment * months;

  return { loanAmount, monthlyPayment, totalPayment, overpayment: totalPayment - loanAmount };
}

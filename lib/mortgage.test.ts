import { describe, expect, it } from "vitest";
import { calculateMortgage, calculateMortgageShares, downPaymentFromPercent, downPaymentToPercent } from "./mortgage";

describe("calculateMortgage", () => {
  it("calculates an annuity payment and total overpayment", () => {
    expect(calculateMortgage({ propertyPrice: 10_000_000, downPayment: 2_000_000, annualRate: 12, years: 20 })).toEqual({
      loanAmount: 8_000_000,
      monthlyPayment: 88087,
      totalPayment: 21140880,
      overpayment: 13140880,
    });
  });

  it("uses even monthly payments when the annual rate is zero", () => {
    expect(calculateMortgage({ propertyPrice: 1_200_000, downPayment: 200_000, annualRate: 0, years: 10 }).monthlyPayment).toBe(8333);
  });

  it("rejects a down payment that exceeds the property price", () => {
    expect(() => calculateMortgage({ propertyPrice: 1_000_000, downPayment: 1_000_001, annualRate: 10, years: 20 })).toThrow("Первоначальный взнос не может быть больше стоимости недвижимости");
  });

  it("converts the down payment between rubles and percent", () => {
    expect(downPaymentFromPercent(10_000_000, 20)).toBe(2_000_000);
    expect(downPaymentToPercent(10_000_000, 2_000_000)).toBe(20);
  });

  it("calculates down-payment and overpayment shares from the visitor inputs", () => {
    const result = calculateMortgage({ propertyPrice: 10_000_000, downPayment: 2_000_000, annualRate: 12, years: 20 });

    expect(calculateMortgageShares(10_000_000, 2_000_000, result)).toEqual({
      downPaymentPercent: 20,
      overpaymentPercent: 164,
    });
  });

  it("handles zero and full down payments without invalid percentages", () => {
    const zeroDownPayment = calculateMortgage({ propertyPrice: 1_000_000, downPayment: 0, annualRate: 0, years: 10 });
    const fullDownPayment = calculateMortgage({ propertyPrice: 1_000_000, downPayment: 1_000_000, annualRate: 0, years: 10 });

    expect(calculateMortgageShares(1_000_000, 0, zeroDownPayment)).toEqual({ downPaymentPercent: 0, overpaymentPercent: 0 });
    expect(calculateMortgageShares(1_000_000, 1_000_000, fullDownPayment)).toEqual({ downPaymentPercent: 100, overpaymentPercent: 0 });
  });

  it("rejects a non-integer mortgage term", () => {
    expect(() => calculateMortgage({ propertyPrice: 1_000_000, downPayment: 200_000, annualRate: 10, years: 20.5 })).toThrow("Срок ипотеки укажите целым числом лет");
  });

  it("rejects non-finite numeric input", () => {
    expect(() => calculateMortgage({ propertyPrice: Number.NaN, downPayment: 200_000, annualRate: 10, years: 20 })).toThrow("Введите корректные параметры расчёта");
  });
});

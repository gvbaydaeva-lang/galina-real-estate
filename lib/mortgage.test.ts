import { describe, expect, it } from "vitest";
import { calculateMortgage, downPaymentFromPercent, downPaymentToPercent } from "./mortgage";

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

  it("rejects a non-integer mortgage term", () => {
    expect(() => calculateMortgage({ propertyPrice: 1_000_000, downPayment: 200_000, annualRate: 10, years: 20.5 })).toThrow("Срок ипотеки укажите целым числом лет");
  });

  it("rejects non-finite numeric input", () => {
    expect(() => calculateMortgage({ propertyPrice: Number.NaN, downPayment: 200_000, annualRate: 10, years: 20 })).toThrow("Введите корректные параметры расчёта");
  });
});

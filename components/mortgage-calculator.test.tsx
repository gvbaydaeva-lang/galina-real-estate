import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MortgageCalculator } from "./mortgage-calculator";

describe("MortgageCalculator", () => {
  it("starts empty and does not request personal data", () => {
    const markup = renderToStaticMarkup(<MortgageCalculator />);

    expect(markup).toContain("Введите свои данные для предварительного расчёта");
    expect(markup).toContain("Очистить расчёт");
    expect(markup).toContain("Расчёт ориентировочный");
    expect(markup).toContain('id="price-input-help"');
    expect(markup).toContain('aria-describedby="price-input-help"');
    expect(markup).not.toContain('value="10000000"');
    expect(markup).not.toContain('value="12"');
    expect(markup).not.toContain("Получить расчёт");
    expect(markup).not.toContain('name="phone"');
  });
});

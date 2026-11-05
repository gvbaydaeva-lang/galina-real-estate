import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MortgageCalculator } from "./mortgage-calculator";

describe("MortgageCalculator", () => {
  it("labels preset data as an example and explains the preliminary result", () => {
    const markup = renderToStaticMarkup(<MortgageCalculator />);

    expect(markup).toContain("Пример расчёта");
    expect(markup).toContain("Очистить расчёт");
    expect(markup).toContain("Первоначальный взнос от стоимости");
    expect(markup).toContain("Переплата от суммы кредита");
    expect(markup).toContain("Расчёт ориентировочный");
    expect(markup).toContain("данные не отправляются и не сохраняются");
    expect(markup).toContain('id="price-input-help"');
    expect(markup).toContain('aria-describedby="price-input-help"');
  });
});

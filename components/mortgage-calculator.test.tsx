// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach } from "vitest";
import { describe, expect, it } from "vitest";
import { MortgageCalculator } from "./mortgage-calculator";

afterEach(cleanup);

describe("MortgageCalculator", () => {
  it("starts empty and does not request personal data", () => {
    const markup = renderToStaticMarkup(<MortgageCalculator />);

    expect(markup).toContain("Введите свои данные для предварительного расчёта");
    expect(markup).toContain("Рассчитать ипотеку");
    expect(markup).toContain("Расчёт ориентировочный");
    expect(markup).toContain('id="price-input-help"');
    expect(markup).toContain('aria-describedby="price-input-help"');
    expect(markup).not.toContain('value="10000000"');
    expect(markup).not.toContain('value="12"');
    expect(markup).not.toContain("Ежемесячный платёж");
    expect(markup).not.toContain('name="phone"');
  });

  it("shows the result only after the user submits valid inputs", () => {
    render(<MortgageCalculator />);

    fireEvent.change(screen.getByLabelText("Стоимость недвижимости"), { target: { value: "10000000" } });
    fireEvent.change(screen.getByLabelText("Первоначальный взнос в рублях"), { target: { value: "2000000" } });
    fireEvent.change(screen.getByLabelText("Ставка, % годовых"), { target: { value: "12" } });
    fireEvent.change(screen.getByLabelText("Срок, лет"), { target: { value: "20" } });

    expect(screen.queryByText("Ежемесячный платёж")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Рассчитать ипотеку" }));

    expect(screen.getByText("Ежемесячный платёж")).not.toBeNull();
    expect(screen.getByText("Ежемесячный платёж").parentElement?.querySelector("strong")?.textContent).toContain("88 087 ₽");

    fireEvent.change(screen.getByLabelText("Ставка, % годовых"), { target: { value: "13" } });
    expect(screen.queryByText("Ежемесячный платёж")).toBeNull();
  });

  it("explains which inputs are missing when the user submits an incomplete form", () => {
    render(<MortgageCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "Рассчитать ипотеку" }));

    expect(screen.getByRole("alert").textContent).toContain("Заполните стоимость недвижимости, первоначальный взнос, ставку и срок");
  });

  it("does not add a second return arrow when embedded in a city catalog", () => {
    const markup = renderToStaticMarkup(<MortgageCalculator cityName="Москва" headingLevel="h2" showBackNavigation={false} />);

    expect(markup).not.toContain('class="back-navigation"');
  });

  it("accepts an optional selected apartment price without changing the calculator copy", () => {
    const markup = renderToStaticMarkup(<MortgageCalculator initialPrice={29000000} />);

    expect(markup).toContain('value="29 000 000"');
    expect(markup).toContain("Введите свои данные для предварительного расчёта");
  });
});

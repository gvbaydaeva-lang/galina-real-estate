import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ElistaPage } from "./elista-page";

describe("ElistaPage", () => {
  it("renders the PDF-defined service page without the empty property catalog", () => {
    const markup = renderToStaticMarkup(<ElistaPage />);

    expect(markup).toContain("Недвижимость в Элисте — покупка, продажа и сопровождение сделок");
    expect(markup).toContain("Квартиры и частные дома");
    expect(markup).toContain("Новостройки и предложения застройщиков");
    expect(markup).toContain("Земельные участки");
    expect(markup).toContain("Коммерческая недвижимость");
    expect(markup).toContain("Недвижимость под вашу задачу, а не просто список объявлений");
    expect(markup).toContain("Знакомство и задача");
    expect(markup).toContain("Подготовка к сделке");
    expect(markup).toContain("Рассчитать ипотеку");
    expect(markup).toContain('href="#elista-contact"');
    expect(markup).toContain("https://t.me/+79672232585");
    expect(markup).toContain("https://wa.me/79672232585");
    expect(markup).not.toContain("Район или микрорайон");
    expect(markup).not.toContain("Данные для каталога публикуются");
  });
});

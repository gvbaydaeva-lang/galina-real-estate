import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogProperty } from "../content/catalog-cities";
import { MoscowPropertySections } from "./moscow-property-sections";

describe("MoscowPropertySections", () => {
  it("renders the shared buyer sections and confirmed apartment rows", () => {
    const property = getCatalogProperty("moscow", "moscow-simvol");
    if (!property) throw new Error("Simvol is required for this test");

    const markup = renderToStaticMarkup(<MoscowPropertySections property={property} cityName="Москва" />);

    expect(markup).toContain("О жилом комплексе");
    expect(markup).toContain("Расположение и преимущества");
    expect(markup).toContain("Квартиры и цены");
    expect(markup).toContain("Планировки");
    expect(markup).toContain("Корпуса и сроки сдачи");
    expect(markup).toContain("Ипотечный калькулятор");
    expect(markup).toContain("Заявка по ЖК");
    expect(markup).toContain("Студия");
    expect(markup).toContain("от 18 млн ₽");
    expect(markup).not.toContain("post.donstroy.moscow");
    expect(markup).not.toContain("Застройщик");
  });

  it("does not invent apartment prices for ZILART", () => {
    const property = getCatalogProperty("moscow", "moscow-zilart");
    if (!property) throw new Error("ZILART is required for this test");

    const markup = renderToStaticMarkup(<MoscowPropertySections property={property} cityName="Москва" />);

    expect(markup).toContain("Стоимость зависит от выбранного корпуса и доступного лота");
    expect(markup).not.toContain("официальном сайте");
    expect(markup).not.toContain("level.ru");
    expect(markup).not.toContain("initialPrice");
  });

  it("keeps Level phases in separate sections", () => {
    const property = getCatalogProperty("moscow", "moscow-level-michurinskiy");
    if (!property) throw new Error("Level Michurinskiy is required for this test");

    const markup = renderToStaticMarkup(<MoscowPropertySections property={property} cityName="Москва" />);

    expect(markup).toContain("Этапы 1–2");
    expect(markup).toContain("от 57,4 млн ₽");
    expect(markup).toContain("Этапы 3–4");
    expect(markup).toContain("от 15,4 млн ₽");
    expect(markup.indexOf("Этапы 1–2")).toBeLessThan(markup.indexOf("Этапы 3–4"));
  });

  it("does not expose the source sites in the Level page", () => {
    const property = getCatalogProperty("moscow", "moscow-level-michurinskiy");
    if (!property) throw new Error("Level Michurinskiy is required for this test");

    const markup = renderToStaticMarkup(<MoscowPropertySections property={property} cityName="Москва" />);

    expect(markup).not.toContain("level.ru");
    expect(markup).not.toContain("Застройщик");
  });
});

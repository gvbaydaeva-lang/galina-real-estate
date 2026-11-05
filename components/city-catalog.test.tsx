import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogCity } from "../content/catalog-cities";
import { CityCatalog } from "./city-catalog";
import { PropertyCard } from "./property-card";

describe("CityCatalog", () => {
  it("renders an accessible district filter and source-linked example cards", () => {
    const moscow = getCatalogCity("moscow");

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);

    expect(markup).toContain('<label for="district-filter">Район</label>');
    expect(markup).toMatch(/<option value=""(?: selected="")?>Все районы<\/option>/);
    expect(markup).toContain("Левел Войковская");
    expect(markup).toContain("Level Group");
    expect(markup).toContain("Официальный источник");
    expect(markup).toContain("несколько примеров действующих проектов для ориентира");
    expect(markup).toContain("Не нашли подходящий вариант?");
    expect(markup).toContain('href="/contacts"');
  });

  it("keeps Elista empty without inventing projects", () => {
    const elista = getCatalogCity("elista");
    if (!elista) throw new Error("Elista catalog data is required for this test");

    const markup = renderToStaticMarkup(<CityCatalog city={elista} />);

    expect(markup).toContain("Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.");
    expect(markup).not.toContain("<article");
  });
});

describe("PropertyCard", () => {
  it("renders verified required fields without inventing optional details", () => {
    const markup = renderToStaticMarkup(
      <PropertyCard
        property={{
          id: "moscow-verified-1",
          citySlug: "moscow",
          district: "Даниловский",
          title: "Проверенный объект",
          developer: "Проверенный застройщик",
          dealType: "Продажа",
          verifiedAt: "2026-11-04",
          sourceUrl: "https://example.test/project",
        }}
      />,
    );

    expect(markup).toContain("Проверенный объект");
    expect(markup).toContain("Даниловский");
    expect(markup).toContain("Продажа");
    expect(markup).toContain("2026-11-04");
    expect(markup).toContain("Проверенный застройщик");
    expect(markup).toContain('href="https://example.test/project"');
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain("Цена");
  });
});

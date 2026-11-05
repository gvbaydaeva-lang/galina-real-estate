import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogCity } from "../content/catalog-cities";
import { CityCatalog } from "./city-catalog";
import { PropertyCard } from "./property-card";

describe("CityCatalog", () => {
  it("renders an accessible district filter, cards, and the required consultation note", () => {
    const moscow = getCatalogCity("moscow");

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);

    expect(markup).toContain('<label for="district-filter">Район</label>');
    expect(markup).toMatch(/<option value=""(?: selected="")?>Все районы<\/option>/);
    expect(markup).toContain("Левел Мичуринский, этапы 3 и 4");
    expect(markup).toContain("Это не полный список предложений: есть и другие варианты.");
  });

  it("keeps Elista at the honest data-pending state", () => {
    const elista = getCatalogCity("elista");

    if (!elista) {
      throw new Error("Elista catalog data is required for this test");
    }

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
          dealType: "Продажа",
          verifiedAt: "2026-11-04",
        }}
      />,
    );

    expect(markup).toContain("Проверенный объект");
    expect(markup).toContain("Даниловский");
    expect(markup).toContain("Продажа");
    expect(markup).toContain("2026-11-04");
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain("Цена");
  });

  it("labels the direct developer page as an external official source", () => {
    const markup = renderToStaticMarkup(
      <PropertyCard
        property={{
          id: "official-source-1",
          citySlug: "moscow",
          district: "Раменки",
          title: "ЖК с официальной страницей",
          dealType: "Продажа",
          verifiedAt: "2026-11-05",
          price: "от 10 млн ₽",
          developer: "Проверенный застройщик",
          housingClass: "Бизнес",
          sourceUrl: "https://developer.example/project",
        } as never}
      />,
    );

    expect(markup).toContain("Застройщик: Проверенный застройщик");
    expect(markup).toContain("Класс жилья: Бизнес");
    expect(markup).toContain('href="https://developer.example/project"');
    expect(markup).toContain("Официальный источник");
    expect(markup).toContain('rel="noreferrer"');
  });
});

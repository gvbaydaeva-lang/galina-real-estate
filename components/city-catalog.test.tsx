import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogCity, type CatalogCity, type VerifiedProperty } from "../content/catalog-cities";

type CityCatalogComponent = (props: { city: CatalogCity }) => React.ReactElement;
type PropertyCardComponent = (props: { property: VerifiedProperty }) => React.ReactElement;

async function loadCatalogComponents() {
  const cityModule = await import("./city-catalog").catch(() => ({}));
  const propertyModule = await import("./property-card").catch(() => ({}));

  return {
    CityCatalog: cityModule.CityCatalog as CityCatalogComponent | undefined,
    PropertyCard: propertyModule.PropertyCard as PropertyCardComponent | undefined,
  };
}

describe("CityCatalog", () => {
  it("renders an accessible district filter and the honest empty state", async () => {
    const moscow = getCatalogCity("moscow");
    const { CityCatalog } = await loadCatalogComponents();

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    expect(CityCatalog).toBeTypeOf("function");
    if (!CityCatalog) return;

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);

    expect(markup).toContain('<label for="district-filter">Район</label>');
    expect(markup).toMatch(/<option value=""(?: selected="")?>Все районы<\/option>/);
    expect(markup).toContain("Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.");
    expect(markup).not.toContain("<article");
  });
});

describe("PropertyCard", () => {
  it("renders verified required fields without inventing optional details", async () => {
    const { PropertyCard } = await loadCatalogComponents();

    expect(PropertyCard).toBeTypeOf("function");
    if (!PropertyCard) return;

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
});

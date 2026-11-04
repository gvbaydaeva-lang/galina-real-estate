import { describe, expect, it } from "vitest";

type CatalogCity = {
  slug: string;
  name: string;
  heading: string;
  note: string;
  locations?: readonly string[];
  properties?: readonly CatalogPropertyFixture[];
};

type CatalogPropertyFixture = {
  id: string;
  citySlug: string;
  district: string;
  title: string;
  dealType: string;
  verifiedAt: string;
};

type CatalogModule = {
  catalogCities: CatalogCity[];
  filterProperties?: (properties: readonly CatalogPropertyFixture[], district: string) => CatalogPropertyFixture[];
};

async function loadCatalogModule(): Promise<CatalogModule> {
  const moduleUrl = new URL("./catalog-cities.ts", import.meta.url).href;
  return import(moduleUrl) as Promise<CatalogModule>;
}

describe("catalogCities", () => {
  it("provides all city routes for static publication", async () => {
    const { catalogCities: cities } = await loadCatalogModule();

    expect(cities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(cities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
  });

  it("provides six selectable locations and no unverified properties for every city", async () => {
    const { catalogCities: cities } = await loadCatalogModule();

    expect(cities.map((city) => city.locations)).toEqual([
      ["Пресненский", "Даниловский", "Раменки", "Хорошёво-Мнёвники", "Лефортово", "Новая Москва"],
      ["Приморский", "Московский", "Выборгский", "Невский", "Красногвардейский", "Пушкинский"],
      ["Центральный", "Прикубанский", "Фестивальный", "Западный обход", "Энка", "Гидростроителей"],
      ["Центр", "1-й микрорайон", "2-й микрорайон", "3-й микрорайон", "5-й микрорайон", "Юго-Западный жилой массив"],
    ]);
    expect(cities.every((city) => city.properties?.length === 0)).toBe(true);
  });

  it("filters future properties by the requested district", async () => {
    const { filterProperties } = await loadCatalogModule();
    const properties: CatalogPropertyFixture[] = [
      { id: "moscow-1", citySlug: "moscow", district: "Даниловский", title: "Проверенный объект", dealType: "Продажа", verifiedAt: "2026-11-04" },
      { id: "moscow-2", citySlug: "moscow", district: "Раменки", title: "Другой объект", dealType: "Продажа", verifiedAt: "2026-11-04" },
    ];

    expect(filterProperties).toBeTypeOf("function");
    expect(filterProperties?.(properties, "Даниловский").map((property) => property.id)).toEqual(["moscow-1"]);
  });

  it("uses the microdistrict label only for Elista", async () => {
    const { catalogCities: cities } = await loadCatalogModule();

    expect(cities.map((city) => city.locationLabel)).toEqual([
      "Район",
      "Район",
      "Район",
      "Район или микрорайон",
    ]);
  });
});

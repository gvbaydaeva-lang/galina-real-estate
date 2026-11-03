import { describe, expect, it } from "vitest";

type CatalogCity = {
  slug: string;
  name: string;
  heading: string;
  note: string;
};

async function loadCatalogCities(): Promise<CatalogCity[]> {
  const moduleUrl = new URL("./catalog-cities.ts", import.meta.url).href;
  const cityModule = await import(moduleUrl).catch(() => ({ catalogCities: [] as CatalogCity[] }));
  return cityModule.catalogCities;
}

describe("catalogCities", () => {
  it("provides all city routes for static publication", async () => {
    const cities = await loadCatalogCities();

    expect(cities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(cities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { catalogCities, catalogPropertySources, filterProperties, getCatalogCity, type VerifiedProperty } from "./catalog-cities";

describe("catalogCities", () => {
  it("provides all city routes for static publication", () => {
    expect(catalogCities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(catalogCities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
    expect(new Set(catalogCities.map((city) => city.note)).size).toBe(4);
    expect(catalogCities.every((city) => !/после проверки|добавляются|уточняются/i.test(city.note))).toBe(true);
  });

  it("publishes six source-backed cards in each selected city and keeps Elista empty", () => {
    const selectedCities = catalogCities.filter((city) => city.slug !== "elista");

    expect(selectedCities.every((city) => city.properties.length === 6)).toBe(true);
    expect(getCatalogCity("elista")?.properties).toEqual([]);
    expect(selectedCities.every((city) => city.locations.every((location) => city.properties.some((property) => property.district === location)))).toBe(true);
    expect(selectedCities.flatMap((city) => city.properties).every((property) => (
      property.verifiedAt === "2026-11-08"
      && !("sourceUrl" in property)
      && catalogPropertySources[property.id]?.startsWith("https://")
      && property.price === undefined
    ))).toBe(true);
  });

  it("adds only verified HTTPS project images and keeps unverified media absent", () => {
    const properties = catalogCities.flatMap((city) => city.properties);
    const propertiesWithImages = properties.filter((property) => property.image);

    expect(propertiesWithImages).toHaveLength(13);
    expect(propertiesWithImages.every((property) => (
      property.image?.src.startsWith("https://")
      && property.image.alt === `Фото ЖК «${property.title}»`
    ))).toBe(true);
    expect(properties.filter((property) => !property.image).map((property) => property.id)).toEqual([
      "moscow-zilart",
      "spb-legenda-vasilevskogo",
      "krasnodar-park-pobedy-3",
      "krasnodar-record-2",
      "krasnodar-samolet-7",
    ]);
  });

  it("filters future properties by the requested district", () => {
    const properties: VerifiedProperty[] = [
      { id: "moscow-1", citySlug: "moscow", district: "Даниловский", title: "Проверенный объект", dealType: "Продажа", verifiedAt: "2026-11-04", sourceUrl: "https://example.test/one" },
      { id: "moscow-2", citySlug: "moscow", district: "Раменки", title: "Другой объект", dealType: "Продажа", verifiedAt: "2026-11-04", sourceUrl: "https://example.test/two" },
    ];

    expect(filterProperties(properties, "Даниловский").map((property) => property.id)).toEqual(["moscow-1"]);
    expect(filterProperties(properties, "Несуществующий район")).toEqual([]);
  });

  it("uses the microdistrict label only for Elista", () => {
    expect(catalogCities.map((city) => city.locationLabel)).toEqual([
      "Район или локация",
      "Район или локация",
      "Район или локация",
      "Район или микрорайон",
    ]);
  });
});

import { describe, expect, it } from "vitest";
import { catalogCities, filterProperties, type VerifiedProperty } from "./catalog-cities";

describe("catalogCities", () => {
  it("provides all city routes for static publication", () => {
    expect(catalogCities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(catalogCities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
  });

  it("provides six selectable locations and preserves Elista as an unlisted catalog", () => {
    expect(catalogCities.map((city) => city.locations)).toEqual([
      ["Пресненский", "Даниловский", "Раменки", "Хорошёво-Мнёвники", "Очаково-Матвеевское", "Новая Москва"],
      ["Приморский", "Московский", "Выборгский", "Невский", "Василеостровский", "Пушкинский"],
      ["Центральный", "Прикубанский", "Карасунский округ", "Западный обход", "Черёмушки", "Пригородная"],
      ["Центр", "1-й микрорайон", "2-й микрорайон", "3-й микрорайон", "5-й микрорайон", "Юго-Западный жилой массив"],
    ]);
    expect(catalogCities.find((city) => city.slug === "elista")?.properties).toEqual([]);
  });

  it("filters future properties by the requested district", () => {
    const properties: VerifiedProperty[] = [
      { id: "moscow-1", citySlug: "moscow", district: "Даниловский", title: "Проверенный объект", dealType: "Продажа", verifiedAt: "2026-11-04" },
      { id: "moscow-2", citySlug: "moscow", district: "Раменки", title: "Другой объект", dealType: "Продажа", verifiedAt: "2026-11-04" },
    ];

    expect(filterProperties(properties, "Даниловский").map((property) => property.id)).toEqual(["moscow-1"]);
    expect(filterProperties(properties, "Несуществующий район")).toEqual([]);
  });

  it("uses the microdistrict label only for Elista", () => {
    expect(catalogCities.map((city) => city.locationLabel)).toEqual([
      "Район",
      "Район",
      "Район",
      "Район или микрорайон",
    ]);
  });

  it("publishes only source-backed residential complexes in the three confirmed cities", () => {
    const expectedCities = ["moscow", "spb", "krasnodar"] as const;

    for (const citySlug of expectedCities) {
      const city = catalogCities.find((entry) => entry.slug === citySlug);

      expect(city?.properties).toHaveLength(5);
      expect(city?.properties.every((property) => {
        const sourceBacked = property as typeof property & {
          developer?: string;
          housingClass?: string;
          sourceUrl?: string;
        };
        return sourceBacked.developer && sourceBacked.housingClass && sourceBacked.price?.startsWith("от ")
          && sourceBacked.price.endsWith(" ₽") && sourceBacked.sourceUrl?.startsWith("https://")
          && sourceBacked.verifiedAt === "2026-11-05" && !sourceBacked.image;
      })).toBe(true);
    }

    expect(catalogCities.find((city) => city.slug === "elista")?.properties).toEqual([]);
  });
});

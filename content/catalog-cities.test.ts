import { describe, expect, it } from "vitest";
import { catalogCities, filterProperties, type VerifiedProperty } from "./catalog-cities";

describe("catalogCities", () => {
  it("provides all city routes for static publication", () => {
    expect(catalogCities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(catalogCities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
  });

  it("provides six selectable locations and source-linked examples only for researched cities", () => {
    expect(catalogCities.map((city) => city.locations)).toEqual([
      ["Новая Москва", "Войковский", "Можайский", "Очаково-Матвеевское", "Печатники", "Аэропорт"],
      ["Василеостровский", "Московский", "Невский", "Красногвардейский", "Приморский", "Выборгский"],
      ["Центральный", "Прикубанский", "Западный обход", "Карасунский", "Гидростроителей", "Черёмушки"],
      ["Центр", "1-й микрорайон", "2-й микрорайон", "3-й микрорайон", "5-й микрорайон", "Юго-Западный жилой массив"],
    ]);
    expect(catalogCities.find((city) => city.slug === "moscow")?.properties).toHaveLength(1);
    expect(catalogCities.find((city) => city.slug === "spb")?.properties).toHaveLength(2);
    expect(catalogCities.find((city) => city.slug === "krasnodar")?.properties).toHaveLength(3);
    expect(catalogCities.find((city) => city.slug === "elista")?.properties).toEqual([]);
  });

  it("filters future properties by the requested district", () => {
    const properties: VerifiedProperty[] = [
      { id: "moscow-1", citySlug: "moscow", district: "Даниловский", title: "Проверенный объект", developer: "Застройщик", dealType: "Продажа", verifiedAt: "2026-11-04", sourceUrl: "https://example.test/one" },
      { id: "moscow-2", citySlug: "moscow", district: "Раменки", title: "Другой объект", developer: "Застройщик", dealType: "Продажа", verifiedAt: "2026-11-04", sourceUrl: "https://example.test/two" },
    ];

    expect(filterProperties(properties, "Даниловский").map((property) => property.id)).toEqual(["moscow-1"]);
    expect(filterProperties(properties, "Несуществующий район")).toEqual([]);
  });

  it("filters researched projects without leaking other districts", () => {
    const moscow = catalogCities.find((city) => city.slug === "moscow");
    expect(moscow).toBeDefined();
    expect(filterProperties(moscow!.properties, "Войковский").map((property) => property.title)).toEqual(["Левел Войковская"]);
    expect(filterProperties(moscow!.properties, "Несуществующий район")).toEqual([]);
  });

  it("uses the microdistrict label only for Elista", () => {
    expect(catalogCities.map((city) => city.locationLabel)).toEqual([
      "Район",
      "Район",
      "Район",
      "Район или микрорайон",
    ]);
  });
});

import { describe, expect, it } from "vitest";
import { catalogCities, filterProperties, type VerifiedProperty } from "./catalog-cities";

describe("catalogCities", () => {
  it("provides all city routes for static publication", () => {
    expect(catalogCities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(catalogCities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
    expect(new Set(catalogCities.map((city) => city.note)).size).toBe(4);
    expect(catalogCities.every((city) => city.note.includes("после проверки"))).toBe(true);
  });

  it("provides six selectable locations and no unverified properties for every city", () => {
    expect(catalogCities.map((city) => city.locations)).toEqual([
      ["Пресненский", "Даниловский", "Раменки", "Хорошёво-Мнёвники", "Лефортово", "Новая Москва"],
      ["Приморский", "Московский", "Выборгский", "Невский", "Красногвардейский", "Пушкинский"],
      ["Центральный", "Прикубанский", "Фестивальный", "Западный обход", "Энка", "Гидростроителей"],
      ["Центр", "1-й микрорайон", "2-й микрорайон", "3-й микрорайон", "5-й микрорайон", "Юго-Западный жилой массив"],
    ]);
    expect(catalogCities.every((city) => city.properties.length === 0)).toBe(true);
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
});

import { describe, expect, it } from "vitest";
import * as catalogModule from "./catalog-cities";
import { catalogCities, catalogPropertySources, filterProperties, getCatalogCity, type VerifiedProperty } from "./catalog-cities";

describe("catalogCities", () => {
  it("provides all city routes for static publication", () => {
    expect(catalogCities.map((city) => city.slug)).toEqual(["moscow", "spb", "krasnodar", "elista"]);
    expect(catalogCities.every((city) => city.name.length > 0 && city.heading.length > 0 && city.note.length > 0)).toBe(true);
    expect(new Set(catalogCities.map((city) => city.note)).size).toBe(4);
    expect(catalogCities.filter((city) => city.slug !== "elista").every((city) => city.note.includes("после проверки"))).toBe(true);
    expect(getCatalogCity("elista")?.note).toContain("новостройки по запросу");
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

  it("provides substantial source-backed copy for every published property", () => {
    const properties = catalogCities
      .filter((city) => city.slug !== "elista")
      .flatMap((city) => city.properties);

    expect(properties).toHaveLength(18);
    expect(properties.every((property) => (
      property.description.length >= 2
      && property.description.length <= 3
      && property.description.every((paragraph) => paragraph.trim().length > 80)
      && property.highlights.length >= 3
      && property.highlights.length <= 5
      && property.highlights.every((highlight) => highlight.trim().length > 12)
      && catalogPropertySources[property.id]?.startsWith("https://")
    ))).toBe(true);
  });

  it("keeps rich detail-only copy separate from the compact catalogue preview", () => {
    const properties = catalogCities
      .filter((city) => city.slug !== "elista")
      .flatMap((city) => city.properties);

    expect(properties.every((property) => (
      property.detailDescription.length === 4
      && property.detailDescription.every((paragraph) => paragraph.trim().length > 150)
      && property.detailHighlights.length === 5
      && property.detailHighlights.every((highlight) => highlight.trim().length > 12)
      && ![...property.description, ...property.detailDescription, ...property.highlights, ...property.detailHighlights]
        .join(" ")
        .toLocaleLowerCase("ru")
        .includes("застройщик")
    ))).toBe(true);
  });

  it("adds only verified HTTPS project images and keeps unverified media absent", () => {
    const properties = catalogCities.flatMap((city) => city.properties);
    const propertiesWithImages = properties.filter((property) => property.image);

    expect(propertiesWithImages).toHaveLength(18);
    expect(propertiesWithImages.every((property) => (
      property.image?.src.startsWith("https://")
      && property.image.alt === `Фото ЖК «${property.title}»`
    ))).toBe(true);
    expect(properties.filter((property) => !property.image)).toHaveLength(0);
  });

  it("filters future properties by the requested district", () => {
    const properties: VerifiedProperty[] = [
      { id: "moscow-1", citySlug: "moscow", district: "Даниловский", title: "Проверенный объект", dealType: "Продажа", verifiedAt: "2026-11-04", description: ["Первый абзац тестового описания объекта для проверки фильтрации по району.", "Второй абзац тестового описания объекта для проверки сохранения структуры данных."], highlights: ["Тестовая локация", "Тестовая инфраструктура", "Тестовый двор"], detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."], detailHighlights: ["Тестовая локация", "Тестовая инфраструктура", "Тестовый двор", "Тестовая территория", "Тестовый корпус"] },
      { id: "moscow-2", citySlug: "moscow", district: "Раменки", title: "Другой объект", dealType: "Продажа", verifiedAt: "2026-11-04", description: ["Первый абзац второго тестового объекта для проверки фильтрации по району.", "Второй абзац второго тестового объекта для проверки сохранения структуры данных."], highlights: ["Другая локация", "Другая инфраструктура", "Другой двор"], detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."], detailHighlights: ["Другая локация", "Другая инфраструктура", "Другой двор", "Другая территория", "Другой корпус"] },
    ];

    expect(filterProperties(properties, "Даниловский").map((property) => property.id)).toEqual(["moscow-1"]);
    expect(filterProperties(properties, "Несуществующий район")).toEqual([]);
  });

  it("finds a property only within its published city", () => {
    const lookup = (catalogModule as typeof catalogModule & {
      getCatalogProperty?: (citySlug: string, propertyId: string) => VerifiedProperty | undefined;
    }).getCatalogProperty;

    expect(lookup).toBeTypeOf("function");
    expect(lookup?.("moscow", "moscow-ostrov")?.title).toBe("Остров");
    expect(lookup?.("spb", "moscow-ostrov")).toBeUndefined();
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

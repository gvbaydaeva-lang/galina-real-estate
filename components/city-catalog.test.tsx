import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogCity } from "../content/catalog-cities";
import { CityCatalog } from "./city-catalog";
import { PropertyCard } from "./property-card";

describe("CityCatalog", () => {
  it("renders six internal Moscow cards and explains that the selection is partial without future promises", () => {
    const moscow = getCatalogCity("moscow");

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);

    expect(markup).toContain('<label for="district-filter">Район или локация</label>');
    expect(markup).toMatch(/<option value=""(?: selected="")?>Все районы<\/option>/);
    expect(markup.match(/<article/g)).toHaveLength(6);
    expect(markup).toContain("Подборка не является исчерпывающей.");
    expect(markup).not.toMatch(/дополнительные варианты|готовятся к публикации/i);
    expect(markup).not.toMatch(/<a[^>]+href="https:\/\//);
  });

  it("keeps a factual empty state for Elista without a promise to fill it later", () => {
    const elista = getCatalogCity("elista");

    if (!elista) {
      throw new Error("Elista catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={elista} />);

    expect(markup).toContain("В этом каталоге нет опубликованных объектов.");
    expect(markup).not.toMatch(/данные уточняются|после проверки/i);
    expect(markup).not.toContain("<article");
  });
});

describe("PropertyCard", () => {
  it("shows a verified image or an honest fallback for every property", () => {
    const imageMarkup = renderToStaticMarkup(
      <PropertyCard
        property={{
          id: "moscow-image-1",
          citySlug: "moscow",
          district: "Даниловский",
          title: "С фотографией",
          dealType: "Продажа",
          verifiedAt: "2026-11-08",
          image: { src: "https://images.example.test/project.jpg", alt: "Фото ЖК «С фотографией»" },
        }}
      />,
    );
    const fallbackMarkup = renderToStaticMarkup(
      <PropertyCard
        property={{
          id: "moscow-image-2",
          citySlug: "moscow",
          district: "Даниловский",
          title: "Без фотографии",
          dealType: "Продажа",
          verifiedAt: "2026-11-08",
        }}
      />,
    );

    expect(imageMarkup).toContain('class="property-card-image"');
    expect(imageMarkup).toContain('alt="Фото ЖК «С фотографией»"');
    expect(fallbackMarkup).toContain('class="property-card-media-fallback"');
    expect(fallbackMarkup).toContain("<span>Фото проекта</span>");
    expect(fallbackMarkup).toContain("<strong>не представлено</strong>");
  });

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
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCatalogCity } from "../content/catalog-cities";
import { CityCatalog } from "./city-catalog";
import { ElistaServicePage } from "./elista-service-page";
import { PropertyCard } from "./property-card";
import CityCatalogPage from "../app/catalog/[city]/page";

describe("CityCatalog", () => {
  it("places the return link above the Moscow catalog title", () => {
    const moscow = getCatalogCity("moscow");

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);
    const backLinkPosition = markup.indexOf('href="/#catalog"');
    const eyebrowPosition = markup.indexOf("Каталог · Москва");
    const titlePosition = markup.indexOf(moscow.heading);

    expect(markup).toContain('aria-hidden="true">←</span>');
    expect(markup).toContain('aria-label="К выбору города"');
    expect(markup).not.toContain('← </span>К выбору города');
    expect(backLinkPosition).toBeGreaterThan(-1);
    expect(backLinkPosition).toBeLessThan(eyebrowPosition);
    expect(eyebrowPosition).toBeLessThan(titlePosition);
  });

  it("renders six internal Moscow cards and explains that the selection is partial", () => {
    const moscow = getCatalogCity("moscow");

    if (!moscow) {
      throw new Error("Moscow catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={moscow} />);

    expect(markup).toContain('<label for="district-filter">Район или локация</label>');
    expect(markup).toMatch(/<option value=""(?: selected="")?>Все районы<\/option>/);
    expect(markup.match(/<article/g)).toHaveLength(6);
    expect(markup).toContain("Это не полный список ЖК. Дополнительные варианты публикуются после проверки. Способы связи готовятся к публикации.");
    expect(markup).not.toMatch(/<a[^>]+href="https:\/\//);
    expect(markup).toContain('id="property-moscow-ostrov"');
    expect(markup).toContain('href="/catalog/moscow/moscow-ostrov?returnTo=%2Fcatalog%2Fmoscow%23property-moscow-ostrov"');
  });

  it("keeps the honest empty state for Elista", () => {
    const elista = getCatalogCity("elista");

    if (!elista) {
      throw new Error("Elista catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<CityCatalog city={elista} />);

    expect(markup).toContain("Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.");
    expect(markup).not.toContain("property-card");
  });

  it("renders the approved Elista service page without the empty ЖК catalog", () => {
    const elista = getCatalogCity("elista");

    if (!elista) {
      throw new Error("Elista catalog data is required for this test");
    }

    const markup = renderToStaticMarkup(<ElistaServicePage city={elista} />);

    expect(markup).toContain("Недвижимость в Элисте — покупка, продажа и сопровождение сделок");
    expect(markup).toContain('aria-label="К выбору города"');
    expect(markup).toContain("Квартиры и частные дома");
    expect(markup).toContain("Новостройки и предложения застройщиков");
    expect(markup).toContain("Земельные участки");
    expect(markup).toContain("Коммерческая недвижимость");
    expect(markup).toContain("Недвижимость под вашу задачу, а не просто список объявлений");
    expect(markup).toContain("Знакомство и задача");
    expect(markup).toContain("Подготовка к сделке");
    expect(markup).toContain("https://t.me/+79672232585");
    expect(markup).toContain("https://wa.me/79672232585");
    expect(markup).toContain("https://wa.me/79672232585?text=Здравствуйте%2C%20хочу%20обсудить%20покупку");
    expect(markup).toContain("https://wa.me/79672232585?text=Здравствуйте%2C%20хочу%20обсудить%20продажу");
    expect(markup).toContain("+7 (967) 223-25-85");
    expect(markup).not.toContain("MAX");
    expect(markup).not.toContain("district-filter");
    expect(markup).not.toContain("Данные уточняются");
    expect(markup).not.toContain("property-card");
  });

  it("connects the Elista route to the service page and keeps the calculator", async () => {
    const markup = renderToStaticMarkup(await CityCatalogPage({ params: Promise.resolve({ city: "elista" }) }));

    expect(markup).toContain("Недвижимость в Элисте — покупка, продажа и сопровождение сделок");
    expect(markup).toContain("Квартиры и частные дома");
    expect(markup).toContain("id=\"calculator-title\"");
    expect(markup).not.toContain("district-filter");
    expect(markup).not.toContain("property-card");
  });
});

describe("PropertyCard", () => {
  it("makes the whole card a link to its property page", () => {
    const markup = renderToStaticMarkup(
      <PropertyCard
        property={{
          id: "moscow-clickable-1",
          citySlug: "moscow",
          district: "Даниловский",
          title: "Кликабельный ЖК",
          dealType: "Продажа",
          verifiedAt: "2026-11-09",
          description: ["Первый подробный абзац для проверки кликабельной карточки.", "Второй подробный абзац о преимуществах проекта и его окружении."],
          highlights: ["Расположение", "Инфраструктура", "Благоустройство"],
          detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."],
          detailHighlights: ["Расположение", "Инфраструктура", "Благоустройство", "Территория", "Выбор корпуса"],
        }}
      />,
    );

    expect(markup).toMatch(/<a href="\/catalog\/moscow\/moscow-clickable-1" class="property-card-link"[^>]*><article class="property-card" id="property-moscow-clickable-1">/);
    expect(markup).toContain("Кликабельный ЖК");
    expect(markup).not.toContain("property-card-title-link");
  });

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
          description: ["Первый достаточно подробный абзац о проекте для проверки вывода в карточке.", "Второй достаточно подробный абзац о расположении и инфраструктуре проекта."],
          highlights: ["Расположение рядом с парком", "Школа и детский сад", "Закрытый двор без машин"],
          detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."],
          detailHighlights: ["Расположение", "Инфраструктура", "Благоустройство", "Территория", "Выбор корпуса"],
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
          description: ["Первый достаточно подробный абзац о проекте для проверки честной текстовой карточки.", "Второй достаточно подробный абзац о среде и вариантах повседневной жизни."],
          highlights: ["Прогулочный бульвар", "Детские площадки", "Подземный паркинг"],
          detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."],
          detailHighlights: ["Расположение", "Инфраструктура", "Благоустройство", "Территория", "Выбор корпуса"],
        }}
      />,
    );

    expect(imageMarkup).toContain('class="property-card-image"');
    expect(imageMarkup).toContain('alt="Фото ЖК «С фотографией»"');
    expect(imageMarkup).toContain("Первый достаточно подробный абзац");
    expect(imageMarkup).toContain('class="property-card-highlights"');
    expect(imageMarkup.match(/<li>/g)).toHaveLength(3);
    expect(imageMarkup).not.toContain("2026-11-08");
    expect(fallbackMarkup).toContain('class="property-card-media-fallback"');
    expect(fallbackMarkup).toContain("<span>Фото проекта</span>");
    expect(fallbackMarkup).toContain("<strong>уточняется</strong>");
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
          description: ["Первый подробный абзац о проверенном объекте без публикации служебной даты.", "Второй подробный абзац о территории и окружающей инфраструктуре объекта."],
          highlights: ["Парк в окружении", "Прогулочные маршруты", "Сервисы на территории"],
          detailDescription: ["Первый тестовый абзац страницы ЖК.", "Второй тестовый абзац страницы ЖК.", "Третий тестовый абзац страницы ЖК.", "Четвёртый тестовый абзац страницы ЖК."],
          detailHighlights: ["Расположение", "Инфраструктура", "Благоустройство", "Территория", "Выбор корпуса"],
        }}
      />,
    );

    expect(markup).toContain("Проверенный объект");
    expect(markup).toContain("Даниловский");
    expect(markup).toContain("Продажа");
    expect(markup).not.toContain("2026-11-04");
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain("Цена");
  });
});

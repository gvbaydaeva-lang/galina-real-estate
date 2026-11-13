import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("PropertyDetailPage", () => {
  it("renders a distinct demo floor-plan gallery for every Krasnodar property", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");
    const krasnodarPropertyIds = [
      "krasnodar-park-pobedy-3",
      "krasnodar-grade",
      "krasnodar-reeds",
      "krasnodar-record-2",
      "krasnodar-samolet-7",
      "krasnodar-dogma-park",
    ];

    const markups = await Promise.all(krasnodarPropertyIds.map((property) => PropertyDetailPage({
      params: Promise.resolve({ city: "krasnodar", property }),
    }).then(renderToStaticMarkup)));

    for (const markup of markups) {
      expect(markup).toContain("Галерея планировок");
      expect(markup).toContain("Демонстрационные данные");
      expect(markup).toContain("Это не актуальные предложения застройщика");
      expect(markup).not.toContain("евродвушка");
      expect(markup).not.toContain("семейная</span>");
      expect(markup).not.toContain("Планировка создана как пример");
      expect(markup).toContain('class="floor-plan-gallery-grid"');
      expect(markup.match(/class="floor-plan-card"/g)).toHaveLength(3);
      expect(markup).toContain("Открыть планировку");
    }

    expect(new Set(markups.map((markup) => markup.match(/data-plan-variant="([^"]+)"/g)?.join("|") ?? "")).size).toBe(6);
  });

  it("does not add Krasnodar demo galleries to the Moscow Ostrov page", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");
    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "moscow", property: "moscow-ostrov" }),
    }));

    expect(markup).not.toContain("Демонстрационные значения");
    expect(markup).not.toContain('class="floor-plan-gallery-grid"');
  });

  it("renders the verified project image and catalog information", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");

    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "moscow", property: "moscow-ostrov" }),
    }));

    expect(markup).toContain("Остров");
    expect(markup).toContain('class="property-detail-image"');
    expect(markup).toContain('alt="Фото ЖК «Остров»"');
    expect(markup).toContain("Хорошёво-Мнёвники");
    expect(markup).toContain("Жилой квартал");
    expect(markup).not.toContain("Застройщик");
    expect(markup).toContain("Жизнь у воды задаёт особый ритм");
    expect(markup).not.toContain("Внутри одного проекта проект развивает кварталы разных форматов");
    expect(markup).toContain("Локация у Москвы-реки");
    expect(markup).toContain("Расположение и преимущества ЖК „Остров“");
    expect(markup).toContain("Какие квартиры представлены в ЖК „Остров“");
    expect(markup).toContain("Москва-река");
    expect(markup).toContain("Прогулочные пространства");
    expect(markup).toContain("Кварталы разных форматов");
    expect(markup).toContain("Школа и детский сад в проекте");
    expect(markup).toContain("1-комн.");
    expect(markup).toContain("Площадь от");
    expect(markup).toContain("Стоимость от");
    expect(markup).toContain("от 39 м²");
    expect(markup).toContain("от 30 млн ₽");
    expect(markup).toContain("от 43 млн ₽");
    expect(markup).toContain("от 54 млн ₽");
    expect(markup).toContain("от 101 м²");
    expect(markup).toContain("от 73 млн ₽");
    expect(markup).toContain("5-комн.");
    expect(markup).toContain("от 139 м²");
    expect(markup).toContain("от 92 млн ₽");
    expect(markup).toContain("Получить планировки и цены");
    expect(markup).toContain("Галерея планировок");
    expect(markup).toContain("1-комн. · 39 м²");
    expect(markup).toContain("2-комн. · 58,4 м²");
    expect(markup).toContain("2-комн. · 65,5 м²");
    expect(markup).toContain("/hydra/svg/apartment/28/ostrov-14/b1/b1-s2-f2-p16.svg");
    expect(markup).toContain("/hydra/svg/apartment/28/ostrov-14/b1/b1-s1-f2-p14.svg");
    expect(markup).toContain("/hydra/svg/apartment/28/ostrov-12/b2/b2-f2-p2.svg");
    expect(markup).not.toContain("Смотреть планировки на сайте");
    expect(markup).toContain("Корпуса и сроки сдачи");
    expect(markup).toContain("Ипотека и способы покупки");
    expect(markup).toContain("Заявка на подбор квартиры");
    expect(markup).toContain("Проект развивается поэтапно");
    expect(markup).toContain("Часть кварталов уже сдана");
    expect(markup).toContain("Статус и сроки конкретного корпуса уточняются при подборе");
    expect(markup).not.toContain("Подтверждённые планировки не размещены");
    expect(markup).not.toContain("Стоимость проверена 13.11.2026");
    expect(markup).not.toContain("права на их размещение отдельно не проверялись");
    expect(markup).not.toContain("Ссылки на планировки и демонстрационные квартиры не показываем");
    expect(markup).not.toContain("Доступность конкретных квартир, актуальные планировки и стоимость уточняются при подборе");
    expect(markup).toContain('href="/catalog/moscow"');
    expect(markup).toContain('aria-label="Вернуться в каталог: Москва"');
    expect(markup).not.toContain("Вернуться к каталогу Москва");
    expect(markup.indexOf('href="/catalog/moscow"')).toBeLessThan(markup.indexOf("Каталог · Москва"));
  });

  it("does not add Ostrov-only sales sections to another property", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");

    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "moscow", property: "moscow-zilart" }),
    }));

    expect(markup).toContain("Заявка на подбор квартиры");
    expect(markup).toContain('id="property-inquiry"');
    expect(markup).toContain('name="propertyId"');
    expect(markup).toContain('value="moscow-zilart"');
  });

  it("renders the common inquiry anchor for a Krasnodar property", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");

    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "krasnodar", property: "krasnodar-grade" }),
    }));

    expect(markup).toContain('id="property-inquiry"');
    expect(markup).toContain("Заявка на подбор квартиры");
    expect(markup).toContain('value="ГРЕЙД"');
    expect(markup).toContain('value="Краснодар"');
  });

  it("uses the verified ZILART project photograph", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");

    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "moscow", property: "moscow-zilart" }),
    }));

    expect(markup).toContain('class="property-detail-image"');
    expect(markup).toContain('alt="Фото ЖК «ЗИЛАРТ»"');
    expect(markup).not.toContain("Фото проекта уточняется");
  });

  it("keeps the project photo compact and separates the information block", () => {
    const stylesheet = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

    expect(stylesheet).toContain(".property-detail{width:min(100% - 3rem,760px)");
    expect(stylesheet).toContain(".property-detail-image,.property-detail-media-fallback{display:block;width:100%;max-height:360px");
    expect(stylesheet).toContain(".property-detail-information{margin:2rem 0;padding:1.5rem;background:var(--mist)");
  });
});

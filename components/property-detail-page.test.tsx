import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("PropertyDetailPage", () => {
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
    expect(markup).toContain("Жизнь у воды задаёт особый ритм");
    expect(markup).not.toContain("Внутри одного проекта проект развивает кварталы разных форматов");
    expect(markup).toContain("Локация у Москвы-реки");
    expect(markup).not.toContain("Дата проверки сведений");
    expect(markup).not.toContain("2026-11-08");
    expect(markup).toContain('href="/catalog/moscow"');
  });

  it("keeps a clear no-photo notice instead of a different project's photograph", async () => {
    const { default: PropertyDetailPage } = await import("../app/catalog/[city]/[property]/page");

    const markup = renderToStaticMarkup(await PropertyDetailPage({
      params: Promise.resolve({ city: "moscow", property: "moscow-zilart" }),
    }));

    expect(markup).toContain('class="property-detail-media-fallback"');
    expect(markup).toContain("Фото проекта уточняется");
    expect(markup).not.toContain("<img");
  });

  it("keeps the project photo compact and separates the information block", () => {
    const stylesheet = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

    expect(stylesheet).toContain(".property-detail{width:min(100% - 3rem,760px)");
    expect(stylesheet).toContain(".property-detail-image,.property-detail-media-fallback{display:block;width:100%;max-height:360px");
    expect(stylesheet).toContain(".property-detail-information{margin:2rem 0;padding:1.5rem;background:var(--mist)");
  });
});

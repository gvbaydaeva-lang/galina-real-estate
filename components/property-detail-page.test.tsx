import { renderToStaticMarkup } from "react-dom/server";
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
});

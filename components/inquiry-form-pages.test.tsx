import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CityCatalogPage from "@/app/catalog/[city]/page";
import ServicesPage from "@/app/services/page";

describe("personal-data form boundary", () => {
  it("does not offer an inquiry form on city catalog pages", async () => {
    const cities = ["moscow", "spb", "krasnodar", "elista"];
    const pages = await Promise.all(cities.map(async (city) => renderToStaticMarkup(await CityCatalogPage({ params: Promise.resolve({ city }) }))));

    expect(pages).toHaveLength(4);
    for (const page of pages) {
      expect(page).not.toContain("Обсудим ваш запрос.");
      expect(page).not.toContain("inquiry-section");
    }
  });

  it("keeps personal-data forms out of unrelated pages", () => {
    const services = renderToStaticMarkup(<ServicesPage />);

    expect(services).not.toContain("Обсудим ваш запрос.");
    expect(services).not.toContain("inquiry-section");
  });
});

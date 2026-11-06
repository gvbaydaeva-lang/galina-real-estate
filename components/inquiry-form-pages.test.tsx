import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CityCatalogPage from "@/app/catalog/[city]/page";
import ContactsPage from "@/app/contacts/page";
import ServicesPage from "@/app/services/page";

describe("inquiry form placement", () => {
  it("renders the shared form on every requested city page", async () => {
    const cities = ["moscow", "spb", "krasnodar", "elista"];
    const pages = await Promise.all(cities.map(async (city) => renderToStaticMarkup(await CityCatalogPage({ params: Promise.resolve({ city }) }))));

    expect(pages).toHaveLength(4);
    for (const page of pages) expect(page).toContain("Обсудим ваш запрос.");
  });

  it("renders the shared form on services and contacts", () => {
    expect(renderToStaticMarkup(<ServicesPage />)).toContain("Обсудим ваш запрос.");
    expect(renderToStaticMarkup(<ContactsPage />)).toContain("Обсудим ваш запрос.");
  });
});

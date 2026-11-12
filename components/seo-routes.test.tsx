import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home, { metadata as homeMetadata } from "@/app/page";
import ServicesPage, { metadata as servicesMetadata } from "@/app/services/page";
import FaqPage, { metadata as faqMetadata } from "@/app/faq/page";
import ContactsPage, { metadata as contactsMetadata } from "@/app/contacts/page";
import MortgageCalculatorPage, { metadata as calculatorMetadata } from "@/app/mortgage-calculator/page";
import MortgageProgramsPage, { metadata as programsMetadata } from "@/app/mortgage-programs/page";
import MortgageProgramArticlePage, { generateMetadata as articleMetadata } from "@/app/mortgage-programs/[slug]/page";
import CityCatalogPage, { generateMetadata as cityMetadata } from "@/app/catalog/[city]/page";
import PropertyDetailPage, { generateMetadata as propertyMetadata } from "@/app/catalog/[city]/[property]/page";
import NotFound, { metadata as notFoundMetadata } from "@/app/not-found";
import { catalogCities } from "@/content/catalog-cities";
import { mortgagePrograms } from "@/content/mortgage-programs";

type RouteAudit = { path: string; markup: string; title: string; description: string };

function getTextMetadata(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "absolute" in value && typeof value.absolute === "string") return value.absolute;
  return "";
}

async function getRoutes(): Promise<RouteAudit[]> {
  const baseRoutes: RouteAudit[] = [
    { path: "/", markup: renderToStaticMarkup(<Home />), title: getTextMetadata(homeMetadata.title), description: homeMetadata.description ?? "" },
    { path: "/services", markup: renderToStaticMarkup(<ServicesPage />), title: getTextMetadata(servicesMetadata.title), description: servicesMetadata.description ?? "" },
    { path: "/faq", markup: renderToStaticMarkup(<FaqPage />), title: getTextMetadata(faqMetadata.title), description: faqMetadata.description ?? "" },
    { path: "/contacts", markup: renderToStaticMarkup(<ContactsPage />), title: getTextMetadata(contactsMetadata.title), description: contactsMetadata.description ?? "" },
    { path: "/mortgage-calculator", markup: renderToStaticMarkup(<MortgageCalculatorPage />), title: getTextMetadata(calculatorMetadata.title), description: calculatorMetadata.description ?? "" },
    { path: "/mortgage-programs", markup: renderToStaticMarkup(<MortgageProgramsPage />), title: getTextMetadata(programsMetadata.title), description: programsMetadata.description ?? "" },
  ];
  const articles = await Promise.all(mortgagePrograms.map(async ({ slug }) => {
    const metadata = await articleMetadata({ params: Promise.resolve({ slug }) });
    return { path: `/mortgage-programs/${slug}`, markup: renderToStaticMarkup(await MortgageProgramArticlePage({ params: Promise.resolve({ slug }) })), title: getTextMetadata(metadata.title), description: metadata.description ?? "" };
  }));
  const cities = await Promise.all(catalogCities.map(async ({ slug }) => {
    const metadata = await cityMetadata({ params: Promise.resolve({ city: slug }) });
    return { path: `/catalog/${slug}`, markup: renderToStaticMarkup(await CityCatalogPage({ params: Promise.resolve({ city: slug }) })), title: getTextMetadata(metadata.title), description: metadata.description ?? "" };
  }));
  const properties = await Promise.all(catalogCities.flatMap((city) => city.properties.map(async (property) => {
    const metadata = await propertyMetadata({ params: Promise.resolve({ city: city.slug, property: property.id }) });
    return { path: `/catalog/${city.slug}/${property.id}`, markup: renderToStaticMarkup(await PropertyDetailPage({ params: Promise.resolve({ city: city.slug, property: property.id }) })), title: getTextMetadata(metadata.title), description: metadata.description ?? "" };
  })));
  return [...baseRoutes, ...articles, ...cities, ...properties];
}

describe("published SEO routes", () => {
  it("renders the full mortgage article content with emphasis and consultation CTA", async () => {
    const markup = renderToStaticMarkup(await MortgageProgramArticlePage({ params: Promise.resolve({ slug: "state-supported-mortgage" }) }));

    expect(markup).toContain("Как приобрести жильё на специальных условиях и не упустить важные ограничения");
    expect((markup.match(/<h2(?:\s|>)/g) ?? []).length).toBe(5);
    expect(markup).toContain("Универсальной льготной ипотеки для всех покупателей сейчас нет");
    expect(markup).toContain("<strong>Льготная ставка — не единственный показатель выгоды.</strong>");
    expect(markup).toContain("Хотите понять, доступна ли вам господдержка?");
  });

  it("gives every indexable route one H1 and unique metadata", async () => {
    const routes = await getRoutes();
    expect(routes).toHaveLength(36);
    expect(routes.every((route) => route.title.length > 0 && route.description.length > 0)).toBe(true);
    expect(new Set(routes.map((route) => route.title)).size).toBe(routes.length);
    expect(new Set(routes.map((route) => route.description)).size).toBe(routes.length);
    for (const route of routes) expect((route.markup.match(/<h1(?:\s|>)/g) ?? []).length).toBe(1);
  });

  it("links only to published internal routes", async () => {
    const routes = await getRoutes();
    const publishedPaths = new Set(routes.map((route) => route.path));
    for (const route of routes) for (const href of [...route.markup.matchAll(/href="([^"]+)"/g)].map((match) => match[1])) {
      if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) continue;
      const path = href.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
      if (path.startsWith("/images/")) continue;
      expect(publishedPaths.has(path)).toBe(true);
    }
  });

  it("marks the 404 page as non-indexable and describes it", () => {
    expect(notFoundMetadata.robots).toEqual({ index: false, follow: false });
    expect(notFoundMetadata.description).toBeTruthy();
    expect((renderToStaticMarkup(<NotFound />).match(/<h1(?:\s|>)/g) ?? []).length).toBe(1);
  });
});

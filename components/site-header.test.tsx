// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/galina-real-estate/",
}));

vi.mock("@/components/site-link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("SiteHeader", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    vi.resetModules();
  });

  it("renders exactly six shared top-level navigation items on every page", async () => {
    const { SiteHeader } = await import("./site-header");
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Главная");
    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Недвижимость");
    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Услуги");
    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Ипотека");
    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Обо мне");
    expect(markup.match(/<nav id="site-navigation"[\s\S]*?<\/nav>/)?.[0]).toContain("Контакты");
    expect(markup).not.toContain(">Вопросы<");
    expect(markup).toContain("Открыть контакты");
  });

  it("opens real estate choices without navigating to a default city", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);

    const realEstateButton = screen.getByRole("button", { name: "Недвижимость" });
    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(realEstateButton);

    expect(realEstateButton.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "Москва" }).getAttribute("href")).toBe("/catalog/moscow");
    expect(screen.getByRole("link", { name: "Санкт-Петербург" }).getAttribute("href")).toBe("/catalog/spb");
    expect(screen.getByRole("link", { name: "Краснодар" }).getAttribute("href")).toBe("/catalog/krasnodar");
    expect(screen.getByRole("link", { name: "Жилая, коммерческая недвижимость и земельные участки" }).getAttribute("href")).toBe("/catalog/elista");
  });

  it("closes the open city choices with Escape and restores focus", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);
    const realEstateButton = screen.getByRole("button", { name: "Недвижимость" });

    fireEvent.click(realEstateButton);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(realEstateButton);
  });
});

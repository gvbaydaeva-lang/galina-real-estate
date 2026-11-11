// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigationState = vi.hoisted(() => ({ currentPath: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.currentPath,
}));

vi.mock("@/components/site-link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("SiteHeader", () => {
  afterEach(cleanup);

  beforeEach(() => {
    navigationState.currentPath = "/";
    vi.resetModules();
  });

  it("renders the same six main navigation items in the required order", async () => {
    const { SiteHeader } = await import("./site-header");
    const labels = [">Главная<", ">Услуги<", ">Недвижимость <", ">Ипотека<", ">Обо мне<", ">Контакты<"];

    for (const path of ["/", "/services.html"]) {
      navigationState.currentPath = path;
      const markup = renderToStaticMarkup(<SiteHeader />);
      const positions = labels.map((label) => markup.indexOf(label));

      expect(positions.every((position, index) => position >= 0 && (index === 0 || position > positions[index - 1]))).toBe(true);
      expect(markup.match(/aria-label="Основная навигация"/g)).toHaveLength(1);
      expect(markup).toContain('href="/"');
      expect(markup).toContain('href="/services"');
      expect(markup).toContain('href="/#about"');
      expect(markup).toContain('href="/mortgage-programs"');
      expect(markup).toContain('href="/contacts"');
      expect(markup).not.toContain('href="/faq"');
      const triggerMarkup = markup.slice(markup.indexOf("nav-dropdown-trigger"), markup.indexOf("</button>"));
      expect(triggerMarkup).not.toContain("href=");
    }
  });

  it("provides grouped city links without making the real-estate parent a city link", async () => {
    const { SiteHeader } = await import("./site-header");
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup).toContain("Новостройки");
    expect(markup).toContain("Вторичная недвижимость");
    expect(markup).toContain('href="/catalog/moscow"');
    expect(markup).toContain('href="/catalog/spb"');
    expect(markup).toContain('href="/catalog/krasnodar"');
    expect(markup).toContain('href="/catalog/elista"');
    expect(markup).toContain('aria-controls="real-estate-menu"');
  });

  it("opens and closes the real-estate menu with the keyboard", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);
    const realEstateButton = screen.getByRole("button", { name: "Недвижимость" });

    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(realEstateButton);
    expect(realEstateButton.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(realEstateButton, { key: "Escape" });
    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(realEstateButton);
  });

  it("closes the mobile menu after a main navigation link is activated", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);
    const menuToggle = screen.getByRole("button", { name: /Меню/ });

    fireEvent.click(menuToggle);
    expect(menuToggle.getAttribute("aria-expanded")).toBe("true");
    const contactsLink = screen.getByRole("link", { name: "Контакты" });
    contactsLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(contactsLink);
    expect(menuToggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes the mobile menu and returns focus to its toggle on Escape", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);
    const menuToggle = screen.getByRole("button", { name: /Меню/ });
    const realEstateButton = screen.getByRole("button", { name: "Недвижимость" });

    fireEvent.click(menuToggle);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(menuToggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(menuToggle);

    fireEvent.click(menuToggle);
    fireEvent.click(realEstateButton);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(menuToggle.getAttribute("aria-expanded")).toBe("false");
    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(menuToggle);
  });

  it("closes the city list after a city link is activated", async () => {
    const { SiteHeader } = await import("./site-header");
    render(<SiteHeader />);
    const realEstateButton = screen.getByRole("button", { name: "Недвижимость" });

    fireEvent.click(realEstateButton);
    const moscowLink = screen.getByRole("link", { name: "Москва" });
    moscowLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(moscowLink);

    expect(realEstateButton.getAttribute("aria-expanded")).toBe("false");
  });
});

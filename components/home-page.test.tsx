import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("homepage about section", () => {
  it("presents two supplied photos in the hero and about sections", async () => {
    const { default: Home } = await import("@/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Обо мне");
    expect(markup).toContain("5 лет");
    expect(markup).toContain("/images/broker/galina-portrait-laptop.jpg");
    expect(markup).toContain("/images/broker/galina-portrait-vest.jpg");
    expect(markup).not.toContain("/images/broker/galina-business-card.jpg");
    expect(markup).not.toContain("/images/broker/galina-portrait-window.jpg");
    expect(markup).not.toContain("Галина Санджиева</span>");
    expect(markup).toContain('href="/contacts"');
  });
});

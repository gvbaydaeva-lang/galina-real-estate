import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const footerState = vi.hoisted(() => ({ pathname: "/services.html" }));

vi.mock("next/navigation", () => ({
  usePathname: () => footerState.pathname,
}));

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("SiteFooter", () => {
  it("keeps the FAQ link available on internal pages", async () => {
    footerState.pathname = "/services.html";
    const { SiteFooter } = await import("./site-footer");
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain('href="/faq"');
    expect(markup).toContain("FAQ");
  });

  it("keeps FAQ and the city-selection link on the homepage", async () => {
    footerState.pathname = "/";
    const { SiteFooter } = await import("./site-footer");
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain('href="/faq"');
    expect(markup).toContain('href="/#catalog"');
  });
});

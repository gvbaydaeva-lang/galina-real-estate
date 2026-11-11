import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/services.html",
}));

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("SiteFooter", () => {
  it("keeps the FAQ link available on internal pages", async () => {
    const { SiteFooter } = await import("./site-footer");
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain('href="/faq"');
    expect(markup).toContain("FAQ");
  });
});

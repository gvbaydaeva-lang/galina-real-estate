import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/galina-real-estate/",
}));

vi.mock("@/components/site-link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders every main navigation item as a browser-native link", async () => {
    const { SiteHeader } = await import("./site-header");
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup).toContain('href="/"');
    expect(markup).toContain('href="/services"');
    expect(markup).toContain('href="/mortgage-programs"');
    expect(markup).toContain('href="/faq"');
    expect(markup).toContain('href="/contacts"');
  });
});

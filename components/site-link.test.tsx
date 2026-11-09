import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a data-client-navigation="true" {...props}>{children}</a>
  ),
}));

describe("SiteLink", () => {
  it("renders a browser-native anchor so static Pages navigation is not intercepted", async () => {
    const { default: SiteLink } = await import("./site-link");

    const markup = renderToStaticMarkup(<SiteLink href="/catalog/moscow">Москва</SiteLink>);

    expect(markup).toContain('href="/catalog/moscow"');
    expect(markup).not.toContain("data-client-navigation");
  });
});

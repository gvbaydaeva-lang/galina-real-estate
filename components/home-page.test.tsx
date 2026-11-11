import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("homepage about section", () => {
  it("presents the broker experience and a future photo placeholder", async () => {
    const { default: Home } = await import("@/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Обо мне");
    expect(markup).toContain("5 лет");
    expect(markup).toContain("Фото появится позже");
    expect(markup).toContain('href="/contacts"');
  });
});

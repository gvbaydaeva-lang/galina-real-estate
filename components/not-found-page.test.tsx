import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("keeps only the top return arrow", () => {
    const markup = renderToStaticMarkup(<NotFound />);

    expect(markup).toContain('class="back-navigation"');
    expect(markup).toContain('aria-label="На главную"');
    expect(markup).not.toContain('class="button button-primary"');
  });
});

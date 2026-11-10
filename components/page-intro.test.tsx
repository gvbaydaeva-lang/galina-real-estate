import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageIntro } from "./page-intro";

describe("PageIntro", () => {
  it("places the back navigation before the section label and page title", () => {
    const markup = renderToStaticMarkup(
      <PageIntro backHref="/" backLabel="На главную" eyebrow="Раздел" title="Заголовок">
        <p>Текст страницы.</p>
      </PageIntro>,
    );

    const backLinkPosition = markup.indexOf('href="/"');
    const eyebrowPosition = markup.indexOf("Раздел");
    const titlePosition = markup.indexOf("Заголовок");

    expect(markup).toContain('aria-hidden="true">←</span>');
    expect(markup).toContain('aria-label="На главную"');
    expect(markup).not.toContain('← </span>На главную');
    expect(backLinkPosition).toBeGreaterThan(-1);
    expect(backLinkPosition).toBeLessThan(eyebrowPosition);
    expect(eyebrowPosition).toBeLessThan(titlePosition);
  });
});

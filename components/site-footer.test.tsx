import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

describe("SiteFooter", () => {
  it("renders only the fixed copyright and approved partner credit", async () => {
    const { SiteFooter } = await import("./site-footer");
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain("© 2026 Галина Санджиева");
    expect(markup).toContain("Сделано при поддержке Центра «Мой бизнес» Республики Калмыкия");
    expect(markup).toContain('src="/images/partners/my-business-kalmykia.png"');
    expect(markup).toContain('alt="Логотип «Мой бизнес» Республики Калмыкия"');
    expect(markup).not.toContain("<nav");
    expect(markup).not.toContain("Услуги");
    expect(markup).not.toContain("Контакты");
  });
});

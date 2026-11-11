import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactsPage, { metadata } from "@/app/contacts/page";

describe("ContactsPage", () => {
  it("renders the five PDF sections in order with the confirmed contact links", () => {
    const markup = renderToStaticMarkup(<ContactsPage />);
    const sections = [...markup.matchAll(/<section[^>]*data-contact-section="([^"]+)"/g)].map((match) => match[1]);

    expect(sections).toEqual(["channels", "inquiry", "geography", "closing"]);
    expect(markup).toContain("Давайте обсудим ваш вопрос по недвижимости");
    expect(markup).toContain('href="https://t.me/+79672232585"');
    expect(markup).toContain('href="https://wa.me/79672232585"');
    expect(markup).toContain('href="tel:+79672232585"');
    expect(markup).toContain("Найти в MAX по номеру +7 (967) 223-25-85");
    expect(markup).not.toMatch(/href="[^"]*max\.ru/i);
  });

  it("uses the PDF SEO metadata and removes the former placeholders", () => {
    const markup = renderToStaticMarkup(<ContactsPage />);

    expect(metadata.title).toBe("Контакты Галины Санджиевой — брокер по недвижимости");
    expect(metadata.description).toContain("подбор новостроек в Москве");
    expect(markup).not.toContain("Способы связи готовятся к публикации");
    expect(markup).not.toContain("сайт не принимает обращения");
  });
});

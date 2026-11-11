import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("homepage about section", () => {
  it("renders the supplied homepage copy and photos", async () => {
    const { default: Home } = await import("@/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Давайте знакомиться");
    expect(markup).toContain("Помогу выбрать и купить квартиру в новостройке — с учётом ваших целей и бюджета");
    expect(markup).toContain("Покупка квартиры без лишней неопределённости");
    expect(markup).toContain("Меня зовут Галина Санджиева. Я специалист по недвижимости и ипотечным решениям.");
    expect(markup).toContain("Какая ипотечная программа подойдёт именно вам?");
    expect(markup).toContain("Есть вопрос о покупке квартиры?");
    expect(markup).toContain("Сейчас раздел контактов обновляется. Здесь появятся актуальные способы связи с Галиной Санджиевой.");
    expect(markup).toContain("/images/broker/galina-portrait-laptop.jpg");
    expect(markup).toContain("/images/broker/galina-portrait-vest.jpg");
    expect(markup).not.toContain("/images/broker/galina-business-card.jpg");
    expect(markup).not.toContain("/images/broker/galina-portrait-window.jpg");
    expect(markup).not.toContain("Покупка новостройки —");
    expect(markup).toContain('href="/contacts"');
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("services page copy", () => {
  it("renders the six supplied service stages", async () => {
    const { default: ServicesPage } = await import("@/app/services/page");
    const markup = renderToStaticMarkup(<ServicesPage />);

    expect(markup).toContain("От запроса до покупки");
    expect(markup).toContain("Покупка квартиры без лишней неопределённости");
    expect(markup).toContain("Помогаю пройти путь от первой идеи до подготовки к сделке: разобраться с запросом, оценить бюджет, сравнить подходящие объекты и увидеть важные нюансы заранее.");
    expect(markup).toContain("На каждом этапе вы понимаете, что происходит и какое решение предстоит принять.");
    expect(markup).toContain("Знакомство и ваши цели");
    expect(markup).toContain("Подбор новостроек");
    expect(markup).toContain("Сравнение вариантов");
    expect(markup).toContain("Ипотека и бюджет");
    expect(markup).toContain("Подготовка к сделке");
    expect(markup).toContain("Решение и следующие шаги");
    expect(markup).not.toContain("Понятный путь к покупке.");
    expect(markup).not.toContain("Разобрать задачу и критерии поиска");
  });
});

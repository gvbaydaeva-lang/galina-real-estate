import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/site-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe("services page copy", () => {
  it("renders all six PDF sections in order", async () => {
    const { default: ServicesPage } = await import("@/app/services/page");
    const markup = renderToStaticMarkup(<ServicesPage />);

    const sectionOrder = [
      "Подбор новостроек и сопровождение сделок с недвижимостью",
      "С чем я могу помочь",
      "Зачем обращаться к независимому брокеру",
      "Почему подбор новостроек бесплатный",
      "Как строится работа",
      "Завершающий блок",
    ];

    expect(sectionOrder.every((heading, index) => markup.indexOf(heading) > (index ? markup.indexOf(sectionOrder[index - 1]) : -1))).toBe(true);
    expect(markup).toContain("Помогаю выбрать и приобрести квартиру в новостройке Москвы, Санкт-Петербурга или Краснодара, а также купить или продать вторичное жильё в Элисте.");
    expect(markup).toContain("Подбор и сопровождение покупки новостройки для покупателя бесплатны");
    expect(markup).toContain("услуги по покупке и продаже вторичного жилья в Элисте обсуждаются и оплачиваются на индивидуальных условиях");
    expect(markup).toContain("Шаг 5. Завершение покупки или продажи");
    expect(markup).toContain("Галина Санджиева — независимый брокер по недвижимости.");
  });

  it("uses only existing destinations for the PDF calls to action", async () => {
    const { default: ServicesPage } = await import("@/app/services/page");
    const markup = renderToStaticMarkup(<ServicesPage />);

    expect(markup).toContain('href="/catalog/moscow"');
    expect(markup).toContain('href="/catalog/elista"');
    expect(markup).toContain('href="/contacts"');
    expect(markup).toContain('href="/mortgage-programs"');
    expect(markup).not.toContain('href="#"');
  });
});

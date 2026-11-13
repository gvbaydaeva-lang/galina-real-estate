import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

describe("homepage about section", () => {
  it("scopes the Modern Estate redesign to the homepage root", async () => {
    const { default: Home } = await import("@/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('<main class="home-modern-estate">');
  });

  it("renders the supplied homepage copy and photos", async () => {
    const { default: Home } = await import("@/app/page");
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Давайте знакомиться");
    expect(markup).toContain("Помогу выбрать и купить квартиру в новостройке — с учётом ваших целей и бюджета");
    expect(markup).toContain("Покупка квартиры без лишней неопределённости");
    expect(markup).toContain("Меня зовут Галина Санджиева. Я специалист по недвижимости и ипотечным решениям.");
    expect(markup).toContain("5 лет");
    expect(markup).toContain("опыта в недвижимости");
    expect(markup).toContain("Десятки");
    expect(markup).toContain("довольных клиентов");
    expect(markup).toContain("Помогу разобраться с ипотекой и выбрать подходящую программу");
    expect(markup).toContain("Семейная ипотека, льготные программы и предложения банков — помогу сравнить условия, рассчитать платёж и подготовиться к оформлению");
    expect(markup).toContain('href="/mortgage-programs.html"');
    expect(markup).toContain('href="/#catalog"');
    expect(markup).toContain("Обсудим вашу задачу по недвижимости?");
    expect(markup).toContain("Планируете купить квартиру, продать недвижимость или подобрать ипотеку? Напишите мне — помогу разобраться и подскажу, с чего начать");
    expect(markup).toContain('href="https://t.me/+79672232585"');
    expect(markup).toContain('href="https://wa.me/79672232585"');
    expect(markup).toContain('href="https://max.ru/u/f9LHodD0cOLWgzDAA5lrM2Ptyrkv_1cTxLcSy2p4Y0BNniYt_Ur2D-cpTTY"');
    expect(markup).toContain("Написать в MAX");
    expect(markup).not.toContain("Галина Санджиева · Брокер по недвижимости");
    expect(markup).toContain("Покупка и продажа вторичного жилья");
    expect(markup).toContain("Смотреть вторичное жильё");
    expect(markup).toContain("Смотреть новостройки");
    expect(markup).not.toContain("Сейчас раздел контактов обновляется");
    expect(markup).toContain("/images/broker/galina-portrait-laptop.jpg");
    expect(markup).toContain("/images/broker/galina-portrait-vest.jpg");
    expect(markup).not.toContain("/images/broker/galina-business-card.jpg");
    expect(markup).not.toContain("/images/broker/galina-portrait-window.jpg");
    expect(markup).not.toContain("Покупка новостройки —");
    expect(markup).toContain('href="/contacts.html"');
    expect(markup).toContain("Часто задаваемые вопросы");
    expect(markup).toContain("Действительно ли подбор новостройки бесплатный?");
    expect(markup).toContain('href="/faq.html"');
  });
});

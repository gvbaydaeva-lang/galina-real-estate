// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { InquiryForm } from "./inquiry-form";

describe("InquiryForm", () => {
  afterEach(cleanup);

  it("uses stable field identifiers for server and browser rendering", () => {
    const markup = renderToStaticMarkup(<InquiryForm context="на странице услуг" />);

    expect(markup).toContain('id="inquiry-name"');
    expect(markup).toContain('for="inquiry-name"');
  });

  it("pre-fills the selected project and carries structured project context", () => {
    const markup = renderToStaticMarkup(<InquiryForm context={{
      source: "страница ЖК",
      propertyId: "moscow-ostrov",
      propertyName: "Остров",
      city: "Москва",
      apartmentType: "",
    }} />);

    expect(markup).toContain('value="Остров"');
    expect(markup).toContain('name="propertyId"');
    expect(markup).toContain('value="moscow-ostrov"');
    expect(markup).toContain('name="city"');
    expect(markup).toContain('value="Москва"');
    expect(markup).toContain('name="comment"');
    expect(markup).toContain("данные не отправляются");
  });

  it("supports a neutral public copy for the Ostrov detail page", () => {
    const markup = renderToStaticMarkup(<InquiryForm publicCopy context={{
      source: "страница ЖК",
      propertyId: "moscow-ostrov",
      propertyName: "Остров",
      city: "Москва",
      apartmentType: "",
    }} />);

    expect(markup).toContain("Укажите контакты и пожелания по квартире в форме ниже.");
    expect(markup).toContain("Запрос по ЖК «Остров».");
    expect(markup).not.toContain("канал связи ещё не подключён");
    expect(markup).not.toContain("форма работает только в браузере");
  });

  it("keeps form controls unavailable in static markup before the browser handler is ready", () => {
    const markup = renderToStaticMarkup(<InquiryForm context="на странице услуг" />);
    const container = document.createElement("div");
    container.innerHTML = markup;

    expect(container.querySelector("#inquiry-name")?.hasAttribute("disabled")).toBe(true);
    expect(container.querySelector("#inquiry-phone")?.hasAttribute("disabled")).toBe(true);
    expect(container.querySelector("#inquiry-contact-method")?.hasAttribute("disabled")).toBe(true);
    expect(container.querySelector("#inquiry-consent")?.hasAttribute("disabled")).toBe(true);
    expect(container.querySelector('button[type="submit"]')?.hasAttribute("disabled")).toBe(true);
  });

  it("enables the controls after the browser handler hydrates", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<InquiryForm context="на странице услуг" />);
    document.body.appendChild(container);

    await act(async () => {
      hydrateRoot(container, <InquiryForm context="на странице услуг" />);
      await Promise.resolve();
    });

    expect(container.querySelector("#inquiry-name")?.hasAttribute("disabled")).toBe(false);
    expect(container.querySelector("#inquiry-phone")?.hasAttribute("disabled")).toBe(false);
    expect(container.querySelector("#inquiry-contact-method")?.hasAttribute("disabled")).toBe(false);
    expect(container.querySelector("#inquiry-consent")?.hasAttribute("disabled")).toBe(false);
    expect(container.querySelector('button[type="submit"]')?.hasAttribute("disabled")).toBe(false);
    container.remove();
  });

  it("shows understandable errors when required fields and consent are missing", () => {
    render(<InquiryForm context="на странице услуг" />);

    fireEvent.click(screen.getByRole("button", { name: "Оставить заявку" }));

    expect(screen.getByText("Укажите имя.")).toBeTruthy();
    expect(screen.getByText("Укажите телефон.")).toBeTruthy();
    expect(screen.getByText("Выберите удобный способ связи.")).toBeTruthy();
    expect(screen.getByText("Подтвердите согласие на обработку персональных данных.")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toBe("Проверьте обязательные поля формы.");
    expect(screen.getAllByRole("alert")).toHaveLength(1);
  });

  it("requires consent before showing the disconnected-channel message", () => {
    render(<InquiryForm context="на странице услуг" />);

    fireEvent.change(screen.getByLabelText("Имя"), { target: { value: "Анна" } });
    fireEvent.change(screen.getByLabelText("Телефон"), { target: { value: "+7 900 000-00-00" } });
    fireEvent.change(screen.getByLabelText("Удобный способ связи"), { target: { value: "Телефон" } });
    fireEvent.click(screen.getByRole("button", { name: "Оставить заявку" }));

    expect(screen.getByText("Подтвердите согласие на обработку персональных данных.")).toBeTruthy();
    expect(screen.queryByText(/канал связи пока не подключён/i)).toBeNull();
  });

  it("shows the agreed local-only result after a complete application", () => {
    render(<InquiryForm context="на странице услуг" />);

    fireEvent.change(screen.getByLabelText("Имя"), { target: { value: "Анна" } });
    fireEvent.change(screen.getByLabelText("Телефон"), { target: { value: "+7 900 000-00-00" } });
    fireEvent.change(screen.getByLabelText("Удобный способ связи"), { target: { value: "Telegram" } });
    fireEvent.click(screen.getByLabelText("Согласен(на) на обработку персональных данных"));
    fireEvent.click(screen.getByRole("button", { name: "Оставить заявку" }));

    expect(screen.getByRole("status").textContent).toBe(
      "Заявка подготовлена в браузере. Данные пока не отправляются и не сохраняются.",
    );
  });
});

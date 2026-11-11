// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactsInquiryForm } from "./contacts-inquiry-form";

describe("ContactsInquiryForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows only the valid cities for a new-build request", () => {
    render(<ContactsInquiryForm />);
    fireEvent.change(screen.getByLabelText("Тема обращения"), { target: { value: "new-build" } });

    const city = screen.getByLabelText("Город");
    expect(city.textContent).toContain("Москва");
    expect(city.textContent).toContain("Санкт-Петербург");
    expect(city.textContent).toContain("Краснодар");
    expect(city.textContent).not.toContain("Элиста");
  });

  it("requires the PDF fields before attempting submission", () => {
    render(<ContactsInquiryForm />);
    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(screen.getByRole("alert").textContent).toContain("Заполните обязательные поля");
    expect(screen.getByText("Укажите имя.")).toBeTruthy();
    expect(screen.getByText("Укажите телефон.")).toBeTruthy();
  });

  it("does not show success when the server endpoint is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<ContactsInquiryForm />);

    fireEvent.change(screen.getByLabelText("Тема обращения"), { target: { value: "other" } });
    fireEvent.change(screen.getByLabelText("Ваше имя"), { target: { value: "Анна" } });
    fireEvent.change(screen.getByLabelText("Телефон"), { target: { value: "+7 900 000-00-00" } });
    fireEvent.change(screen.getByLabelText("Удобный способ связи"), { target: { value: "telegram" } });
    fireEvent.click(screen.getByLabelText(/согласен/i));
    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect((await screen.findByRole("alert")).textContent).toContain("Не удалось отправить заявку");
    expect(screen.queryByText("Спасибо! Ваша заявка отправлена.")).toBeNull();
  });
});

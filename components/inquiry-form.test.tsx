// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { InquiryForm } from "./inquiry-form";

describe("InquiryForm", () => {
  afterEach(cleanup);

  it("uses stable field identifiers for server and browser rendering", () => {
    const markup = renderToStaticMarkup(<InquiryForm context="на странице услуг" />);

    expect(markup).toContain('id="inquiry-name"');
    expect(markup).toContain('for="inquiry-name"');
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
      "Заявка пока не отправляется. Подключение канала связи будет выполнено отдельным этапом",
    );
  });
});

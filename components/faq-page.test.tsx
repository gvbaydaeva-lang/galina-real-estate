// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FaqClient, { faqCategories } from "@/app/faq/faq-client";
import FaqPage from "@/app/faq/page";

describe("FAQ page interaction", () => {
  afterEach(() => cleanup());

  it("opens the first question in the first category by default", () => {
    render(<FaqClient />);

    expect(screen.getByRole("tab", { name: /Бесплатный подбор и сопровождение/ }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: "Действительно ли подбор новостройки бесплатный?" }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(/Я бесплатно подбираю квартиры/).closest("div")?.hidden).toBe(false);
  });

  it("renders the PDF-backed FAQ structure with the requested heading and category cards", () => {
    render(<FaqPage />);

    expect(screen.getByRole("heading", { name: "Вопросы и ответы" })).toBeTruthy();
    expect(faqCategories).toHaveLength(4);
    expect(faqCategories.flatMap((category) => category.questions)).toHaveLength(14);
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(document.querySelectorAll("[data-category-icon]")).toHaveLength(4);
    expect(screen.getByText("Остались вопросы по недвижимости?")).toBeTruthy();
  });

  it("switches categories and opens the first question of the selected category", () => {
    render(<FaqClient />);

    fireEvent.click(screen.getByRole("tab", { name: /Покупка и продажа вторичного жилья в Элисте/ }));

    expect(screen.getByRole("tab", { name: /Покупка и продажа вторичного жилья в Элисте/ }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: "Помогаете ли вы купить квартиру в Элисте?" }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(/подбором вторичной недвижимости в Элисте/).closest("div")?.hidden).toBe(false);
    expect(screen.queryByRole("button", { name: "Действительно ли подбор новостройки бесплатный?" })).toBeNull();
  });

  it("toggles an answer and keeps the consultation link on the contacts page", () => {
    render(<FaqClient />);
    const question = screen.getByRole("button", { name: "Действительно ли подбор новостройки бесплатный?" });

    fireEvent.click(question);
    expect(question.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByRole("link", { name: "Получить консультацию" }).getAttribute("href")).toBe("/contacts");
  });
});

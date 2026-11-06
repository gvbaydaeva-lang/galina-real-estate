import { describe, expect, it } from "vitest";
import { validateInquiryForm } from "./inquiry-form";

describe("validateInquiryForm", () => {
  it("reports errors for empty required fields", () => {
    expect(validateInquiryForm({ name: "", phone: "", contactMethod: "", consent: false })).toEqual({
      name: "Укажите имя.",
      phone: "Укажите телефон.",
      contactMethod: "Выберите удобный способ связи.",
      consent: "Подтвердите согласие на обработку персональных данных.",
    });
  });

  it("requires consent even when contact details are filled", () => {
    expect(validateInquiryForm({ name: "Анна", phone: "+7 900 000-00-00", contactMethod: "Телефон", consent: false })).toEqual({
      consent: "Подтвердите согласие на обработку персональных данных.",
    });
  });

  it("accepts a complete local application without producing errors", () => {
    expect(validateInquiryForm({ name: "Анна", phone: "+7 900 000-00-00", contactMethod: "Telegram", consent: true })).toEqual({});
  });
});

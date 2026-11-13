// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyPlanGallery } from "./property-plan-gallery";

describe("PropertyPlanGallery", () => {
  it("opens an approved plan in an accessible enlarged dialog and closes it", () => {
    render(<PropertyPlanGallery items={[{
      src: "https://example.com/plan.svg",
      alt: "Планировка тестовой квартиры",
      caption: "1-комн. · 35 м²",
      rightsStatus: "approved",
    }]} />);

    expect(screen.getByRole("button", { name: "Открыть планировку 1-комн. · 35 м²" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Открыть планировку 1-комн. · 35 м²" }));
    expect(screen.getByRole("dialog", { name: "Планировка 1-комн. · 35 м²" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Закрыть планировку" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

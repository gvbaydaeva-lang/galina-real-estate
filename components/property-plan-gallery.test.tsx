// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PropertyPlanGallery } from "./property-plan-gallery";

describe("PropertyPlanGallery", () => {
  afterEach(cleanup);

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

  it("passes the selected plan offer to the inquiry action", () => {
    const onSelectPlan = vi.fn();
    render(<PropertyPlanGallery
      items={[{ alt: "Планировка тестовой квартиры", caption: "1-комн. · 35 м²", rightsStatus: "needs-approval" }]}
      offers={[{ type: "1-комн.", areaFrom: 35, priceFrom: 8500000, useForMortgage: true }]}
      onSelectPlan={onSelectPlan}
    />);

    fireEvent.click(screen.getByRole("link", { name: "Узнать подробнее" }));

    expect(onSelectPlan).toHaveBeenCalledWith(
      expect.objectContaining({ caption: "1-комн. · 35 м²" }),
      expect.objectContaining({ type: "1-комн.", areaFrom: 35, priceFrom: 8500000 }),
    );
  });

  it("closes the enlarged plan with Escape and restores focus", () => {
    render(<PropertyPlanGallery items={[{
      src: "https://example.com/plan-first.svg",
      alt: "Первая планировка",
      caption: "1-комн. · 35 м²",
      rightsStatus: "approved",
    }, {
      src: "https://example.com/plan-second.svg",
      alt: "Вторая планировка",
      caption: "2-комн. · 58 м²",
      rightsStatus: "approved",
    }]} />);

    const trigger = screen.getByRole("button", { name: "Открыть планировку 1-комн. · 35 м²" });
    fireEvent.click(trigger);
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("uses an explicit offer index when a plan caption has no area", () => {
    const onSelectPlan = vi.fn();
    render(<PropertyPlanGallery
      items={[{ alt: "Планировка типа 1-2", caption: "Тип 1-2 · официальная страница планировки", offerIndex: 0, rightsStatus: "needs-approval" }]}
      offers={[{ type: "1 спальня, тип 1-2", areaFrom: 37.81, priceFrom: 20445984 }]}
      onSelectPlan={onSelectPlan}
    />);

    fireEvent.click(screen.getByRole("link", { name: "Узнать подробнее" }));

    expect(onSelectPlan).toHaveBeenCalledWith(
      expect.objectContaining({ offerIndex: 0 }),
      expect.objectContaining({ type: "1 спальня, тип 1-2", priceFrom: 20445984 }),
    );
  });
});

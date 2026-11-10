import { describe, expect, it } from "vitest";
import { catalogReturnPath, selectedDistrictFromSearch, validatedCatalogReturnPath } from "./catalog-return";

describe("catalog return paths", () => {
  const locations = ["Даниловский", "Раменки"];

  it("builds a return path for the exact source card", () => {
    expect(catalogReturnPath("moscow", "moscow-zilart", "Даниловский")).toBe("/catalog/moscow?district=%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9#property-moscow-zilart");
  });

  it("restores only a district that belongs to the catalog", () => {
    expect(selectedDistrictFromSearch("?district=%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9", locations)).toBe("Даниловский");
    expect(selectedDistrictFromSearch("?district=%D0%9D%D0%B5%D1%82", locations)).toBe("");
  });

  it("accepts only the exact source card in the current city", () => {
    expect(validatedCatalogReturnPath("moscow", "moscow-zilart", locations, "/catalog/moscow?district=%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9#property-moscow-zilart"))
      .toBe("/catalog/moscow?district=%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9#property-moscow-zilart");
    expect(validatedCatalogReturnPath("moscow", "moscow-zilart", locations, "https://example.test/catalog/moscow#property-moscow-zilart"))
      .toBe("/catalog/moscow");
    expect(validatedCatalogReturnPath("moscow", "moscow-zilart", locations, "/catalog/moscow#property-moscow-ostrov"))
      .toBe("/catalog/moscow");
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

describe("responsive city grid", () => {
  it("allows two mobile columns to shrink below a long city name", () => {
    expect(stylesheet).toMatch(/\.city-grid\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  });
});

import { describe, expect, it } from "vitest";

async function loadSitePath() {
  const moduleUrl = new URL("./site-path.ts", import.meta.url).href;
  return import(moduleUrl).catch(() => ({ sitePath: () => "" }));
}

describe("sitePath", () => {
  it("adds the GitHub Pages project path to internal links", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("/services", "/galina-real-estate")).toBe("/galina-real-estate/services.html");
  });

  it("keeps local links unchanged when no public base path is set", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("/services", "")).toBe("/services");
  });

  it("keeps anchor links unchanged", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("#content", "/galina-real-estate")).toBe("#content");
  });

  it("keeps the GitHub Pages home path valid when it includes an anchor", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("/#catalog", "/galina-real-estate")).toBe("/galina-real-estate/#catalog");
  });
});

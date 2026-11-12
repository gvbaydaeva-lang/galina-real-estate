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

  it("uses static html routes at the domain root", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("/services", "")).toBe("/services.html");
    expect(sitePath("/", "")).toBe("/");
  });

  it("keeps anchor links unchanged", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("#content", "/galina-real-estate")).toBe("#content");
  });

  it("keeps the GitHub Pages home path valid when it includes an anchor", async () => {
    const { sitePath } = await loadSitePath();

    expect(sitePath("/#catalog", "/galina-real-estate")).toBe("/galina-real-estate/#catalog");
  });

  it("prefixes static assets without adding an html extension", async () => {
    const { siteAssetPath } = await loadSitePath();

    expect(siteAssetPath("/images/broker/portrait.jpg", "/galina-real-estate")).toBe("/galina-real-estate/images/broker/portrait.jpg");
    expect(siteAssetPath("images/broker/portrait.jpg", "")).toBe("/images/broker/portrait.jpg");
  });
});

import { describe, expect, it } from "vitest";

type MortgageProgram = {
  slug: string;
  title: string;
  description: string;
};

async function loadMortgagePrograms(): Promise<MortgageProgram[]> {
  const moduleUrl = new URL("./mortgage-programs.ts", import.meta.url).href;
  const programModule = await import(moduleUrl).catch(() => ({ mortgagePrograms: [] as MortgageProgram[] }));
  return programModule.mortgagePrograms;
}

describe("mortgagePrograms", () => {
  it("publishes eight distinct article routes with SEO copy", async () => {
    const programs = await loadMortgagePrograms();

    expect(programs).toHaveLength(8);
    expect(new Set(programs.map((program) => program.slug)).size).toBe(8);
    expect(programs.every((program) => program.slug.length > 0 && program.title.length > 0 && program.description.length > 0)).toBe(true);
  });
});

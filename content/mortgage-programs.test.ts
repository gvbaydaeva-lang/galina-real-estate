import { describe, expect, it } from "vitest";

type MortgageProgram = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

async function loadMortgagePrograms(): Promise<MortgageProgram[]> {
  const moduleUrl = new URL("./mortgage-programs.ts", import.meta.url).href;
  const programModule = await import(moduleUrl).catch(() => ({ mortgagePrograms: [] as MortgageProgram[] }));
  return programModule.mortgagePrograms;
}

describe("mortgagePrograms", () => {
  it("publishes eight distinct educational articles without technical placeholders", async () => {
    const programs = await loadMortgagePrograms();

    expect(programs).toHaveLength(8);
    expect(new Set(programs.map((program) => program.slug)).size).toBe(8);
    expect(new Set(programs.map((program) => program.title)).size).toBe(8);
    expect(new Set(programs.map((program) => program.description)).size).toBe(8);

    for (const program of programs) {
      expect(program.slug.length).toBeGreaterThan(0);
      expect(program.title.length).toBeGreaterThan(0);
      expect(program.description.length).toBeGreaterThan(0);
      expect(program.intro.length).toBeGreaterThan(30);
      expect(program.sections.length).toBeGreaterThanOrEqual(2);
      expect(new Set(program.sections.map((section) => section.heading)).size).toBe(program.sections.length);
      for (const section of program.sections) expect(section.body.length).toBeGreaterThan(30);

      const copy = `${program.intro} ${program.sections.map((section) => section.body).join(" ")}`;
      expect(copy).not.toContain("Каркас статьи");
      expect(copy).not.toContain("готовятся к проверке");
      expect(copy).not.toContain("Страница готова для наполнения");
    }
  });
});

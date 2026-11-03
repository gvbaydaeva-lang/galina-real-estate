export type MortgageProgram = {
  slug: string;
  title: string;
  description: string;
  summary: string;
};

export const mortgagePrograms: MortgageProgram[] = [
  { slug: "state-supported-mortgage", title: "Ипотека с господдержкой", description: "Материал об ипотеке с господдержкой: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "family-mortgage", title: "Семейная ипотека", description: "Материал о семейной ипотеке: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "it-mortgage", title: "IT-ипотека", description: "Материал об IT-ипотеке: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "military-mortgage", title: "Военная ипотека", description: "Материал о военной ипотеке: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "mortgage-for-self-employed-and-ip", title: "Ипотека для самозанятых и ИП", description: "Материал об ипотеке для самозанятых и ИП: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "refinancing", title: "Рефинансирование", description: "Материал о рефинансировании: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "maternity-capital", title: "Материнский капитал", description: "Материал об использовании материнского капитала: актуальные условия готовятся к проверке.", summary: "Каркас статьи для проверенных условий программы." },
  { slug: "how-to-choose-a-mortgage-program", title: "Какую программу выбрать", description: "Сравнительный гид по ипотечным программам: данные готовятся к проверке.", summary: "Каркас сравнительного гида без непроверенных условий." },
];

export function getMortgageProgram(slug: string) {
  return mortgagePrograms.find((program) => program.slug === slug);
}

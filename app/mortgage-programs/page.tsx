import type { Metadata } from "next";
import Link from "@/components/site-link";
import { PageIntro } from "@/components/page-intro";
import { mortgagePrograms } from "@/content/mortgage-programs";

export const metadata: Metadata = { title: "Ипотечные программы", description: "Понятные материалы о видах ипотеки, требованиях и важных ограничениях." };

export default function MortgageProgramsPage() {
  return <main id="content"><PageIntro eyebrow="Ипотека" title="Материалы для спокойной подготовки."><p>Разбираем основные виды ипотеки, важные ограничения и вопросы, которые стоит проверить до выбора объекта и подачи заявки.</p></PageIntro><section className="content-section"><div className="program-grid">{mortgagePrograms.map((program) => <Link className="program-card" href={`/mortgage-programs/${program.slug}`} key={program.slug}><p className="eyebrow">{program.label}</p><h2>{program.title}</h2><p>{program.description}</p><span>Читать материал <span aria-hidden="true">→</span></span></Link>)}</div></section></main>;
}

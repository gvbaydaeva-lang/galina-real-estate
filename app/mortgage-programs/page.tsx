import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { mortgagePrograms } from "@/content/mortgage-programs";

export const metadata: Metadata = { title: "Ипотечные программы", description: "Навигация по материалам об ипотечных программах без непроверенных ставок и условий." };

export default function MortgageProgramsPage() {
  return <main id="content"><PageIntro eyebrow="Ипотека" title="Выберите тему для изучения."><p>Восемь материалов уже получили отдельные адреса. Условия, ставки и требования банков будут добавлены после проверки источников и даты актуализации.</p></PageIntro><section className="content-section"><div className="program-grid">{mortgagePrograms.map((program) => <Link className="program-card" href={`/mortgage-programs/${program.slug}`} key={program.slug}><p className="eyebrow">Материал</p><h2>{program.title}</h2><p>{program.summary}</p><span>Открыть <span aria-hidden="true">→</span></span></Link>)}</div></section></main>;
}

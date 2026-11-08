import type { Metadata } from "next";
import Link from "@/components/site-link";
import { PageIntro } from "@/components/page-intro";
import { mortgagePrograms } from "@/content/mortgage-programs";

export const metadata: Metadata = { title: "Ипотечные программы", description: "Навигация по материалам об ипотечных программах без непроверенных ставок и условий." };

export default function MortgageProgramsPage() {
  return <main id="content"><PageIntro eyebrow="Ипотека" title="Материалы для спокойной подготовки."><p>Здесь собраны объяснения, которые помогут подготовить вопросы и проверить информацию. Ставки, лимиты и условия банков на сайте не публикуются.</p></PageIntro><section className="content-section"><div className="program-grid">{mortgagePrograms.map((program) => <Link className="program-card" href={`/mortgage-programs/${program.slug}`} key={program.slug}><p className="eyebrow">Материал</p><h2>{program.title}</h2><p>{program.intro}</p><span>Открыть <span aria-hidden="true">→</span></span></Link>)}</div></section></main>;
}

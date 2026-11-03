import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { getMortgageProgram, mortgagePrograms } from "@/content/mortgage-programs";

type ArticlePageProps = { params: Promise<{ slug: string }> };

const sections = ["Кому подходит", "Условия", "Преимущества", "Документы", "Почему могут отказать"];

export function generateStaticParams() { return mortgagePrograms.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getMortgageProgram(slug);
  return program ? { title: program.title, description: program.description } : {};
}

export default async function MortgageProgramArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const program = getMortgageProgram(slug);
  if (!program) notFound();

  return <main id="content"><PageIntro eyebrow="Ипотечная программа" title={program.title}><p>{program.summary} Ставки, лимиты, список документов и критерии банков здесь намеренно не указаны до получения актуальных подтверждённых данных.</p></PageIntro><article className="content-section article-template"><div className="article-notice"><strong>Страница готова для наполнения.</strong><p>Перед публикацией реальных условий нужно указать источник, дату проверки и ответственного за обновление.</p></div>{sections.map((section) => <section key={section}><h2>{section}</h2><p>Раздел ожидает проверенный материал. Здесь появится понятное объяснение без общих обещаний и без данных, которые могут устареть.</p></section>)}<div className="article-actions"><Link className="button button-primary" href="/mortgage-calculator">Открыть калькулятор</Link><Link className="text-link" href="/contacts">Обсудить ситуацию <span aria-hidden="true">→</span></Link></div></article></main>;
}

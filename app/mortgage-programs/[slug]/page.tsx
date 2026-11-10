import type { Metadata } from "next";
import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { getMortgageProgram, mortgagePrograms } from "@/content/mortgage-programs";

type ArticlePageProps = { params: Promise<{ slug: string }> };

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

  return <main id="content"><PageIntro backHref="/mortgage-programs" backLabel="К материалам об ипотеке" eyebrow="Ипотека" title={program.title}><p>{program.intro}</p></PageIntro><article className="content-section article-template">{program.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="article-actions"><Link className="button button-primary" href="/mortgage-calculator">Открыть калькулятор</Link><Link className="text-link" href="/contacts">Перейти к контактам <span aria-hidden="true">→</span></Link></div></article></main>;
}

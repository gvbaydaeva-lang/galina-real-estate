import type { Metadata } from "next";
import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { getMortgageProgram, mortgagePrograms } from "@/content/mortgage-programs";
import styles from "../mortgage-article.module.css";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return mortgagePrograms.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getMortgageProgram(slug);
  return program ? { title: program.title, description: program.description } : {};
}

function RichText({ text }: { text: string }) {
  return text.split("**").map((part, index) => index % 2 === 1 ? <strong key={index}>{part}</strong> : part);
}

export default async function MortgageProgramArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const program = getMortgageProgram(slug);
  if (!program) notFound();

  return <main id="content"><PageIntro backHref="/mortgage-programs" backLabel="К материалам об ипотеке" eyebrow={program.label} title={program.title}><p className={styles.subtitle}>{program.subtitle}</p></PageIntro><article className="content-section article-template">{program.sections.map((section) => <section className={styles.section} key={section.heading}><h2>{section.heading}</h2><p><RichText text={section.body} /></p></section>)}<aside className={styles.cta}><p className="eyebrow">{program.ctaTitle}</p><p>{program.ctaText}</p></aside><div className="article-actions"><Link className="button button-primary" href="/mortgage-calculator">Открыть калькулятор</Link><Link className="text-link" href="/contacts">Перейти к контактам <span aria-hidden="true">→</span></Link></div></article></main>;
}

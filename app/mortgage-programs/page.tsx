import type { Metadata } from "next";
import Link from "@/components/site-link";
import { getMortgageProgram, mortgagePrograms } from "@/content/mortgage-programs";
import styles from "./mortgage-index.module.css";

export const metadata: Metadata = {
  title: "Ипотечные программы и условия покупки жилья",
  description:
    "Семейная, военная и IT-ипотека, господдержка, материнский капитал и рефинансирование. Обзоры программ, ипотечный калькулятор и помощь брокера Галины Санджиевой.",
};

const topicCards = [
  { slug: "family-mortgage", number: "01", title: "Семейная ипотека", description: "Каким семьям может подойти льготная программа и какие требования важно проверить." },
  { slug: "state-supported-mortgage", number: "02", title: "Ипотека с господдержкой", description: "Какие программы поддержки действуют и на какие условия стоит обратить внимание." },
  { slug: "it-mortgage", number: "03", title: "IT-ипотека", description: "Особенности льготного кредитования специалистов IT-сферы." },
  { slug: "military-mortgage", number: "04", title: "Военная ипотека", description: "Как работает накопительно-ипотечная система и что учитывать при покупке жилья." },
  { slug: "mortgage-for-self-employed-and-ip", number: "05", title: "Ипотека для ИП и самозанятых", description: "Как банки оценивают доход предпринимателей и какие документы могут понадобиться." },
  { slug: "refinancing", number: "06", title: "Рефинансирование ипотеки", description: "Когда пересмотр условий действующего кредита может быть полезен." },
  { slug: "maternity-capital", number: "07", title: "Материнский капитал и ипотека", description: "Как использовать средства материнского капитала при покупке жилья или погашении кредита." },
] as const;

function mortgageHref(slug: string) {
  const program = getMortgageProgram(slug);
  if (!program) throw new Error(`Unknown mortgage program: ${slug}`);
  return `/mortgage-programs/${program.slug}`;
}

export default function MortgageProgramsPage() {
  const guide = mortgagePrograms.find((program) => program.slug === "how-to-choose-a-mortgage-program");
  if (!guide) throw new Error("The mortgage guide is missing");

  return (
    <main id="content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="mortgage-page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Ипотека и финансирование</p>
          <h1 id="mortgage-page-title">Ипотека: разбираемся в программах и выбираем подходящее решение</h1>
          <p className={styles.heroDescription}>Семейная ипотека, государственные программы, материнский капитал, рефинансирование и другие способы покупки жилья. Изучите ключевые особенности, сравните варианты и узнайте, на что обратить внимание до подачи заявки.</p>
        </div>
        <div className={styles.heroNote} aria-hidden="true">
          <span className={styles.heroNoteMark}>01</span>
          <span>Разобраться<br />до подачи заявки</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="guide-title">
        <Link className={styles.featureCard} href={mortgageHref(guide.slug)}>
          <div className={styles.featureContent}>
            <p className={styles.sectionEyebrow}>С чего начать?</p>
            <h2 id="guide-title">Как выбрать ипотечную программу</h2>
            <p>Низкая ставка — не единственный критерий выгодной ипотеки. Важно учитывать первоначальный взнос, размер ежемесячного платежа, ограничения программы и общую стоимость кредита. Начните с пошагового руководства, чтобы оценить варианты осознанно.</p>
          </div>
          <span className={styles.featureLink}>Читать руководство <span aria-hidden="true">→</span></span>
        </Link>
      </section>

      <section className={styles.section} aria-labelledby="topics-title">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>Тематические материалы</p>
          <h2 id="topics-title">Ипотечные программы и способы финансирования</h2>
          <p>Выберите тему, которая ближе к вашей ситуации. В каждом материале — условия, важные ограничения и вопросы, которые стоит уточнить перед оформлением.</p>
        </div>
        <div className={styles.topicGrid}>
          {topicCards.map((topic) => (
            <Link className={styles.topicCard} href={mortgageHref(topic.slug)} key={topic.slug}>
              <span className={styles.topicNumber}>{topic.number}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <span className={styles.topicLink}>Подробнее <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.actions} aria-label="Дополнительные возможности">
        <div className={`${styles.actionCard} ${styles.actionWarm}`}>
          <p className={styles.sectionEyebrow}>Инструмент</p>
          <h2>Рассчитайте ипотечный платёж</h2>
          <p>Оцените ежемесячный платёж, сумму процентов и общую стоимость кредита с помощью ипотечного калькулятора.</p>
          <Link className={styles.actionLink} href="/mortgage-calculator">Рассчитать ипотеку <span aria-hidden="true">→</span></Link>
        </div>
        <div className={`${styles.actionCard} ${styles.actionLight}`}>
          <p className={styles.sectionEyebrow}>Личный разбор</p>
          <h2>Остались вопросы по ипотеке?</h2>
          <p>Помогу разобраться в доступных программах и подготовиться к покупке недвижимости. Расскажите о вашей ситуации — обсудим возможные варианты и дальнейшие шаги.</p>
          <p className={styles.broker}>Галина Санджиева — брокер по недвижимости.</p>
          <Link className={styles.actionLink} href="/contacts">Получить консультацию <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { sitePath } from "@/lib/site-path";
import styles from "./faq.module.css";

type Question = { question: string; answer: string };
type Category = { title: string; questions: Question[]; icon: "handshake" | "home" | "city" | "route" };

export const faqCategories: Category[] = [
  {
    title: "Бесплатный подбор и сопровождение",
    icon: "handshake",
    questions: [
      { question: "Действительно ли подбор новостройки бесплатный?", answer: "Да. Я бесплатно подбираю квартиры в новостройках Москвы, Санкт-Петербурга и Краснодара, сравниваю предложения и сопровождаю покупку. Вознаграждение за работу выплачивает застройщик, поэтому отдельную комиссию за подбор вы не платите." },
      { question: "Почему услуги брокера бесплатны для покупателя?", answer: "При покупке новостройки застройщик может выплачивать брокеру партнёрское вознаграждение. Для вас это означает возможность получить профессиональную помощь без отдельной оплаты услуг подбора и сопровождения. Условия покупки и все дополнительные расходы обсуждаются заранее." },
      { question: "Что входит в сопровождение покупки?", answer: "Я уточняю ваши пожелания и бюджет, подбираю объекты, сравниваю планировки и условия застройщиков, помогаю разобраться в ипотеке и документах, сопровождаю согласование и оформление сделки. Конкретный объём сопровождения зависит от выбранного объекта и условий покупки." },
      { question: "Обязательно ли покупать квартиру после консультации?", answer: "Нет. Консультация и подбор не обязывают вас приобретать недвижимость. Вы можете изучить предложения, задать вопросы и принять решение в удобном для себя темпе." },
    ],
  },
  {
    title: "Ипотека и финансовые вопросы",
    icon: "home",
    questions: [
      { question: "Поможете ли вы подобрать ипотечную программу?", answer: "Да. Я помогу сравнить доступные программы, разобраться в первоначальном взносе, ежемесячном платеже и требованиях банков, а также подготовиться к подаче заявки. Окончательные условия и решение об одобрении определяет банк." },
      { question: "Можно ли купить квартиру по семейной ипотеке?", answer: "Если ваша семья соответствует действующим условиям программы и выбранная недвижимость подходит под её требования, семейная ипотека может быть доступна. Я помогу предварительно оценить возможность участия и разобраться в требованиях к объекту и заёмщику." },
      { question: "Можно ли использовать материнский капитал?", answer: "Во многих случаях материнский капитал можно направить на первоначальный взнос или погашение жилищного кредита. Возможность использования зависит от объекта, условий банка и требований законодательства. Я помогу разобраться в порядке оформления." },
      { question: "Можно ли оформить ипотеку ИП или самозанятому?", answer: "Да, банки рассматривают заявки предпринимателей и самозанятых. При этом учитываются подтверждённый доход, кредитная история, долговая нагрузка и требования конкретного банка. Я помогу подобрать варианты и разобраться с документами." },
    ],
  },
  {
    title: "Покупка и продажа вторичного жилья в Элисте",
    icon: "city",
    questions: [
      { question: "Помогаете ли вы купить квартиру в Элисте?", answer: "Да. Я помогаю с подбором вторичной недвижимости в Элисте, организацией просмотров, сравнением предложений и подготовкой к сделке. Условия сотрудничества обсуждаются индивидуально." },
      { question: "Можно ли обратиться к вам для продажи квартиры?", answer: "Конечно. Я помогу оценить ситуацию на рынке, определить стратегию продажи, организовать представление объекта потенциальным покупателям, переговоры и подготовку к оформлению сделки." },
      { question: "Сколько стоят услуги при продаже или покупке вторичного жилья?", answer: "Стоимость зависит от задачи и объёма необходимой работы. Все условия, перечень услуг и порядок оплаты обсуждаются до начала сотрудничества, чтобы вы заранее понимали расходы." },
    ],
  },
  {
    title: "Как проходит сотрудничество",
    icon: "route",
    questions: [
      { question: "С чего начать подбор недвижимости?", answer: "Расскажите, в каком городе рассматриваете недвижимость, для какой цели планируете покупку и на какой бюджет ориентируетесь. Я уточню детали и предложу дальнейший план действий." },
      { question: "Можно ли приобрести новостройку дистанционно?", answer: "Во многих случаях основные этапы — подбор объекта, консультации, согласование условий и оформление документов — можно организовать дистанционно. Возможность полностью удалённой сделки зависит от застройщика, банка и способа подписания документов." },
      { question: "Какие дополнительные расходы могут возникнуть при покупке?", answer: "Помимо стоимости недвижимости могут потребоваться расходы на оформление документов, услуги банка, страхование, регистрацию и другие сопутствующие процедуры. Я помогу заранее уточнить возможные затраты по выбранному варианту." },
    ],
  },
];

function CategoryIcon({ name }: { name: Category["icon"] }) {
  const paths = {
    handshake: <><path d="m7 12 2.2 2.2a2 2 0 0 0 2.8 0l4.8-4.8a2 2 0 0 0-2.8-2.8l-2 2" /><path d="m5.5 10.5 2-2a2 2 0 0 1 2.8 0l1.2 1.2" /><path d="m3 9 4 4M17 7l4 4" /><path d="m14 14 2 2m-4-1 2 2" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v10h14V9" /><path d="M9 19v-5h6v5" /></>,
    city: <><path d="M4 20V9l5-3v14M9 20V4l6 3v13M15 20v-8l5 2v6" /><path d="M7 11h.01M7 14h.01M12 9h.01M12 12h.01M18 16h.01" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M7.5 16.5c1-3 1.5-5.5 4.5-6.5s3.5-1.5 4.5-3" /></>,
  };

  return <svg className={styles.categoryIcon} data-category-icon aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function FaqClient() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(0);
  const category = faqCategories[selectedCategory];

  function selectCategory(index: number) {
    setSelectedCategory(index);
    setOpenQuestion(0);
  }

  return (
    <section className={styles.faqSection} aria-label="Часто задаваемые вопросы">
      <div className={styles.faqLayout}>
        <div className={styles.categoryColumn} role="tablist" aria-label="Категории вопросов" aria-orientation="vertical">
          {faqCategories.map((item, index) => (
            <button
              className={`${styles.categoryButton} ${selectedCategory === index ? styles.categoryButtonActive : ""}`}
              key={item.title}
              id={`faq-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={selectedCategory === index}
              aria-controls="faq-panel"
              tabIndex={selectedCategory === index ? 0 : -1}
              onClick={() => selectCategory(index)}
            >
              <span className={styles.categoryNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.categoryIconWrap}><CategoryIcon name={item.icon} /></span>
              <span className={styles.categoryTitle}>{item.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.questionColumn} id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${selectedCategory}`}>
          <p className={styles.categoryLabel}>{category.title}</p>
          <div className={styles.questionList}>
            {category.questions.map((item, index) => {
              const isOpen = openQuestion === index;
              const answerId = `faq-answer-${selectedCategory}-${index}`;
              return (
                <div className={`${styles.questionItem} ${isOpen ? styles.questionItemOpen : ""}`} key={item.question}>
                  <button className={styles.questionButton} type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? -1 : index)}>
                    <span>{item.question}</span>
                    <span className={styles.questionIcon} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className={styles.answer} id={answerId} hidden={!isOpen}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className={styles.consultation}>
        <div>
          <p className={styles.consultationLabel}>Остались вопросы по недвижимости?</p>
          <p>Получите консультацию по новостройкам Москвы, Санкт-Петербурга и Краснодара или по покупке и продаже жилья в Элисте.</p>
        </div>
        <a className="button button-primary" href={sitePath("/contacts")}>Получить консультацию <span aria-hidden="true">→</span></a>
      </aside>
    </section>
  );
}

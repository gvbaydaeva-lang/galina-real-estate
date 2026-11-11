"use client";

import { useState } from "react";
import { sitePath } from "@/lib/site-path";
import styles from "./faq.module.css";

type Question = { question: string; answer: string };
type Category = { title: string; questions: Question[] };

export const faqCategories: Category[] = [
  {
    title: "Бесплатный подбор и сопровождение",
    questions: [
      { question: "Действительно ли подбор новостройки бесплатный?", answer: "Да. Я бесплатно подбираю квартиры в новостройках Москвы, Санкт-Петербурга и Краснодара, сравниваю предложения и сопровождаю покупку. Вознаграждение за работу выплачивает застройщик, поэтому отдельную комиссию за подбор вы не платите." },
      { question: "Почему услуги брокера бесплатны для покупателя?", answer: "При покупке новостройки застройщик может выплачивать брокеру партнёрское вознаграждение. Для вас это означает возможность получить профессиональную помощь без отдельной оплаты услуг подбора и сопровождения. Условия покупки и все дополнительные расходы обсуждаются заранее." },
      { question: "Что входит в сопровождение покупки?", answer: "Я уточняю ваши пожелания и бюджет, подбираю объекты, сравниваю планировки и условия застройщиков, помогаю разобраться в ипотеке и документах, сопровождаю согласование и оформление сделки. Конкретный объём сопровождения зависит от выбранного объекта и условий покупки." },
      { question: "Обязательно ли покупать квартиру после консультации?", answer: "Нет. Консультация и подбор не обязывают вас приобретать недвижимость. Вы можете изучить предложения, задать вопросы и принять решение в удобном для себя темпе." },
    ],
  },
  {
    title: "Ипотека и финансовые вопросы",
    questions: [
      { question: "Поможете ли вы подобрать ипотечную программу?", answer: "Да. Я помогу сравнить доступные программы, разобраться в первоначальном взносе, ежемесячном платеже и требованиях банков, а также подготовиться к подаче заявки. Окончательные условия и решение об одобрении определяет банк." },
      { question: "Можно ли купить квартиру по семейной ипотеке?", answer: "Если ваша семья соответствует действующим условиям программы и выбранная недвижимость подходит под её требования, семейная ипотека может быть доступна. Я помогу предварительно оценить возможность участия и разобраться в требованиях к объекту и заёмщику." },
      { question: "Можно ли использовать материнский капитал?", answer: "Во многих случаях материнский капитал можно направить на первоначальный взнос или погашение жилищного кредита. Возможность использования зависит от объекта, условий банка и требований законодательства. Я помогу разобраться в порядке оформления." },
      { question: "Можно ли оформить ипотеку ИП или самозанятому?", answer: "Да, банки рассматривают заявки предпринимателей и самозанятых. При этом учитываются подтверждённый доход, кредитная история, долговая нагрузка и требования конкретного банка. Я помогу подобрать варианты и разобраться с документами." },
    ],
  },
  {
    title: "Покупка и продажа вторичного жилья в Элисте",
    questions: [
      { question: "Помогаете ли вы купить квартиру в Элисте?", answer: "Да. Я помогаю с подбором вторичной недвижимости в Элисте, организацией просмотров, сравнением предложений и подготовкой к сделке. Условия сотрудничества обсуждаются индивидуально." },
      { question: "Можно ли обратиться к вам для продажи квартиры?", answer: "Конечно. Я помогу оценить ситуацию на рынке, определить стратегию продажи, организовать представление объекта потенциальным покупателям, переговоры и подготовку к оформлению сделки." },
      { question: "Сколько стоят услуги при продаже или покупке вторичного жилья?", answer: "Стоимость зависит от задачи и объёма необходимой работы. Все условия, перечень услуг и порядок оплаты обсуждаются до начала сотрудничества, чтобы вы заранее понимали расходы." },
    ],
  },
  {
    title: "Как проходит сотрудничество",
    questions: [
      { question: "С чего начать подбор недвижимости?", answer: "Расскажите, в каком городе рассматриваете недвижимость, для какой цели планируете покупку и на какой бюджет ориентируетесь. Я уточню детали и предложу дальнейший план действий." },
      { question: "Можно ли приобрести новостройку дистанционно?", answer: "Во многих случаях основные этапы — подбор объекта, консультации, согласование условий и оформление документов — можно организовать дистанционно. Возможность полностью удалённой сделки зависит от застройщика, банка и способа подписания документов." },
      { question: "Какие дополнительные расходы могут возникнуть при покупке?", answer: "Помимо стоимости недвижимости могут потребоваться расходы на оформление документов, услуги банка, страхование, регистрацию и другие сопутствующие процедуры. Я помогу заранее уточнить возможные затраты по выбранному варианту." },
    ],
  },
];

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
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title}
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

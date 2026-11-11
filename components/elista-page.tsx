import SiteLink from "@/components/site-link";
import { BackNavigation } from "@/components/back-navigation";

const directions = [
  {
    number: "01",
    title: "Квартиры и частные дома",
    text: "Помощь в покупке и продаже жилой недвижимости в Элисте. Уточним требования к объекту, бюджет и сроки, сравним предложения и обсудим условия будущей сделки.",
  },
  {
    number: "02",
    title: "Новостройки и предложения застройщиков",
    text: "Рассматриваете квартиру в новом доме? Помогу сориентироваться в доступных предложениях и условиях покупки. Подбор ведётся индивидуально, без публичного каталога жилых комплексов на этой странице.",
  },
  {
    number: "03",
    title: "Земельные участки",
    text: "Помощь в поиске и продаже земельных участков под личные и инвестиционные задачи. Перед сделкой важно проверить назначение участка, документы и действующие ограничения.",
  },
  {
    number: "04",
    title: "Коммерческая недвижимость",
    text: "Подбор и продажа помещений для бизнеса по индивидуальному запросу. Обсудим назначение объекта, расположение, бюджет и требования к помещению.",
  },
] as const;

const steps = [
  ["01", "Знакомство и задача", "Обсуждаем покупку или продажу, бюджет, сроки и особенности объекта."],
  ["02", "Анализ и варианты", "Оцениваем рынок и подбираем подходящие предложения либо определяем стратегию продажи."],
  ["03", "Проверка условий", "Сверяем ключевые сведения об объекте и документах; при необходимости привлекаются профильные специалисты."],
  ["04", "Подготовка к сделке", "Согласовываем дальнейшие действия, необходимые документы и порядок оформления."],
] as const;

export function ElistaPage() {
  return (
    <>
      <section className="elista-hero" aria-labelledby="elista-heading">
        <div className="elista-hero-inner">
          <BackNavigation href="/#catalog" label="К выбору города" />
          <p className="eyebrow">Недвижимость · Элиста</p>
          <h1 id="elista-heading">Недвижимость в Элисте — покупка, продажа и сопровождение сделок</h1>
          <p className="elista-lead">Помогу подобрать или продать недвижимость в Элисте: квартиру, частный дом, земельный участок или коммерческий объект. Разберём вашу задачу, оценим доступные варианты и определим дальнейшие шаги — от поиска до оформления сделки.</p>
          <div className="button-row">
            <SiteLink className="button button-primary" href="#elista-contact">Обсудить покупку</SiteLink>
            <SiteLink className="button button-secondary" href="#elista-contact">Обсудить продажу</SiteLink>
          </div>
        </div>
      </section>

      <section className="elista-section elista-directions" aria-labelledby="elista-directions-heading">
        <div className="elista-section-heading">
          <p className="eyebrow">Направления работы</p>
          <h2 id="elista-directions-heading">Подберём решение под вашу задачу</h2>
        </div>
        <div className="elista-direction-grid">
          {directions.map((direction) => (
            <article className="elista-direction-card" key={direction.number}>
              <span className="elista-card-number">{direction.number}</span>
              <h3>{direction.title}</h3>
              <p>{direction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="elista-section elista-selection" aria-labelledby="elista-selection-heading">
        <div className="elista-selection-copy">
          <p className="eyebrow">Индивидуальный подбор</p>
          <h2 id="elista-selection-heading">Недвижимость под вашу задачу, а не просто список объявлений</h2>
        </div>
        <div className="elista-selection-text">
          <p>В Элисте важно учитывать не только стоимость объекта, но и район, состояние недвижимости, документы и удобство будущего использования. Поэтому начинаем с вашего запроса: что ищете, для какой цели и на каких условиях. После этого определяем подходящие варианты и порядок действий.</p>
          <p className="elista-accent">Подбор начинается с ваших целей — а не с готового списка объектов.</p>
        </div>
      </section>

      <section className="elista-section elista-steps" aria-labelledby="elista-steps-heading">
        <div className="elista-section-heading">
          <p className="eyebrow">Как проходит работа</p>
          <h2 id="elista-steps-heading">Четыре понятных шага</h2>
        </div>
        <ol className="elista-steps-list">
          {steps.map(([number, title, text]) => (
            <li key={number}>
              <span className="elista-card-number">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="elista-mortgage-intro" aria-labelledby="elista-mortgage-heading">
        <div>
          <p className="eyebrow">Ипотека и способы покупки</p>
          <h2 id="elista-mortgage-heading">Нужна ипотека или помощь с расчётом?</h2>
        </div>
        <div>
          <p>Помогу разобраться в доступных вариантах финансирования, ориентировочном платеже и требованиях банков. Окончательные условия определяются кредитором и зависят от вашей ситуации.</p>
          <SiteLink className="button button-light" href="#calculator-title">Рассчитать ипотеку</SiteLink>
        </div>
      </section>

      <section id="elista-contact" className="elista-contact" aria-labelledby="elista-contact-heading">
        <div className="elista-contact-inner">
          <p className="eyebrow">Связь</p>
          <h2 id="elista-contact-heading">Обсудим недвижимость в Элисте?</h2>
          <p>Планируете покупку или продажу? Напишите, какой объект вас интересует. Помогу определиться с дальнейшими шагами и форматом сотрудничества.</p>
          <div className="elista-contact-links">
            <a className="elista-contact-link" href="https://t.me/+79672232585" target="_blank" rel="noreferrer"><strong>Telegram</strong><span>Написать в мессенджере</span></a>
            <a className="elista-contact-link" href="https://wa.me/79672232585" target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>Написать в мессенджере</span></a>
            <a className="elista-contact-link" href="tel:+79672232585"><strong>+7 (967) 223-25-85</strong><span>Позвонить</span></a>
          </div>
          <p className="elista-signature">Галина Санджиева · Брокер по недвижимости</p>
        </div>
      </section>
    </>
  );
}

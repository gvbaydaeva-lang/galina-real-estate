import SiteLink from "@/components/site-link";
import type { CatalogCity } from "@/content/catalog-cities";
import { BackNavigation } from "@/components/back-navigation";

type ElistaServicePageProps = {
  city: CatalogCity;
};

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

const purchaseContactHref = "https://wa.me/79672232585?text=Здравствуйте%2C%20хочу%20обсудить%20покупку%20недвижимости%20в%20Элисте";
const saleContactHref = "https://wa.me/79672232585?text=Здравствуйте%2C%20хочу%20обсудить%20продажу%20недвижимости%20в%20Элисте";

export function ElistaServicePage({ city }: ElistaServicePageProps) {
  return (
    <div className="elista-page">
      <section className="elista-hero" aria-labelledby="elista-heading">
        <div className="elista-hero-copy">
          <BackNavigation href="/#catalog" label="К выбору города" />
          <p className="eyebrow">Недвижимость · {city.name}</p>
          <h1 id="elista-heading">Недвижимость в Элисте — покупка, продажа и сопровождение сделок</h1>
          <p className="elista-lead">Помогу подобрать или продать недвижимость в Элисте: квартиру, частный дом, земельный участок или коммерческий объект. Разберём вашу задачу, оценим доступные варианты и определим дальнейшие шаги — от поиска до оформления сделки.</p>
          <div className="button-row elista-hero-actions">
            <a className="button button-primary" href={purchaseContactHref} target="_blank" rel="noreferrer">Обсудить покупку</a>
            <a className="text-link" href={saleContactHref} target="_blank" rel="noreferrer">Обсудить продажу <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="elista-hero-note" aria-label="Формат работы">
          <span className="elista-hero-note-mark" aria-hidden="true">Э</span>
          <p>Подбор начинается с ваших целей — а не с готового списка объектов.</p>
        </div>
      </section>

      <section className="elista-directions" aria-labelledby="elista-directions-heading">
        <div className="section-heading">
          <p className="eyebrow">Направления работы</p>
          <h2 id="elista-directions-heading">Недвижимость под вашу задачу</h2>
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

      <section className="elista-selection" aria-labelledby="elista-selection-heading">
        <div>
          <p className="eyebrow">Индивидуальный подбор вместо случайных объявлений</p>
          <h2 id="elista-selection-heading">Недвижимость под вашу задачу, а не просто список объявлений</h2>
        </div>
        <div className="elista-selection-copy">
          <p>В Элисте важно учитывать не только стоимость объекта, но и район, состояние недвижимости, документы и удобство будущего использования. Поэтому начинаем с вашего запроса: что ищете, для какой цели и на каких условиях. После этого определяем подходящие варианты и порядок действий.</p>
          <p className="elista-selection-accent">Подбор начинается с ваших целей — а не с готового списка объектов.</p>
        </div>
      </section>

      <section className="elista-process" aria-labelledby="elista-process-heading">
        <div className="section-heading">
          <p className="eyebrow">Как проходит работа</p>
          <h2 id="elista-process-heading">От первого разговора до сделки</h2>
        </div>
        <ol className="elista-steps">
          {steps.map(([number, title, text]) => (
            <li className="elista-step" key={number}>
              <span className="elista-card-number">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="elista-mortgage-callout" aria-labelledby="elista-mortgage-heading">
        <div>
          <p className="eyebrow">Ипотека и способы покупки</p>
          <h2 id="elista-mortgage-heading">Нужна ипотека или помощь с расчётом?</h2>
        </div>
        <div>
          <p>Помогу разобраться в доступных вариантах финансирования, ориентировочном платеже и требованиях банков. Окончательные условия определяются кредитором и зависят от вашей ситуации.</p>
          <SiteLink className="button button-light" href="/mortgage-calculator">Рассчитать ипотеку</SiteLink>
        </div>
      </section>

      <section className="elista-contact" id="elista-contact" aria-labelledby="elista-contact-heading">
        <div className="elista-contact-copy">
          <p className="eyebrow">Связь</p>
          <h2 id="elista-contact-heading">Обсудим недвижимость в Элисте?</h2>
          <p>Планируете покупку или продажу? Напишите, какой объект вас интересует. Помогу определиться с дальнейшими шагами и форматом сотрудничества.</p>
          <p className="elista-contact-signature">Галина Санджиева · Брокер по недвижимости</p>
        </div>
        <div className="elista-contact-links" aria-label="Контакты Галины Санджиевой">
          <a className="elista-contact-link" href="https://t.me/+79672232585" target="_blank" rel="noreferrer"><strong>Telegram</strong><span>Написать в мессенджере ↗</span></a>
          <a className="elista-contact-link" href="https://wa.me/79672232585" target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>Написать в мессенджере ↗</span></a>
          <a className="elista-contact-link" href="tel:+79672232585"><strong>Телефон</strong><span>+7 (967) 223-25-85</span></a>
        </div>
      </section>
    </div>
  );
}

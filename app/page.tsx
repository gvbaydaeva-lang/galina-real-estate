import Link from "@/components/site-link";
import { siteAssetPath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галина Санджиева — брокер по недвижимости | Новостройки и ипотека",
  description: "Галина Санджиева — помощь в выборе и покупке квартиры в новостройке. Подбор недвижимости, сравнение жилых комплексов, ипотечные решения и сопровождение покупки.",
};

const steps = [
  ["01", "Знакомство и ваши цели", "Обсудим, для чего нужна квартира: для жизни, переезда или инвестиций. Определим город, предпочтительные районы, бюджет, сроки и обязательные требования к жилью."],
  ["02", "Подбор новостроек", "Сформируем круг подходящих жилых комплексов и квартир. Сравним локации, планировки, инфраструктуру, сроки сдачи и доступную информацию о застройщиках."],
  ["03", "Сравнение вариантов", "Разберём сильные стороны и ограничения каждого предложения. Помогу оценить не только цену квартиры, но и удобство планировки, условия покупки и будущие расходы."],
  ["04", "Ипотека и бюджет", "Рассмотрим доступные способы оплаты, предварительный размер первоначального взноса и ежемесячного платежа. Уточним, какие ипотечные программы могут подойти в вашей ситуации."],
  ["05", "Подготовка к сделке", "Помогу сориентироваться в этапах бронирования, перечне документов и условиях договора. Важные сведения и расчёты необходимо подтвердить у банка и участников сделки."],
  ["06", "Решение и следующие шаги", "Сведём предложения, расчёты и ключевые условия в понятную картину, чтобы вы могли принять обоснованное решение и спокойно двигаться к покупке."],
];

const cities = ["Москва", "Санкт-Петербург", "Краснодар", "Элиста"];
const citySlugs = ["moscow", "spb", "krasnodar", "elista"];

export default function Home() {
  return (
    <main>
      <section id="content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Брокер по недвижимости · Новостройки и ипотека</p>
          <h1 id="hero-title">Помогу выбрать и купить квартиру в новостройке — с учётом ваших целей и бюджета</h1>
          <p className="hero-lead">Подбор вариантов, сравнение жилых комплексов, разбор ипотечных программ и сопровождение на ключевых этапах покупки. <strong>Вы понимаете, что выбираете, сколько это будет стоить и на что обратить внимание до сделки.</strong></p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/services">Обсудить покупку квартиры</Link>
            <Link className="text-link" href="/mortgage-calculator">Посмотреть новостройки <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art-inner">
            <img className="hero-art-image" src={siteAssetPath("/images/broker/galina-portrait-laptop.jpg")} alt="" />
          </div>
        </div>
      </section>

      <section id="catalog" className="city-section" aria-labelledby="cities-title">
        <div className="section-heading">
          <p className="eyebrow">География подбора</p>
          <h2 id="cities-title">В каком городе вы ищете квартиру?</h2>
          <p>У каждого рынка недвижимости свои особенности: стоимость квадратного метра, локации, предложения застройщиков и условия покупки. Выберите интересующий город, чтобы посмотреть доступные варианты и начать подбор под ваши задачи.</p>
        </div>
        <div className="city-grid">
          {cities.map((city, index) => <Link className="city-card" href={`/catalog/${citySlugs[index]}`} key={city}><span className="city-number">0{index + 1}</span><span className="city-name">{city}</span><span className="city-card-action">Смотреть новостройки</span><span className="city-arrow" aria-hidden="true">↗</span></Link>)}
        </div>
      </section>

      <section id="approach" className="approach-section" aria-labelledby="approach-title">
        <div className="approach-intro">
          <p className="eyebrow">От запроса до покупки</p>
          <h2 id="approach-title">Покупка квартиры без лишней неопределённости</h2>
          <p>Помогаю пройти путь от первой идеи до подготовки к сделке: разобраться с запросом, оценить бюджет, сравнить подходящие объекты и увидеть важные нюансы заранее. <strong>На каждом этапе вы понимаете, что происходит и какое решение предстоит принять.</strong></p>
        </div>
        <ol className="steps-list">{steps.map(([number, title, text]) => <li className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-photo"><img src={siteAssetPath("/images/broker/galina-portrait-vest.jpg")} alt="Портрет Галины Санджиевой — специалиста по недвижимости" /></div>
        <div className="about-copy">
          <p className="eyebrow">Давайте знакомиться</p>
          <h2 id="about-title">Меня зовут Галина Санджиева. Я специалист по недвижимости и ипотечным решениям.</h2>
          <p className="about-lead">Помогаю покупателям разобраться в предложениях рынка новостроек и подобрать квартиру под реальные задачи — для собственного проживания, семьи или вложения средств.</p>
          <p className="about-lead">Для меня важно не просто показать несколько вариантов, а <strong>объяснить разницу между ними: в цене, расположении, планировке, условиях оплаты и возможных рисках.</strong> Я за понятное общение, внимательное отношение к запросу и решения, которые принимаются на основе фактов, а не спешки.</p>
          <p className="about-lead">Если вы только планируете покупку и пока не знаете, с чего начать, мы можем разобрать вашу ситуацию, определить бюджет и наметить дальнейшие шаги.</p>
          <div className="about-facts" aria-label="Опыт и результаты работы">
            <div><strong>5 лет</strong><span>опыта в недвижимости</span></div>
            <div><strong>Десятки</strong><span>довольных клиентов</span></div>
          </div>
          <Link className="text-link" href="/contacts">Связаться с Галиной <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="mortgage-section" aria-labelledby="mortgage-title">
        <div><p className="eyebrow">Ипотека и способы покупки</p><h2 id="mortgage-title">Какая ипотечная программа подойдёт именно вам?</h2></div>
        <div className="mortgage-copy">
          <p>Семейная ипотека, программы для отдельных категорий заёмщиков или рыночные предложения банков — у каждого варианта свои требования и ограничения. <strong>Помогу разобраться, на какие условия стоит обратить внимание и с чего начать подготовку.</strong></p>
          <p>В ипотечном разделе вы найдёте разбор программ и калькулятор для предварительной оценки платежа. Окончательные условия, доступность программы и решение по кредиту определяет банк.</p>
          <div className="button-row"><Link className="button button-light" href="/mortgage-programs">Изучить ипотечные программы</Link><Link className="text-link text-link-light" href="/mortgage-calculator">Рассчитать платёж <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-title">
        <div className="contact-card">
          <p className="eyebrow">Первый шаг к вашей квартире</p>
          <h2 id="contact-title">Есть вопрос о покупке квартиры?</h2>
          <p>Сейчас раздел контактов обновляется. Здесь появятся актуальные способы связи с Галиной Санджиевой.</p>
        </div>
      </section>
    </main>
  );
}

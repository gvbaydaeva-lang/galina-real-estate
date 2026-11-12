import Link from "@/components/site-link";
import { siteAssetPath } from "@/lib/site-path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галина Санджиева — брокер по недвижимости | Новостройки и ипотека",
  description: "Галина Санджиева — помощь в выборе новостроек и покупке или продаже вторичного жилья в Элисте. Сравнение вариантов, ипотечные решения и сопровождение сделки.",
};

const steps = [
  ["01", "Знакомство и ваши цели", "Обсудим, для чего нужна квартира: для жизни, переезда или инвестиций. Определим город, предпочтительные районы, бюджет, сроки и обязательные требования к жилью."],
  ["02", "Подбор новостроек", "Сформируем круг подходящих жилых комплексов и квартир. Сравним локации, планировки, инфраструктуру, сроки сдачи и доступную информацию о застройщиках."],
  ["03", "Сравнение вариантов", "Разберём сильные стороны и ограничения каждого предложения. Помогу оценить не только цену квартиры, но и удобство планировки, условия покупки и будущие расходы."],
  ["04", "Ипотека и бюджет", "Рассмотрим доступные способы оплаты, предварительный размер первоначального взноса и ежемесячного платежа. Уточним, какие ипотечные программы могут подойти в вашей ситуации."],
  ["05", "Подготовка к сделке", "Помогу сориентироваться в этапах бронирования, перечне документов и условиях договора. Важные сведения и расчёты необходимо подтвердить у банка и участников сделки."],
  ["06", "Решение и следующие шаги", "Сведём предложения, расчёты и ключевые условия в понятную картину, чтобы вы могли принять обоснованное решение и спокойно двигаться к покупке."],
];

const cities = [
  { name: "Москва", slug: "moscow", action: "Смотреть новостройки" },
  { name: "Санкт-Петербург", slug: "spb", action: "Смотреть новостройки" },
  { name: "Краснодар", slug: "krasnodar", action: "Смотреть новостройки" },
  { name: "Элиста", slug: "elista", action: "Смотреть вторичное жильё", subtitle: "Покупка и продажа вторичного жилья" },
];

function TelegramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.4 4.6-3 14.2c-.2 1-0.8 1.2-1.6.8l-4.4-3.2-2.1 2c-.2.2-.4.4-.8.4l.3-4.5 8.1-7.3c.4-.4-.1-.6-.6-.2L7.3 12.9l-4.3-1.3c-.9-.3-.9-.9.2-1.3L20 4.1c.8-.3 1.5.2 1.4.5Z" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7Zm4.3-5.8c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.6.1l-.7.9c-.1.1-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4a8.9 8.9 0 0 0 3.4 3c1.3.6 1.8.7 2.2.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3Z" /></svg>;
}

function MaxIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 4.5h13A3.5 3.5 0 0 1 22 8v7.5a3.5 3.5 0 0 1-3.5 3.5H11l-4.7 3v-3H5.5A3.5 3.5 0 0 1 2 15.5V8a3.5 3.5 0 0 1 3.5-3.5Zm1.4 4.2v6.7h2.3v-3.4l2.7 2.7 2.7-2.7v3.4h2.3V8.7h-2.1l-2.9 2.9-2.9-2.9H6.9Z" /></svg>;
}

export default function Home() {
  return (
    <main>
      <section id="content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Брокер по недвижимости · Новостройки и вторичное жильё</p>
          <h1 id="hero-title">Помогу выбрать и купить квартиру в новостройке — с учётом ваших целей и бюджета</h1>
          <p className="hero-lead">Подбор новостроек, покупка и продажа вторичного жилья в Элисте, разбор ипотечных программ и сопровождение на ключевых этапах сделки. <strong>Вы понимаете, что выбираете, сколько это будет стоить и на что обратить внимание до сделки.</strong></p>
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
          {cities.map((city, index) => <Link className="city-card" href={`/catalog/${city.slug}`} key={city.slug}><span className="city-number">0{index + 1}</span><span className="city-name">{city.name}</span>{city.subtitle ? <span className="city-card-subtitle">{city.subtitle}</span> : null}<span className="city-card-action">{city.action}</span><span className="city-arrow" aria-hidden="true">↗</span></Link>)}
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
          <p className="about-lead">Помогаю покупателям разобраться в предложениях рынка новостроек и подобрать квартиру под реальные задачи, а в Элисте сопровождаю покупку и продажу вторичного жилья.</p>
          <p className="about-lead">Для меня важно не просто показать несколько вариантов, а <strong>объяснить разницу между ними: в цене, расположении, планировке, условиях оплаты и возможных рисках.</strong> Я за понятное общение, внимательное отношение к запросу и решения, которые принимаются на основе фактов, а не спешки.</p>
          <p className="about-lead">Если вы только планируете покупку и пока не знаете, с чего начать, мы можем разобрать вашу ситуацию, определить бюджет и наметить дальнейшие шаги.</p>
          <div className="about-facts" aria-label="Опыт и результаты работы">
            <div><strong>5 лет</strong><span>опыта в недвижимости</span></div>
            <div><strong>Десятки</strong><span>довольных клиентов</span></div>
          </div>
          <Link className="text-link" href="/contacts">Связаться с Галиной <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="mortgage-section home-mortgage-section" aria-labelledby="mortgage-title">
        <div><p className="eyebrow">Ипотека и способы покупки</p><h2 id="mortgage-title">Помогу разобраться с ипотекой и выбрать подходящую программу</h2></div>
        <div className="mortgage-copy">
          <p>Семейная ипотека, льготные программы и предложения банков — помогу сравнить условия, рассчитать платёж и подготовиться к оформлению.</p>
          <div className="button-row"><Link className="button button-light" href="/mortgage-programs">Изучить программы</Link><Link className="text-link text-link-light" href="/mortgage-calculator">Рассчитать ипотеку <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="contact-section home-contact-section" aria-labelledby="contact-title">
        <div className="contact-card">
          <p className="eyebrow">Связь</p>
          <h2 id="contact-title">Обсудим вашу задачу по недвижимости?</h2>
          <p>Планируете купить квартиру, продать недвижимость или подобрать ипотеку? Напишите мне — помогу разобраться и подскажу, с чего начать.</p>
          <div className="contact-links" aria-label="Мессенджеры для связи">
            <a className="contact-link-card" href="https://t.me/+79672232585" target="_blank" rel="noreferrer"><TelegramIcon /><span><strong>Telegram</strong><small>Написать в Telegram</small></span></a>
            <a className="contact-link-card" href="https://wa.me/79672232585" target="_blank" rel="noreferrer"><WhatsAppIcon /><span><strong>WhatsApp</strong><small>Написать в WhatsApp</small></span></a>
            <a className="contact-link-card" href="https://max.ru/u/f9LHodD0cOLWgzDAA5lrM2Ptyrkv_1cTxLcSy2p4Y0BNniYt_Ur2D-cpTTY" target="_blank" rel="noreferrer"><MaxIcon /><span><strong>MAX</strong><small>Написать в MAX</small></span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

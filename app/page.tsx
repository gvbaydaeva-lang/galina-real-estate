import Link from "@/components/site-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Недвижимость и ипотека",
  description: "Материалы о выборе недвижимости, каталогах городов и предварительном ипотечном расчёте без неподтверждённых условий.",
};

const steps = [
  ["01", "Определяем задачу", "Фиксируем город, бюджет и важные для покупки условия."],
  ["02", "Проверяем информацию", "Сравниваем подтверждённые сведения об объектах и сценариях покупки."],
  ["03", "Выбираем варианты", "Изучаем планировки, окружение и документы по доступным данным."],
  ["04", "Считаем бюджет", "Используем предварительный расчёт и сверяем условия у их источника."],
  ["05", "Готовимся к сделке", "Проверяем порядок действий и список нужных документов."],
  ["06", "Подводим итоги", "Перед решением ещё раз сверяем ключевые данные и договорённости."],
];

const cities = ["Москва", "Санкт-Петербург", "Краснодар", "Элиста"];
const citySlugs = ["moscow", "spb", "krasnodar", "elista"];

export default function Home() {
  return (
    <main>
      <section id="content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Недвижимость</p><h1 id="hero-title">Покупка новостройки — <em>взвешенное</em> решение.</h1><p className="hero-lead">Ориентиры для выбора недвижимости: города, материалы об ипотеке и предварительный расчёт без неподтверждённых условий.</p><div className="hero-actions"><Link className="button button-primary" href="/services">Посмотреть этапы</Link><Link className="text-link" href="/mortgage-calculator">Открыть калькулятор <span aria-hidden="true">→</span></Link></div></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-art-inner"><span className="hero-art-label">Недвижимость</span><span className="hero-art-letter">Г</span><span className="hero-art-caption">Важные решения<br />начинаются с проверки</span></div></div>
      </section>
      <section id="catalog" className="city-section" aria-labelledby="cities-title"><div className="section-heading"><p className="eyebrow">Города</p><h2 id="cities-title">Выберите город<br />для просмотра каталога.</h2></div><div className="city-grid">{cities.map((city, index) => <Link className="city-card" href={`/catalog/${citySlugs[index]}`} key={city}><span className="city-number">0{index + 1}</span><span className="city-name">{city}</span><span className="city-arrow" aria-hidden="true">↗</span></Link>)}</div><p className="content-note">В каталоги попадают только карточки с проверенными данными. Пока таких карточек нет, каталог показывает честное пустое состояние.</p></section>
      <section id="approach" className="approach-section" aria-labelledby="approach-title"><div className="approach-intro"><p className="eyebrow">Подход к покупке</p><h2 id="approach-title">Шесть шагов<br />для проверки решения.</h2><p>Покупка недвижимости требует времени и внимания к деталям. Эта схема помогает последовательно проверить важные вопросы.</p></div><ol className="steps-list">{steps.map(([number, title, text]) => <li className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section className="mortgage-section" aria-labelledby="mortgage-title"><div><p className="eyebrow">Ипотека</p><h2 id="mortgage-title">Сначала расчёт.<br />Потом решение.</h2></div><div className="mortgage-copy"><p>Калькулятор помогает оценить сценарий на введённых вами данных. В материалах объясняется, какие вопросы стоит уточнить в официальных источниках.</p><div className="button-row"><Link className="button button-light" href="/mortgage-calculator">Открыть калькулятор</Link><Link className="text-link text-link-light" href="/mortgage-programs">Все материалы <span aria-hidden="true">→</span></Link></div></div></section>
      <section className="contact-section" aria-labelledby="contact-title"><div className="contact-card"><p className="eyebrow">Контакты</p><h2 id="contact-title">Способы связи<br />готовятся к публикации.</h2><p>Контактные данные появятся на сайте только после подтверждения. До этого сайт не принимает обращения.</p><Link className="button button-primary" href="/contacts">Открыть страницу контактов</Link></div></section>
    </main>
  );
}

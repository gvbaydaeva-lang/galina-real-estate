import Link from "@/components/site-link";

const steps = [
  ["01", "Разбираемся в задаче", "Уточняем город, бюджет, сроки и важные для вас условия."],
  ["02", "Проверяем варианты", "Сравниваем проекты и открыто обсуждаем сильные стороны и риски."],
  ["03", "Выбираем объект", "Смотрим планировки, окружение и юридические детали до бронирования."],
  ["04", "Согласовываем условия", "Помогаю оценить ипотеку, рассрочку и условия сделки."],
  ["05", "Оформляем покупку", "Сопровождаю документы и связь со всеми участниками сделки."],
  ["06", "Принимаем ключи", "Проверяем финальный результат вместе с профильным специалистом."],
];

const cities = ["Москва", "Санкт-Петербург", "Краснодар", "Элиста"];
const citySlugs = ["moscow", "spb", "krasnodar", "elista"];

export default function Home() {
  return (
    <main>
      <section id="content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Независимый консультант по недвижимости</p><h1 id="hero-title">Покупка новостройки — <em>спокойное</em> решение.</h1><p className="hero-lead">Персональное сопровождение при выборе жилья и инвестиционных объектов: от первого запроса до приёмки ключей.</p><div className="hero-actions"><Link className="button button-primary" href="/contacts">Обсудить задачу</Link><Link className="text-link" href="/services">Как проходит работа <span aria-hidden="true">→</span></Link></div></div>
        <div className="hero-art" aria-label="Место для портретной фотографии Галины"><div className="hero-art-inner hero-photo-placeholder"><span className="hero-art-label">Место для фотографии</span><span className="photo-icon" aria-hidden="true">⌁</span><span className="photo-placeholder-copy">Портрет Галины<br />будет добавлен здесь</span><span className="hero-art-caption">Недвижимость,<br />в которой хочется жить</span></div></div>
      </section>
      <section id="catalog" className="city-section" aria-labelledby="cities-title"><div className="section-heading"><p className="eyebrow">Направления</p><h2 id="cities-title">Выберите город,<br />с которого начнём.</h2></div><div className="city-grid">{cities.map((city, index) => <Link className="city-card" href={`/catalog/${citySlugs[index]}`} key={city}><span className="city-number">0{index + 1}</span><span className="city-name">{city}</span><span className="city-arrow" aria-hidden="true">↗</span></Link>)}</div><p className="content-note">Каталоги наполняются подтверждёнными предложениями. Объекты и цены появятся после получения актуальных данных.</p></section>
      <section id="approach" className="approach-section" aria-labelledby="approach-title"><div className="approach-intro"><p className="eyebrow">Сопровождение сделки</p><h2 id="approach-title">Шесть ясных шагов<br />до ваших ключей.</h2><p>В большой покупке важно понимать, что происходит сейчас и что будет дальше. Поэтому работа строится последовательно и без лишней суеты.</p></div><ol className="steps-list">{steps.map(([number, title, text]) => <li className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section className="mortgage-section" aria-labelledby="mortgage-title"><div><p className="eyebrow">Ипотека</p><h2 id="mortgage-title">Сначала расчёт.<br />Потом решение.</h2></div><div className="mortgage-copy"><p>Калькулятор помогает получить предварительный расчёт. Раздел программ собран как навигация: условия будут добавлены только после проверки источников.</p><div className="button-row"><Link className="button button-light" href="/mortgage-calculator">Открыть калькулятор</Link><Link className="text-link text-link-light" href="/mortgage-programs">Все программы <span aria-hidden="true">→</span></Link></div></div></section>
      <section className="contact-section" aria-labelledby="contact-title"><div className="contact-card"><p className="eyebrow">Первый разговор</p><h2 id="contact-title">Расскажите,<br />какую недвижимость<br />вы ищете.</h2><p>Контакты и форма заявки находятся на отдельной странице. Они будут подключены после подтверждения способов связи.</p><Link className="button button-primary" href="/contacts">Перейти к контактам</Link></div></section>
    </main>
  );
}

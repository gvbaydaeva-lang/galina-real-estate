import Link from "next/link";

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
      <a className="skip-link" href="#content">К содержанию</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Галина Санджиева — на главную"><span className="brand-mark" aria-hidden="true">Г</span><span>Галина Санджиева</span></Link>
        <nav className="main-nav" aria-label="Основная навигация"><a href="#catalog">Новостройки</a><a href="#approach">О работе</a><a href="#mortgage">Ипотека</a><a href="#contact">Контакты</a></nav>
        <a className="header-cta" href="#contact">Обсудить задачу</a>
      </header>
      <section id="content" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">Независимый консультант по недвижимости</p><h1 id="hero-title">Покупка новостройки — <em>спокойное</em> решение.</h1><p className="hero-lead">Персональное сопровождение при выборе жилья и инвестиционных объектов: от первого запроса до приёмки ключей.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Записаться на консультацию</a><a className="text-link" href="#approach">Как проходит работа <span aria-hidden="true">↓</span></a></div></div>
        <div className="hero-art" aria-label="Место для портретной фотографии Галины"><div className="hero-art-inner hero-photo-placeholder"><span className="hero-art-label">Место для фотографии</span><span className="photo-icon" aria-hidden="true">⌁</span><span className="photo-placeholder-copy">Портрет Галины<br />будет добавлен здесь</span><span className="hero-art-caption">Недвижимость,<br />в которой хочется жить</span></div></div>
      </section>
      <section id="catalog" className="city-section" aria-labelledby="cities-title"><div className="section-heading"><p className="eyebrow">Направления</p><h2 id="cities-title">Выберите город,<br />с которого начнём.</h2></div><div className="city-grid">{cities.map((city, index) => <Link className="city-card" href={`/catalog/${citySlugs[index]}`} key={city}><span className="city-number">0{index + 1}</span><span className="city-name">{city}</span><span className="city-arrow" aria-hidden="true">↗</span></Link>)}</div><p className="content-note">Каталоги наполняются подтверждёнными предложениями. Объекты и цены появятся после получения актуальных данных.</p></section>
      <section id="approach" className="approach-section" aria-labelledby="approach-title"><div className="approach-intro"><p className="eyebrow">Сопровождение сделки</p><h2 id="approach-title">Шесть ясных шагов<br />до ваших ключей.</h2><p>В большой покупке важно понимать, что происходит сейчас и что будет дальше. Поэтому работа строится последовательно и без лишней суеты.</p></div><ol className="steps-list">{steps.map(([number, title, text]) => <li className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section id="mortgage" className="mortgage-section" aria-labelledby="mortgage-title"><div><p className="eyebrow">Ипотека</p><h2 id="mortgage-title">Сначала расчёт.<br />Потом решение.</h2></div><div className="mortgage-copy"><p>На сайте появится ипотечный калькулятор с понятным ежемесячным платежом, переплатой и суммой выплат. Он будет работать как отдельная страница и внутри каталогов городов.</p><Link className="button button-light" href="/mortgage-calculator">Перейти к калькулятору</Link></div></section>
      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="contact-card"><p className="eyebrow">Первый разговор</p><h2 id="contact-title">Расскажите,<br />какую недвижимость<br />вы ищете.</h2><p>Контакты и форма заявки появятся после того, как будут подтверждены способы связи. Пока блок показывает будущую структуру, но никуда не отправляет данные.</p><div className="contact-placeholders" aria-label="Места для контактов"><div className="contact-placeholder"><span className="contact-icon" aria-hidden="true">✦</span><span><strong>Telegram</strong><small>Ссылка будет добавлена</small></span></div><div className="contact-placeholder"><span className="contact-icon" aria-hidden="true">◌</span><span><strong>Телефон</strong><small>Номер будет добавлен</small></span></div><div className="contact-placeholder"><span className="contact-icon" aria-hidden="true">⌂</span><span><strong>Офис / встреча</strong><small>Адрес будет добавлен</small></span></div></div><span className="button button-disabled" aria-disabled="true">Написать Галине</span><p className="contact-footnote">Это заглушки: реальные контакты и фотография будут подключены только после получения данных от вас.</p></div></section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Галина Санджиева</span><span>Персональное сопровождение недвижимости</span></footer>
    </main>
  );
}

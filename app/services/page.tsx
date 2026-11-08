import type { Metadata } from "next";
import Link from "@/components/site-link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Услуги", description: "Как устроено сопровождение покупки недвижимости." };

const services = ["Разобрать задачу и критерии поиска", "Сравнить подтверждённые варианты", "Подготовиться к ипотеке или рассрочке", "Сопроводить сделку и приёмку"];

export default function ServicesPage() {
  return <main id="content"><PageIntro eyebrow="Сопровождение" title="Понятный путь к покупке."><p>На странице — общий ориентир по этапам выбора недвижимости. Индивидуальные условия, сроки и стоимость здесь не заявляются.</p></PageIntro><section className="content-section"><ol className="service-list">{services.map((service, index) => <li key={service}><span>0{index + 1}</span><h2>{service}</h2><p>Этот этап помогает последовательно разобраться с вопросами покупки и не упустить важное.</p></li>)}</ol><Link className="button button-primary" href="/contacts">Открыть страницу контактов</Link></section></main>;
}

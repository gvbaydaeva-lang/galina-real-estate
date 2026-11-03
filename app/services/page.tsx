import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Услуги", description: "Как устроено сопровождение покупки недвижимости." };

const services = ["Разобрать задачу и критерии поиска", "Сравнить подтверждённые варианты", "Подготовиться к ипотеке или рассрочке", "Сопроводить сделку и приёмку"];

export default function ServicesPage() {
  return <main id="content"><PageIntro eyebrow="Сопровождение" title="Понятный путь к покупке."><p>Здесь описана будущая структура услуг. Объём работ, сроки и стоимость обсуждаются отдельно — до появления подтверждённых условий они не указываются на сайте.</p></PageIntro><section className="content-section"><ol className="service-list">{services.map((service, index) => <li key={service}><span>0{index + 1}</span><h2>{service}</h2><p>Детали этого этапа будут добавлены после согласования реального сценария работы.</p></li>)}</ol><Link className="button button-primary" href="/contacts">Перейти к контактам</Link></section></main>;
}

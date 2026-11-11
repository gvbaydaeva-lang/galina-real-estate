import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteAssetPath } from "@/lib/site-path";

export const metadata: Metadata = { title: "Вопросы и ответы", description: "Ответы на частые вопросы о сопровождении и ипотеке." };

const questions = [
  ["Сколько стоит сопровождение?", "На сайте не публикуются цены без подтверждения. Стоимость не указывается, пока нет согласованного формата работы."],
  ["Можно ли заранее рассчитать ипотеку?", "Да, доступен предварительный расчёт в калькуляторе. Он не является предложением банка и не заменяет проверку условий."],
  ["Будут ли на сайте реальные объекты?", "В каталог добавляются только карточки с проверенными данными. Пока карточек нет, посетитель видит пустое состояние без вымышленных объектов."],
  ["Как связаться?", "Способы связи готовятся к публикации. До подтверждения контактных данных сайт не принимает обращения."],
];

export default function FaqPage() {
  return <main id="content"><PageIntro eyebrow="FAQ" title="Отвечаем честно и по делу."><p>Здесь собраны ответы, которые можно дать без неподтверждённых условий, цен и обещаний.</p></PageIntro><section className="content-section"><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><figure className="page-photo page-photo-faq"><img src={siteAssetPath("/images/broker/galina-portrait-window.jpg")} alt="Портрет брокера у окна" /><figcaption>Открытый диалог начинается с понятных ответов.</figcaption></figure></section></main>;
}

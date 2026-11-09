import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Вопросы и ответы", description: "Ответы на частые вопросы о сопровождении и ипотеке." };

const questions = [
  ["Сколько стоит сопровождение?", "Условия сопровождения обсуждаются индивидуально — с учётом задачи и формата работы."],
  ["Можно ли заранее рассчитать ипотеку?", "Да, доступен предварительный расчёт в калькуляторе. Он не является предложением банка и не заменяет проверку условий."],
  ["Какие объекты представлены в каталоге?", "В каталог включаются карточки с проверенными данными об объектах."],
];

export default function FaqPage() {
  return <main id="content"><PageIntro eyebrow="FAQ" title="Отвечаем честно и по делу."><p>Здесь собраны ответы, которые можно дать без неподтверждённых условий, цен и обещаний.</p></PageIntro><section className="content-section"><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section></main>;
}

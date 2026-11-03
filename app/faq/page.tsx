import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Вопросы и ответы", description: "Ответы на частые вопросы о сопровождении и ипотеке." };

const questions = [
  ["Сколько стоит сопровождение?", "Стоимость зависит от задачи и будет указана после согласования формата работы. На этой странице не публикуются непроверенные цены."],
  ["Можно ли заранее рассчитать ипотеку?", "Да, доступен предварительный расчёт в калькуляторе. Он не является предложением банка и не заменяет проверку условий."],
  ["Будут ли на сайте реальные объекты?", "Да, после получения и проверки карточек. До этого каталог честно показывает место для будущих данных."],
  ["Как связаться?", "Контакты и способ отправки заявки будут добавлены после подтверждения каналов связи."],
];

export default function FaqPage() {
  return <main id="content"><PageIntro eyebrow="FAQ" title="Отвечаем честно и по делу."><p>Раздел отвечает только на то, что можно сообщить без риска ошибиться. Конкретные условия появятся после проверки.</p></PageIntro><section className="content-section"><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section></main>;
}

import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import FaqClient from "./faq-client";

export const metadata: Metadata = { title: "Вопросы и ответы", description: "Ответы на частые вопросы о подборе недвижимости, ипотеке и сопровождении сделки." };

export default function FaqPage() {
  return <main id="content"><PageIntro eyebrow="Часто задаваемые вопросы" title="Отвечаем честно и по делу."><p>Всё, что важно знать о подборе недвижимости, ипотеке, стоимости услуг и сопровождении сделки.</p></PageIntro><div className="content-section"><FaqClient /></div></main>;
}

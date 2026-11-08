import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Контакты", description: "Способы связи готовятся к публикации и появятся после подтверждения." };

export default function ContactsPage() {
  return <main id="content"><PageIntro eyebrow="Информация" title="Способы связи готовятся к публикации."><p>Контактные данные будут опубликованы здесь после подтверждения. До этого сайт не принимает и не сохраняет обращения.</p></PageIntro></main>;
}

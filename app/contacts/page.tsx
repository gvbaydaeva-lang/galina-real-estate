import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Контакты", description: "Способы связи готовятся к публикации и появятся после подтверждения." };

export default function ContactsPage() {
  return <main id="content"><PageIntro eyebrow="Информация" title="Способы связи готовятся к публикации."><p>Контактные данные будут опубликованы здесь после подтверждения. До этого сайт не принимает и не сохраняет обращения.</p></PageIntro><section className="content-section contact-photo-section"><figure className="page-photo"><img src="/images/broker/galina-business-card.jpg" alt="Визитка брокера по недвижимости" /><figcaption>Визитная карточка специалиста.</figcaption></figure></section></main>;
}

import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Контакты", description: "Способы связи будут опубликованы после подтверждения." };

const channels = ["Телефон", "Telegram", "Встреча или офис"];

export default function ContactsPage() {
  return <main id="content"><PageIntro eyebrow="Первый разговор" title="Контакты готовятся к публикации."><p>Чтобы не публиковать неверные телефон, адрес или ссылку, реальные контакты появятся здесь только после подтверждения. Форма пока не передаёт и не сохраняет введённые данные.</p></PageIntro><section className="content-section"><div className="contact-placeholders" aria-label="Места для контактов">{channels.map((channel) => <div className="contact-placeholder" key={channel}><span className="contact-icon" aria-hidden="true">○</span><span><strong>{channel}</strong><small>Данные будут добавлены после подтверждения</small></span></div>)}</div><p className="content-note">Если вы добавите подтверждённые контакты, они будут подключены отдельной задачей вместе с безопасной обработкой заявок.</p></section><InquiryForm context="на странице контактов" /></main>;
}

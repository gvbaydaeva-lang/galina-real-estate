import type { Metadata } from "next";
import { MessageCircle, Phone, Send } from "lucide-react";
import { ContactsInquiryForm } from "@/components/contacts-inquiry-form";
import styles from "./contacts.module.css";

export const metadata: Metadata = { title: "Контакты Галины Санджиевой — брокер по недвижимости", description: "Свяжитесь с Галиной Санджиевой: подбор новостроек в Москве, Санкт-Петербурге и Краснодаре, покупка и продажа вторичного жилья в Элисте, консультации по ипотеке." };

function ChannelIcon({ type }: { type: "telegram" | "max" | "whatsapp" | "phone" }) {
  if (type === "telegram") return <Send size={20} aria-hidden="true" />;
  if (type === "phone") return <Phone size={20} aria-hidden="true" />;
  return <MessageCircle size={20} aria-hidden="true" />;
}

export default function ContactsPage() {
  return (
    <main id="content" className={styles.page}>
      <header className={styles.hero}><p className={styles.eyebrow}>Связаться с брокером</p><h1>Давайте обсудим ваш вопрос по недвижимости</h1><p className={styles.lead}>Планируете купить квартиру в новостройке, продать или приобрести вторичное жильё либо разобраться в ипотеке? Расскажите о своей задаче — помогу определить возможные варианты и дальнейшие шаги.</p><p className={styles.signature}>Галина Санджиева · Брокер по недвижимости</p></header>
      <section data-contact-section="channels" className={styles.section} aria-labelledby="channels-title"><h2 id="channels-title">Выберите удобный способ связи</h2><p className={styles.sectionIntro}>Напишите мне в удобном мессенджере или оставьте заявку ниже. Коротко опишите задачу — я смогу предметнее обсудить вашу ситуацию.</p><div className={styles.channelGrid}>
        <a className={styles.channelCard} href="https://t.me/+79672232585"><span className={styles.channelIcon}><ChannelIcon type="telegram" /></span><span className={styles.channelLabel}>Telegram</span><span className={styles.channelAction}>Написать в Telegram ↗</span></a>
        <div className={`${styles.channelCard} ${styles.channelCardDisabled}`} aria-label="MAX: активная ссылка профиля пока не предоставлена"><span className={styles.channelIcon}><ChannelIcon type="max" /></span><span className={styles.channelLabel}>MAX</span><span className={styles.channelAction}>Найти в MAX по номеру +7 (967) 223-25-85</span></div>
        <a className={styles.channelCard} href="https://wa.me/79672232585"><span className={styles.channelIcon}><ChannelIcon type="whatsapp" /></span><span className={styles.channelLabel}>WhatsApp</span><span className={styles.channelAction}>Написать в WhatsApp ↗</span></a>
        <a className={styles.channelCard} href="tel:+79672232585"><span className={styles.channelIcon}><ChannelIcon type="phone" /></span><span className={styles.channelLabel}>Телефон</span><span className={styles.channelAction}>+7 (967) 223-25-85 · Позвонить</span></a>
      </div></section>
      <section data-contact-section="inquiry" className={styles.section} aria-labelledby="inquiry-title"><div className={styles.formWrap}><div><h2 id="inquiry-title">Оставьте заявку на консультацию</h2></div><ContactsInquiryForm /></div></section>
      <section data-contact-section="geography" className={styles.section} aria-labelledby="geography-title"><h2 id="geography-title">С какой недвижимостью я работаю</h2><div className={styles.geoGrid}><article className={styles.geoCard}><h3>Новостройки — Москва, Санкт-Петербург, Краснодар</h3><p>Помогу подобрать подходящие предложения, сравнить условия застройщиков и разобраться с оформлением покупки.</p></article><article className={styles.geoCard}><h3>Вторичная недвижимость — Элиста</h3><p>Помогу с подбором квартиры для покупки или организацией продажи и подготовкой к сделке.</p></article></div><p className={styles.geoNote}>Подбор новостроек и сопровождение покупки в рамках партнёрских предложений застройщиков бесплатны для покупателя. Условия услуг по вторичному жилью обсуждаются индивидуально.</p></section>
      <section data-contact-section="closing" className={`${styles.section} ${styles.closing}`} aria-labelledby="closing-title"><h2 id="closing-title">Можно обратиться даже на этапе выбора</h2><p>Необязательно заранее знать район, конкретный жилой комплекс или ипотечную программу. Достаточно рассказать о целях и бюджете — начнём с того, что важно именно для вас.</p><a className="button button-primary" href="#inquiry-title">Задать вопрос <span aria-hidden="true">→</span></a></section>
    </main>
  );
}

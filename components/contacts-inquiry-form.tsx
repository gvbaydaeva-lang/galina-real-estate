"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "@/app/contacts/contacts.module.css";

type Topic = "new-build" | "buy-resale" | "sell-resale" | "mortgage" | "other" | "";
type Channel = "phone" | "telegram" | "max" | "whatsapp" | "";
type FormValues = { topic: Topic; city: string; name: string; phone: string; channel: Channel; contact: string; comment: string; consent: boolean };
type Errors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { topic: "", city: "", name: "", phone: "", channel: "", contact: "", comment: "", consent: false };
const policyHref: string | undefined = undefined;
const cityGroups: Record<Exclude<Topic, "" | "mortgage" | "other">, string[]> = { "new-build": ["Москва", "Санкт-Петербург", "Краснодар"], "buy-resale": ["Элиста"], "sell-resale": ["Элиста"] };

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.topic) errors.topic = "Выберите тему обращения.";
  if ((values.topic === "new-build" || values.topic === "buy-resale" || values.topic === "sell-resale") && !values.city) errors.city = "Выберите город.";
  if (!values.name.trim()) errors.name = "Укажите имя.";
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Укажите телефон.";
  else if (digits.length < 10 || digits.length > 15) errors.phone = "Введите телефон в понятном формате.";
  if (!values.channel) errors.channel = "Выберите удобный способ связи.";
  if (!values.consent) errors.consent = "Подтвердите согласие на обработку персональных данных.";
  return errors;
}

export function ContactsInquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const cities = useMemo(() => (values.topic in cityGroups ? cityGroups[values.topic as keyof typeof cityGroups] : []), [values.topic]);

  function update<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value, ...(key === "topic" ? { city: "" } : {}) }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return setStatus("idle");
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, source: "contacts.html", utm: Object.fromEntries(new URLSearchParams(window.location.search).entries()) }) });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setValues(initialValues);
    } catch { setStatus("error"); }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-describedby="contacts-form-note">
      <p id="contacts-form-note" className={styles.formNote}>Заполните короткую форму, чтобы я заранее понимала ваш вопрос. Укажите удобный способ связи — и мы обсудим возможные решения.</p>
      {Object.keys(errors).length > 0 ? <p className={styles.errorSummary} role="alert">Заполните обязательные поля формы.</p> : null}
      {status === "error" ? <p className={styles.errorSummary} role="alert">Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь со мной через мессенджер.</p> : null}
      {status === "success" ? <p className={styles.success} role="status">Спасибо! Ваша заявка отправлена. Я свяжусь с вами по указанным контактам.</p> : null}
      <div className={styles.fields}>
        <label>Тема обращения<select aria-label="Тема обращения" value={values.topic} onChange={(event) => update("topic", event.target.value as Topic)}><option value="">Выберите тему</option><option value="new-build">Подобрать новостройку</option><option value="buy-resale">Купить вторичное жильё</option><option value="sell-resale">Продать вторичное жильё</option><option value="mortgage">Консультация по ипотеке</option><option value="other">Другой вопрос</option></select>{errors.topic ? <span className={styles.error}>{errors.topic}</span> : null}</label>
        <label>Город<select aria-label="Город" value={values.city} disabled={!cities.length} onChange={(event) => update("city", event.target.value)}><option value="">{cities.length ? "Выберите город" : "Выберите тему обращения"}</option>{cities.map((city) => <option value={city} key={city}>{city}</option>)}</select>{errors.city ? <span className={styles.error}>{errors.city}</span> : null}</label>
        <label>Ваше имя<input aria-label="Ваше имя" type="text" autoComplete="name" placeholder="Как к вам обращаться" value={values.name} onChange={(event) => update("name", event.target.value)} />{errors.name ? <span className={styles.error}>{errors.name}</span> : null}</label>
        <label>Телефон<input aria-label="Телефон" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" value={values.phone} onChange={(event) => update("phone", event.target.value)} />{errors.phone ? <span className={styles.error}>{errors.phone}</span> : null}</label>
        <label>Удобный способ связи<select aria-label="Удобный способ связи" value={values.channel} onChange={(event) => update("channel", event.target.value as Channel)}><option value="">Выберите способ связи</option><option value="phone">Телефон</option><option value="telegram">Telegram</option><option value="max">MAX</option><option value="whatsapp">WhatsApp</option></select>{errors.channel ? <span className={styles.error}>{errors.channel}</span> : null}</label>
        <label>Ник или контакт в мессенджере <span className={styles.optional}>необязательно</span><input type="text" autoComplete="off" placeholder="Если отличается от телефона" value={values.contact} onChange={(event) => update("contact", event.target.value)} /></label>
        <label className={styles.full}>Комментарий <span className={styles.optional}>необязательно</span><textarea rows={4} placeholder="Например: интересует двухкомнатная квартира в Краснодаре, бюджет до …" value={values.comment} onChange={(event) => update("comment", event.target.value)} /></label>
      </div>
      <label className={styles.consent}><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} /><span>Я согласен(на) на обработку персональных данных {policyHref ? <>в соответствии с <a href={policyHref}>Политикой обработки персональных данных</a>.</> : "в соответствии с Политикой обработки персональных данных."}</span></label>
      {errors.consent ? <span className={styles.error}>{errors.consent}</span> : null}
      <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Отправка…" : "Отправить заявку"}</button>
    </form>
  );
}

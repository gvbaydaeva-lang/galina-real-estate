"use client";

import { type FormEvent, useState, useSyncExternalStore } from "react";
import { type InquiryFormErrors, type InquiryFormValues, validateInquiryForm } from "@/lib/inquiry-form";

type InquiryFormProps = {
  context: string;
};

const initialValues: InquiryFormValues = {
  name: "",
  phone: "",
  contactMethod: "",
  consent: false,
};

const subscribeToBrowserHandler = () => () => {};
const getBrowserHandlerReady = () => true;
const getServerBrowserHandlerReady = () => false;

export function InquiryForm({ context }: InquiryFormProps) {
  const [values, setValues] = useState<InquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const isBrowserHandlerReady = useSyncExternalStore(
    subscribeToBrowserHandler,
    getBrowserHandlerReady,
    getServerBrowserHandlerReady,
  );

  function updateValue<Key extends keyof InquiryFormValues>(key: Key, value: InquiryFormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiryForm(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <section className="inquiry-section" aria-labelledby="inquiry-title">
      <div className="inquiry-intro">
        <p className="eyebrow">Заявка</p>
        <h2 id="inquiry-title">Обсудим ваш запрос.</h2>
        <p>Оставьте контакты, когда будет удобно. Сейчас форма работает только в браузере: она не передаёт и не сохраняет введённые данные.</p>
      </div>
      <form className="inquiry-form" noValidate onSubmit={handleSubmit} aria-describedby="inquiry-notice">
        <p id="inquiry-notice" className="inquiry-context">Заявка {context}.</p>
        {Object.keys(errors).length > 0 ? <p className="inquiry-error-summary" role="alert">Проверьте обязательные поля формы.</p> : null}
        <div className="inquiry-fields">
          <label htmlFor="inquiry-name">
            Имя
            <input
              id="inquiry-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={!isBrowserHandlerReady}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "inquiry-name-error" : undefined}
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
            />
            {errors.name ? <span id="inquiry-name-error" className="inquiry-error">{errors.name}</span> : null}
          </label>
          <label htmlFor="inquiry-phone">
            Телефон
            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              disabled={!isBrowserHandlerReady}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
            />
            {errors.phone ? <span id="inquiry-phone-error" className="inquiry-error">{errors.phone}</span> : null}
          </label>
          <label htmlFor="inquiry-contact-method">
            Удобный способ связи
            <select
              id="inquiry-contact-method"
              name="contactMethod"
              required
              disabled={!isBrowserHandlerReady}
              aria-invalid={Boolean(errors.contactMethod)}
              aria-describedby={errors.contactMethod ? "inquiry-contact-method-error" : undefined}
              value={values.contactMethod}
              onChange={(event) => updateValue("contactMethod", event.target.value)}
            >
              <option value="">Выберите вариант</option>
              <option value="Телефон">Телефон</option>
              <option value="Telegram">Telegram</option>
              <option value="Другое">Другой способ</option>
            </select>
            {errors.contactMethod ? <span id="inquiry-contact-method-error" className="inquiry-error">{errors.contactMethod}</span> : null}
          </label>
        </div>
        <label className="inquiry-consent" htmlFor="inquiry-consent">
          <input
            id="inquiry-consent"
            name="consent"
            type="checkbox"
            required
            disabled={!isBrowserHandlerReady}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "inquiry-consent-error" : undefined}
            checked={values.consent}
            onChange={(event) => updateValue("consent", event.target.checked)}
          />
          <span>Согласен(на) на обработку персональных данных</span>
        </label>
        {errors.consent ? <p id="inquiry-consent-error" className="inquiry-error">{errors.consent}</p> : null}
        <button className="button button-primary" type="submit" disabled={!isBrowserHandlerReady}>Оставить заявку</button>
        {submitted ? <p className="inquiry-status" role="status">Заявка пока не отправляется. Подключение канала связи будет выполнено отдельным этапом</p> : null}
      </form>
    </section>
  );
}

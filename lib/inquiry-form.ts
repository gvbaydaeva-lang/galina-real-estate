export type InquiryFormValues = {
  name: string;
  phone: string;
  contactMethod: string;
  consent: boolean;
};

export type InquiryFormErrors = Partial<Record<keyof InquiryFormValues, string>>;

export function validateInquiryForm(values: InquiryFormValues): InquiryFormErrors {
  const errors: InquiryFormErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!values.name.trim()) errors.name = "Укажите имя.";
  if (!values.phone.trim()) errors.phone = "Укажите телефон.";
  else if (phoneDigits.length < 10 || phoneDigits.length > 15) errors.phone = "Введите телефон в понятном формате.";
  if (!values.contactMethod) errors.contactMethod = "Выберите удобный способ связи.";
  if (!values.consent) errors.consent = "Подтвердите согласие на обработку персональных данных.";

  return errors;
}

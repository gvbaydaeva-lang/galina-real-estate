export type InquiryFormValues = {
  name: string;
  phone: string;
  contactMethod: string;
  consent: boolean;
};

export type InquiryFormErrors = Partial<Record<keyof InquiryFormValues, string>>;

export function validateInquiryForm(values: InquiryFormValues): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

  if (!values.name.trim()) errors.name = "Укажите имя.";
  if (!values.phone.trim()) errors.phone = "Укажите телефон.";
  if (!values.contactMethod) errors.contactMethod = "Выберите удобный способ связи.";
  if (!values.consent) errors.consent = "Подтвердите согласие на обработку персональных данных.";

  return errors;
}

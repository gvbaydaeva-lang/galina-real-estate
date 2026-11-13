import { InquiryForm } from "./inquiry-form";

type PropertyInquirySectionProps = {
  propertyId: string;
  propertyName: string;
  cityName: string;
};

export function PropertyInquirySection({ propertyId, propertyName, cityName }: PropertyInquirySectionProps) {
  return (
    <section id="property-inquiry" className="property-inquiry-section" aria-labelledby="property-inquiry-heading">
      <p className="eyebrow">Консультация</p>
      <h2 id="property-inquiry-heading">Заявка на подбор квартиры</h2>
      <p>Оставьте контакты и пожелания — подготовим подборку вариантов по этому жилому комплексу.</p>
      <InquiryForm publicCopy context={{ source: "страница ЖК", propertyId, propertyName, city: cityName, apartmentType: "" }} />
    </section>
  );
}

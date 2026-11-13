import { InquiryForm } from "@/components/inquiry-form";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import type { CatalogCity, VerifiedProperty } from "@/content/catalog-cities";

type PropertyDetailContentProps = {
  city: CatalogCity;
  property: VerifiedProperty;
};

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

function formatArea(value: number) {
  return `${value.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} м²`;
}

export function PropertyDetailContent({ city, property }: PropertyDetailContentProps) {
  const offers = property.apartmentOffers ?? [];
  const initialOffer = offers.find((offer) => offer.priceFrom && offer.useForMortgage !== false);
  const approvedPlans = (property.planGallery ?? []).filter((plan) => plan.rightsStatus === "approved" && plan.src);

  return <div className="property-detail-sections">
    <section className="property-detail-section" aria-labelledby="property-about-heading">
      <p className="eyebrow">01 · О проекте</p>
      <h2 id="property-about-heading">О жилом комплексе</h2>
      {property.detailDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>

    <section className="property-detail-section" aria-labelledby="property-benefits-heading">
      <p className="eyebrow">02 · Среда</p>
      <h2 id="property-benefits-heading">Расположение и преимущества ЖК «{property.title}»</h2>
      <ul className="property-detail-benefits">
        {property.detailHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
    </section>

    <section className="property-detail-section" aria-labelledby="property-apartments-heading">
      <p className="eyebrow">03 · Выбор квартиры</p>
      <h2 id="property-apartments-heading">Квартиры и стоимость</h2>
      <div className="property-apartment-table-wrap">
        <table className="property-apartment-table">
          <caption className="sr-only">Стартовые площади и цены квартир в ЖК «{property.title}»</caption>
          <thead><tr><th scope="col">Тип квартиры</th><th scope="col">Площадь от</th><th scope="col">Стоимость от</th></tr></thead>
          <tbody>
            {offers.filter((offer) => offer.areaFrom > 0).map((offer) => <tr key={`${offer.type}-${offer.areaFrom}-${offer.priceFrom ?? "unknown"}`}>
              <th scope="row">{offer.type}</th>
              <td>от {formatArea(offer.areaFrom)}</td>
              <td>{offer.priceFrom ? `от ${money.format(offer.priceFrom)} ₽` : "Уточняется"}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <a className="button button-primary" href="#property-inquiry">Получить подборку квартир</a>
    </section>

    <section className="property-detail-section" aria-labelledby="property-plans-heading">
      <p className="eyebrow">04 · Планировки</p>
      <h2 id="property-plans-heading">Планировки квартир</h2>
      <div className="property-plan-grid">
        {approvedPlans.map((plan) => <figure key={plan.caption} className="property-plan-card">
          <a href={plan.href} target="_blank" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element -- approved source is only rendered after rights review. */}
            <img src={plan.src} alt={plan.alt} loading="lazy" />
          </a>
          <figcaption>{plan.caption}</figcaption>
          <a className="button button-secondary" href="#property-inquiry">Узнать подробнее</a>
        </figure>)}
      </div>
      {approvedPlans.length === 0 ? <div className="property-plan-request-list">
        <p>Актуальные варианты планировок доступны по запросу.</p>
        {(property.planGallery ?? []).map((plan) => <div key={plan.caption} className="property-plan-request-item">
          <span>{plan.caption}</span>
          <a className="button button-secondary" href="#property-inquiry">Узнать подробнее</a>
        </div>)}
      </div> : null}
    </section>

    {property.phases?.length ? <section className="property-detail-section" aria-labelledby="property-phases-heading">
      <p className="eyebrow">05 · Реализация проекта</p>
      <h2 id="property-phases-heading">Корпуса и сроки сдачи</h2>
      <div className="property-phases">
        {property.phases.map((phase) => <article key={phase.name} className="property-phase">
          <h3>{phase.name}</h3>
          <p>{phase.status}</p>
          <ul>{phase.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </article>)}
      </div>
    </section> : null}

    <section className="property-detail-section" aria-labelledby="property-mortgage-heading">
      <p className="eyebrow">06 · Покупка</p>
      <h2 id="property-mortgage-heading">Ипотечный калькулятор</h2>
      <MortgageCalculator cityName={city.name} initialPrice={initialOffer?.priceFrom} headingLevel="h2" showBackNavigation={false} />
    </section>

    <section id="property-inquiry" className="property-detail-section" aria-labelledby="property-inquiry-heading">
      <p className="eyebrow">07 · Консультация</p>
      <h2 id="property-inquiry-heading">Заявка на подбор квартиры</h2>
      <InquiryForm publicCopy context={{ source: "страница ЖК", propertyId: property.id, propertyName: property.title, city: city.name, apartmentType: initialOffer?.type ?? "" }} />
    </section>
  </div>;
}

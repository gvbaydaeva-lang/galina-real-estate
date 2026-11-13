"use client";

import { useMemo, useState } from "react";
import type { ApartmentOffer, PropertyPhase, VerifiedProperty } from "@/content/catalog-cities";
import { MortgageCalculator } from "./mortgage-calculator";
import { InquiryForm } from "./inquiry-form";

type MoscowPropertySectionsProps = {
  property: VerifiedProperty;
  cityName: string;
};

const area = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

function formatPrice(value?: number) {
  if (value === undefined) return "Цена по подтверждённому лоту не опубликована";
  const millions = value / 1_000_000;
  return `от ${millions.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн ₽`;
}

function formatArea(value?: number) {
  return value === undefined ? "Площадь по лоту не подтверждена" : `от ${area.format(value)} м²`;
}

function phaseOffers(property: VerifiedProperty, phase?: string) {
  return (property.apartmentOffers ?? []).filter((offer) => offer.phase === phase);
}

function ApartmentTable({ offers, onSelect, selected }: { offers: readonly ApartmentOffer[]; onSelect: (offer: ApartmentOffer) => void; selected?: ApartmentOffer }) {
  if (offers.length === 0) {
    return <p className="moscow-property-muted">Подтверждённая цена и типовые строки не опубликованы. Актуальный выбор доступен на официальном сайте застройщика.</p>;
  }

  return <div className="moscow-apartment-table-wrap">
    <table className="moscow-apartment-table">
      <caption style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>Подтверждённые параметры квартир</caption>
      <thead><tr><th scope="col">Тип квартиры</th><th scope="col">Площадь от</th><th scope="col">Стоимость от</th><th scope="col" aria-label="Выбор" /></tr></thead>
      <tbody>{offers.map((offer) => {
        const isSelected = selected?.type === offer.type && selected.phase === offer.phase;
        return <tr key={`${offer.phase ?? "project"}-${offer.type}`}>
          <th scope="row">{offer.type}{offer.phase ? <small>{offer.phase}</small> : null}{offer.handover ? <small>Срок: {offer.handover}</small> : null}{offer.lotId ? <small>Лот: {offer.lotId}</small> : null}</th>
          <td>{formatArea(offer.areaFrom)}</td>
          <td>{formatPrice(offer.priceFrom)}{offer.priceNote ? <small className="moscow-price-note">{offer.priceNote}</small> : null}</td>
          <td><button type="button" className="button button-secondary moscow-apartment-select" aria-pressed={isSelected} onClick={() => onSelect(offer)}>{isSelected ? "Выбрано" : "Выбрать"}</button></td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}

function PhaseBlock({ phase, property, onSelect, selected }: { phase: PropertyPhase; property: VerifiedProperty; onSelect: (offer: ApartmentOffer) => void; selected?: ApartmentOffer }) {
  const offers = phaseOffers(property, phase.name);
  return <div className="moscow-phase-block">
    <h3>{phase.name}</h3>
    <p><strong>{phase.status}</strong></p>
    <ul>{phase.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
    {offers.length > 0 ? <ApartmentTable offers={offers} onSelect={onSelect} selected={selected} /> : null}
  </div>;
}

export function MoscowPropertySections({ property, cityName }: MoscowPropertySectionsProps) {
  const offers = property.apartmentOffers ?? [];
  const [selected, setSelected] = useState<ApartmentOffer | undefined>(offers[0]);
  const selectedPrice = selected?.useForMortgage === false ? undefined : selected?.priceFrom;
  const selectedType = selected?.type ?? "";
  const phases = property.phases ?? [];
  const hasUnphasedOffers = offers.some((offer) => !offer.phase);
  const officialUrl = property.officialSelectionUrl;
  const lead = useMemo(() => selected ? `Выбран вариант: ${selectedType}${selected.phase ? ` · ${selected.phase}` : ""}.` : "Выберите подтверждённый тип квартиры, чтобы передать его в заявку.", [selected, selectedType]);
  const selectedOfficialUrl = selected?.sourceUrl ?? officialUrl;

  return <div className="moscow-property-sections" style={{ overflowX: "hidden" }}>
    <section className="moscow-property-section" aria-labelledby="moscow-about-heading">
      <p className="eyebrow">01 · О проекте</p>
      <h2 id="moscow-about-heading">О жилом комплексе</h2>
      {property.detailDescription.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>

    <section className="moscow-property-section" aria-labelledby="moscow-benefits-heading">
      <p className="eyebrow">02 · Среда</p>
      <h2 id="moscow-benefits-heading">Расположение и преимущества</h2>
      <p>{property.detailDescription[2]}</p>
      <ul className="moscow-property-benefits">{property.detailHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    </section>

    <section className="moscow-property-section" aria-labelledby="moscow-apartments-heading">
      <p className="eyebrow">03 · Выбор квартиры</p>
      <h2 id="moscow-apartments-heading">Квартиры и цены</h2>
      <p>В таблице собраны только параметры, подтверждённые на официальном сайте застройщика. Выберите строку, чтобы передать тип квартиры в заявку и калькулятор.</p>
      {hasUnphasedOffers ? <ApartmentTable offers={offers.filter((offer) => !offer.phase)} onSelect={setSelected} selected={selected} /> : offers.length === 0 ? <p className="moscow-property-muted">Стоимость зависит от выбранного корпуса и доступного лота. Актуальный выбор квартиры доступен на официальном подборе.</p> : null}
      {phases.map((phase) => <PhaseBlock key={phase.name} phase={phase} property={property} onSelect={setSelected} selected={selected} />)}
      {selectedOfficialUrl ? <a className="button button-secondary" href={selectedOfficialUrl} target="_blank" rel="noreferrer">Подобрать квартиру на официальном сайте</a> : null}
    </section>

    <section className="moscow-property-section" aria-labelledby="moscow-plans-heading">
      <p className="eyebrow">04 · Планировки</p>
      <h2 id="moscow-plans-heading">Планировки</h2>
      <p>{property.plansNote ?? "Планировки конкретных лотов зависят от корпуса и очереди."}</p>
      {selectedOfficialUrl ? <a className="text-link" href={selectedOfficialUrl} target="_blank" rel="noreferrer">Смотреть планировки в официальном подборе</a> : null}
    </section>

    <section className="moscow-property-section" aria-labelledby="moscow-status-heading">
      <p className="eyebrow">05 · Реализация проекта</p>
      <h2 id="moscow-status-heading">Корпуса и сроки сдачи</h2>
      {phases.length > 0 ? phases.map((phase) => <div className="moscow-status-row" key={phase.name}><strong>{phase.name}</strong><span>{phase.status}</span></div>) : <p>Состав корпусов и сроки конкретных лотов проверяются по официальному подбору.</p>}
    </section>

    <section className="moscow-property-section" aria-labelledby="moscow-mortgage-heading">
      <p className="eyebrow">06 · Покупка</p>
      <h2 id="moscow-mortgage-heading">Ипотечный калькулятор</h2>
      <p>{offers.length === 0 ? "Актуальную стоимость для выбранного корпуса можно уточнить на официальном подборе." : lead}</p>
      <MortgageCalculator cityName={cityName} initialPrice={selectedPrice} priceSourceKey={`${property.id}-${selected?.phase ?? "project"}-${selectedType}`} headingLevel="h3" showBackNavigation={false} />
    </section>

    <section id="moscow-inquiry" className="moscow-property-section" aria-labelledby="moscow-inquiry-heading">
      <p className="eyebrow">07 · Консультация</p>
      <h2 id="moscow-inquiry-heading">Заявка по ЖК</h2>
      <InquiryForm publicCopy context={{ source: "страница ЖК", propertyId: property.id, propertyName: property.title, city: cityName, apartmentType: selectedType }} initialApartmentType={selectedType} />
    </section>
  </div>;
}

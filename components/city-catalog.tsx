"use client";

import { useState } from "react";
import Link from "next/link";
import { filterProperties, type CatalogCity } from "../content/catalog-cities";
import { PropertyCard } from "./property-card";

type CityCatalogProps = {
  city: CatalogCity;
};

const emptyStateCopy = "Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.";

export function CityCatalog({ city }: CityCatalogProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const visibleProperties = selectedDistrict
    ? filterProperties(city.properties, selectedDistrict)
    : city.properties;

  return (
    <section className="catalog-placeholder" aria-labelledby="catalog-heading">
      <p className="eyebrow">Каталог · {city.name}</p>
      <h1 id="catalog-heading">{city.heading}</h1>
      <p>{city.note}</p>
      {city.properties.length ? <p className="catalog-source-notice">В каталоге — несколько примеров действующих проектов для ориентира. Это не полный перечень и не публичная оферта: цены, сроки и наличие меняются.</p> : null}

      <div className="catalog-filter">
        <label htmlFor="district-filter">{city.locationLabel}</label>
        <select id="district-filter" value={selectedDistrict} onChange={(event) => setSelectedDistrict(event.target.value)}>
          <option value="">Все районы</option>
          {city.locations.map((location) => <option key={location} value={location}>{location}</option>)}
        </select>
      </div>

      {visibleProperties.length ? (
        <div className="property-grid">
          {visibleProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      ) : (
        <div className="catalog-empty" aria-live="polite">
          <span>{emptyStateCopy}</span>
          {selectedDistrict ? <small>В локации «{selectedDistrict}» пока нет подтверждённых объектов.</small> : null}
        </div>
      )}

      {city.properties.length ? <div className="catalog-contact-cta">
        <h2>Не нашли подходящий вариант?</h2>
        <p>Это лишь небольшая витрина. Расскажите, какой район, бюджет и формат жилья вам подходят — подберём другие варианты после проверки актуальности.</p>
        <Link className="button button-primary" href="/contacts">Перейти к контактам</Link>
      </div> : null}
    </section>
  );
}

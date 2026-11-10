"use client";

import { useState } from "react";
import { filterProperties, type CatalogCity } from "../content/catalog-cities";
import { BackNavigation } from "./back-navigation";
import { PropertyCard } from "./property-card";

type CityCatalogProps = {
  city: CatalogCity;
};

const emptyStateCopy = "Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.";
const selectionNotice = "Это не полный список ЖК. Дополнительные варианты публикуются после проверки. Способы связи готовятся к публикации.";

export function CityCatalog({ city }: CityCatalogProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const visibleProperties = selectedDistrict
    ? filterProperties(city.properties, selectedDistrict)
    : city.properties;

  return (
    <section className="catalog-placeholder" aria-labelledby="catalog-heading">
      <BackNavigation href="/#catalog" label="К выбору города" />
      <p className="eyebrow">Каталог · {city.name}</p>
      <h1 id="catalog-heading">{city.heading}</h1>
      <p>{city.note}</p>
      <p className="content-note">{selectionNotice}</p>

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
    </section>
  );
}

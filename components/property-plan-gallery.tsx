"use client";

import { useState } from "react";
import type { PlanGalleryItem } from "@/content/catalog-cities";

type PropertyPlanGalleryProps = {
  items: readonly PlanGalleryItem[];
};

export function PropertyPlanGallery({ items }: PropertyPlanGalleryProps) {
  const [selected, setSelected] = useState<PlanGalleryItem | null>(null);
  const approvedItems = items.filter((item) => item.rightsStatus === "approved" && item.src);

  return <>
    <div className="property-plan-grid">
      {approvedItems.map((plan) => <figure key={plan.caption} className="property-plan-card">
        <button className="property-plan-image-button" type="button" onClick={() => setSelected(plan)} aria-label={`Открыть планировку ${plan.caption}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- image is rendered only after rights approval. */}
          <img src={plan.src} alt={plan.alt} loading="lazy" />
        </button>
        <figcaption>{plan.caption}</figcaption>
        <a className="button button-secondary" href="#property-inquiry">Узнать подробнее</a>
      </figure>)}
    </div>
    {approvedItems.length === 0 ? <div className="property-plan-request-list">
      <p>Актуальные варианты планировок доступны по запросу.</p>
      {items.map((plan) => <div key={plan.caption} className="property-plan-request-item">
        <span>{plan.caption}</span>
        <a className="button button-secondary" href="#property-inquiry">Узнать подробнее</a>
      </div>)}
    </div> : null}
    {selected ? <div className="property-plan-dialog-backdrop" role="presentation" onClick={() => setSelected(null)}>
      <div className="property-plan-dialog" role="dialog" aria-modal="true" aria-label={`Планировка ${selected.caption}`} onClick={(event) => event.stopPropagation()}>
        <button className="property-plan-dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Закрыть планировку">Закрыть</button>
        {/* eslint-disable-next-line @next/next/no-img-element -- image is rendered only after rights approval. */}
        <img src={selected.src} alt={selected.alt} />
        <p>{selected.caption}</p>
      </div>
    </div> : null}
  </>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ApartmentOffer, PlanGalleryItem } from "@/content/catalog-cities";

type PropertyPlanGalleryProps = {
  items: readonly PlanGalleryItem[];
  offers?: readonly ApartmentOffer[];
  onSelectPlan?: (plan: PlanGalleryItem, offer?: ApartmentOffer) => void;
};

function offerForPlan(plan: PlanGalleryItem, offers: readonly ApartmentOffer[]) {
  const areaMatch = plan.caption.match(/(\d+(?:[,.]\d+)?)\s*м²/);
  if (!areaMatch) return undefined;
  const area = Number(areaMatch[1].replace(",", "."));
  return offers.find((offer) => Math.abs(offer.areaFrom - area) < 0.01);
}

export function PropertyPlanGallery({ items, offers = [], onSelectPlan }: PropertyPlanGalleryProps) {
  const [selected, setSelected] = useState<PlanGalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(false);
  const approvedItems = items.filter((item) => item.rightsStatus === "approved" && item.src);

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSelected();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  useEffect(() => {
    if (!selected) {
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
        lastTriggerRef.current?.focus();
      }
      return;
    }
    closeButtonRef.current?.focus();
  }, [selected]);

  function closeSelected() {
    restoreFocusRef.current = true;
    setSelected(null);
  }

  function requestPlan(plan: PlanGalleryItem) {
    onSelectPlan?.(plan, offerForPlan(plan, offers));
  }

  return <>
    <div className="property-plan-grid">
      {approvedItems.map((plan) => <figure key={plan.caption} className="property-plan-card">
        <button ref={(element) => { if (element) lastTriggerRef.current = element; }} className="property-plan-image-button" type="button" onClick={(event) => { lastTriggerRef.current = event.currentTarget; setSelected(plan); }} aria-label={`Открыть планировку ${plan.caption}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- image is rendered only after rights approval. */}
          <img src={plan.src} alt={plan.alt} loading="lazy" />
        </button>
        <figcaption>{plan.caption}</figcaption>
        <a className="button button-secondary" href="#property-inquiry" onClick={() => requestPlan(plan)}>Узнать подробнее</a>
      </figure>)}
    </div>
    {approvedItems.length === 0 ? <div className="property-plan-request-list">
      <p>Актуальные варианты планировок доступны по запросу.</p>
      {items.map((plan) => <div key={plan.caption} className="property-plan-request-item">
        <span>{plan.caption}</span>
        <a className="button button-secondary" href="#property-inquiry" onClick={() => requestPlan(plan)}>Узнать подробнее</a>
      </div>)}
    </div> : null}
    {selected ? <div className="property-plan-dialog-backdrop" role="presentation" onClick={closeSelected}>
      <div className="property-plan-dialog" role="dialog" aria-modal="true" aria-label={`Планировка ${selected.caption}`} onClick={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} className="property-plan-dialog-close" type="button" onClick={closeSelected} aria-label="Закрыть планировку">Закрыть</button>
        {/* eslint-disable-next-line @next/next/no-img-element -- image is rendered only after rights approval. */}
        <img src={selected.src} alt={selected.alt} />
        <p>{selected.caption}</p>
      </div>
    </div> : null}
  </>;
}

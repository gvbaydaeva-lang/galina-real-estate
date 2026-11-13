"use client";

import { useEffect, useRef, useState } from "react";
import type { ApartmentOffer, PlanGalleryItem } from "@/content/catalog-cities";

type PropertyPlanGalleryProps = {
  items: readonly PlanGalleryItem[];
  offers?: readonly ApartmentOffer[];
  onSelectPlan?: (plan: PlanGalleryItem, offer?: ApartmentOffer) => void;
};

function offerForPlan(plan: PlanGalleryItem, offers: readonly ApartmentOffer[]) {
  if (plan.offerIndex !== undefined) return offers[plan.offerIndex];
  const areaMatch = plan.caption.match(/(\d+(?:[,.]\d+)?)\s*м²/);
  if (!areaMatch) return undefined;
  const area = Number(areaMatch[1].replace(",", "."));
  return offers.find((offer) => Math.abs(offer.areaFrom - area) < 0.01);
}

export function PropertyPlanGallery({ items, offers = [], onSelectPlan }: PropertyPlanGalleryProps) {
  const [selected, setSelected] = useState<PlanGalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const plansTrackRef = useRef<HTMLDivElement>(null);
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

  function scrollPlans(direction: number) {
    const track = plansTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.92, behavior: "smooth" });
  }

  return <>
    <section className="property-plan-gallery" aria-label="Галерея планировок">
      {approvedItems.length > 3 ? <div className="property-plan-navigation">
        <button type="button" className="property-plan-navigation-button" onClick={() => scrollPlans(-1)} aria-label="Предыдущие планировки">←</button>
        <button type="button" className="property-plan-navigation-button" onClick={() => scrollPlans(1)} aria-label="Следующие планировки">→</button>
      </div> : null}
      <div className="property-plan-track" ref={plansTrackRef}>
        {approvedItems.map((plan) => <figure key={plan.caption} className="property-plan-card">
          <button className="property-plan-image-button" type="button" onClick={(event) => { lastTriggerRef.current = event.currentTarget; onSelectPlan?.(plan, offerForPlan(plan, offers)); setSelected(plan); }} aria-label={`Открыть планировку ${plan.caption}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- image is rendered only after rights approval. */}
            <img src={plan.src} alt={plan.alt} loading="lazy" />
          </button>
          <figcaption>{plan.caption}</figcaption>
        </figure>)}
      </div>
    </section>
    {approvedItems.length === 0 ? <div className="property-plan-request-list">
      <p>Актуальные варианты планировок доступны по запросу.</p>
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

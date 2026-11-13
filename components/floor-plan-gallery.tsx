"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { FloorPlanCard, FloorPlanVariant } from "@/content/floor-plan-galleries";

type FloorPlanGalleryProps = {
  propertyTitle: string;
  apartments: ReadonlyArray<{ type: string; area: string; price: string }>;
  plans: ReadonlyArray<FloorPlanCard>;
};

const geometry: Record<FloorPlanVariant, { width: number; height: number; rooms: Array<{ x: number; y: number; w: number; h: number; label: string; area: string }>; doors: Array<{ x: number; y: number; rotate?: number }>; windows: Array<{ x: number; y: number; w: number; rotate?: number }> }> = {
  compact: { width: 520, height: 360, rooms: [{ x: 22, y: 22, w: 214, h: 168, label: "Кухня-гостиная", area: "20,4" }, { x: 236, y: 22, w: 144, h: 168, label: "Спальня", area: "12,2" }, { x: 380, y: 22, w: 118, h: 112, label: "С/у", area: "4,1" }, { x: 380, y: 134, w: 118, h: 56, label: "Холл", area: "3,5" }, { x: 22, y: 190, w: 476, h: 148, label: "Лоджия", area: "4,8" }], doors: [{ x: 236, y: 190 }, { x: 380, y: 134, rotate: 90 }], windows: [{ x: 80, y: 18, w: 54 }, { x: 270, y: 18, w: 48 }, { x: 410, y: 18, w: 48 }] },
  family: { width: 560, height: 360, rooms: [{ x: 22, y: 22, w: 220, h: 164, label: "Кухня-гостиная", area: "23,8" }, { x: 242, y: 22, w: 156, h: 164, label: "Спальня", area: "14,5" }, { x: 398, y: 22, w: 138, h: 100, label: "Детская", area: "10,2" }, { x: 398, y: 122, w: 138, h: 64, label: "С/у", area: "4,8" }, { x: 22, y: 186, w: 180, h: 152, label: "Прихожая", area: "8,1" }, { x: 202, y: 186, w: 334, h: 152, label: "Балкон", area: "5,4" }], doors: [{ x: 242, y: 186 }, { x: 398, y: 122 }, { x: 202, y: 186 }], windows: [{ x: 90, y: 18, w: 60 }, { x: 280, y: 18, w: 48 }, { x: 440, y: 18, w: 48 }] },
  corner: { width: 560, height: 400, rooms: [{ x: 22, y: 22, w: 220, h: 176, label: "Кухня-гостиная", area: "26,1" }, { x: 242, y: 22, w: 150, h: 176, label: "Спальня", area: "14,8" }, { x: 392, y: 22, w: 146, h: 112, label: "Детская", area: "11,3" }, { x: 392, y: 134, w: 146, h: 64, label: "С/у", area: "5,2" }, { x: 22, y: 198, w: 160, h: 180, label: "Кабинет", area: "10,6" }, { x: 182, y: 198, w: 356, h: 180, label: "Терраса", area: "8,1" }], doors: [{ x: 242, y: 198 }, { x: 392, y: 134 }, { x: 182, y: 198 }], windows: [{ x: 90, y: 18, w: 60 }, { x: 280, y: 18, w: 48 }, { x: 440, y: 18, w: 48 }, { x: 18, y: 260, w: 48, rotate: 90 }] },
  terrace: { width: 560, height: 360, rooms: [{ x: 22, y: 22, w: 190, h: 164, label: "Кухня", area: "10,8" }, { x: 212, y: 22, w: 186, h: 164, label: "Гостиная", area: "18,7" }, { x: 398, y: 22, w: 138, h: 108, label: "Спальня", area: "12,4" }, { x: 398, y: 130, w: 138, h: 56, label: "С/у", area: "4,6" }, { x: 22, y: 186, w: 170, h: 152, label: "Холл", area: "7,1" }, { x: 192, y: 186, w: 344, h: 152, label: "Лоджия", area: "6,2" }], doors: [{ x: 212, y: 186 }, { x: 398, y: 130 }, { x: 192, y: 186 }], windows: [{ x: 70, y: 18, w: 50 }, { x: 270, y: 18, w: 50 }, { x: 440, y: 18, w: 48 }] },
  linear: { width: 520, height: 320, rooms: [{ x: 22, y: 22, w: 184, h: 134, label: "Кухня-гостиная", area: "16,9" }, { x: 206, y: 22, w: 150, h: 134, label: "Жилая зона", area: "11,4" }, { x: 356, y: 22, w: 142, h: 86, label: "С/у", area: "4,2" }, { x: 356, y: 108, w: 142, h: 48, label: "Шкаф", area: "2,1" }, { x: 22, y: 156, w: 476, h: 142, label: "Балкон", area: "4,5" }], doors: [{ x: 206, y: 156 }, { x: 356, y: 108, rotate: 90 }], windows: [{ x: 70, y: 18, w: 50 }, { x: 260, y: 18, w: 50 }, { x: 400, y: 18, w: 48 }] },
  master: { width: 600, height: 420, rooms: [{ x: 22, y: 22, w: 230, h: 184, label: "Кухня-гостиная", area: "28,6" }, { x: 252, y: 22, w: 156, h: 184, label: "Мастер-спальня", area: "16,2" }, { x: 408, y: 22, w: 150, h: 98, label: "Детская", area: "12,1" }, { x: 408, y: 120, w: 150, h: 86, label: "С/у", area: "5,9" }, { x: 22, y: 206, w: 170, h: 192, label: "Кабинет", area: "11,8" }, { x: 192, y: 206, w: 150, h: 192, label: "С/у", area: "4,7" }, { x: 342, y: 206, w: 216, h: 192, label: "Терраса", area: "9,3" }], doors: [{ x: 252, y: 206 }, { x: 408, y: 120 }, { x: 192, y: 206 }, { x: 342, y: 206 }], windows: [{ x: 90, y: 18, w: 60 }, { x: 290, y: 18, w: 48 }, { x: 470, y: 18, w: 48 }, { x: 400, y: 394, w: 60 }] },
};

function FloorPlanDrawing({ plan, large = false }: { plan: FloorPlanCard; large?: boolean }) {
  const drawing = geometry[plan.variant];
  const renderFurniture = (room: (typeof drawing.rooms)[number]): ReactNode => {
    const centerX = room.x + room.w / 2;
    const centerY = room.y + room.h / 2;
    if (room.label.includes("Кухня")) return <><rect className="fixture-kitchen" x={room.x + 10} y={room.y + 10} width={Math.max(room.w - 20, 40)} height="12" /><rect className="fixture-kitchen" x={room.x + 10} y={room.y + 24} width="12" height="34" /><circle className="fixture-table" cx={centerX} cy={centerY + 25} r="15" /><circle className="fixture-chair" cx={centerX - 22} cy={centerY + 25} r="4" /><circle className="fixture-chair" cx={centerX + 22} cy={centerY + 25} r="4" /></>;
    if (room.label.includes("Спальня") || room.label.includes("Детская")) return <><rect className="fixture-bed" x={centerX - 28} y={centerY - 20} width="56" height="42" rx="2" /><line className="fixture-bed-line" x1={centerX - 28} y1={centerY - 4} x2={centerX + 28} y2={centerY - 4} /><rect className="fixture-wardrobe" x={room.x + room.w - 18} y={room.y + 12} width="9" height={Math.max(room.h - 24, 24)} /></>;
    if (room.label === "С/у") return <><rect className="fixture-bath" x={room.x + 12} y={room.y + 13} width="22" height="34" rx="10" /><circle className="fixture-sink" cx={room.x + room.w - 22} cy={room.y + 22} r="8" /><path className="fixture-toilet" d={`M ${room.x + room.w - 29} ${room.y + room.h - 30} q 14 -8 25 0 v 12 h -25 z`} /></>;
    if (room.label.includes("Гостиная") || room.label.includes("Жилая")) return <><rect className="fixture-sofa" x={centerX - 34} y={centerY - 14} width="68" height="24" rx="3" /><line className="fixture-sofa-line" x1={centerX - 24} y1={centerY - 5} x2={centerX + 24} y2={centerY - 5} /><rect className="fixture-table" x={centerX - 15} y={centerY + 24} width="30" height="14" rx="2" /></>;
    if (room.label.includes("Кабинет")) return <><rect className="fixture-desk" x={room.x + 12} y={room.y + 16} width={Math.min(room.w - 24, 58)} height="15" /><rect className="fixture-chair" x={room.x + 30} y={room.y + 37} width="20" height="13" rx="3" /></>;
    if (room.label.includes("Холл") || room.label.includes("Прихожая") || room.label.includes("Шкаф")) return <rect className="fixture-wardrobe" x={room.x + 12} y={room.y + 12} width={Math.max(room.w - 24, 20)} height="12" />;
    if (room.label.includes("Лоджия") || room.label.includes("Балкон") || room.label.includes("Терраса")) return <><rect className="fixture-table" x={centerX - 18} y={centerY - 7} width="36" height="14" rx="2" /><circle className="fixture-chair" cx={centerX - 29} cy={centerY} r="4" /><circle className="fixture-chair" cx={centerX + 29} cy={centerY} r="4" /></>;
    return null;
  };

  return <svg className="floor-plan-drawing" viewBox={`0 0 ${drawing.width} ${drawing.height}`} role="img" aria-label={`Планировка: ${plan.label}, ${plan.area}`}>
    <rect className="floor-plan-paper" x="0" y="0" width={drawing.width} height={drawing.height} />
    <g className="floor-plan-rooms">{drawing.rooms.map((room) => <g key={`${room.label}-${room.x}`}><rect x={room.x} y={room.y} width={room.w} height={room.h} /><text x={room.x + room.w / 2} y={room.y + room.h / 2 - 2}>{room.label}</text><text className="floor-plan-area" x={room.x + room.w / 2} y={room.y + room.h / 2 + 15}>{room.area} м²</text></g>)}</g>
    <g className="floor-plan-windows">{drawing.windows.map((window) => <line key={`${window.x}-${window.y}`} x1={window.x} y1={window.y} x2={window.x + window.w} y2={window.y} transform={window.rotate ? `rotate(${window.rotate} ${window.x} ${window.y})` : undefined} />)}</g>
    <g className="floor-plan-doors">{drawing.doors.map((door) => <g key={`${door.x}-${door.y}`} transform={`translate(${door.x} ${door.y}) rotate(${door.rotate ?? 0})`}><rect className="floor-plan-door-gap" x="-2" y="-2" width="38" height="5" /><path d="M 0 0 Q 34 0 34 34" /></g>)}</g>
    <g className="floor-plan-furniture">{drawing.rooms.map((room) => <g key={`furniture-${room.label}-${room.x}`}>{renderFurniture(room)}</g>)}</g>
    {large ? <text className="floor-plan-compass" x={drawing.width - 30} y={drawing.height - 18}>С</text> : null}
  </svg>;
}

export function FloorPlanGallery({ propertyTitle, apartments, plans }: FloorPlanGalleryProps) {
  const [selected, setSelected] = useState<FloorPlanCard | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return <section className="floor-plan-gallery" aria-labelledby="floor-plan-gallery-heading">
    <p className="floor-plan-demo-note">Демонстрационные данные · требуют проверки у застройщика</p>
    <h2 id="floor-plan-gallery-heading">Варианты квартир и галерея планировок</h2>
    <p className="floor-plan-gallery-intro">Ниже — самостоятельные схемы для ЖК «{propertyTitle}». Это не актуальные предложения застройщика, а визуальный пример возможных конфигураций.</p>
    <div className="floor-plan-table-wrap"><table className="floor-plan-table"><caption className="sr-only">Демонстрационные типы квартир в ЖК «{propertyTitle}»</caption><thead><tr><th scope="col">Тип квартиры</th><th scope="col">Площадь</th><th scope="col">Стоимость</th></tr></thead><tbody>{apartments.map((apartment) => <tr key={apartment.type}><th scope="row">{apartment.type}</th><td>{apartment.area}</td><td>{apartment.price}</td></tr>)}</tbody></table></div>
    <div className="floor-plan-gallery-heading-row"><h3>Галерея планировок</h3><span>Нажмите на карточку, чтобы увеличить</span></div>
    <div className="floor-plan-gallery-grid">{plans.map((plan) => <figure className="floor-plan-card" key={plan.planVariant} data-plan-variant={plan.planVariant}><button type="button" className="floor-plan-open" onClick={() => setSelected(plan)} aria-label={`Открыть планировку: ${plan.label}, ${plan.area}`}><FloorPlanDrawing plan={plan} /></button><figcaption><strong>{plan.label} · {plan.area}</strong><span>Нажмите, чтобы увеличить</span></figcaption></figure>)}</div>
    {selected ? <div className="floor-plan-modal" role="dialog" aria-modal="true" aria-labelledby="floor-plan-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><div className="floor-plan-modal-panel"><div className="floor-plan-modal-header"><div><p className="eyebrow">План квартиры</p><h3 id="floor-plan-modal-title">{selected.label} · {selected.area}</h3></div><button ref={closeButtonRef} type="button" className="floor-plan-modal-close" onClick={() => setSelected(null)}>Закрыть</button></div><FloorPlanDrawing plan={selected} large /><p>Схема демонстрационная. Фактические планировки и площади необходимо подтвердить у застройщика.</p></div></div> : null}
  </section>;
}

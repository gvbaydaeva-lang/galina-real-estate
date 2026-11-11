"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/lib/site-path";

const navigation = [
  { href: "/services", label: "Услуги" },
  { href: "/mortgage-programs", label: "Ипотека" },
  { href: "/#about", label: "Обо мне" },
  { href: "/contacts", label: "Контакты" },
];

const cityGroups = [
  { label: "Новостройки", cities: [
    { href: "/catalog/moscow", label: "Москва" },
    { href: "/catalog/spb", label: "Санкт-Петербург" },
    { href: "/catalog/krasnodar", label: "Краснодар" },
  ] },
  { label: "Недвижимость в Элисте", cities: [{ href: "/catalog/elista", label: "Жилая, коммерческая недвижимость и земельные участки" }] },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRealEstateOpen, setIsRealEstateOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const realEstateButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const closeMenu = () => {
    setIsOpen(false);
    setIsRealEstateOpen(false);
  };
  const homePath = sitePath("/");
  const isCurrent = (href: string) => {
    const resolvedPath = sitePath(href);
    return pathname === resolvedPath || pathname.startsWith(`${resolvedPath}/`);
  };

  useEffect(() => {
    if (!isOpen && !isRealEstateOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      setIsRealEstateOpen(false);
      if (isOpen) menuToggleRef.current?.focus();
      else realEstateButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isRealEstateOpen]);

  return (
    <header className="site-header">
      <a className="brand" href={homePath} aria-label="Галина Санджиева — на главную" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">Г</span><span>Галина Санджиева</span>
      </a>
      <button ref={menuToggleRef} className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="site-navigation" onClick={() => setIsOpen((value) => !value)}>
        <span className="menu-toggle-label">Меню</span><span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <nav id="site-navigation" className={`main-nav ${isOpen ? "main-nav-open" : ""}`} aria-label="Основная навигация">
        <a href={homePath} aria-current={pathname === homePath ? "page" : undefined} onClick={closeMenu}>Главная</a>
        <div className="nav-dropdown">
          <button ref={realEstateButtonRef} className="nav-dropdown-trigger" type="button" aria-expanded={isRealEstateOpen} aria-controls="real-estate-menu" aria-current={cityGroups.some((group) => group.cities.some((city) => isCurrent(city.href))) ? "page" : undefined} onClick={() => setIsRealEstateOpen((value) => !value)}>
            Недвижимость <span aria-hidden="true">⌄</span>
          </button>
          <div id="real-estate-menu" className="nav-dropdown-panel" hidden={!isRealEstateOpen}>
            {cityGroups.map((group) => <div className="nav-dropdown-group" key={group.label}><p>{group.label}</p>{group.cities.map((city) => <a key={city.href} href={sitePath(city.href)} aria-current={isCurrent(city.href) ? "page" : undefined} onClick={closeMenu}>{city.label}</a>)}</div>)}
          </div>
        </div>
        {navigation.map((item) => <a key={item.href} href={sitePath(item.href)} aria-current={item.href === "/#about" ? undefined : isCurrent(item.href) ? "page" : undefined} onClick={closeMenu}>{item.label}</a>)}
      </nav>
      <a className="header-cta" href={sitePath("/contacts")} onClick={closeMenu}>Открыть контакты</a>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { sitePath } from "@/lib/site-path";

const navigation = [
  { href: "/services", label: "Услуги" },
  { href: "/mortgage-programs", label: "Ипотека" },
  { href: "/faq", label: "Вопросы" },
  { href: "/contacts", label: "Контакты" },
];

const homepageNavigation = [
  { href: "/services", label: "Услуги" },
  { href: "/catalog/moscow", label: "Новостройки" },
  { href: "/mortgage-programs", label: "Ипотека" },
  { href: "/#about", label: "Обо мне" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);
  const homePath = sitePath("/");
  const isHomepage = pathname === homePath;
  const currentNavigation = isHomepage ? homepageNavigation : navigation;

  return (
    <header className="site-header">
      <a className="brand" href={homePath} aria-label="Галина Санджиева — на главную" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">Г</span><span>Галина Санджиева</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="site-navigation" onClick={() => setIsOpen((value) => !value)}>
        <span className="menu-toggle-label">Меню</span><span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <nav id="site-navigation" className={`main-nav ${isOpen ? "main-nav-open" : ""}`} aria-label="Основная навигация">
        <a href={homePath} aria-current={pathname === homePath ? "page" : undefined} onClick={closeMenu}>Главная</a>
        {currentNavigation.map((item) => <a key={item.href} href={sitePath(item.href)} aria-current={pathname === sitePath(item.href) || pathname.startsWith(`${sitePath(item.href)}/`) ? "page" : undefined} onClick={closeMenu}>{item.label}</a>)}
      </nav>
      <a className="header-cta" href={sitePath("/contacts")} onClick={closeMenu}>{isHomepage ? "Обсудить покупку" : "Открыть контакты"}</a>
    </header>
  );
}

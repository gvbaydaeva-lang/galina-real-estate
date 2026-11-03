"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/services", label: "Услуги" },
  { href: "/mortgage-programs", label: "Ипотека" },
  { href: "/faq", label: "Вопросы" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Галина Санджиева — на главную" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">Г</span><span>Галина Санджиева</span>
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="site-navigation" onClick={() => setIsOpen((value) => !value)}>
        <span className="menu-toggle-label">Меню</span><span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <nav id="site-navigation" className={`main-nav ${isOpen ? "main-nav-open" : ""}`} aria-label="Основная навигация">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={closeMenu}>Главная</Link>
        {navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined} onClick={closeMenu}>{item.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/contacts" onClick={closeMenu}>Обсудить задачу</Link>
    </header>
  );
}

"use client";

import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { sitePath } from "@/lib/site-path";

export function SiteFooter() {
  const pathname = usePathname();
  const isHomepage = pathname === sitePath("/");

  if (isHomepage) {
    return <footer className="site-footer">
      <span>Галина Санджиева · Недвижимость и ипотека<br />Подбор новостроек и сопровождение покупки</span>
      <nav aria-label="Навигация в подвале"><Link href="/">Главная</Link><Link href="/services">Услуги</Link><Link href="/catalog/moscow">Новостройки</Link><Link href="/mortgage-programs">Ипотека</Link><Link href="/#about">Обо мне</Link><Link href="/contacts">Контакты</Link></nav>
      <span>© {new Date().getFullYear()} Галина Санджиева. Информация на сайте носит справочный характер. Условия ипотечных программ и предложения объектов уточняются на дату обращения.</span>
    </footer>;
  }

  return <footer className="site-footer">
    <span>© {new Date().getFullYear()} Галина Санджиева</span>
    <nav aria-label="Навигация в подвале"><Link href="/services">Услуги</Link><Link href="/mortgage-programs">Ипотека</Link><Link href="/faq">FAQ</Link><Link href="/contacts">Контакты</Link></nav>
    <span>Сайт наполняется подтверждёнными данными.</span>
  </footer>;
}

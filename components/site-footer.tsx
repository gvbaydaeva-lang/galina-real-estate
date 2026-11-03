import Link from "@/components/site-link";

export function SiteFooter() {
  return <footer className="site-footer">
    <span>© {new Date().getFullYear()} Галина Санджиева</span>
    <nav aria-label="Навигация в подвале"><Link href="/services">Услуги</Link><Link href="/mortgage-programs">Ипотека</Link><Link href="/faq">FAQ</Link><Link href="/contacts">Контакты</Link></nav>
    <span>Сайт наполняется подтверждёнными данными.</span>
  </footer>;
}

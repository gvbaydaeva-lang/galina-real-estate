import Link from "@/components/site-link";

export function SiteFooter() {
  return <footer className="site-footer">
    <span>© {new Date().getFullYear()} Галина Санджиева</span>
    <nav aria-label="Навигация в подвале"><Link href="/services">Услуги</Link><Link href="/mortgage-programs">Ипотека</Link><Link href="/faq">FAQ</Link><Link href="/contacts">Контакты</Link></nav>
    <span>Материалы о недвижимости и ипотеке.</span>
  </footer>;
}

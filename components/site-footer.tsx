import { siteAssetPath } from "@/lib/site-path";

export function SiteFooter() {
  return <footer className="site-footer">
    <span className="site-footer-copyright">© 2026 Галина Санджиева</span>
    <span className="site-footer-partner">
      <span>Сделано при поддержке Центра «Мой бизнес» Республики Калмыкия</span>
      <img src={siteAssetPath("/images/partners/my-business-kalmykia.png")} alt="Логотип «Мой бизнес» Республики Калмыкия" />
    </span>
  </footer>;
}

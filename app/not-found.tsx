import type { Metadata } from "next";
import Link from "@/components/site-link";

export const metadata: Metadata = { title: "Страница не найдена", description: "Страница с таким адресом не опубликована на сайте.", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main id="content"><section className="not-found"><p className="eyebrow">Ошибка 404</p><h1>Страница не найдена.</h1><p>Проверьте адрес или вернитесь на главную страницу сайта.</p><Link className="button button-primary" href="/">На главную</Link></section></main>;
}

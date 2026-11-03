import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Страница не найдена", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main id="content"><section className="not-found"><p className="eyebrow">Ошибка 404</p><h1>Такой страницы пока нет.</h1><p>Возможно, адрес был введён с ошибкой или страница ещё не добавлена.</p><Link className="button button-primary" href="/">На главную</Link></section></main>;
}

import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sitePath } from "@/lib/site-path";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Галина Санджиева — недвижимость", template: "%s | Галина Санджиева" }, description: "Материалы о недвижимости и ипотеке без неподтверждённых условий.", icons: { icon: sitePath("/favicon.svg"), shortcut: sitePath("/favicon.svg") } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body><a className="skip-link" href="#content">К содержанию</a><SiteHeader />{children}<SiteFooter /></body></html>; }

import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Галина Санджиева — недвижимость", template: "%s | Галина Санджиева" }, description: "Персональное сопровождение покупки новостроек и ипотечных сделок.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body><a className="skip-link" href="#content">К содержанию</a><SiteHeader />{children}<SiteFooter /></body></html>; }

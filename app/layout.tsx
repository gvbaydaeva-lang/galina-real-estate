import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Галина Санджиева — недвижимость", description: "Персональное сопровождение покупки новостроек и ипотечных сделок.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body>{children}</body></html>; }

import { BackNavigation } from "./back-navigation";

type PageIntroProps = { eyebrow: string; title: string; children: React.ReactNode; backHref?: string; backLabel?: string };

export function PageIntro({ eyebrow, title, children, backHref = "/", backLabel = "На главную" }: PageIntroProps) {
  return <section className="page-intro"><BackNavigation href={backHref} label={backLabel} /><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-intro-copy">{children}</div></section>;
}

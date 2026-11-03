type PageIntroProps = { eyebrow: string; title: string; children: React.ReactNode };

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-intro-copy">{children}</div></section>;
}

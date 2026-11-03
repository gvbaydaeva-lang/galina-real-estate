import Link from "next/link";
import { notFound } from "next/navigation";

const cities = {
  moscow: { name: "Москва", heading: "Новостройки Москвы", note: "Подбор предложений по подтверждённым данным застройщиков и собственников." },
  spb: { name: "Санкт-Петербург", heading: "Новостройки Санкт-Петербурга", note: "Подбор предложений с учётом района, бюджета и сценария покупки." },
  krasnodar: { name: "Краснодар", heading: "Новостройки Краснодара", note: "Каталог будет наполнен после проверки актуальных карточек объектов." },
  elista: { name: "Элиста", heading: "Новостройки Элисты", note: "Каталог готовится с учётом подтверждённых особенностей городской инфраструктуры." },
} as const;

export default async function CityCatalogPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = cities[city as keyof typeof cities];
  if (!cityData) notFound();
  return <main><header className="inner-header"><Link className="brand" href="/"><span className="brand-mark">Г</span><span>Галина Санджиева</span></Link><Link className="header-cta" href="/mortgage-calculator">Рассчитать ипотеку</Link></header><section className="catalog-placeholder"><p className="eyebrow">Каталог · {cityData.name}</p><h1>{cityData.heading}</h1><p>{cityData.note}</p><div className="catalog-empty"><span>Каталог скоро появится здесь</span><small>Не публикуем объекты, цены и фотографии, пока они не подтверждены.</small></div><Link className="button button-primary" href="/">Вернуться на главную</Link></section></main>;
}

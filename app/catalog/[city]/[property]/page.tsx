import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLink from "@/components/site-link";
import { catalogCities, getCatalogCity, getCatalogProperty } from "@/content/catalog-cities";

type PropertyDetailPageProps = {
  params: Promise<{ city: string; property: string }>;
};

export function generateStaticParams() {
  return catalogCities.flatMap((city) => city.properties.map((property) => ({
    city: city.slug,
    property: property.id,
  })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { city, property: propertyId } = await params;
  const property = getCatalogProperty(city, propertyId);
  const cityData = getCatalogCity(city);

  return property && cityData
    ? { title: `${property.title} — ${cityData.name}`, description: `${property.title}: ${property.dealType} в локации ${property.district}.` }
    : {};
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { city, property: propertyId } = await params;
  const cityData = getCatalogCity(city);
  const property = getCatalogProperty(city, propertyId);

  if (!cityData || !property) notFound();

  return (
    <main id="content">
      <article className="property-detail">
        <p className="eyebrow">Каталог · {cityData.name}</p>
        <h1>{property.title}</h1>
        <p className="property-detail-lead">{property.dealType} в локации «{property.district}».</p>

        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- the verified project image is retained from the catalog source.
          <img className="property-detail-image" src={property.image.src} alt={property.image.alt} />
        ) : (
          <div className="property-detail-media-fallback" role="img" aria-label={`Фото ЖК «${property.title}»: уточняется`}>
            <strong>Фото проекта уточняется</strong>
            <span>Мы не подменяем его изображением другого ЖК.</span>
          </div>
        )}

        <section className="property-detail-information" aria-labelledby="property-information-heading">
          <h2 id="property-information-heading">Информация о ЖК</h2>
          <dl>
            <div><dt>Город</dt><dd>{cityData.name}</dd></div>
            <div><dt>Локация</dt><dd>{property.district}</dd></div>
            <div><dt>Формат</dt><dd>{property.dealType}</dd></div>
            <div><dt>Дата проверки сведений</dt><dd>{property.verifiedAt}</dd></div>
          </dl>
          <p>На странице указаны сведения из опубликованной карточки проекта. Детали планировок, сроков и условий уточняются перед публикацией.</p>
        </section>

        <SiteLink className="text-link" href={`/catalog/${cityData.slug}`}>Вернуться к каталогу {cityData.name} <span aria-hidden="true">→</span></SiteLink>
      </article>
    </main>
  );
}

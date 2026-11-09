import type { VerifiedProperty } from "../content/catalog-cities";
import SiteLink from "./site-link";

type PropertyCardProps = {
  property: VerifiedProperty;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      {property.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- verified sources are configured only when real listings are added.
        <img className="property-card-image" src={property.image.src} alt={property.image.alt} />
      ) : (
        <div className="property-card-media-fallback" role="img" aria-label={`Фото ЖК «${property.title}»: уточняется`}>
          <span>Фото проекта</span>
          <strong>уточняется</strong>
        </div>
      )}
      <div className="property-card-content">
        <p className="property-card-meta">{property.district} · {property.dealType}</p>
        <h2><SiteLink className="property-card-title-link" href={`/catalog/${property.citySlug}/${property.id}`}>{property.title}</SiteLink></h2>
        {property.price ? <p className="property-card-price">Цена: {property.price}</p> : null}
        {property.characteristics?.length ? (
          <ul className="property-card-characteristics">
            {property.characteristics.map((characteristic) => <li key={characteristic}>{characteristic}</li>)}
          </ul>
        ) : null}
        <p className="property-card-verified">Проверено: {property.verifiedAt}</p>
      </div>
    </article>
  );
}

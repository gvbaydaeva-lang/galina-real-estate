import type { VerifiedProperty } from "../content/catalog-cities";

type PropertyCardProps = {
  property: VerifiedProperty;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      {property.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- verified sources are configured only when real listings are added.
        <img className="property-card-image" src={property.image.src} alt={property.image.alt} />
      ) : null}
      <div className="property-card-content">
        <p className="property-card-meta">{property.district} · {property.dealType}</p>
        <h2>{property.title}</h2>
        <p className="property-card-developer">Застройщик: {property.developer}</p>
        {property.price ? <p className="property-card-price">Ориентир цены на дату проверки: {property.price}</p> : null}
        {property.characteristics?.length ? (
          <ul className="property-card-characteristics">
            {property.characteristics.map((characteristic) => <li key={characteristic}>{characteristic}</li>)}
          </ul>
        ) : null}
        <p className="property-card-verified">Проверено: {property.verifiedAt}</p>
        <a className="property-card-source" href={property.sourceUrl} target="_blank" rel="noreferrer">Официальный источник <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

import type { VerifiedProperty } from "../content/catalog-cities";

type PropertyCardProps = {
  property: VerifiedProperty;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      {property.image ? <img className="property-card-image" src={property.image.src} alt={property.image.alt} /> : null}
      <div className="property-card-content">
        <p className="property-card-meta">{property.district} · {property.dealType}</p>
        <h2>{property.title}</h2>
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

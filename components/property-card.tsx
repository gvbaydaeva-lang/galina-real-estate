import type { VerifiedProperty } from "../content/catalog-cities";
import SiteLink from "./site-link";

type PropertyCardProps = {
  property: VerifiedProperty;
  returnTo?: string;
};

export function PropertyCard({ property, returnTo }: PropertyCardProps) {
  const detailPath = `/catalog/${property.citySlug}/${property.id}`;
  const href = returnTo ? `${detailPath}?returnTo=${encodeURIComponent(returnTo)}` : detailPath;

  return (
    <SiteLink
      className="property-card-link"
      href={href}
      style={{ color: "inherit", display: "block", height: "100%", textDecoration: "none" }}
    >
      <article className="property-card" id={`property-${property.id}`}>
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
          <h2>{property.title}</h2>
          <div className="property-card-description">
            {property.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ul className="property-card-highlights">
            {property.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          {property.price ? <p className="property-card-price">Цена: {property.price}</p> : null}
          {property.characteristics?.length ? (
            <ul className="property-card-characteristics">
              {property.characteristics.map((characteristic) => <li key={characteristic}>{characteristic}</li>)}
            </ul>
          ) : null}
        </div>
      </article>
    </SiteLink>
  );
}

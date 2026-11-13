import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogCities, getCatalogCity, getCatalogProperty } from "@/content/catalog-cities";
import { PropertyDetailBackNavigation } from "@/components/property-detail-back-navigation";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { InquiryForm } from "@/components/inquiry-form";
import { MoscowPropertySections } from "@/components/moscow-property-sections";

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

const privateMoscowPropertyIds = new Set([
  "moscow-simvol",
  "moscow-sobytie",
  "moscow-shagal",
  "moscow-zilart",
  "moscow-level-michurinskiy",
]);

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
        <PropertyDetailBackNavigation
          citySlug={cityData.slug}
          propertyId={property.id}
          propertyDistrict={property.district}
          locations={cityData.locations}
          label={`Вернуться в каталог: ${cityData.name}`}
        />
        <p className="eyebrow">Каталог · {cityData.name}</p>
        <h1>{property.title}</h1>
        <p className="property-detail-lead">{property.dealType} в локации «{property.district}».{privateMoscowPropertyIds.has(property.id) ? "" : property.id === "moscow-ostrov" ? "" : property.developer ? ` Застройщик — ${property.developer}.` : ""}</p>

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
          </dl>
          <div className="property-detail-description">
            {property.detailDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ul className="property-detail-highlights">
            {(property.id === "moscow-ostrov" ? property.detailHighlights.filter((highlight) => highlight !== "Детали выбранного корпуса стоит уточнить") : property.detailHighlights).map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>

        {property.id === "moscow-ostrov" ? <div className="ostrov-detail-sections">
          <section className="ostrov-detail-section" aria-labelledby="ostrov-about-heading">
            <p className="eyebrow">01 · О проекте</p>
            <h2 id="ostrov-about-heading">О жилом комплексе</h2>
            <p>«Остров» расположен в Хорошёво-Мнёвниках, в Мнёвниковской пойме. На официальной странице проекта подтверждены близость Москвы-реки и природного парка, станции метро «Мнёвники» и «Терехово», а также разные форматы кварталов внутри проекта.</p>
          </section>
          <section className="ostrov-detail-section" aria-labelledby="ostrov-benefits-heading">
            <p className="eyebrow">02 · Среда</p>
            <h2 id="ostrov-benefits-heading">Расположение и преимущества ЖК „Остров“</h2>
            <p>«Остров» расположен в Хорошёво-Мнёвниках, рядом с Москвой-рекой и природными маршрутами Мнёвниковской поймы. В проекте соединены городская инфраструктура, прогулки у воды и несколько форматов кварталов для разных сценариев жизни.</p>
            <ul className="ostrov-benefits">
              <li>Москва-река</li>
              <li>Прогулочные пространства</li>
              <li>Кварталы разных форматов</li>
              <li>Школа и детский сад в проекте</li>
            </ul>
          </section>
          <section className="ostrov-detail-section" aria-labelledby="ostrov-plans-heading">
            <p className="eyebrow">03 · Выбор квартиры</p>
            <h2 id="ostrov-plans-heading">Какие квартиры представлены в ЖК „Остров“</h2>
            <p>В проекте представлены квартиры от одной до пяти комнат. Таблица показывает стартовые параметры, опубликованные на официальной странице проекта.</p>
            <div className="ostrov-apartment-table-wrap">
              <table className="ostrov-apartment-table">
                <caption className="sr-only">Стартовые площади и цены квартир в ЖК «Остров»</caption>
                <thead><tr><th scope="col">Тип квартиры</th><th scope="col">Площадь от</th><th scope="col">Стоимость от</th></tr></thead>
                <tbody>
                  <tr><th scope="row">1-комн.</th><td>от 39 м²</td><td>от 30 млн ₽</td></tr>
                  <tr><th scope="row">2-комн.</th><td>от 58 м²</td><td>от 43 млн ₽</td></tr>
                  <tr><th scope="row">3-комн.</th><td>от 67 м²</td><td>от 54 млн ₽</td></tr>
                  <tr><th scope="row">4-комн.</th><td>от 101 м²</td><td>от 73 млн ₽</td></tr>
                  <tr><th scope="row">5-комн.</th><td>от 139 м²</td><td>от 92 млн ₽</td></tr>
                </tbody>
              </table>
            </div>
            <div className="ostrov-plans-gallery" aria-labelledby="ostrov-plans-gallery-heading">
              <h3 id="ostrov-plans-gallery-heading">Галерея планировок</h3>
              <div className="ostrov-plans-grid">
                <figure>
                  <a href="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-14/b1/b1-s2-f2-p16.svg" target="_blank" rel="noreferrer">
                    <img src="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-14/b1/b1-s2-f2-p16.svg" alt="Планировка 1-комнатной квартиры, 39 м²" loading="lazy" />
                  </a>
                  <figcaption>1-комн. · 39 м²</figcaption>
                </figure>
                <figure>
                  <a href="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-14/b1/b1-s1-f2-p14.svg" target="_blank" rel="noreferrer">
                    <img src="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-14/b1/b1-s1-f2-p14.svg" alt="Планировка 2-комнатной квартиры, 58,4 м²" loading="lazy" />
                  </a>
                  <figcaption>2-комн. · 58,4 м²</figcaption>
                </figure>
                <figure>
                  <a href="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-12/b2/b2-f2-p2.svg" target="_blank" rel="noreferrer">
                    <img src="https://donstroy.moscow/hydra/svg/apartment/28/ostrov-12/b2/b2-f2-p2.svg" alt="Планировка 2-комнатной квартиры, 65,5 м²" loading="lazy" />
                  </a>
                  <figcaption>2-комн. · 65,5 м²</figcaption>
                </figure>
              </div>
            </div>
            <a className="button button-primary ostrov-plans-button" href="#ostrov-inquiry">Получить планировки и цены</a>
          </section>
          <section className="ostrov-detail-section" aria-labelledby="ostrov-status-heading">
            <p className="eyebrow">04 · Реализация проекта</p>
            <h2 id="ostrov-status-heading">Корпуса и сроки сдачи</h2>
            <p>Проект развивается поэтапно. Часть кварталов уже сдана. Статус и сроки конкретного корпуса уточняются при подборе.</p>
          </section>
          <section className="ostrov-detail-section" aria-labelledby="ostrov-mortgage-heading">
            <p className="eyebrow">05 · Покупка</p>
            <h2 id="ostrov-mortgage-heading">Ипотека и способы покупки</h2>
            <p>Для покупки доступны ипотека, субсидированные и государственные программы, а также онлайн-покупка. Итоговые условия зависят от выбранного банка и параметров сделки.</p>
            <MortgageCalculator cityName="Москва" initialPrice={29000000} headingLevel="h2" showBackNavigation={false} />
          </section>
          <section id="ostrov-inquiry" className="ostrov-detail-section" aria-labelledby="ostrov-inquiry-heading">
            <p className="eyebrow">06 · Консультация</p>
            <h2 id="ostrov-inquiry-heading">Заявка на подбор квартиры</h2>
            <InquiryForm publicCopy context={{ source: "страница ЖК", propertyId: property.id, propertyName: property.title, city: cityData.name, apartmentType: "" }} />
          </section>
        </div> : ["moscow-simvol", "moscow-sobytie", "moscow-shagal", "moscow-zilart", "moscow-level-michurinskiy"].includes(property.id) ? <MoscowPropertySections property={property} cityName={cityData.name} /> : null}

      </article>
    </main>
  );
}

export type CatalogCitySlug = "moscow" | "spb" | "krasnodar" | "elista";

export type VerifiedProperty = {
  id: string;
  citySlug: CatalogCitySlug;
  district: string;
  title: string;
  developer: string;
  dealType: string;
  verifiedAt: string;
  sourceUrl: string;
  price?: string;
  characteristics?: readonly string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type CatalogCity = {
  slug: CatalogCitySlug;
  name: string;
  heading: string;
  note: string;
  locationLabel: "Район" | "Район или микрорайон";
  locations: readonly string[];
  properties: readonly VerifiedProperty[];
};

export const catalogCities: readonly CatalogCity[] = [
  {
    slug: "moscow",
    name: "Москва",
    heading: "Новостройки Москвы",
    note: "Подбор предложений по подтверждённым данным застройщиков и собственников.",
    locationLabel: "Район",
    locations: ["Новая Москва", "Войковский", "Можайский", "Очаково-Матвеевское", "Печатники", "Аэропорт"],
    properties: [
      { id: "moscow-voikovskaya", citySlug: "moscow", district: "Войковский", title: "Левел Войковская", developer: "Level Group", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 18,3 млн ₽", characteristics: ["Бизнес-класс"], sourceUrl: "https://vojkovskaya.level.ru/" },
    ],
  },
  {
    slug: "spb",
    name: "Санкт-Петербург",
    heading: "Новостройки Санкт-Петербурга",
    note: "Подбор предложений с учётом района, бюджета и сценария покупки.",
    locationLabel: "Район",
    locations: ["Василеостровский", "Московский", "Невский", "Красногвардейский", "Приморский", "Выборгский"],
    properties: [
      { id: "spb-setl-loft", citySlug: "spb", district: "Московский", title: "Сэтл Лофт", developer: "Setl Group", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 8,6 млн ₽", sourceUrl: "https://setlgroup.ru/buildings/search/flats/object-setl-loft" },
      { id: "spb-legenda-u-morya", citySlug: "spb", district: "Василеостровский", title: "ЛЕГЕНДА У МОРЯ", developer: "LEGENDA", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 14 млн ₽", sourceUrl: "https://flats.legenda-dom.ru/special-offers/legenda-u-morya-offers" },
    ],
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    heading: "Новостройки Краснодара",
    note: "Каталог будет наполнен после проверки актуальных карточек объектов.",
    locationLabel: "Район",
    locations: ["Центральный", "Прикубанский", "Западный обход", "Карасунский", "Гидростроителей", "Черёмушки"],
    properties: [
      { id: "krasnodar-dogma-park", citySlug: "krasnodar", district: "Прикубанский", title: "DOGMA PARK", developer: "DOGMA", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 4,3 млн ₽", sourceUrl: "https://dogma.ru/projects/dogma-park" },
      { id: "krasnodar-samolet", citySlug: "krasnodar", district: "Западный обход", title: "МКР Самолёт", developer: "DOGMA", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 4,8 млн ₽", sourceUrl: "https://dogma.ru/projects/samolet" },
      { id: "krasnodar-rodnye-prostory", citySlug: "krasnodar", district: "Карасунский", title: "Родные Просторы", developer: "ГК ТОЧНО", dealType: "Новостройка", verifiedAt: "2026-11-05", price: "от 4 млн ₽", sourceUrl: "https://tochno.life/krasnodar/rodnye-prostory/kvartiri/" },
    ],
  },
  {
    slug: "elista",
    name: "Элиста",
    heading: "Новостройки Элисты",
    note: "Каталог готовится с учётом подтверждённых особенностей городской инфраструктуры.",
    locationLabel: "Район или микрорайон",
    locations: ["Центр", "1-й микрорайон", "2-й микрорайон", "3-й микрорайон", "5-й микрорайон", "Юго-Западный жилой массив"],
    properties: [],
  },
];

export function getCatalogCity(slug: string): CatalogCity | undefined {
  return catalogCities.find((city) => city.slug === slug);
}

export function filterProperties(
  properties: readonly VerifiedProperty[],
  district: string,
): VerifiedProperty[] {
  return properties.filter((property) => property.district === district);
}

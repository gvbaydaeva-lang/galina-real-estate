export type CatalogCitySlug = "moscow" | "spb" | "krasnodar" | "elista";

export type VerifiedProperty = {
  id: string;
  citySlug: CatalogCitySlug;
  district: string;
  title: string;
  dealType: string;
  verifiedAt: string;
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
    note: "Карточки объектов публикуются только после проверки актуальности данных.",
    locationLabel: "Район",
    locations: ["Пресненский", "Даниловский", "Раменки", "Хорошёво-Мнёвники", "Лефортово", "Новая Москва"],
    properties: [],
  },
  {
    slug: "spb",
    name: "Санкт-Петербург",
    heading: "Новостройки Санкт-Петербурга",
    note: "Информация в каталоге публикуется только после проверки актуальности данных.",
    locationLabel: "Район",
    locations: ["Приморский", "Московский", "Выборгский", "Невский", "Красногвардейский", "Пушкинский"],
    properties: [],
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    heading: "Новостройки Краснодара",
    note: "Карточки для каталога добавляются после проверки актуальности данных.",
    locationLabel: "Район",
    locations: ["Центральный", "Прикубанский", "Фестивальный", "Западный обход", "Энка", "Гидростроителей"],
    properties: [],
  },
  {
    slug: "elista",
    name: "Элиста",
    heading: "Новостройки Элисты",
    note: "Данные для каталога публикуются после проверки актуальности сведений.",
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

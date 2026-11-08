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

export const catalogPropertySources: Readonly<Record<string, string>> = {
  "moscow-ostrov": "https://post.donstroy.moscow/objects/ostrov/",
  "moscow-simvol": "https://post.donstroy.moscow/objects/simvol/",
  "moscow-sobytie": "https://post.donstroy.moscow/objects/sobytie/",
  "moscow-shagal": "https://etalongroup.ru/msk/news/gruppa-etalon-vvodit-v-ekspluatatsiyu-novyy-dom-v-zhilom-komplekse-shagal/",
  "moscow-zilart": "https://www.lsr.ru/msk/zhilye-kompleksy/zilart/",
  "moscow-level-michurinskiy": "https://level.ru/projects/michurinskiy/",
  "spb-astra-kontinental": "https://www.setlgroup.ru/projects/astra-kontinental",
  "spb-pulse-premier": "https://www.setlgroup.ru/projects/pulse-premier",
  "spb-setl-rivera": "https://setlgroup.ru/projects/setl-rivera",
  "spb-aristokrat": "https://setlgroup.ru/projects/aristokrat",
  "spb-paradnyi-ansambl": "https://setlgroup.ru/projects/paradnyi-ansambl",
  "spb-legenda-vasilevskogo": "https://legenda-dom.ru/",
  "krasnodar-park-pobedy-3": "https://dogma.ru/projects/park-pobedy-3",
  "krasnodar-grade": "https://dogma.ru/projects/grade",
  "krasnodar-reeds": "https://dogma.ru/projects/reeds",
  "krasnodar-record-2": "https://dogma.ru/projects/record-2",
  "krasnodar-samolet-7": "https://dogma.ru/projects/samolet-7",
  "krasnodar-dogma-park": "https://dogma.ru/projects/dogma-park",
};

export type CatalogCity = {
  slug: CatalogCitySlug;
  name: string;
  heading: string;
  note: string;
  locationLabel: "Район или локация" | "Район или микрорайон";
  locations: readonly string[];
  properties: readonly VerifiedProperty[];
};

export const catalogCities: readonly CatalogCity[] = [
  {
    slug: "moscow",
    name: "Москва",
    heading: "Новостройки Москвы",
    note: "Карточки объектов публикуются только после проверки актуальности данных.",
    locationLabel: "Район или локация",
    locations: ["Хорошёво-Мнёвники", "Лефортово", "Раменки", "Даниловский", "Очаково-Матвеевское"],
    properties: [
      { id: "moscow-ostrov", citySlug: "moscow", district: "Хорошёво-Мнёвники", title: "Остров", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-simvol", citySlug: "moscow", district: "Лефортово", title: "Символ", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-sobytie", citySlug: "moscow", district: "Раменки", title: "Событие", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-shagal", citySlug: "moscow", district: "Даниловский", title: "Shagal", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-zilart", citySlug: "moscow", district: "Даниловский", title: "ЗИЛАРТ", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-level-michurinskiy", citySlug: "moscow", district: "Очаково-Матвеевское", title: "Левел Мичуринский", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
    ],
  },
  {
    slug: "spb",
    name: "Санкт-Петербург",
    heading: "Новостройки Санкт-Петербурга",
    note: "Информация в каталоге публикуется только после проверки актуальности данных.",
    locationLabel: "Район или локация",
    locations: ["Невский", "Василеостровский", "Московский"],
    properties: [
      { id: "spb-astra-kontinental", citySlug: "spb", district: "Невский", title: "Астра Континенталь", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
      { id: "spb-pulse-premier", citySlug: "spb", district: "Невский", title: "Пульс Премьер", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
      { id: "spb-setl-rivera", citySlug: "spb", district: "Невский", title: "Сэтл Ривьера", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
      { id: "spb-aristokrat", citySlug: "spb", district: "Василеостровский", title: "Аристократ", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
      { id: "spb-paradnyi-ansambl", citySlug: "spb", district: "Московский", title: "Парадный ансамбль", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
      { id: "spb-legenda-vasilevskogo", citySlug: "spb", district: "Василеостровский", title: "ЛЕГЕНДА Васильевского", dealType: "Жилой комплекс", verifiedAt: "2026-11-08" },
    ],
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    heading: "Новостройки Краснодара",
    note: "Карточки для каталога добавляются после проверки актуальности данных.",
    locationLabel: "Район или локация",
    locations: ["Западный обход", "ул. Константиновская", "ул. Пригородная", "ул. Новороссийская", "ул. Марины Цветаевой"],
    properties: [
      { id: "krasnodar-park-pobedy-3", citySlug: "krasnodar", district: "Западный обход", title: "Парк Победы 3", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-grade", citySlug: "krasnodar", district: "ул. Константиновская", title: "ГРЕЙД", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-reeds", citySlug: "krasnodar", district: "ул. Пригородная", title: "РИДЗ", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-record-2", citySlug: "krasnodar", district: "ул. Новороссийская", title: "Рекорд 2", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-samolet-7", citySlug: "krasnodar", district: "Западный обход", title: "Самолёт 7", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-dogma-park", citySlug: "krasnodar", district: "ул. Марины Цветаевой", title: "ДОГМА ПАРК", dealType: "Жилой микрорайон", verifiedAt: "2026-11-08" },
    ],
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

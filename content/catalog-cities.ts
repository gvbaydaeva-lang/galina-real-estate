export type CatalogCitySlug = "moscow" | "spb" | "krasnodar" | "elista";

export type VerifiedProperty = {
  id: string;
  citySlug: CatalogCitySlug;
  district: string;
  title: string;
  dealType: string;
  verifiedAt: string;
  developer: string;
  housingClass: string;
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
    locations: ["Пресненский", "Даниловский", "Раменки", "Хорошёво-Мнёвники", "Очаково-Матвеевское", "Новая Москва"],
    properties: [
      { id: "moscow-level-michurinskiy", citySlug: "moscow", district: "Очаково-Матвеевское", title: "Левел Мичуринский, этапы 3 и 4", dealType: "Продажа", developer: "Level Group", housingClass: "Комфорт+", price: "от 15,7 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://level.ru/projects/michurinskij-komfort/" },
      { id: "moscow-donstroy-sobytie", citySlug: "moscow", district: "Раменки", title: "Событие", dealType: "Продажа", developer: "Донстрой", housingClass: "Бизнес и премиум", price: "от 22 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://donstroy.moscow/objects/sobytie/" },
      { id: "moscow-donstroy-reka", citySlug: "moscow", district: "Раменки", title: "Река", dealType: "Продажа", developer: "Донстрой", housingClass: "Премиум", price: "от 57 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://donstroy.moscow/objects/reka/" },
      { id: "moscow-donstroy-ostrov", citySlug: "moscow", district: "Хорошёво-Мнёвники", title: "Остров", dealType: "Продажа", developer: "Донстрой", housingClass: "Бизнес, премиум и делюкс", price: "от 29 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://donstroy.moscow/objects/ostrov/" },
      { id: "moscow-level-michurinskiy-1-2", citySlug: "moscow", district: "Очаково-Матвеевское", title: "Левел Мичуринский, этапы 1 и 2", dealType: "Продажа", developer: "Level Group", housingClass: "Бизнес", price: "от 57,4 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://level.ru/projects/michurinskiy/" },
    ],
  },
  {
    slug: "spb",
    name: "Санкт-Петербург",
    heading: "Новостройки Санкт-Петербурга",
    note: "Подбор предложений с учётом района, бюджета и сценария покупки.",
    locationLabel: "Район",
    locations: ["Приморский", "Московский", "Выборгский", "Невский", "Василеостровский", "Пушкинский"],
    properties: [
      { id: "spb-setl-titul", citySlug: "spb", district: "Московский", title: "Титул в Московском", dealType: "Продажа", developer: "Setl Group", housingClass: "Высокий комфорт", price: "от 8,6 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://setlgroup.ru/projects/titul-v-moskovskom" },
      { id: "spb-setl-aristokrat", citySlug: "spb", district: "Василеостровский", title: "Аристократ", dealType: "Продажа", developer: "Setl Group", housingClass: "Бизнес", price: "от 13,1 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://setlgroup.ru/projects/aristokrat" },
      { id: "spb-setl-astra", citySlug: "spb", district: "Невский", title: "Астра Континенталь", dealType: "Продажа", developer: "Setl Group", housingClass: "Высокий комфорт", price: "от 10,2 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://www.setlgroup.ru/projects/astra-kontinental" },
      { id: "spb-glorax-pargolovo", citySlug: "spb", district: "Выборгский", title: "GloraX Парголово", dealType: "Продажа", developer: "GloraX", housingClass: "Комфорт", price: "от 5,7 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://glorax.com/projects/glorax-pargolovo" },
      { id: "spb-yuntolovo", citySlug: "spb", district: "Приморский", title: "Юнтолово", dealType: "Продажа", developer: "Главстрой Санкт-Петербург", housingClass: "Комфорт", price: "от 9,5 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://yuntolovo.glavstroy-spb.ru/standart" },
    ],
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    heading: "Новостройки Краснодара",
    note: "Каталог будет наполнен после проверки актуальных карточек объектов.",
    locationLabel: "Район",
    locations: ["Центральный", "Прикубанский", "Карасунский округ", "Западный обход", "Черёмушки", "Пригородная"],
    properties: [
      { id: "krasnodar-dogma-rekord-2", citySlug: "krasnodar", district: "Черёмушки", title: "Рекорд 2", dealType: "Продажа", developer: "DOGMA", housingClass: "Бизнес", price: "от 7,8 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://dogma.ru/projects/record2" },
      { id: "krasnodar-dogma-grade", citySlug: "krasnodar", district: "Прикубанский", title: "ГРЕЙД", dealType: "Продажа", developer: "DOGMA", housingClass: "Бизнес", price: "от 4,5 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://dogma.ru/projects/grade" },
      { id: "krasnodar-dogma-samolet-7", citySlug: "krasnodar", district: "Западный обход", title: "Самолёт 7", dealType: "Продажа", developer: "DOGMA", housingClass: "Бизнес", price: "от 5,4 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://dogma.ru/projects/samolet7" },
      { id: "krasnodar-dogma-reeds", citySlug: "krasnodar", district: "Пригородная", title: "РИДЗ", dealType: "Продажа", developer: "DOGMA", housingClass: "Бизнес", price: "от 4,7 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://dogma.ru/projects/reeds" },
      { id: "krasnodar-tochno-patriki", citySlug: "krasnodar", district: "Карасунский округ", title: "Патрики", dealType: "Продажа", developer: "ГК ТОЧНО", housingClass: "Бизнес", price: "от 9,034 млн ₽", verifiedAt: "2026-11-05", sourceUrl: "https://tochno.life/krasnodar/patriki/kvartiri/" },
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

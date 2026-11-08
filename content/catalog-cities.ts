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
      { id: "moscow-ostrov", citySlug: "moscow", district: "Хорошёво-Мнёвники", title: "Остров", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://post.donstroy.moscow/upload/iblock/2ad/576wokksc4n024n4gfvltb32d6y84m6i.jpg", alt: "Фото ЖК «Остров»" } },
      { id: "moscow-simvol", citySlug: "moscow", district: "Лефортово", title: "Символ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://post.donstroy.moscow/upload/iblock/b49/smxkon6cqi5y7de1btamgrz97efgl5tp.jpg", alt: "Фото ЖК «Символ»" } },
      { id: "moscow-sobytie", citySlug: "moscow", district: "Раменки", title: "Событие", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://post.donstroy.moscow/upload/iblock/4e6/ltj1ggb75sgazue2crrsul5pymbkq3l7.jpg", alt: "Фото ЖК «Событие»" } },
      { id: "moscow-shagal", citySlug: "moscow", district: "Даниловский", title: "Shagal", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://etalongroup.ru/upload/kelnik.adminpage/63a/jdv10mg3wjbmo2foqbyxe5fuezh4ki41/Gruppa-_Etalon_-vvodit-v-ekspluatatsiyu-novyy-dom-v-zhilom-komplekse-Shagal-1_1.jpg", alt: "Фото ЖК «Shagal»" } },
      { id: "moscow-zilart", citySlug: "moscow", district: "Даниловский", title: "ЗИЛАРТ", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "moscow-level-michurinskiy", citySlug: "moscow", district: "Очаково-Матвеевское", title: "Левел Мичуринский", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://cdn.level.ru/media/project/snippet/bc1fd3f209c5c1dc1a1e54f49873d90c24e9082b.jpg", alt: "Фото ЖК «Левел Мичуринский»" } },
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
      { id: "spb-astra-kontinental", citySlug: "spb", district: "Невский", title: "Астра Континенталь", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/10f8deb3-622c-4e75-b610-676b7e98be7a.jpg", alt: "Фото ЖК «Астра Континенталь»" } },
      { id: "spb-pulse-premier", citySlug: "spb", district: "Невский", title: "Пульс Премьер", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/82ec86b4-bf34-45bc-b712-3f1aa71d4a14.jpg", alt: "Фото ЖК «Пульс Премьер»" } },
      { id: "spb-setl-rivera", citySlug: "spb", district: "Невский", title: "Сэтл Ривьера", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/0425442d-0336-4708-b47a-569e8154c3ed.jpg", alt: "Фото ЖК «Сэтл Ривьера»" } },
      { id: "spb-aristokrat", citySlug: "spb", district: "Василеостровский", title: "Аристократ", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/ed594c4e-86e9-4f5d-b8c7-f008cdae7781.jpg", alt: "Фото ЖК «Аристократ»" } },
      { id: "spb-paradnyi-ansambl", citySlug: "spb", district: "Московский", title: "Парадный ансамбль", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/b09964d1-d18e-4c65-9a66-60346972a22c.jpg", alt: "Фото ЖК «Парадный ансамбль»" } },
      { id: "spb-legenda-vasilevskogo", citySlug: "spb", district: "Василеостровский", title: "ЛЕГЕНДА Васильевского", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", image: { src: "https://cdn.legenda-dom.ru/corporate/image.jpg", alt: "Фото ЖК «ЛЕГЕНДА Васильевского»" } },
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
      { id: "krasnodar-grade", citySlug: "krasnodar", district: "ул. Константиновская", title: "ГРЕЙД", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://storage.yandexcloud.net/t2v-storage/images/26b9dbd0-4442-4b7d-9a3a-8ff65b24248b/w800.webp", alt: "Фото ЖК «ГРЕЙД»" } },
      { id: "krasnodar-reeds", citySlug: "krasnodar", district: "ул. Пригородная", title: "РИДЗ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", image: { src: "https://storage.yandexcloud.net/t2v-storage/images/8f8f9dca-33fe-4d38-b464-7508fd3ca595/w800.webp", alt: "Фото ЖК «РИДЗ»" } },
      { id: "krasnodar-record-2", citySlug: "krasnodar", district: "ул. Новороссийская", title: "Рекорд 2", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-samolet-7", citySlug: "krasnodar", district: "Западный обход", title: "Самолёт 7", dealType: "Жилой квартал", verifiedAt: "2026-11-08" },
      { id: "krasnodar-dogma-park", citySlug: "krasnodar", district: "ул. Марины Цветаевой", title: "ДОГМА ПАРК", dealType: "Жилой микрорайон", verifiedAt: "2026-11-08", image: { src: "https://storage.yandexcloud.net/t2v-storage/images/d6fbc28d-3f1c-43b1-a62d-fb48568bfae6/w800.webp", alt: "Фото ЖК «ДОГМА ПАРК»" } },
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

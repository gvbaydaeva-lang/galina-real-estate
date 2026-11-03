export const catalogCities = [
  {
    slug: "moscow",
    name: "Москва",
    heading: "Новостройки Москвы",
    note: "Подбор предложений по подтверждённым данным застройщиков и собственников.",
  },
  {
    slug: "spb",
    name: "Санкт-Петербург",
    heading: "Новостройки Санкт-Петербурга",
    note: "Подбор предложений с учётом района, бюджета и сценария покупки.",
  },
  {
    slug: "krasnodar",
    name: "Краснодар",
    heading: "Новостройки Краснодара",
    note: "Каталог будет наполнен после проверки актуальных карточек объектов.",
  },
  {
    slug: "elista",
    name: "Элиста",
    heading: "Новостройки Элисты",
    note: "Каталог готовится с учётом подтверждённых особенностей городской инфраструктуры.",
  },
] as const;

export function getCatalogCity(slug: string) {
  return catalogCities.find((city) => city.slug === slug);
}

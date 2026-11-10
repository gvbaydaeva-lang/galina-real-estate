export type CatalogCitySlug = "moscow" | "spb" | "krasnodar" | "elista";

export type VerifiedProperty = {
  id: string;
  citySlug: CatalogCitySlug;
  district: string;
  title: string;
  dealType: string;
  verifiedAt: string;
  description: readonly string[];
  highlights: readonly string[];
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
  "krasnodar-park-pobedy-3": "https://dogma.ru/projects/park-pobedy3",
  "krasnodar-grade": "https://dogma.ru/projects/grade",
  "krasnodar-reeds": "https://dogma.ru/projects/reeds",
  "krasnodar-record-2": "https://dogma.ru/projects/record2",
  "krasnodar-samolet-7": "https://dogma.ru/projects/samolet7",
  "krasnodar-dogma-park": "https://dogma.ru/projects/dogma-park",
};

const propertyDetails: Readonly<Record<string, Pick<VerifiedProperty, "description" | "highlights">>> = {
  "moscow-ostrov": { description: ["«Остров» расположен в Хорошёво-Мнёвниках, у Москвы-реки. Внутри одного проекта застройщик развивает кварталы разных форматов, поэтому при выборе важно смотреть характеристики конкретного корпуса.", "В проекте заявлены прогулочные пространства у воды и инфраструктура для повседневной жизни. Для семейного сценария на официальной странице отдельно выделен квартал рядом со школой и детским садом."], highlights: ["Локация у Москвы-реки", "Кварталы разных форматов", "Прогулочные пространства", "Школа и детский сад в проекте"] },
  "moscow-simvol": { description: ["«Символ» — сформировавшаяся городская среда в Лефортове, недалеко от исторического центра Москвы. Проект объединяет жилые дома, общественные пространства и уже работающую инфраструктуру.", "Главная прогулочная ось проекта — парк «Зелёная река» с променадами, площадками для спорта и детей. В разных кварталах предусмотрены свои сценарии: камерные дворы, семейный променад, школа и детский сад."], highlights: ["Район Лефортово", "Парк «Зелёная река»", "Пешеходные и веломаршруты", "Школа и детский сад", "Действующая инфраструктура"] },
  "moscow-sobytie": { description: ["Парк-квартал «Событие» расположен в Раменках, на Мосфильмовской улице. В проекте сочетаются дома бизнес- и премиального формата, городская инфраструктура и доступ к природному парку.", "Важная часть среды — парк «Событие»: здесь заявлены прогулочные и веломаршруты, места для отдыха, детские и спортивные площадки. В составе квартала также заявлен образовательный комплекс со школой и детским садом."], highlights: ["Раменки и Мосфильмовская улица", "Парк «Событие» рядом с домами", "Прогулочные и веломаршруты", "Школа и детский сад", "Общественные пространства"] },
  "moscow-shagal": { description: ["Shagal — жилой комплекс в Даниловском районе, рядом с набережной Марка Шагала. Проект развивается поэтапно; на официальной странице сообщается о вводе в эксплуатацию новых корпусов.", "В одном из введённых домов предусмотрены квартиры с разными форматами открытых пространств, кладовые и помещения под сервисы. Для автомобилей заявлен подземный паркинг; конкретное наполнение следует уточнять по выбранному корпусу."], highlights: ["Даниловский район", "Локация у набережной", "Корпуса переменной этажности", "Кладовые и сервисные помещения", "Подземный паркинг"] },
  "moscow-zilart": { description: ["«ЗИЛАРТ» — крупный жилой район в Даниловском районе, на территории у Москвы-реки. Проект строится как самостоятельная городская среда с новыми улицами, общественными пространствами и объектами повседневной инфраструктуры.", "В окружении и составе района застройщик указывает набережную, парк «Тюфелева роща», культурные объекты и образовательный кластер. Перед выбором квартиры стоит сопоставить корпус с конкретной очередью и ближайшими уже работающими объектами."], highlights: ["Даниловский район и Москва-река", "Парк «Тюфелева роща»", "Набережная и бульвары", "Школа и детские сады", "Культурные и спортивные объекты"] },
  "moscow-level-michurinskiy": { description: ["«Левел Мичуринский» расположен в Очаково-Матвеевском, в зелёной части запада Москвы. Первая и вторая очереди включают шесть сданных корпусов; проект относится к бизнес-классу.", "На официальной странице отмечены близость двух станций метро, парки и пруды в окружении, а также образовательная среда внутри проекта. В составе территории заявлены школа, три детских сада и благоустроенные пространства."], highlights: ["Очаково-Матвеевское", "Сданные корпуса первых очередей", "Две станции метро в пешей доступности", "Школа и три детских сада", "Парки и пруды в окружении"] },
  "spb-astra-kontinental": { description: ["«Астра Континенталь» строится в Невском районе, недалеко от Невы и станции метро «Елизаровская». Проект соединяет городскую локацию с крупным благоустройством внутри квартала.", "Застройщик заявляет школу, три детских сада, часть из которых с бассейнами, и подземный паркинг. В благоустройстве запланированы спортивный парк, променад с фонтанами и закрытые дворы-патио."], highlights: ["Невский район и набережная Невы", "Метро «Елизаровская» рядом", "Школа и три детских сада", "Парк «Город Спорта»", "Закрытые дворы-патио"] },
  "spb-pulse-premier": { description: ["«Пульс Премьер» расположен у берега Невы, между Октябрьской набережной и Дальневосточным проспектом. Разновысотные корпуса формируют квартал с видами на реку из части квартир.", "В проекте заявлены школа, три детских сада и поликлиника. Для прогулок предусмотрен пешеходный маршрут через территорию, а дворы закрыты для автомобилей и дополнены зелёными зонами и площадками."], highlights: ["Первая береговая линия Невы", "Пешеходный променад", "Школа, детские сады и поликлиника", "Закрытые зелёные дворы", "Несколько станций метро поблизости"] },
  "spb-setl-rivera": { description: ["«Сэтл Ривьера» — проект на Октябрьской набережной, на первой линии Невы. В квартале заявлены две очереди и дома средней этажности с закрытыми дворами.", "Для территории запланированы школа, два детских сада, спортивный кластер и прогулочный променад. Внутренние пространства дополнят сады, площадки для отдыха и спорта; для автомобилей заявлен подземный паркинг."], highlights: ["Первая линия Невы", "Школа и два детских сада", "Спортивный кластер Setl Sport", "Прогулочный променад", "Закрытые дворы"] },
  "spb-aristokrat": { description: ["«Аристократ» — жилой комплекс в исторической части Васильевского острова. Проект ориентирован на городскую жизнь рядом с культурными площадками, набережными и общественными пространствами района.", "На территории заявлены торговая галерея, детский сад, кабинет врача и клуб резидентов. В клубе предусмотрены общие пространства для работы, спорта и семейного досуга; во дворах запланированы приватные зелёные зоны."], highlights: ["Историческая часть Васильевского острова", "Детский сад и кабинет врача", "Клуб резидентов", "Торговая галерея", "Зелёные дворы и променад"] },
  "spb-paradnyi-ansambl": { description: ["«Парадный ансамбль» — малоэтажный квартал в Московском районе Санкт-Петербурга. Проект строится как спокойная среда с парком, пешеходными маршрутами и разделением автомобильных и пешеходных потоков.", "В составе комплекса заявлены восемь детских садов и четыре школы, закрытые от машин дворы и подземный паркинг. Для прогулок предусмотрены бульвар, парк, площадь и благоустроенная набережная ручья."], highlights: ["Московский район", "Малоэтажные дома", "Восемь детских садов и четыре школы", "Закрытые дворы без машин", "Парк, бульвар и экотропа"] },
  "spb-legenda-vasilevskogo": { description: ["«ЛЕГЕНДА Васильевского» — жилой кластер на Васильевском острове, рядом с Финским заливом и Севкабель Портом. Его окружение сочетает набережные, культурные площадки и новые городские маршруты.", "Официальная страница описывает проект как среду для разных сценариев жизни и досуга. При выборе конкретного корпуса стоит дополнительно проверить состав благоустройства, сервисов и планировочных решений выбранной очереди."], highlights: ["Васильевский остров", "Близость к Финскому заливу", "Рядом Севкабель Порт", "Культурные и досуговые точки", "Разные сценарии городской жизни"] },
  "krasnodar-park-pobedy-3": { description: ["«Парк Победы 3» — жилой квартал на Западном обходе Краснодара. Проект заявлен как часть развивающейся городской локации с собственным бульваром, озеленением и общественными пространствами.", "Внутри квартала застройщик указывает площадки для детей и взрослых, зоны тренировок, лобби, коворкинг, клуб резидентов, кладовые и подземный паркинг. Рядом заявлено развитие крупной рекреационной территории «Парк достижений»."], highlights: ["Западный обход", "Прогулочный бульвар", "Плейхабы и спортивные зоны", "Коворкинг и клуб резидентов", "Подземный паркинг"] },
  "krasnodar-grade": { description: ["«ГРЕЙД» — жилой квартал на улице Константиновской в Краснодаре. Проект объединяет жилые дома, закрытые дворы без машин, прогулочные аллеи и общественные пространства.", "На территории заявлены детские и спортивные площадки, сквер, фонтанный комплекс, сервисы на первых этажах и физкультурно-оздоровительный комплекс. В окружении отмечены поликлиника, школа искусств и парк Галицкого."], highlights: ["Улица Константиновская", "Закрытые дворы без машин", "Сквер и прогулочные аллеи", "Спортивная и коммерческая инфраструктура", "Парк Галицкого рядом"] },
  "krasnodar-reeds": { description: ["«РИДЗ» расположен на улице Пригородной в Краснодаре, вдоль тихой реки. Проект строится как квартал с закрытой территорией, зелёным бульваром и общими пространствами в домах.", "Застройщик заявляет гранд-лобби, клуб резидентов, подземный паркинг, охрану и коммерческие сервисы на первых этажах. Для семей и активного отдыха предусмотрены детские и спортивные площадки."], highlights: ["Улица Пригородная и река", "Закрытая территория", "Прогулочный зелёный бульвар", "Гранд-лобби и клуб резидентов", "Подземный паркинг"] },
  "krasnodar-record-2": { description: ["«Рекорд 2» — жилой квартал в микрорайоне Черёмушки, на улице Новороссийской. В проекте представлены разные форматы квартир — от компактных до семейных, а часть планировок имеет дополнительные пространства.", "На территории заявлены школа, детский сад, зоны отдыха, детские и спортивные площадки. Для автомобилей предусмотрены гостевые, многоуровневые и подземные парковки; заявлена система бесконтактного доступа."], highlights: ["Микрорайон Черёмушки", "Школа и детский сад", "Сад и зоны отдыха", "Спортивные и игровые площадки", "Несколько форматов парковки"] },
  "krasnodar-samolet-7": { description: ["«Самолёт 7» — квартал на Западном обходе Краснодара, развиваемый в концепции «города в городе». В благоустройстве заявлены собственная река, двор-сад с японскими мотивами и пространства для активного отдыха.", "В составе квартала застройщик указывает детский сад, поликлинику, спортивную зону SportHub, гранд-лобби и клуб резидентов. Также заявлены современные цифровые решения и закрытая территория."], highlights: ["Западный обход", "Собственная река и двор-сад", "Детский сад и поликлиника", "SportHub для активного отдыха", "Гранд-лобби и клуб резидентов"] },
  "krasnodar-dogma-park": { description: ["DОГМА ПАРК — жилой микрорайон на северо-западе Краснодара, в районе Западного обхода. Проект сочетает городские сервисы с большими зелёными территориями для отдыха и прогулок.", "В составе микрорайона заявлены дендропарк, места для спорта, школы и детские сады, разные форматы парковки и безбарьерные лобби. Отдельно застройщик сообщает о термальном комплексе и SPA-зонах в проекте."], highlights: ["Северо-запад Краснодара", "Дендропарк и зоны отдыха", "Три школы и пять детских садов", "Подземные и многоуровневые парковки", "Термальный комплекс и SPA-зоны"] },
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
      { id: "moscow-ostrov", citySlug: "moscow", district: "Хорошёво-Мнёвники", title: "Остров", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-ostrov"], image: { src: "https://post.donstroy.moscow/upload/iblock/2ad/576wokksc4n024n4gfvltb32d6y84m6i.jpg", alt: "Фото ЖК «Остров»" } },
      { id: "moscow-simvol", citySlug: "moscow", district: "Лефортово", title: "Символ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-simvol"], image: { src: "https://post.donstroy.moscow/upload/iblock/b49/smxkon6cqi5y7de1btamgrz97efgl5tp.jpg", alt: "Фото ЖК «Символ»" } },
      { id: "moscow-sobytie", citySlug: "moscow", district: "Раменки", title: "Событие", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-sobytie"], image: { src: "https://post.donstroy.moscow/upload/iblock/4e6/ltj1ggb75sgazue2crrsul5pymbkq3l7.jpg", alt: "Фото ЖК «Событие»" } },
      { id: "moscow-shagal", citySlug: "moscow", district: "Даниловский", title: "Shagal", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-shagal"], image: { src: "https://etalongroup.ru/upload/kelnik.adminpage/63a/jdv10mg3wjbmo2foqbyxe5fuezh4ki41/Gruppa-_Etalon_-vvodit-v-ekspluatatsiyu-novyy-dom-v-zhilom-komplekse-Shagal-1_1.jpg", alt: "Фото ЖК «Shagal»" } },
      { id: "moscow-zilart", citySlug: "moscow", district: "Даниловский", title: "ЗИЛАРТ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-zilart"] },
      { id: "moscow-level-michurinskiy", citySlug: "moscow", district: "Очаково-Матвеевское", title: "Левел Мичуринский", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["moscow-level-michurinskiy"], image: { src: "https://cdn.level.ru/media/project/snippet/bc1fd3f209c5c1dc1a1e54f49873d90c24e9082b.jpg", alt: "Фото ЖК «Левел Мичуринский»" } },
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
      { id: "spb-astra-kontinental", citySlug: "spb", district: "Невский", title: "Астра Континенталь", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-astra-kontinental"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/10f8deb3-622c-4e75-b610-676b7e98be7a.jpg", alt: "Фото ЖК «Астра Континенталь»" } },
      { id: "spb-pulse-premier", citySlug: "spb", district: "Невский", title: "Пульс Премьер", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-pulse-premier"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/82ec86b4-bf34-45bc-b712-3f1aa71d4a14.jpg", alt: "Фото ЖК «Пульс Премьер»" } },
      { id: "spb-setl-rivera", citySlug: "spb", district: "Невский", title: "Сэтл Ривьера", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-setl-rivera"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/0425442d-0336-4708-b47a-569e8154c3ed.jpg", alt: "Фото ЖК «Сэтл Ривьера»" } },
      { id: "spb-aristokrat", citySlug: "spb", district: "Василеостровский", title: "Аристократ", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-aristokrat"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/ed594c4e-86e9-4f5d-b8c7-f008cdae7781.jpg", alt: "Фото ЖК «Аристократ»" } },
      { id: "spb-paradnyi-ansambl", citySlug: "spb", district: "Московский", title: "Парадный ансамбль", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-paradnyi-ansambl"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/b09964d1-d18e-4c65-9a66-60346972a22c.jpg", alt: "Фото ЖК «Парадный ансамбль»" } },
      { id: "spb-legenda-vasilevskogo", citySlug: "spb", district: "Василеостровский", title: "ЛЕГЕНДА Васильевского", dealType: "Жилой комплекс", verifiedAt: "2026-11-08", ...propertyDetails["spb-legenda-vasilevskogo"] },
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
      { id: "krasnodar-park-pobedy-3", citySlug: "krasnodar", district: "Западный обход", title: "Парк Победы 3", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-park-pobedy-3"] },
      { id: "krasnodar-grade", citySlug: "krasnodar", district: "ул. Константиновская", title: "ГРЕЙД", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-grade"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/26b9dbd0-4442-4b7d-9a3a-8ff65b24248b/w800.webp", alt: "Фото ЖК «ГРЕЙД»" } },
      { id: "krasnodar-reeds", citySlug: "krasnodar", district: "ул. Пригородная", title: "РИДЗ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-reeds"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/8f8f9dca-33fe-4d38-b464-7508fd3ca595/w800.webp", alt: "Фото ЖК «РИДЗ»" } },
      { id: "krasnodar-record-2", citySlug: "krasnodar", district: "ул. Новороссийская", title: "Рекорд 2", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-record-2"] },
      { id: "krasnodar-samolet-7", citySlug: "krasnodar", district: "Западный обход", title: "Самолёт 7", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-samolet-7"] },
      { id: "krasnodar-dogma-park", citySlug: "krasnodar", district: "ул. Марины Цветаевой", title: "ДОГМА ПАРК", dealType: "Жилой микрорайон", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-dogma-park"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/d6fbc28d-3f1c-43b1-a62d-fb48568bfae6/w800.webp", alt: "Фото ЖК «ДОГМА ПАРК»" } },
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

export function getCatalogProperty(citySlug: string, propertyId: string): VerifiedProperty | undefined {
  return getCatalogCity(citySlug)?.properties.find((property) => property.id === propertyId);
}

export function filterProperties(
  properties: readonly VerifiedProperty[],
  district: string,
): VerifiedProperty[] {
  return properties.filter((property) => property.district === district);
}

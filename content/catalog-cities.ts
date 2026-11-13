export type CatalogCitySlug = "moscow" | "spb" | "krasnodar" | "elista";

export type ApartmentOffer = {
  type: string;
  areaFrom: number;
  priceFrom?: number;
  handover?: string;
  phase?: string;
  useForMortgage?: boolean;
};

export type PlanGalleryItem = {
  src?: string;
  alt: string;
  caption: string;
  offerIndex?: number;
  rightsStatus: "approved" | "needs-approval";
};

export type PropertyPhase = {
  name: string;
  status: string;
  details: readonly string[];
};

export type VerifiedProperty = {
  id: string;
  citySlug: CatalogCitySlug;
  district: string;
  title: string;
  dealType: string;
  developer?: string;
  verifiedAt: string;
  description: readonly string[];
  highlights: readonly string[];
  detailDescription: readonly string[];
  detailHighlights: readonly string[];
  price?: string;
  characteristics?: readonly string[];
  status?: string;
  plansNote?: string;
  apartmentOffers?: readonly ApartmentOffer[];
  planGallery?: readonly PlanGalleryItem[];
  phases?: readonly PropertyPhase[];
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

const compactPropertyDetails: Readonly<Record<string, Pick<VerifiedProperty, "description" | "highlights">>> = {
  "moscow-ostrov": { description: ["«Остров» расположен в Хорошёво-Мнёвниках, у Москвы-реки. Внутри одного проекта представлены кварталы разных форматов, поэтому при выборе важно смотреть характеристики конкретного корпуса.", "В проекте заявлены прогулочные пространства у воды и инфраструктура для повседневной жизни. Для семейного сценария на официальной странице отдельно выделен квартал рядом со школой и детским садом."], highlights: ["Локация у Москвы-реки", "Кварталы разных форматов", "Прогулочные пространства", "Школа и детский сад в проекте"] },
  "moscow-simvol": { description: ["«Символ» — сформировавшаяся городская среда в Лефортове, недалеко от исторического центра Москвы. Проект объединяет жилые дома, общественные пространства и уже работающую инфраструктуру.", "Главная прогулочная ось проекта — парк «Зелёная река» с променадами, площадками для спорта и детей. В разных кварталах предусмотрены свои сценарии: камерные дворы, семейный променад, школа и детский сад."], highlights: ["Район Лефортово", "Парк «Зелёная река»", "Пешеходные и веломаршруты", "Школа и детский сад", "Действующая инфраструктура"] },
  "moscow-sobytie": { description: ["Парк-квартал «Событие» расположен в Раменках, на Мосфильмовской улице. В проекте сочетаются дома бизнес- и премиального формата, городская инфраструктура и доступ к природному парку.", "Важная часть среды — парк «Событие»: здесь заявлены прогулочные и веломаршруты, места для отдыха, детские и спортивные площадки. В составе квартала также заявлен образовательный комплекс со школой и детским садом."], highlights: ["Раменки и Мосфильмовская улица", "Парк «Событие» рядом с домами", "Прогулочные и веломаршруты", "Школа и детский сад", "Общественные пространства"] },
  "moscow-shagal": { description: ["Shagal — жилой комплекс в Даниловском районе, рядом с набережной Марка Шагала. Проект развивается поэтапно; на официальной странице сообщается о вводе в эксплуатацию новых корпусов.", "В одном из введённых домов предусмотрены квартиры с разными форматами открытых пространств, кладовые и помещения под сервисы. Для автомобилей заявлен подземный паркинг; конкретное наполнение следует уточнять по выбранному корпусу."], highlights: ["Даниловский район", "Локация у набережной", "Корпуса переменной этажности", "Кладовые и сервисные помещения", "Подземный паркинг"] },
  "moscow-zilart": { description: ["«ЗИЛАРТ» — крупный жилой район в Даниловском районе, на территории у Москвы-реки. Проект строится как самостоятельная городская среда с новыми улицами, общественными пространствами и объектами повседневной инфраструктуры.", "В окружении и составе района заявлены набережная, парк «Тюфелева роща», культурные объекты и образовательный кластер. Перед выбором квартиры стоит сопоставить корпус с конкретной очередью и ближайшими уже работающими объектами."], highlights: ["Даниловский район и Москва-река", "Парк «Тюфелева роща»", "Набережная и бульвары", "Школа и детские сады", "Культурные и спортивные объекты"] },
  "moscow-level-michurinskiy": { description: ["«Левел Мичуринский» расположен в Очаково-Матвеевском, в зелёной части запада Москвы. Первая и вторая очереди включают шесть сданных корпусов; проект относится к бизнес-классу.", "На официальной странице отмечены близость двух станций метро, парки и пруды в окружении, а также образовательная среда внутри проекта. В составе территории заявлены школа, три детских сада и благоустроенные пространства."], highlights: ["Очаково-Матвеевское", "Сданные корпуса первых очередей", "Две станции метро в пешей доступности", "Школа и три детских сада", "Парки и пруды в окружении"] },
  "spb-astra-kontinental": { description: ["«Астра Континенталь» строится в Невском районе, недалеко от Невы и станции метро «Елизаровская». Проект соединяет городскую локацию с крупным благоустройством внутри квартала.", "В составе заявлены школа, три детских сада, часть из которых с бассейнами, и подземный паркинг. В благоустройстве запланированы спортивный парк, променад с фонтанами и закрытые дворы-патио."], highlights: ["Невский район и набережная Невы", "Метро «Елизаровская» рядом", "Школа и три детских сада", "Парк «Город Спорта»", "Закрытые дворы-патио"] },
  "spb-pulse-premier": { description: ["«Пульс Премьер» расположен у берега Невы, между Октябрьской набережной и Дальневосточным проспектом. Разновысотные корпуса формируют квартал с видами на реку из части квартир.", "В проекте заявлены школа, три детских сада и поликлиника. Для прогулок предусмотрен пешеходный маршрут через территорию, а дворы закрыты для автомобилей и дополнены зелёными зонами и площадками."], highlights: ["Первая береговая линия Невы", "Пешеходный променад", "Школа, детские сады и поликлиника", "Закрытые зелёные дворы", "Несколько станций метро поблизости"] },
  "spb-setl-rivera": { description: ["«Сэтл Ривьера» — проект на Октябрьской набережной, на первой линии Невы. В квартале заявлены две очереди и дома средней этажности с закрытыми дворами.", "Для территории запланированы школа, два детских сада, спортивный кластер и прогулочный променад. Внутренние пространства дополнят сады, площадки для отдыха и спорта; для автомобилей заявлен подземный паркинг."], highlights: ["Первая линия Невы", "Школа и два детских сада", "Спортивный кластер Setl Sport", "Прогулочный променад", "Закрытые дворы"] },
  "spb-aristokrat": { description: ["«Аристократ» — жилой комплекс в исторической части Васильевского острова. Проект ориентирован на городскую жизнь рядом с культурными площадками, набережными и общественными пространствами района.", "На территории заявлены торговая галерея, детский сад, кабинет врача и клуб резидентов. В клубе предусмотрены общие пространства для работы, спорта и семейного досуга; во дворах запланированы приватные зелёные зоны."], highlights: ["Историческая часть Васильевского острова", "Детский сад и кабинет врача", "Клуб резидентов", "Торговая галерея", "Зелёные дворы и променад"] },
  "spb-paradnyi-ansambl": { description: ["«Парадный ансамбль» — малоэтажный квартал в Московском районе Санкт-Петербурга. Проект строится как спокойная среда с парком, пешеходными маршрутами и разделением автомобильных и пешеходных потоков.", "В составе комплекса заявлены восемь детских садов и четыре школы, закрытые от машин дворы и подземный паркинг. Для прогулок предусмотрены бульвар, парк, площадь и благоустроенная набережная ручья."], highlights: ["Московский район", "Малоэтажные дома", "Восемь детских садов и четыре школы", "Закрытые дворы без машин", "Парк, бульвар и экотропа"] },
  "spb-legenda-vasilevskogo": { description: ["«ЛЕГЕНДА Васильевского» — жилой кластер на Васильевском острове, рядом с Финским заливом и Севкабель Портом. Его окружение сочетает набережные, культурные площадки и новые городские маршруты.", "Официальная страница описывает проект как среду для разных сценариев жизни и досуга. При выборе конкретного корпуса стоит дополнительно проверить состав благоустройства, сервисов и планировочных решений выбранной очереди."], highlights: ["Васильевский остров", "Близость к Финскому заливу", "Рядом Севкабель Порт", "Культурные и досуговые точки", "Разные сценарии городской жизни"] },
  "krasnodar-park-pobedy-3": { description: ["«Парк Победы 3» — жилой квартал на Западном обходе Краснодара. Проект заявлен как часть развивающейся городской локации с собственным бульваром, озеленением и общественными пространствами.", "Внутри квартала заявлены площадки для детей и взрослых, зоны тренировок, лобби, коворкинг, клуб резидентов, кладовые и подземный паркинг. Рядом заявлено развитие крупной рекреационной территории «Парк достижений»."], highlights: ["Западный обход", "Прогулочный бульвар", "Плейхабы и спортивные зоны", "Коворкинг и клуб резидентов", "Подземный паркинг"] },
  "krasnodar-grade": { description: ["«ГРЕЙД» — жилой квартал на улице Константиновской в Краснодаре. Проект объединяет жилые дома, закрытые дворы без машин, прогулочные аллеи и общественные пространства.", "На территории заявлены детские и спортивные площадки, сквер, фонтанный комплекс, сервисы на первых этажах и физкультурно-оздоровительный комплекс. В окружении отмечены поликлиника, школа искусств и парк Галицкого."], highlights: ["Улица Константиновская", "Закрытые дворы без машин", "Сквер и прогулочные аллеи", "Спортивная и коммерческая инфраструктура", "Парк Галицкого рядом"] },
  "krasnodar-reeds": { description: ["«РИДЗ» расположен на улице Пригородной в Краснодаре, вдоль тихой реки. Проект строится как квартал с закрытой территорией, зелёным бульваром и общими пространствами в домах.", "В проекте заявлены гранд-лобби, клуб резидентов, подземный паркинг, охрана и коммерческие сервисы на первых этажах. Для семей и активного отдыха предусмотрены детские и спортивные площадки."], highlights: ["Улица Пригородная и река", "Закрытая территория", "Прогулочный зелёный бульвар", "Гранд-лобби и клуб резидентов", "Подземный паркинг"] },
  "krasnodar-record-2": { description: ["«Рекорд 2» — жилой квартал в микрорайоне Черёмушки, на улице Новороссийской. В проекте представлены разные форматы квартир — от компактных до семейных, а часть планировок имеет дополнительные пространства.", "На территории заявлены школа, детский сад, зоны отдыха, детские и спортивные площадки. Для автомобилей предусмотрены гостевые, многоуровневые и подземные парковки; заявлена система бесконтактного доступа."], highlights: ["Микрорайон Черёмушки", "Школа и детский сад", "Сад и зоны отдыха", "Спортивные и игровые площадки", "Несколько форматов парковки"] },
  "krasnodar-samolet-7": { description: ["«Самолёт 7» — квартал на Западном обходе Краснодара, развиваемый в концепции «города в городе». В благоустройстве заявлены собственная река, двор-сад с японскими мотивами и пространства для активного отдыха.", "В составе квартала заявлены детский сад, поликлиника, спортивная зона SportHub, гранд-лобби и клуб резидентов. Также заявлены современные цифровые решения и закрытая территория."], highlights: ["Западный обход", "Собственная река и двор-сад", "Детский сад и поликлиника", "SportHub для активного отдыха", "Гранд-лобби и клуб резидентов"] },
  "krasnodar-dogma-park": { description: ["DОГМА ПАРК — жилой микрорайон на северо-западе Краснодара, в районе Западного обхода. Проект сочетает городские сервисы с большими зелёными территориями для отдыха и прогулок.", "В составе микрорайона заявлены дендропарк, места для спорта, школы и детские сады, разные форматы парковки и безбарьерные лобби. Отдельно в проекте заявлены термальный комплекс и SPA-зоны."], highlights: ["Северо-запад Краснодара", "Дендропарк и зоны отдыха", "Три школы и пять детских садов", "Подземные и многоуровневые парковки", "Термальный комплекс и SPA-зоны"] },
};

const propertyDetailNarratives: Readonly<Record<string, string>> = {
  "moscow-ostrov": "Жизнь у воды задаёт особый ритм: утром здесь хочется начинать день с прогулки вдоль Москвы-реки, а вечером — возвращаться в спокойную, зелёную среду, сохраняя при этом связь с городом.",
  "moscow-simvol": "«Символ» выбирают за редкое для большой Москвы сочетание уже сложившейся городской жизни и пространства, в котором прогулка, спорт, встреча с друзьями и семейный день не требуют отдельного маршрута.",
  "moscow-sobytie": "В «Событии» городской темп Раменок дополняется близостью парка: у дома появляется место для тишины, движения и отдыха, а привычные дела остаются в комфортной доступности.",
  "moscow-shagal": "Shagal раскрывается через набережную и живой ритм Даниловского района: здесь можно выбирать между прогулкой у воды, городскими маршрутами и более камерным сценарием внутри собственного квартала.",
  "moscow-zilart": "«ЗИЛАРТ» создаёт ощущение нового городского района, где маршрут от дома может проходить через бульвар, парк, набережную или культурную площадку — без необходимости каждый раз уезжать далеко.",
  "moscow-level-michurinskiy": "«Левел Мичуринский» подойдёт тем, кому важна зелёная часть Москвы, но не хочется отказываться от городского темпа: парки, пруды, метро и повседневная инфраструктура складываются в один сценарий.",
  "spb-astra-kontinental": "«Астра Континенталь» объединяет энергию Невского района и близость Невы: в будни легко оставаться в городе, а в свободное время — выбирать прогулки, спорт и отдых в пределах квартала.",
  "spb-pulse-premier": "В «Пульс Премьер» близость Невы становится частью повседневного впечатления от дома: прогулочный маршрут, зелёные дворы и виды на воду помогают сделать городской ритм более спокойным.",
  "spb-setl-rivera": "«Сэтл Ривьера» строится у Невы как пространство для размеренной городской жизни: здесь важны открытая линия воды, закрытые дворы и возможность проводить свободное время недалеко от дома.",
  "spb-aristokrat": "«Аристократ» раскрывает атмосферу Васильевского острова через историческое окружение, набережные и культурные маршруты — для тех, кто хочет жить в центре городской жизни, сохраняя приватность дома.",
  "spb-paradnyi-ansambl": "«Парадный ансамбль» предлагает более спокойный, малоэтажный сценарий Петербурга: прогулки по бульвару и парку, закрытые дворы и понятная семейная среда становятся частью обычного дня.",
  "spb-legenda-vasilevskogo": "«ЛЕГЕНДА Васильевского» обращена к тем, кому важен характер острова: рядом вода, культурные точки и городские прогулки, а дом становится местом, из которого удобно строить свой маршрут.",
  "krasnodar-park-pobedy-3": "«Парк Победы 3» задуман как квартал, в котором хочется задерживаться после работы: собственный бульвар, зелёные маршруты и пространства для встречи с близкими формируют живую повседневную среду.",
  "krasnodar-grade": "«ГРЕЙД» делает акцент на комфортной повседневности: здесь прогулка, занятия спортом, отдых в сквере и необходимые сервисы могут стать частью маршрута от подъезда, а не отдельной поездкой.",
  "krasnodar-reeds": "«РИДЗ» строит настроение спокойного зелёного квартала у воды: закрытая территория и бульвар помогают отделить личное пространство дома от городского движения и оставить больше времени для себя.",
  "krasnodar-record-2": "«Рекорд 2» подходит для разных жизненных сценариев — от первого самостоятельного жилья до семейной квартиры: важные ежедневные маршруты, отдых и детская активность собраны в пределах квартала.",
  "krasnodar-samolet-7": "«Самолёт 7» раскрывается как самостоятельная среда для активной и семейной жизни: вода, сад, спортивные пространства и сервисы создают ощущение района, в котором хочется проводить больше времени.",
  "krasnodar-dogma-park": "ДОГМА ПАРК строится вокруг идеи большого зелёного микрорайона: дендропарк, места для движения и отдыха, образовательная среда и сервисы позволяют по-разному проживать каждый день рядом с домом.",
};

const propertyDetails: Readonly<Record<string, Pick<VerifiedProperty, "description" | "highlights" | "detailDescription" | "detailHighlights">>> = Object.fromEntries(
  Object.entries(compactPropertyDetails).map(([id, compact]) => {
    const highlights = compact.highlights.length === 5
      ? compact.highlights
      : [...compact.highlights, "Детали выбранного корпуса стоит уточнить"];

    return [id, {
      ...compact,
      detailDescription: [
        `${propertyDetailNarratives[id]} ${compact.description[0]}`,
        `${compact.description[1]} В результате дом задуман не только как адрес, но и как среда, в которой повседневные дела, отдых и время с близкими могут быть ближе друг к другу.`,
        `Особенности проекта складываются в цельный образ: ${compact.highlights.join(", ").toLocaleLowerCase("ru")}. Такой набор помогает представить не абстрактную покупку, а привычный день — от выхода из подъезда до вечерней прогулки или встречи с друзьями.`,
        "Выбирая квартиру, полезно смотреть на проект целиком и на конкретный корпус отдельно: расположение дома внутри квартала, вид из окон, готовность ближайшей инфраструктуры и планировку. Так проще найти вариант, который будет комфортен именно для вашего ритма жизни.",
      ],
      detailHighlights: highlights,
    }];
  }),
) as Readonly<Record<string, Pick<VerifiedProperty, "description" | "highlights" | "detailDescription" | "detailHighlights">>>;

const demoPlanLayouts = [
  '<rect x="34" y="34" width="352" height="252"/><path d="M170 34v120h216M170 154H34M170 154v132M260 154v132"/><text x="80" y="100">Жилая зона</text><text x="215" y="100">Кухня</text><text x="72" y="220">Санузел</text><text x="205" y="220">Прихожая</text><text x="290" y="220">Балкон</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 152h160V34M194 152h192M194 152v134M292 152v134"/><text x="70" y="95">Спальня</text><text x="245" y="100">Кухня-гостиная</text><text x="70" y="220">Санузел</text><text x="215" y="220">Холл</text><text x="315" y="220">Лоджия</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 122h352M34 122v164M205 122v164M290 34v88"/><text x="90" y="90">Кухня</text><text x="315" y="90">Балкон</text><text x="90" y="210">Гостиная</text><text x="235" y="210">Спальня</text><text x="320" y="210">Санузел</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 188h352M145 34v154M286 34v154M220 188v98"/><text x="70" y="110">Спальня</text><text x="315" y="110">Кабинет</text><text x="75" y="245">Кухня-гостиная</text><text x="245" y="245">Санузел</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 112h352M34 112v174M170 112v174M170 200h216M290 34v78"/><text x="72" y="82">Кухня</text><text x="315" y="82">Лоджия</text><text x="72" y="170">Гостиная</text><text x="215" y="170">Спальня</text><text x="75" y="250">Холл</text><text x="245" y="250">Санузел</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 150h352M130 34v116M250 34v116M130 150v136M250 150v136"/><text x="63" y="95">Спальня 1</text><text x="170" y="95">Спальня 2</text><text x="300" y="95">Балкон</text><text x="65" y="220">Кухня</text><text x="170" y="220">Гостиная</text><text x="295" y="220">Санузел</text>',
  '<rect x="34" y="34" width="352" height="252"/><path d="M34 96h352M34 96v190M155 96v190M275 34v62M275 190h111"/><text x="85" y="72">Балкон</text><text x="330" y="72">Кухня</text><text x="85" y="170">Гостиная</text><text x="210" y="170">Спальня</text><text x="325" y="145">Холл</text><text x="325" y="235">Санузел</text>',
] as const;

function demoPlanSrc(index: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320" role="img" aria-label="Демонстрационная схема планировки"><style>text{fill:#2c2d6e;stroke:none;font-family:Arial,sans-serif;font-size:11px;text-anchor:middle}path{fill:none;stroke:#2c2d6e;stroke-width:1.5;stroke-linecap:square;stroke-linejoin:miter}rect{fill:#fff;stroke:#2c2d6e;stroke-width:2}</style>${demoPlanLayouts[index % demoPlanLayouts.length]}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const spbPlanGallery = (propertyTitle: string, captions: readonly string[], offerIndexes: readonly (number | undefined)[] = []): readonly PlanGalleryItem[] => captions.map((caption, index) => ({
  src: demoPlanSrc(index),
  alt: `Демонстрационная планировка квартиры в ЖК «${propertyTitle}»`,
  caption,
  ...(offerIndexes[index] === undefined ? {} : { offerIndex: offerIndexes[index] }),
  rightsStatus: "approved",
}));

const spbPlanNotes = "На странице размещены демонстрационные схемы планировок; точные решения и площади уточняются по выбранной квартире";

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
      { id: "moscow-ostrov", citySlug: "moscow", district: "Хорошёво-Мнёвники", title: "Остров", dealType: "Жилой квартал", developer: "Донстрой", verifiedAt: "2026-11-13", price: "от 29 млн ₽", characteristics: ["1-комн. — от 39 м²", "2-комн. — от 58 м²", "3-комн. — от 67 м²", "4-комн. — от 106 м²", "5-комн. — от 139 м²"], status: "Часть кварталов сдана; сроки остальных корпусов уточняются", plansNote: "Подтверждённые планировки не размещены", ...propertyDetails["moscow-ostrov"], image: { src: "https://post.donstroy.moscow/upload/iblock/2ad/576wokksc4n024n4gfvltb32d6y84m6i.jpg", alt: "Фото ЖК «Остров»" } },
      { id: "moscow-simvol", citySlug: "moscow", district: "Лефортово", title: "Символ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-simvol"], image: { src: "https://post.donstroy.moscow/upload/iblock/b49/smxkon6cqi5y7de1btamgrz97efgl5tp.jpg", alt: "Фото ЖК «Символ»" } },
      { id: "moscow-sobytie", citySlug: "moscow", district: "Раменки", title: "Событие", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-sobytie"], image: { src: "https://post.donstroy.moscow/upload/iblock/4e6/ltj1ggb75sgazue2crrsul5pymbkq3l7.jpg", alt: "Фото ЖК «Событие»" } },
      { id: "moscow-shagal", citySlug: "moscow", district: "Даниловский", title: "Shagal", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-shagal"], image: { src: "https://etalongroup.ru/upload/kelnik.adminpage/63a/jdv10mg3wjbmo2foqbyxe5fuezh4ki41/Gruppa-_Etalon_-vvodit-v-ekspluatatsiyu-novyy-dom-v-zhilom-komplekse-Shagal-1_1.jpg", alt: "Фото ЖК «Shagal»" } },
      { id: "moscow-zilart", citySlug: "moscow", district: "Даниловский", title: "ЗИЛАРТ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["moscow-zilart"], image: { src: "https://s0.rbk.ru/v6_top_pics/media/img/1/96/755901549733961.jpg", alt: "Фото ЖК «ЗИЛАРТ»" } },
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
      { id: "spb-astra-kontinental", citySlug: "spb", district: "Невский", title: "Астра Континенталь", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 9,5 млн ₽", characteristics: ["Студия — от 21,27 м²", "1-комн. — от 35,86 м²", "2-комн. — от 35,87 м²", "Срок проекта: II кв. 2027 — II кв. 2030"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "Студия", areaFrom: 21.27, priceFrom: 10800151, handover: "II кв. 2028" },
        { type: "1-комн.", areaFrom: 35.86, priceFrom: 17450068, handover: "II кв. 2028" },
        { type: "2E-комн.", areaFrom: 35.87, priceFrom: 15750266, handover: "IV кв. 2029" },
      ], planGallery: spbPlanGallery("Астра Континенталь", ["Студия · 21,27 м²", "1-комн. · 35,86 м²", "2E-комн. · 35,87 м²", "1-комн. · 36,36 м²", "2E-комн. · 36,40 м²", "2E-комн. · 36,85 м²", "2-комн. · 43,80 м²"]), phases: [
        { name: "Сданные корпуса", status: "Корпуса 2 и 3 сданы", details: ["Статус подтверждён на странице проекта"] },
        { name: "Строящиеся корпуса", status: "Корпус 4 — II кв. 2028; корпуса 5.1 и 5.2 — IV кв. 2029; корпуса 6.1 и 6.2 — II кв. 2030", details: ["Срок зависит от выбранного корпуса"] },
      ], ...propertyDetails["spb-astra-kontinental"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/8c39f0e8-5b55-4fdc-8a7a-b32d60c1543a.jpg", alt: "Фото ЖК «Астра Континенталь»" } },
      { id: "spb-pulse-premier", citySlug: "spb", district: "Невский", title: "Пульс Премьер", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 8,55 млн ₽", characteristics: ["Студия — от 24,5 м²", "1-комн. — от 31,9 м²", "Срок проекта: III кв. 2026"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "Студия", areaFrom: 24.5, priceFrom: 8550000, handover: "Сдан" },
        { type: "1-комн.", areaFrom: 31.9, priceFrom: 13699999, handover: "Сдан" },
        { type: "1-комн.", areaFrom: 38.6, priceFrom: 13000000, handover: "Сдан" },
      ], planGallery: spbPlanGallery("Пульс Премьер", ["Студия · 24,5 м²", "Студия · 25,32 м²", "Студия · 25,91 м²", "1-комн. · 31,9 м²", "1-комн. · 38,6 м²", "Планировка · корпус 4.1", "2-комн. · 45,20 м²"]), phases: [
        { name: "Сданные корпуса", status: "Часть корпусов сдана; на странице проекта указано разрешение на ввод", details: ["Конкретный корпус выбранного предложения нужно проверять перед сделкой"] },
      ], ...propertyDetails["spb-pulse-premier"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/82ec86b4-bf34-45bc-b712-3f1aa71d4a14.jpg", alt: "Фото ЖК «Пульс Премьер»" } },
      { id: "spb-setl-rivera", citySlug: "spb", district: "Невский", title: "Сэтл Ривьера", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 8,35 млн ₽", characteristics: ["Студия — от 21,57 м²", "1-комн. — от 31,35 м²", "Сроки очередей: I кв. 2028 и IV кв. 2029"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "Студия", areaFrom: 21.57, priceFrom: 8350000, handover: "I кв. 2028" },
        { type: "1-комн.", areaFrom: 31.35, priceFrom: 12200116, handover: "IV кв. 2029" },
        { type: "2E-комн.", areaFrom: 31.41, priceFrom: 13550023, handover: "I кв. 2028" },
      ], planGallery: spbPlanGallery("Сэтл Ривьера", ["Студия · 21,57 м²", "Студия · 22,03 м²", "Студия · 24,16 м²", "1-комн. · 31,35 м²", "2E-комн. · 31,41 м²", "2-комн. · 40,71 м²", "2-комн. · 48,60 м²"]), phases: [
        { name: "Очередь 1", status: "Корпуса 1.1 и 1.2 — I кв. 2028", details: ["В открытом каталоге предложения привязаны к корпусам 1.1 и 1.2"] },
        { name: "Очередь 2", status: "Корпус 2.1 — IV кв. 2029", details: ["Срок относится к конкретной очереди, а не ко всему проекту"] },
      ], ...propertyDetails["spb-setl-rivera"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/0425442d-0336-4708-b47a-569e8154c3ed.jpg", alt: "Фото ЖК «Сэтл Ривьера»" } },
      { id: "spb-aristokrat", citySlug: "spb", district: "Василеостровский", title: "Аристократ", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 13,1 млн ₽", characteristics: ["Студия — от 24,13 м²", "Сроки корпусов: II кв. 2029 — II кв. 2030"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "Студия", areaFrom: 24.13, priceFrom: 14597415, handover: "II кв. 2029" },
        { type: "Студия", areaFrom: 24.38, priceFrom: 17114760, handover: "II кв. 2029" },
        { type: "Студия", areaFrom: 26.22, priceFrom: 15456690, handover: "II кв. 2030" },
      ], planGallery: spbPlanGallery("Аристократ", ["Студия · 24,13 м²", "Студия · 24,38 м²", "Студия · 25 м²", "Студия · 26,22 м²", "Студия · 27,27 м²", "Планировка · корпус 1", "1-комн. · 36,40 м²"]), phases: [
        { name: "Очереди проекта", status: "Корпус 4 — II кв. 2029; корпус 1 — II кв. 2030", details: ["Срок необходимо сопоставлять с конкретным корпусом"] },
      ], ...propertyDetails["spb-aristokrat"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/ed594c4e-86e9-4f5d-b8c7-f008cdae7781.jpg", alt: "Фото ЖК «Аристократ»" } },
      { id: "spb-paradnyi-ansambl", citySlug: "spb", district: "Московский", title: "Парадный ансамбль", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 6,0 млн ₽", characteristics: ["Студия — от 21,25 м²", "1-комн. — от 31,02 м²", "Срок проекта: IV кв. 2026 — III кв. 2028"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "Студия", areaFrom: 21.25, priceFrom: 6100000, handover: "I кв. 2028" },
        { type: "1-комн.", areaFrom: 31.02, priceFrom: 8200000, handover: "I кв. 2028" },
        { type: "2E-комн.", areaFrom: 31.1, priceFrom: 9400022, handover: "Сдан" },
      ], planGallery: spbPlanGallery("Парадный ансамбль", ["Студия · 21,25 м²", "Студия · 21,51 м²", "Студия · 24,25 м²", "1-комн. · 31,02 м²", "2E-комн. · 31,10 м²", "Планировка · корпус 8.1", "2-комн. · 44,70 м²"]), phases: [
        { name: "Сданные корпуса", status: "Корпуса 4, 5, 6.1–6.7 сданы", details: ["Сведения разделены от строящихся очередей"] },
        { name: "Строящиеся корпуса", status: "Корпуса 7.7–7.13 — IV кв. 2026; корпуса 8.1–8.6 — I кв. 2028", details: ["Общий срок проекта на странице указан как IV кв. 2026 — III кв. 2028"] },
      ], ...propertyDetails["spb-paradnyi-ansambl"], image: { src: "https://4c2a0f87-603b-45cd-ae76-041fd66dd001.selstorage.ru/prod/media/b09964d1-d18e-4c65-9a66-60346972a22c.jpg", alt: "Фото ЖК «Парадный ансамбль»" } },
      { id: "spb-legenda-vasilevskogo", citySlug: "spb", district: "Василеостровский", title: "ЛЕГЕНДА Васильевского", dealType: "Жилой комплекс", verifiedAt: "2026-11-13", price: "от 20,45 млн ₽ для подтверждённого предложения 1 спальня, тип 1-2", characteristics: ["1 спальня — от 37,81 м²", "Передача ключей: I очередь — II кв. 2028, II очередь — III кв. 2029"], plansNote: spbPlanNotes, apartmentOffers: [
        { type: "1 спальня, тип 1-2", areaFrom: 37.81, priceFrom: 20445984, handover: "I очередь — II кв. 2028" },
        { type: "1 спальня, тип 1-14.1", areaFrom: 41.83, priceFrom: 24301139, handover: "II очередь — III кв. 2029" },
      ], planGallery: spbPlanGallery("ЛЕГЕНДА Васильевского", ["Тип 1-2 · официальная страница планировки", "Тип 1-14.1 · официальная страница планировки", "Планировка · очередь 1", "Планировка · очередь 2", "Студия · 32,50 м²", "1 спальня · 45,60 м²", "2 спальни · 58,90 м²"], [0, 1]), phases: [
        { name: "Очередь 1", status: "Передача ключей — II кв. 2028", details: ["Срок подтверждён в каталоге квартир проекта"] },
        { name: "Очередь 2", status: "Передача ключей — III кв. 2029", details: ["Срок подтверждён в каталоге квартир проекта"] },
      ], ...propertyDetails["spb-legenda-vasilevskogo"], image: { src: "https://static-main.legenda-dom.ru/files/6L1lbOrZUpn5sr1.jpg", alt: "Фото ЖК «ЛЕГЕНДА Васильевского»" } },
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
      { id: "krasnodar-park-pobedy-3", citySlug: "krasnodar", district: "Западный обход", title: "Парк Победы 3", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-park-pobedy-3"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/00b35a22-0183-493b-8983-5d155aab0232/w1500.webp", alt: "Фото ЖК «Парк Победы 3»" } },
      { id: "krasnodar-grade", citySlug: "krasnodar", district: "ул. Константиновская", title: "ГРЕЙД", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-grade"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/26b9dbd0-4442-4b7d-9a3a-8ff65b24248b/w800.webp", alt: "Фото ЖК «ГРЕЙД»" } },
      { id: "krasnodar-reeds", citySlug: "krasnodar", district: "ул. Пригородная", title: "РИДЗ", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-reeds"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/8f8f9dca-33fe-4d38-b464-7508fd3ca595/w800.webp", alt: "Фото ЖК «РИДЗ»" } },
      { id: "krasnodar-record-2", citySlug: "krasnodar", district: "ул. Новороссийская", title: "Рекорд 2", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-record-2"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/3d68ea73-611c-484f-b52e-4b5195b5e646/w1500.webp", alt: "Фото ЖК «Рекорд 2»" } },
      { id: "krasnodar-samolet-7", citySlug: "krasnodar", district: "Западный обход", title: "Самолёт 7", dealType: "Жилой квартал", verifiedAt: "2026-11-08", ...propertyDetails["krasnodar-samolet-7"], image: { src: "https://storage.yandexcloud.net/t2v-storage/images/6cd266b1-8f0a-4c04-9e1f-74f67bdf402c/w1500.webp", alt: "Фото ЖК «Самолёт 7»" } },
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

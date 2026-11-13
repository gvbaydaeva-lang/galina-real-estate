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
  '<rect class="outer" x="42" y="34" width="336" height="252"/><path class="wall" d="M42 170h104v116M146 170h124M270 170v116M146 34v82h124v54"/><path class="thin" d="M42 82h104M270 34v82h108M270 226h108M220 170v116"/><path class="window" d="M52 38h74M282 38h82M374 70v65M374 202v66"/><path class="door" d="M146 170a36 36 0 0 0-36 36M270 170a34 34 0 0 1 34 34M220 286a34 34 0 0 1 34-34"/><rect class="fixture" x="64" y="56" width="56" height="24"/><rect class="fixture" x="58" y="202" width="42" height="62"/><rect class="fixture" x="174" y="54" width="80" height="42"/><circle class="fixture" cx="214" cy="116" r="13"/><text class="label" x="94" y="142">кухня-гостиная</text><text class="label" x="208" y="238">спальня</text><text class="label" x="320" y="146">с/у</text><text class="small" x="80" y="274">коридор</text>',
  '<rect class="outer" x="48" y="30" width="324" height="260"/><path class="wall" d="M48 138h134v-108M182 138h190M182 138v152M286 138v152"/><path class="thin" d="M48 218h72v72M286 30v56h86M246 218h126"/><path class="window" d="M58 34h90M194 34h76M372 52v62M372 198v80"/><path class="door" d="M182 138a35 35 0 0 1 35 35M286 138a32 32 0 0 0-32 32M246 218a30 30 0 0 1 30 30M120 218a29 29 0 0 0 29 29"/><rect class="fixture" x="62" y="52" width="50" height="32"/><rect class="fixture" x="66" y="238" width="40" height="38"/><rect class="fixture" x="238" y="52" width="38" height="24"/><rect class="fixture" x="206" y="178" width="58" height="28"/><text class="label" x="110" y="118">спальня</text><text class="label" x="278" y="116">кухня-гостиная</text><text class="label" x="84" y="208">с/у</text><text class="label" x="221" y="258">холл</text><text class="small" x="330" y="198">лоджия</text>',
  '<path class="outer" d="M58 42h254v34h54v188H228v22H58z"/><path class="wall" d="M58 164h112v122M170 164h112M282 164v100M170 42v70h142M228 264v22"/><path class="thin" d="M58 92h112M282 76h84M228 206h138"/><path class="window" d="M68 46h92M180 46h122M322 80v44M322 206v50M64 280h92"/><path class="door" d="M170 164a34 34 0 0 0-34 34M282 164a30 30 0 0 1 30 30M228 206a34 34 0 0 1 34 34M170 286a30 30 0 0 1 30-30"/><rect class="fixture" x="74" y="62" width="58" height="22"/><rect class="fixture" x="76" y="202" width="62" height="54"/><rect class="fixture" x="198" y="58" width="68" height="32"/><circle class="fixture" cx="232" cy="120" r="14"/><text class="label" x="110" y="144">кухня</text><text class="label" x="230" y="178">гостиная</text><text class="label" x="106" y="244">спальня</text><text class="label" x="330" y="154">с/у</text><text class="small" x="310" y="280">гардероб</text>',
  '<rect class="outer" x="40" y="36" width="340" height="248"/><path class="wall" d="M40 122h104v162M144 122h112v84h124M256 36v86M256 206v78"/><path class="thin" d="M40 214h104M256 36h124M304 206v78"/><path class="window" d="M50 40h82M160 40h84M266 40h104M376 56v50M376 222v52"/><path class="door" d="M144 122a34 34 0 0 0-34 34M256 122a32 32 0 0 1 32 32M256 206a32 32 0 0 1 32 32M304 284a28 28 0 0 0-28-28"/><rect class="fixture" x="58" y="56" width="58" height="28"/><rect class="fixture" x="60" y="232" width="58" height="36"/><rect class="fixture" x="176" y="148" width="54" height="26"/><rect class="fixture" x="278" y="50" width="54" height="40"/><text class="label" x="88" y="106">спальня</text><text class="label" x="200" y="186">кухня-гостиная</text><text class="label" x="320" y="106">кабинет</text><text class="label" x="328" y="244">с/у</text><text class="small" x="82" y="202">холл</text>',
  '<path class="outer" d="M46 46h250v-12h78v250H46z"/><path class="wall" d="M46 134h112v150M158 134h138M296 34v100M296 134h78M238 134v150"/><path class="thin" d="M46 226h112M158 46h84M238 200h136"/><path class="window" d="M58 50h96M170 50h70M306 40h56M370 58v58M370 216v54M58 272h72"/><path class="door" d="M158 134a34 34 0 0 0-34 34M296 134a28 28 0 0 1 28 28M238 200a30 30 0 0 1 30 30M158 284a30 30 0 0 1 30-30"/><rect class="fixture" x="62" y="62" width="66" height="25"/><rect class="fixture" x="64" y="238" width="58" height="30"/><rect class="fixture" x="180" y="60" width="48" height="52"/><rect class="fixture" x="180" y="174" width="46" height="28"/><text class="label" x="102" y="116">кухня-гостиная</text><text class="label" x="214" y="154">спальня</text><text class="label" x="104" y="210">детская</text><text class="label" x="330" y="112">лоджия</text><text class="small" x="318" y="230">с/у</text>',
  '<rect class="outer" x="42" y="34" width="336" height="252"/><path class="wall" d="M42 154h90v132M132 154h116v-120M248 34v120h130M248 154v132M314 154v132"/><path class="thin" d="M42 82h90M248 34h130M314 224h64"/><path class="window" d="M52 38h70M142 38h92M260 38h108M374 54v78M374 184v88"/><path class="door" d="M132 154a32 32 0 0 0-32 32M248 154a31 31 0 0 1 31 31M314 224a28 28 0 0 1 28 28M248 286a30 30 0 0 0-30-30"/><rect class="fixture" x="58" y="54" width="54" height="24"/><rect class="fixture" x="60" y="198" width="54" height="62"/><rect class="fixture" x="162" y="54" width="58" height="26"/><rect class="fixture" x="278" y="54" width="48" height="40"/><text class="label" x="92" y="134">спальня 1</text><text class="label" x="190" y="134">спальня 2</text><text class="label" x="292" y="112">кухня-гостиная</text><text class="label" x="342" y="212">с/у</text><text class="small" x="84" y="180">холл</text>',
  '<path class="outer" d="M48 38h210v-8h112v256H48z"/><path class="wall" d="M48 114h118v172M166 114h92V30M258 114h112M258 114v172M314 114v80"/><path class="thin" d="M48 210h118M166 38h74M314 194h56"/><path class="window" d="M60 42h88M178 42h62M270 34h88M360 52v54M360 210v64M60 274h80"/><path class="door" d="M166 114a34 34 0 0 0-34 34M258 114a30 30 0 0 1 30 30M314 194a28 28 0 0 1 28 28M258 286a30 30 0 0 0-30-30"/><rect class="fixture" x="66" y="52" width="56" height="24"/><rect class="fixture" x="66" y="228" width="56" height="34"/><rect class="fixture" x="182" y="52" width="48" height="40"/><rect class="fixture" x="180" y="156" width="52" height="26"/><text class="label" x="104" y="100">балкон</text><text class="label" x="210" y="104">кухня-гостиная</text><text class="label" x="104" y="190">гостиная</text><text class="label" x="212" y="234">спальня</text><text class="label" x="340" y="168">с/у</text><text class="small" x="320" y="242">коридор</text>',
] as const;

function demoPlanSrc(index: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320" role="img" aria-label="Демонстрационная схема планировки"><rect width="420" height="320" fill="#f1f2ed"/><style>.outer{fill:#f8f8f4;stroke:#303174;stroke-width:10;stroke-linejoin:miter}.wall{fill:none;stroke:#303174;stroke-width:6;stroke-linecap:square;stroke-linejoin:miter}.thin{fill:none;stroke:#8a8fab;stroke-width:1.35}.window{fill:none;stroke:#8bb4c7;stroke-width:3}.door{fill:none;stroke:#8186a7;stroke-width:1.35}.fixture{fill:none;stroke:#a0a4bd;stroke-width:1.25}.label{fill:#363b76;stroke:none;font-family:Arial,sans-serif;font-size:10px;text-anchor:middle}.small{fill:#555b86;stroke:none;font-family:Arial,sans-serif;font-size:8px;text-anchor:middle}</style>${demoPlanLayouts[index % demoPlanLayouts.length]}</svg>`;
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

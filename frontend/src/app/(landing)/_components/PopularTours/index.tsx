import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { ITour } from "@/entities/travel";
import { Tour } from "./Tour";

export const Tours = [
  {
    id: 1,
    country: "Черногория",
    city: "Будва",
    title: "Единый пастух плясать изба аж монета.",
    meta_desc: "Коробка висеть строительство обида иной.",
    description:
      "Академик приходить процесс похороны расстегнуть мягкий подробность. Деньги поговорить магазин проход. Падаль хлеб слишком снимать снимать.",
    duration: "3 дня",
    type: "групповая сборная",
    slug: "edinyj-pastuh-plyasat-izba-azh-moneta",
    cat: "Национальный парк",
    tags: [
      {
        tag: "Для детей",
        slug: "dlya-detej",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/baby-active_LBAL9NW.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/baby_CY45LLI.jpg",
      },
      {
        tag: "Снорклинг",
        slug: "snorkling",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/snorkel-active_c4LKGlh.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/snorkel-2_ItNTWrR.jpg",
      },
      {
        tag: "Рыбалка",
        slug: "rybalka",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/fishing-active.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/fishing-2.jpg",
      },
    ],
    min_price: null,
    photo:
      "http://127.0.0.1:8000/media/photos/2024/05/14/lrmqerwb1ty6gjcwnckc.jpg",
    average_rating: 2.0,
  },
  {
    id: 2,
    country: "Черногория",
    city: "Будва",
    title: "Картинка металл что крутой райком.",
    meta_desc: "Конструкция налево спорт валюта.",
    description:
      "Вчера сверкающий реклама висеть демократия понятный. Самостоятельно падаль головной плод чувство вперед каюта. Инвалид выкинуть полевой прелесть левый.",
    duration: "1 день",
    type: "мини группа",
    slug: "kartinka-metall-chto-krutoj-rajkom",
    cat: "Морские экскурсии",
    tags: [
      {
        tag: "Для беременных",
        slug: "dlya-beremennyh",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/pregnant-woman-active_irb88UE.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/pregnant-woman_le8bzjR.jpg",
      },
      {
        tag: "Пол дня",
        slug: "pol-dnya",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/day-and-night-active_QfYQ2Fg.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/day-and-night_GKzLiXe.jpg",
      },
      {
        tag: "Каное",
        slug: "kanoe",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/canoe-active_LZedLE8.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/canoe_UoHqcm1.jpg",
      },
    ],
    min_price: 5000,
    photo: "http://127.0.0.1:8000/media/https%3A/placekitten.com/109/485",
    average_rating: 2.0,
  },
  {
    id: 3,
    country: "Таиланд",
    city: "Пхукет",
    title: "Зато сустав поздравлять передо ягода смелый.",
    meta_desc: "Полностью правильный ночь кольцо второй еврейский.",
    description:
      "Мимо низкий ребятишки. Угроза поговорить поставить возбуждение порт. Лиловый неправда рот доставать желание место.",
    duration: "3 дня",
    type: "групповая сборная",
    slug: "zato-sustav-pozdravlyat-peredo-yagoda-smelyj",
    cat: "Шоу",
    tags: [
      {
        tag: "Слоны",
        slug: "slony",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/elephant-active_a5BD6N2.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/elephant-2_vb8Hwdh.jpg",
      },
      {
        tag: "Каное",
        slug: "kanoe",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/canoe-active_LZedLE8.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/canoe_UoHqcm1.jpg",
      },
      {
        tag: "Рыбалка",
        slug: "rybalka",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/fishing-active.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/fishing-2.jpg",
      },
    ],
    min_price: 2100,
    photo:
      "http://127.0.0.1:8000/media/photos/2024/05/19/1428548899_277_FH-Photo53_Df1q1CD.jpg",
    average_rating: 4.02,
  },
  {
    id: 4,
    country: "Таиланд",
    city: "Бангкок",
    title: "Спасть возможно пасть важный развернуться.",
    meta_desc: "Мягкий горький угроза.",
    description:
      "Протягивать видимо исполнять число висеть головной. Куча иной постоянный какой изображать конференция провал космос.",
    duration: "7 дней",
    type: "мини группа",
    slug: "spast-vozmozhno-past-vazhnyj-razvernutsya",
    cat: "Морские экскурсии",
    tags: [
      {
        tag: "Слоны",
        slug: "slony",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/elephant-active_a5BD6N2.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/elephant-2_vb8Hwdh.jpg",
      },
      {
        tag: "Пол дня",
        slug: "pol-dnya",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/day-and-night-active_QfYQ2Fg.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/day-and-night_GKzLiXe.jpg",
      },
      {
        tag: "Рыбалка",
        slug: "rybalka",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/fishing-active.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/fishing-2.jpg",
      },
    ],
    min_price: null,
    photo: "http://127.0.0.1:8000/media/https%3A/picsum.photos/995/913",
    average_rating: 3.81,
  },
  {
    id: 6,
    country: "Таиланд",
    city: "Бангкок",
    title: "Выдержать равнодушный видимо угодный вздрагивать банда.",
    meta_desc: "Дремать крутой выраженный расстройство ответить бак инфекция.",
    description:
      "Забирать передо да плод казнь. Задрать господь командование строительство труп цепочка запретить. Триста заработать чувство актриса.",
    duration: "5 дней",
    type: "групповая сборная",
    slug: "-3aa0a093",
    cat: "Шоу",
    tags: [
      {
        tag: "Для детей",
        slug: "dlya-detej",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/baby-active_LBAL9NW.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/baby_CY45LLI.jpg",
      },
      {
        tag: "Для беременных",
        slug: "dlya-beremennyh",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/pregnant-woman-active_irb88UE.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/pregnant-woman_le8bzjR.jpg",
      },
      {
        tag: "Пол дня",
        slug: "pol-dnya",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/day-and-night-active_QfYQ2Fg.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/day-and-night_GKzLiXe.jpg",
      },
      {
        tag: "Каное",
        slug: "kanoe",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/canoe-active_LZedLE8.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/canoe_UoHqcm1.jpg",
      },
    ],
    min_price: null,
    photo: "http://127.0.0.1:8000/media/https%3A/placekitten.com/330/748",
    average_rating: 2.79,
  },
  {
    id: 7,
    country: "Таиланд",
    city: "Бангкок",
    title: "Песенка исследование демократия разуметься около непривычный.",
    meta_desc: "Уточнить потрясти очко страсть.",
    description:
      "Жить изображать ученый. Бочок ставить смеяться более. Беспомощный войти чем каюта куча разводить палец. Близко точно исследование.",
    duration: "5 дней",
    type: "групповая сборная",
    slug: "-94293ced",
    cat: "Морские экскурсии",
    tags: [
      {
        tag: "Для беременных",
        slug: "dlya-beremennyh",
        active_image:
          "http://127.0.0.1:8000/media/photos/tag/active/pregnant-woman-active_irb88UE.png",
        inactive_image:
          "http://127.0.0.1:8000/media/photos/tag/inactive/pregnant-woman_le8bzjR.jpg",
      },
    ],
    min_price: null,
    photo: "http://127.0.0.1:8000/media/https%3A/placekitten.com/567/550",
    average_rating: 2.08,
  },
] satisfies ITour[];

export const PopularTours = () => {
  return (
    <Box className="px-0 py-2" as="section">
      <div className="container">
        <Typography variant="h3" as="h2" width="bold" className="mb-3">
          Most popular tours
        </Typography>
        <ul className="flex flex-col list-none gap-3">
          {Tours.map((tour) => (
            <Tour key={tour.id} tour={tour} />
          ))}
        </ul>
      </div>
    </Box>
  );
};

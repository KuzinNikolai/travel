import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { ICity, ICityItem } from "@/entities/travel";
import { CityItem } from "./CitiesItem";

const Cities: ICityItem[] = [
  {
    id: 1,
    name: "Пхукет",
    title: "Экскурсии на Пхукете",
    slug: "phuket",
    meta_desc: "",
    description: "Описание",
    photo: "http://127.0.0.1:8000/media/photos/city/phuket-island-tours.jpg",
    tour_count: 12,
  },
  {
    id: 2,
    name: "Будва",
    title: "Экскурсии в Будве",
    slug: "budva",
    meta_desc: "Экскурсии в будве сейчас сука",
    description: "",
    photo: "http://127.0.0.1:8000/media/photos/city/sveti-stefan-photo.jpg",
    tour_count: 21,
  },
  {
    id: 3,
    name: "Бангкок",
    title: "Экскурсии в бангкоке",
    slug: "bangkok",
    meta_desc: "Экскурсии в бангкоке это мета дескрипшн",
    description: "Экскурсии в бангкоке это просто описание",
    photo: "http://127.0.0.1:8000/media/photos/city/gettrip_bangkok.jpg",
    tour_count: 12,
  },
];

export const PopularCities = () => {
  return (
    <Box className="px-0 py-2" as="section">
      <div className="container">
        <Typography variant="h3" as="h2" width="bold" className="mb-3">
          Most popular cities
        </Typography>
        <ul className="flex flex-col list-none gap-2">
          {Cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </ul>
      </div>
    </Box>
  );
};

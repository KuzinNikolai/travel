import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { Advantage } from "./Advantage";
import { IAdvantage } from "@/entities/advatage";
import { Clock9, Star } from "lucide-react";

export const AdvantageList = [
  {
    id: 1,
    title: "Отмена тура",
    description: "Бесплатная отмена экскурсии за 48 часов",
    iconLabel: "Иконка часов",
    icon: <Clock9 />,
  },
  {
    id: 2,
    title: "Отзывы",
    description: "Отзывы от реальных людей которые побывали на экскурсиях",
    iconLabel: "Иконка отзывов",
    icon: <Star />,
  },
  {
    id: 3,
    title: "Предоплата",
    description: "Мы не берем полную оплату за наш сервис, а лишь предоплату",
    iconLabel: "Иконка бронирования",
    icon: <Clock9 />,
  }
] satisfies IAdvantage[];

export const Advantages = () => {
  return (
    <Box className="px-0 py-2" as="section">
      <div className="container">
        <Typography variant="h3" as="h2" width="bold" className="sr-only">
          Advantages
        </Typography>
        <ul className="flex flex-row overflow-x-auto list-none m-0 gap-3 justify-between">
          {AdvantageList.map((advantage) => (
            <Advantage key={advantage.id} advantage={advantage} />
          ))}
        </ul>
      </div>
    </Box>
  );
};

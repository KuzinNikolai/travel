import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { IAdvantage } from "@/entities/advatage";
import { Advantage } from "./Advantage";

export const AdvantageList = [
  {
    id: 1,
    title: "Отмена тура",
    description: "Бесплатная отмена экскурсии за 48 часов",
    iconLabel: "Иконка часов",
    icon: <Icon name="Clock9" />,
  },
  {
    id: 2,
    title: "Отзывы",
    description: "Отзывы от реальных людей которые побывали на экскурсиях",
    iconLabel: "Иконка отзывов",
    icon: <Icon name="Star" />,
  },
  {
    id: 3,
    title: "Предоплата",
    description: "Мы не берем полную оплату за наш сервис, а лишь предоплату",
    iconLabel: "Иконка бронирования",
    icon: <Icon name="HandCoins" />,
  }
] satisfies IAdvantage[];

export const Advantages = () => {
  return (
    <Box className="px-0 py-2 bg-background-400" as="section">
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

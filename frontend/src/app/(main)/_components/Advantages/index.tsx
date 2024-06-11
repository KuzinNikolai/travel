import { Icon } from "@/components/Icon";
import { Section } from "@/components/layout/Section";
import { IAdvantage } from "@/entities/advantage.entity";
import { Advantage } from "./Advantage";

export const AdvantageList = [
  {
    id: 1,
    title: "Отмена тура",
    description: "Бесплатная отмена экскурсии за 48 часов",
    iconLabel: "Иконка часов",
    icon: <Icon name="Clock9" className="w-6 h-6 stroke-1" />,
  },
  {
    id: 2,
    title: "Отзывы",
    description: "Отзывы от реальных людей которые побывали на экскурсиях",
    iconLabel: "Иконка отзывов",
    icon: <Icon name="Star" className="w-6 h-6 stroke-1" />,
  },
  {
    id: 3,
    title: "Предоплата",
    description: "Мы не берем полную оплату за наш сервис, а лишь предоплату",
    iconLabel: "Иконка бронирования",
    icon: <Icon name="HandCoins" className="w-6 h-6 stroke-1" />,
  },
] satisfies IAdvantage[];

export const Advantages = () => {
  return (
    <Section title="Преимущества" hiddenTitle>
      <ul className="flex flex-row overflow-x-auto list-none m-0 gap-3 justify-between">
        {AdvantageList.map((advantage) => (
          <Advantage key={advantage.id} advantage={advantage} />
        ))}
      </ul>
    </Section>
  );
};

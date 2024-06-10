import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourIncludedProps {
  tour: IDetailTour;
}

export const TourIncluded: FC<ITourIncludedProps> = ({ tour }) => {
  return (
    <Section title="Что включено">
      <ul className="flex flex-col gap-1">
        {tour.included.map((include) => (
          <li key={`include-${include.id}`} className="flex gap-1">
            <Icon name="Check" className="stroke-success" />
            <Typography variant="span">{include.name}</Typography>
          </li>
        ))}
        {tour.notincluded.map((notInclude) => (
          <li key={`notInclude-${notInclude.id}`} className="flex gap-1">
            <Icon name="X" className="stroke-danger" />
            <Typography variant="span">{notInclude.name}</Typography>
          </li>
        ))}
      </ul>
    </Section>
  );
};

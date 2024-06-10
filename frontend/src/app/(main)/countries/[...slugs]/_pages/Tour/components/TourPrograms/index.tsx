import { Section } from "@/components/layout/Section";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";
import { Program } from "./Program";

interface ITourProgramsProps {
  tour: IDetailTour;
}

export const ToutPrograms: FC<ITourProgramsProps> = ({ tour }) => {
  return (
    <Section title="Программы и цены">
      <ul className="flex flex-col gap-1">
        {tour.programs.map((program) => (
          <Program
            key={program.id + program.title}
            currency={tour.currency_prefix}
            program={program}
          />
        ))}
      </ul>
    </Section>
  );
};

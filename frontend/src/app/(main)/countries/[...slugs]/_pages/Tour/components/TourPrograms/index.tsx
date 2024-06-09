import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";
import { Program } from "./Program";

interface ITourProgramsProps {
  tour: IDetailTour;
}

export const ToutPrograms: FC<ITourProgramsProps> = ({ tour }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-3 flex flex-col gap-3">
        <Typography variant="h2" width="medium">
          Программы и цены
        </Typography>
      </div>
      <ul className="container flex flex-col gap-1">
        {tour.programs.map((program) => (
          <Program currency={tour.currency_prefix} program={program} />
        ))}
      </ul>
    </Box>
  );
};

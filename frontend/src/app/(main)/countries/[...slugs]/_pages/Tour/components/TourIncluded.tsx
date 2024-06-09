import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourIncludedProps {
  tour: IDetailTour;
}

export const TourIncluded: FC<ITourIncludedProps> = ({ tour }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-3 flex flex-col gap-3">
        <Typography variant="h2" width="medium">
          Что включено
        </Typography>

        <ul className="flex flex-col gap-1">
          {tour.included.map((include) => (
            <li className="flex gap-1">
              <Icon name="Check" className="stroke-success" />
              <Typography variant="span" key={`include-${include.id}`}>
                {include.name}
              </Typography>
            </li>
          ))}
          {tour.notincluded.map((notInclude) => (
            <li className="flex gap-1">
              <Icon name="X" className="stroke-danger" />
              <Typography variant="span" key={`notInclude-${notInclude.id}`}>
                {notInclude.name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

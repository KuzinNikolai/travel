import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourTakeProps {
  tour: IDetailTour;
}

export const TourTake: FC<ITourTakeProps> = ({ tour }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-3 flex flex-col gap-3">
        <Typography variant="h2" width="medium">
          Взять с собой
        </Typography>

        <ul className="flex flex-col gap-1">
          {tour.take.map((take) => (
            <li key={take.id} className="flex gap-1">
              <Icon name="SquarePlus" className="stroke-gray-500" />
              <Typography variant="span" key={take.id}>
                {take.name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

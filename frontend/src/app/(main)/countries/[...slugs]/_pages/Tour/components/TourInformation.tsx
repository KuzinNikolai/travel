import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourInformation {
  tour: IDetailTour;
}

export const TourInformation: FC<ITourInformation> = ({ tour }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-4">
        <Typography variant="h2" as="h2" width="medium">
          О экскурсии
        </Typography>

        <ul className="flex flex-col gap-2 mt-3">
          <li className="flex items-center gap-1">
            <Icon name="Clock" />
            <Typography variant="paragraph" width="medium">
              {tour.duration}
            </Typography>
          </li>
          <li className="flex items-center gap-1">
            <Icon name="User" />
            <Typography variant="paragraph" width="medium">
              {tour.type}
            </Typography>
          </li>
          <li className="flex items-center gap-1">
            <Icon name="TrainFront" />
            <Typography variant="paragraph" width="medium">
              {tour.cat}
            </Typography>
          </li>
          <li className="flex items-center gap-1">
            <Icon name="Baby" />
            {tour.what_age_child_free && tour.child_price ? (
              <Typography
                variant="paragraph"
                width="medium"
                className="text-success"
              >
                С детьми можно. (Дети до {tour.what_age_child_free} лет бесплатно)
              </Typography>
            ) : (
              <Typography
                variant="paragraph"
                width="medium"
                className="text-danger"
              >
                С детьми нельзя
              </Typography>
            )}
          </li>

          <li className="flex items-center gap-1">
            <Icon name="Baby" />
            {tour.pregnant_possible ? (
              <Typography
                variant="paragraph"
                width="medium"
                className="text-success"
              >
                Беременным можно
              </Typography>
            ) : (
              <Typography
                variant="paragraph"
                width="medium"
                className="text-danger"
              >
                Беременным нельзя
              </Typography>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );
};

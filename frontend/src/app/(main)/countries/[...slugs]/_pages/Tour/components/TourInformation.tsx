import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourInformation {
  tour: IDetailTour;
}

export const TourInformation: FC<ITourInformation> = ({ tour }) => {
  return (
    <Section title="О экскурсии">
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-1">
          <Icon name="Clock" />
          <Typography variant="span">
            {tour.duration}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="User" />
          <Typography variant="span">
            {tour.type}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="TrainFront" />
          <Typography variant="span">
            {tour.cat}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="Baby" />
          {tour.what_age_child_free && tour.child_price ? (
            <Typography variant="span" className="text-success">
              С детьми можно. (Дети до {tour.what_age_child_free} лет бесплатно)
            </Typography>
          ) : (
            <Typography variant="span" className="text-danger">
              С детьми нельзя
            </Typography>
          )}
        </li>

        <li className="flex items-center gap-1">
          <Icon name="Baby" />
          {tour.pregnant_possible ? (
            <Typography variant="span" className="text-success">
              Беременным можно
            </Typography>
          ) : (
            <Typography variant="span" className="text-danger">
              Беременным нельзя
            </Typography>
          )}
        </li>
      </ul>
    </Section>
  );
};

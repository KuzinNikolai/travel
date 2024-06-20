import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { IDetailTour } from "@/packages/schemes/travel/tour.schema";
import { FC } from "react";

interface ITourInformation {
  tour: IDetailTour;
}

export const TourInformation: FC<ITourInformation> = ({ tour }) => {
  return (
    <Section title="О экскурсии">
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-1">
          <Icon name="Clock" className="w-6 h-6 stroke-1" />
          <Typography variant="span">
            {tour.duration}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="User" className="w-6 h-6 stroke-1" />
          <Typography variant="span">
            {tour.type}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="TrainFront" className="w-6 h-6 stroke-1" />
          <Typography variant="span">
            {tour.cat}
          </Typography>
        </li>
        <li className="flex items-center gap-1">
          <Icon name="Baby" className="w-6 h-6 stroke-1" />
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
          <Icon name="Baby" className="w-6 h-6 stroke-1" />
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

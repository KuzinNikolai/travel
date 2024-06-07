import { ITour } from "@/entities/travel/Tour.entity";
import clsx from "clsx";
import { FC } from "react";
import style from "./PopularTour.module.css";
import { Typography } from "@/components/Typography";
import { Rating } from "@/components/Rating";

interface ITourProps {
  tour: ITour;
}

export const Tour: FC<ITourProps> = ({ tour }) => {
  return (
    <li
      className={clsx(
        "grid grid-cols-[137px_1fr] gap-4 w-full",
        style["under-line"]
      )}
    >
      <img
        src={tour.photo}
        alt={tour.meta_desc}
        className="h-full rounded object-cover object-center"
      />
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-row flex-wrap justify-between gap-x-2">
          <Typography
            variant="span"
            as="h3"
            width="medium"
            transform="uppercase"
            className="text-primary-400"
          >
            Индивидуальная
          </Typography>
          <Typography
            variant="paragraph"
            width="normal"
            className="text-primary-400 leading-5"
          >
            5,5 часа
          </Typography>
        </div>
        <Typography variant="h3" as="h3" width="semibold" className="text-lg">
          {tour.title}
        </Typography>
        <Typography
          variant="paragraph"
          width="light"
          className="flex-1 text-primary-400 leading-5"
        >
          {tour.meta_desc}
        </Typography>
        <div className="flex flex-row justify-between">
          <Rating rating={tour.average_rating} />
          <Typography
            variant="paragraph"
            width="light"
            className="text-primary-400 leading-5"
          >
            ${tour.min_price || 0}
          </Typography>
        </div>
      </div>
    </li>
  );
};

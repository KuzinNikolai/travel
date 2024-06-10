import { ITour } from "@/entities/travel/Tour.entity";
import clsx from "clsx";
import { FC } from "react";
import style from "./Tour.module.css";
import { Typography } from "@/components/Typography";
import { Rating } from "@/components/Rating";
import Link from "next/link";

interface ITourProps {
  tour: ITour;
}

export const Tour: FC<ITourProps> = ({ tour }) => {
  var pathToTour = `/${tour.city_slug}/${tour.slug}`;

  return (
    <li
      className={clsx(
        "grid grid-cols-[137px_1fr] gap-4 w-full",
        style["under-line"]
      )}
    >
      <div className="relative">
        <img
          src={tour.photo}
          alt={tour.meta_desc}
          className="h-full rounded object-cover object-center"
        />
        <Link
          href={pathToTour}
          aria-label={`Ссылка на тур ${tour.title}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-row flex-wrap justify-between gap-x-2">
          <Typography
            variant="span"
            width="medium"
            transform="uppercase"
            className="text-primary-400"
          >
            {tour.type.toUpperCase()}
          </Typography>
          <Typography
            variant="span"
            width="normal"
            className="text-primary-400"
          >
            5,5 часа
          </Typography>
        </div>
        <Link href={pathToTour}>
          <Typography variant="h5" as="h3" width="semibold">
            {tour.title}
          </Typography>
        </Link>
        <Typography
          variant="content1"
          width="light"
          className="flex-1 text-primary-400 line-clamp-4"
        >
          {tour.meta_desc}
        </Typography>
        <div className="flex flex-row justify-between">
          <Rating rating={tour.average_rating} />
          <Typography
            variant="span"
            width="light"
            className="text-primary-400 "
          >
            ${tour.min_price || 0}
          </Typography>
        </div>
      </div>
    </li>
  );
};

import { Typography } from "@/components/Typography";
import { Rating } from "@/components/share/Rating";
import { ITour } from "@/packages/schemes/travel/tour.schema";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import style from "./Tour.module.css";
import { TourSkeleton } from "./Tour.skeleton";

interface ITourProps {
  tour: ITour;
}

export const Tour: FC<ITourProps> & { Skeleton: typeof TourSkeleton } = ({ tour }) => {
  var pathToTour = `/${tour.city_slug}/${tour.slug}`;

  return (
    <li className={clsx("grid w-full grid-cols-[137px_1fr] gap-4", style["under-line"])}>
      <div className="relative">
        <img
          src={tour.photo}
          alt={tour.meta_desc}
          className="h-full max-h-[clamp(164px,8vw,260px)] w-full rounded object-cover object-center"
        />
        <Link
          href={pathToTour}
          aria-label={`Ссылка на тур ${tour.title}`}
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-row flex-wrap justify-between gap-x-2">
          <Typography variant="span" textWidth="medium" textTransform="uppercase" className="text-primary-400">
            {tour.type.toUpperCase()}
          </Typography>
          <Typography variant="span" textWidth="normal" className="text-primary-400">
            5,5 часа
          </Typography>
        </div>
        <Link href={pathToTour}>
          <Typography variant="h5" as="h3" textWidth="semibold">
            {tour.title}
          </Typography>
        </Link>
        <Typography variant="content1" textWidth="light" className="line-clamp-4 flex-1 text-primary-400">
          {tour.meta_desc}
        </Typography>
        <div className="flex flex-row justify-between">
          <Rating rating={tour.average_rating} />
          <Typography variant="span" textWidth="light" className="text-primary-400">
            ${tour.min_price || 0}
          </Typography>
        </div>
      </div>
    </li>
  );
};

Tour.Skeleton = TourSkeleton;

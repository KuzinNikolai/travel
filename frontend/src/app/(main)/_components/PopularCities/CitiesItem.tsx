import { Typography } from "@/components/Typography";
import { ICityItem } from "@/entities/travel/City.entity";
import { FC } from "react";

interface ICityProps {
  city: ICityItem;
}

export const CityItem: FC<ICityProps> = ({ city: city }) => {
  return (
    <li className="relative w-full h-[140px] rounded-lg overflow-hidden bg-background-400">
      <div className="absolute left-0 top-0 w-full h-full">
        <img
          src={city.photo}
          alt={city.meta_desc}
          className="object-cover object-center w-full"
        />
        {/* <div className="absolute left-0 top-0 w-full h-full bg-primary opacity-20"></div> */}
      </div>
      <div className="absolute left-0 bottom-0 right-0 p-3 flex flex-col gap-[4px]">
        <Typography
          variant="span"
          transform="uppercase"
          width="semibold"
          className="text-base text-primary-100"
        >
          {city.name}
        </Typography>
        <Typography
          variant="span"
          transform="uppercase"
          className="text-xs text-primary-100"
        >
          экскурсий: {city.tour_count || 0}
        </Typography>
      </div>
    </li>
  );
};

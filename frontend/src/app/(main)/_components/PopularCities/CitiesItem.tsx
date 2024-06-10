import { Typography } from "@/components/Typography";
import { ICityItem } from "@/entities/travel/City.entity";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICityProps {
  city: ICityItem;
}

export const CityItem: FC<ICityProps> = ({ city: city }) => {
  var cityUrl = `/${city.slug}`;

  return (
    <li className="relative w-full h-[140px] rounded-lg overflow-hidden bg-background-400">
      <div className="absolute left-0 top-0 w-full h-full">
        <Image
          src={city.photo}
          alt=""
          width={300}
          height={300}
          className="object-cover object-center w-full"
        />
        {/* <div className="absolute left-0 top-0 w-full h-full bg-primary opacity-20"></div> */}
      </div>
      <div className="absolute left-0 bottom-0 right-0 p-3 flex flex-col gap-[4px]">
        <Typography
          variant="content2"
          transform="uppercase"
          width="semibold"
          className="text-primary-100"
        >
          {city.name}
        </Typography>
        <Typography
          variant="content2"
          transform="uppercase"
          className="text-primary-100"
        >
          экскурсий: {city.tour_count || 0}
        </Typography>
      </div>
      <Link href={cityUrl} className="absolute top-0 right-0 left-0 bottom-0" aria-label={`Ссылка на страницу ${city.name} города`} />
    </li>
  );
};

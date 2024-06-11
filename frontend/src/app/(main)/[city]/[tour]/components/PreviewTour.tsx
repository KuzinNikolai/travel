import { Box } from "@/components/layout/Box";
import { Rating } from "@/components/share/Rating";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import Image from "next/image";
import { FC } from "react";

interface IPreviewTourProps {
  tour: IDetailTour;
}

export const PreviewTour: FC<IPreviewTourProps> = ({ tour }) => {
  return (
    <Box className="flex flex-col gap-5 pb-4 bg-background-400" as="section">
      <Image
        alt={tour.photo_alt}
        src={tour.photo}
        width={300}
        height={300}
        className="w-full h-[50vh] object-cover"
      />
      <div className="container flex flex-col gap-5">
        <Typography variant="h2" width="semibold" as="h1">
          {tour.title}
        </Typography>

        <div className="flex flex-col gap-2">
          <Typography variant="content2" className="text-primary-400">
            {tour.meta_desc}
          </Typography>
          <Rating rating={tour.average_rating} />
          <Typography variant="h4" width="medium" as="p">
            {tour.currency_prefix} {tour.min_price}
          </Typography>
          <Typography variant="span" width="medium" className="text-success">
            Смотрите ниже что включено Центру
          </Typography>
        </div>
      </div>
    </Box>
  );
};

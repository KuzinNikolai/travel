import { Box } from "@/components/layout/Box";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";
import { PreviewTour } from "./components/PreviewTour";
import { TourDescription } from "./components/TourDescriptions";
import { TourInformation } from "./components/TourInformation";
import { TourUsagePolicy } from "./components/TourUsagePolicy";
import { ToutPrograms } from "./components/TourPrograms";
import { TourIncluded } from "./components/TourIncluded";
import { TourTake } from "./components/TourTake";

interface ITourProps {
  tour: IDetailTour;
}

export const Tour: FC<ITourProps> = ({ tour }) => {
  return (
    <Box className="flex flex-col gap-4" as="section">
      <PreviewTour tour={tour} />
      <TourDescription description={tour.description} />
      <TourInformation tour={tour} />
      <ToutPrograms tour={tour} />
      <TourIncluded tour={tour} />
      <TourTake tour={tour} />
      <TourUsagePolicy usagePolicy={tour.usage_policy} />
    </Box>
  );
};

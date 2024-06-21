import { Box } from "@/components/layout/Box";
import { getDetailTour } from "@/packages/API/fetches/tours";
import { IPagesProps } from "@/packages/utilsTypes/pageProps";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Header } from "./_components/Header";
import { PreviewTour } from "./_components/PreviewTour";
import { TourDescription } from "./_components/TourDescriptions";
import { TourIncluded } from "./_components/TourIncluded";
import { TourInformation } from "./_components/TourInformation";
import { ToutPrograms } from "./_components/TourPrograms";
import { TourTake } from "./_components/TourTake";
import { TourUsagePolicy } from "./_components/TourUsagePolicy";

const Tour: FC<IPagesProps<{ tour: string }>> = async ({ params }) => {
  var tour = await getDetailTour(params.tour);

  if (!tour) {
    return notFound();
  }

  return (
    <>
      <Header tourId={tour.id} />
      <Box className="flex flex-col gap-4" as="section">
        <PreviewTour tour={tour} />
        <TourDescription description={tour.description} />
        <TourInformation tour={tour} />
        <ToutPrograms tour={tour} />
        <TourIncluded tour={tour} />
        <TourTake tour={tour} />
        <TourUsagePolicy usagePolicy={tour.usage_policy} />
      </Box>
    </>
  );
};

export default Tour;

export async function generateMetadata({ params }: IPagesProps): Promise<Metadata> {
  if (!params.slug) {
    return {};
  }

  const tour = await getDetailTour(params.slug);

  if (!tour) {
    return {};
  }

  return {
    title: `Экскурсия ${tour.title} в городе ${tour.city}`,
    description: tour.description || "",
    keywords: `Экскурсии ${tour.title}, ${tour.title}`,
  };
}

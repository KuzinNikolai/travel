import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { serverApi } from "@/packages/API";
import { Tour } from "./Tour";

export const PopularTours = async () => {
  const tours = (await serverApi.tours.getTours())
    ?.filter((tour) => tour.average_rating >= 4)
    .sort(
      (currTour, nextTour) => nextTour.average_rating - currTour.average_rating
    );

  return (
    <Box className="px-0 py-2 bg-background-400" as="section">
      <div className="container flex flex-col gap-3">
        <Typography variant="h3" as="h2" width="bold" className="mb-3">
          Most popular tours
        </Typography>
        <ul className="flex flex-col list-none gap-3">
          {tours ? (
            tours.map((tour) => <Tour key={tour.id} tour={tour} />)
          ) : (
            <Typography variant="paragraph">Tours not found</Typography>
          )}
        </ul>
      </div>
    </Box>
  );
};

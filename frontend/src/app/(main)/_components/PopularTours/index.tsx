import { Box } from "@/components/layout/Box";
import { Typography } from "@/components/Typography";
import { serverApi } from "@/packages/API";
import { ITour } from "@/packages/schemes/travel/tour.schema";
import { Tour } from "@/components/share/Tour";
import { Section } from "@/components/layout/Section";

export const PopularTours = async () => {
  const tours = (await serverApi.cities.getCities())?.reduce(
    (acc, city) => (acc.push(...city.popular_tours), acc),
    [] as ITour[]
  );

  return (
    <Section title="Популярные туры">
      <ul className="flex flex-col list-none gap-3">
        {tours && tours.length ? (
          tours.map((tour) => <Tour key={tour.id} tour={tour} />)
        ) : (
          <Typography variant="content1">Tours not found</Typography>
        )}
      </ul>
    </Section>
  );
};

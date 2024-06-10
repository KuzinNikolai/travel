import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { serverApi } from "@/packages/API";
import { CityItem } from "./CitiesItem";

export const PopularCities = async () => {
  const cities = await serverApi.cities.getCities();

  return (
    <Section title="Популярные города">
      <ul className="flex flex-col list-none gap-2">
        {cities && cities.length ? (
          cities.map((city) => <CityItem key={city.id} city={city} />)
        ) : (
          <Typography variant="content1">Cities not found</Typography>
        )}
      </ul>
    </Section>
  );
};

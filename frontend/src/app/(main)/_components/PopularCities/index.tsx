import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { serverApi } from "@/packages/API";
import { CityItem } from "./CitiesItem";

export const PopularCities = async () => {
  const cities = await serverApi.cities.getCities();

  return (
    <Box className="px-0 py-2 bg-background-400" as="section">
      <div className="container">
        <Typography variant="h3" as="h2" width="bold" className="mb-3">
          Most popular cities
        </Typography>
        <ul className="flex flex-col list-none gap-2">
          {cities && cities.length ? (
            cities.map((city) => <CityItem key={city.id} city={city} />)
          ) : (
            <Typography variant="paragraph">Cities not found</Typography>
          )}
        </ul>
      </div>
    </Box>
  );
};
